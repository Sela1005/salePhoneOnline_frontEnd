// src/components/OrderItem.jsx
import React from "react";
import { Image } from "antd";

const OrderItem = ({ item }) => {
  return (
    <div
      style={{
        marginBottom: "3px",
        padding: "2px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        gap: "10px",
      }}
    >
      <Image
        src={item.image}
        alt={item.name}
        style={{
          width: "50px",
          height: "50px",
          marginLeft: "8px",
          borderRadius: "3px",
        }}
      />
      <p>{item.name}</p>
      <p>
        <strong>x{item.amount}</strong>
      </p>
      <p>Giá: {item.price.toLocaleString()} VND</p>
    </div>
  );
};

export default OrderItem;
