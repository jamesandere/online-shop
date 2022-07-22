const { auth, isUser, isAdmin } = require("../middleware/auth");
const { Order } = require("../models/order");
const router = require("express").Router();
const moment = require("moment");

// GET ORDER STATS

router.get("/stats", async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const orders = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
