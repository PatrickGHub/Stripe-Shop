import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';

const CartEmpty = () => (
  <div>
    <ShoppingCartOutlined className="emptyCartIcon" />
    <p className="emptyCartText">Your cart is empty</p>
    <Link to="/" className="emptyCartButton">Browse products</Link>
  </div>
);

export default CartEmpty;
