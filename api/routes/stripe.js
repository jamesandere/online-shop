const router = require('express').Router();
const Stripe = require('stripe');

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

router.post('/create-checkout-session', async (req, res) => {
    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                  name: item.name,
                  images: [item.image],
                  description: item.desc,
                  metadata: {
                      id: item.id
                  },
                },
                unit_amount: 2000,
              },
              quantity: 1,
        }
    })

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
  
    res.send({url: session.url});
  });

module.exports = router;