const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const genAuthToken = require("../utils/genAuthToken");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const pat = new RegExp("^[A-Za-z]");

  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
      .pattern(new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/))
      .message({
        "string.pattern.base": "Invalid username",
        "string.min": "minimum 3 character required",
        "string.max": "maximum 30 characters allowed",
        "string.base": `"name" should be a type of 'text'`,
        "string.empty": `name" cannot be an empty field`,
        "any.required": `"name" is a required.`,
      }),
    email: Joi.string().min(3).max(200).required(),
    password: Joi.string().min(5).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User already exists!");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);

  user = user.save();

  const token = genAuthToken(user);

  res.status(200).send(token);
});

module.exports = router;
