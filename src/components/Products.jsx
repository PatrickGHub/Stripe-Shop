import React, { useContext, useEffect } from 'react';
import { Button, Card } from 'antd';
import { AppContext } from '../Context';
import productsData from '../Data/productsData';
import formatPrice from './utility/FormatPrice';
import persistState from './utility/PersistState';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Products = (props) => {
  const [state, setState] = useContext(AppContext);

  const addToCartNew = (productId, productName, productPrice) => {
    setState((prevState) => ({
      ...state,
      cart: {
        ...state.cart,
        [productId]: {
          name: productName,
          quantity: 1,
          unitPrice: productPrice,
          totalPrice: productPrice,
        },
      },
      totalPrice: prevState.totalPrice + productPrice,
    }));
  };

  const addToCartExisting = (productId) => {
    const newQuantity = state.cart[productId].quantity + 1;

    setState((prevState) => ({
      ...state,
      cart: {
        ...state.cart,
        [productId]: {
          ...state.cart[productId],
          quantity: newQuantity,
          totalPrice: newQuantity * state.cart[productId].unitPrice,
        },
      },
      totalPrice: prevState.totalPrice + state.cart[productId].unitPrice,
    }));
  };

  const initiateAddToCart = (product) => {
    if (Object.prototype.hasOwnProperty.call(state.cart, product.id)) {
      addToCartExisting(product.id);
    } else {
      addToCartNew(product.id, product.name, product.price);
    }
  };

  useEffect(() => {
    persistState(state);
  }, [state]);

  if (props.location.toastMessage) {
    toast.success(props.location.toastMessage, {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }

  return (
    <div>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      <div className="productsContainer">
        {productsData.map((product) => (
          <Card
            className="productCard"
            cover={<img alt={`${product.name}`} src={require(`../../public/assets/product-images/${product.image}`)} />}
            hoverable
            key={product.id}
            style={{ width: '100' }}
          >
            <p className="productName">{ product.name }</p>
            <p>
              £
              { formatPrice(product.price) }
            </p>
            <Button
              onClick={() => initiateAddToCart(product)}
              type="primary"
              block
            >
              Add to cart
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
