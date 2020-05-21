import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Modal, ProductCard, StripeInput } from '../../components';

const Store = _ => {
  const stripe = useStripe();
  const stripeElements = useElements();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async _ => {
    const { data } = await axios.get('/products');

    setProducts(data.products);
  };

  const handleProductClick = product => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = _ => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleSubmitPayment = async e => {
    e.preventDefault();

    if (!selectedProduct) return;

    try {
      const cardInputEl = stripeElements.getElement(CardElement);
      const { token } = await stripe.createToken(cardInputEl);

      const { data } = await axios.post('/commitCharge', { tokenId: token.id, total: selectedProduct.price * 100 });

      if (!data.success) throw new Error('Failed to commit charge');

      alert('Payment Successful');
    } catch (err) {
      console.log('Payment Error', { err });
      alert(err.message);
    } finally {
      setIsModalOpen(false);
      setSelectedProduct(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className='content-wrapper'>
      <div className='content products'>
        {products.map(product => (
          <ProductCard key={product.id} product={product} onClick={handleProductClick} />
        ))}
      </div>
      <Modal isOpen={isModalOpen} header='Payment Information'>
        <form onSubmit={handleSubmitPayment} className='payment-form'>
          <div className='form-group'>
            <StripeInput />
          </div>
          <div className='modal-footer'>
            <button type='submit'>Submit Payment</button>
            <button onClick={handleCloseModal} type='button' id='cancel-payment-request'>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default Store;
