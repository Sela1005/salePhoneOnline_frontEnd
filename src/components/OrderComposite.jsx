// src/components/OrderComposite.jsx
import React from "react";
import OrderItem from "./OrderItem";

const OrderComposite = ({ orderItems }) => {
  return (
    <div>
      {orderItems.map((item, index) => (
        <OrderItem key={index} item={item} />
      ))}
    </div>
  );
};

export default OrderComposite;
