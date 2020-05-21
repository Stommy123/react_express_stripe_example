const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.get('/products', async (_, res) => {
  const query = `
  query {
    allProduct {
      _id
      name
      price
      image {
        asset {
          url
        }
      }
    }
  }
`;

  const url = `https://${process.env.SANITY_PROJECT_ID}.apicdn.sanity.io/v1/graphql/production/default`;
  try {
    const { data } = await axios.post(
      url,
      { query },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const products = data.data.allProduct.map(({ _id, name, price, image }) => ({
      id: _id,
      name,
      price,
      imageUrl: image.asset.url,
    }));
    res.send({ products });
  } catch (err) {
    console.log('Failed to fetch products from sanity', { err });
    res.status(500).send({ products: [] });
  }
});

app.post('/commitCharge', async (req, res) => {
  const { tokenId, total } = req.body;
  try {
    await stripe.charges.create({
      amount: total,
      source: tokenId,
      currency: 'usd',
    });
    res.send({ success: true, message: 'Successfully purchased item' });
  } catch (err) {
    console.log('Failed to commit charge', { err });
    res.status(500).send({ message: 'Charge Failed', success: false });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
