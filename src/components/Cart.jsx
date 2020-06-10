import React, { useContext, useState } from 'react';
import Axios from 'axios';
import { Button, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { AppContext } from '../Context';
import { formatPrice } from './utility/FormatPrice';
import { Checkout } from './Checkout.jsx';

export const Cart = () => {

  const [state, setState] = useContext(AppContext);
  const [allowContinue, setAllowContinue] = useState(true)

  const tableColumns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product'
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice'
    }
  ];

  const tableData = []
  Object.entries(state.cart).forEach((item) => {
    tableData.push({
      key: item[0],
      product: item[1].name,
      unitPrice: `£${formatPrice(item[1].unitPrice)}`,
      quantity: item[1].quantity,
      totalPrice: `£${formatPrice(item[1].totalPrice)}`
    })
  })

  const createPaymentIntent = () => {
    Axios
      .post('/api/checkout', {
        totalPrice: state.totalPrice,
      })
      .then(async (res) => {
        await res.data.clientSecret
        setState({ ...state, clientSecret: res.data.clientSecret })
      })
    setAllowContinue(false);
  }

  return (
    <div>
      <Table
        columns={tableColumns}
        dataSource={tableData}
        footer={() => `Total Price: £${formatPrice(state.totalPrice)}`}
        pagination={false}
      />
      { allowContinue && 
        <button
          className='createPaymentIntentButton'
          disabled={ !allowContinue }
          onClick={ createPaymentIntent }
        >Continue</button>
      }
      { state.clientSecret && <Checkout/> }
    </div>
  )
}