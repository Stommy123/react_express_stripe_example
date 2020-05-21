import React from 'react';

const ProductCard = ({ onClick, product }) => (
  <div className='product'>
    <img src={product.imageUrl} alt='' />
    <span>{product.name}</span>
    <span>{product.description}</span>
    <span>${product.price}</span>
    <button onClick={_ => onClick(product)}>Buy Now!</button>
  </div>
);

export default ProductCard;
