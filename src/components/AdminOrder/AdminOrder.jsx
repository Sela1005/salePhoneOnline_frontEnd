// src/components/AdminOrder.jsx
import React, { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  convertPrice,
  convertStatusOrder,
  convertPercent,
  convertDateISO,
} from "../../utils";
import * as OrderService from "../../services/OrderServices";
import { orderContant } from "../../contant";
import PieChartComponent from "./PieChart";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { Button, Dropdown, Image, Menu, Table } from "antd";
import OrderComposite from "../OrderComposite"; // Import Composite component

const AdminOrder = () => {
  const [dataTable, setDataTable] = useState([]);
  const user = useSelector((state) => state?.user);

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrder });
  const { isPending: isLoadingOrders, data: orders } = queryOrder;

  const headers = [
    { label: "Mã đơn hàng", key: "key" },
    { label: "Tên Người dùng", key: "userName" },
    { label: "Số điện thoại", key: "phone" },
    { label: "Địa chỉ", key: "address" },
    { label: "Thành phố", key: "city" },
    { label: "Phí giao hàng", key: "shippingPrice" },
    { label: "Phương thức thanh toán", key: "paymentMethod" },
    { label: "Đơn giá", key: "price" },
    { label: "Tổng tiền", key: "totalPrice" },
    { label: "Tình trạng", key: "orderStatus" },
    { label: "Thanh toán", key: "isPaid" },
    { label: "Mã giảm giá áp dụng", key: "discountCode" },
    { label: "Phần trăm giảm giá", key: "discountPercentage" },
    { label: "Ngày đặt", key: "createdAt" },
    { label: "Ngày cập nhật", key: "updatedAt" },
  ];

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "key",
      fixed: "left",
      width: 250,
    },
    Table.EXPAND_COLUMN,
    {
      title: "Tên người mua",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      fixed: "left",
      width: 150,
    },
    {
      title: "Tình trạng",
      dataIndex: "orderStatus",
      fixed: "left",
      width: 150,
      sorter: (a, b) => a.orderStatus.localeCompare(b.orderStatus),
      render: (text, record) => {
        const menuItems = [
          { label: "Đang giao hàng", key: "Shipped" },
          { label: "Đã giao hàng", key: "Delivered" },
          { label: "Đang xử lý", key: "Processing" },
          { label: "Đã hủy", key: "Cancelled" },
        ];
        const menu = (
          <Menu onClick={(e) => handleStatusChange(record._id, e.key)}>
            {menuItems.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button>{text}</Button>
          </Dropdown>
        );
      },
    },
    {
      title: "Thanh toán",
      dataIndex: "isPaid",
      fixed: "left",
      width: 200,
      sorter: (a, b) => a.isPaid - b.isPaid,
      render: (text, record) => {
        const paidText = record.isPaid ? "Đã thanh toán" : "Chưa thanh toán";
        const menuItems = [
          { label: "Đã thanh toán", key: "true" },
          { label: "Chưa thanh toán", key: "false" },
        ];
        const menu = (
          <Menu onClick={(e) => handlePaidChange(record._id, e.key)}>
            {menuItems.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={(e) => e.preventDefault()}>{paidText}</Button>
            </div>
          </Dropdown>
        );
      },
    },
    {
      title: "Phí giao hàng",
      dataIndex: "shippingPrice",
      sorter: (a, b) => a.shippingPrice - b.shippingPrice,
      width: 120,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      sorter: (a, b) => a.paymentMethod.localeCompare(b.paymentMethod),
      width: 175,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
      width: 150,
    },
    {
      title: "Thành phố",
      dataIndex: "city",
      sorter: (a, b) => a.city.localeCompare(b.city),
      width: 150,
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      width: 200,
    },
    {
      title: "Tổng tiền đơn hàng",
      dataIndex: "totalPrice",
      fixed: "right",
      sorter: (a, b) => {
        const totalPriceA = parseFloat(a.totalPrice.replace(/[^\d.-]/g, ""));
        const totalPriceB = parseFloat(b.totalPrice.replace(/[^\d.-]/g, ""));
        return totalPriceA - totalPriceB;
      },
      render: (text, record) => {
        const color = "red";
        return <span style={{ color: color }}>{text}</span>;
      },
      width: 200,
    },
  ];

  useEffect(() => {
    if (orders?.data) {
      const updatedDataTable = orders.data.map((order) => ({
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: `0${order?.shippingAddress?.phone}`,
        address: order?.shippingAddress?.address,
        city: order?.shippingAddress?.city,
        paymentMethod: orderContant.payment[order?.paymentMethod],
        totalPrice: convertPrice(order?.totalPrice),
        shippingPrice: convertPrice(order?.shippingPrice),
        orderStatus: convertStatusOrder(order?.orderStatus),
        isPaid: order?.isPaid,
        discountPercentage: convertPercent(order?.discountPercentage),
        createdAt: convertDateISO(order?.createdAt),
        updatedAt: convertDateISO(order?.updatedAt),
      }));
      setDataTable(updatedDataTable);
    }
  }, [orders]);

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    return OrderService.updateOrder(id, token, { ...rests });
  });

  const handleStatusChange = (orderId, status) => {
    mutationUpdate.mutate(
      {
        id: orderId,
        token: user?.access_token,
        orderStatus: status,
      },
      {
        onSuccess: () => {
          setDataTable((prevData) =>
            prevData.map((order) =>
              order.key === orderId
                ? { ...order, orderStatus: convertStatusOrder(status) }
                : order
            )
          );
        },
      }
    );
  };

  const handlePaidChange = (orderId, paid) => {
    const isPaidValue = paid === "true";
    mutationUpdate.mutate(
      {
        id: orderId,
        token: user?.access_token,
        isPaid: isPaidValue,
      },
      {
        onSuccess: () => {
          setDataTable((prevData) =>
            prevData.map((order) =>
              order.key === orderId ? { ...order, isPaid: isPaidValue } : order
            )
          );
        },
      }
    );
  };

  return (
    <div>
      <WrapperHeader> Quản lý đơn hàng </WrapperHeader>
      <div style={{ height: 180, width: 200 }}>
        <PieChartComponent data={orders?.data} />
      </div>
      <div style={{ marginTop: "30px", maxWidth: "1300px" }}>
        <TableComponent
          title={() => (
            <div
              style={{
                fontSize: "18px",
                color: "rgb(77 164 210)",
                fontWeight: "bold",
              }}
            >
              Tổng số lượng đơn hàng: {orders?.data.length}
            </div>
          )}
          filename={"Order"}
          headers={headers}
          columns={columns}
          isLoading={isLoadingOrders}
          data={dataTable}
          expandable={{
            expandedRowRender: (record) => (
              <div>
                {/* Thông tin bổ sung */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{ flex: "1", minWidth: "250px" }}>
                    <span style={{ color: "#1e85bc" }}>
                      Địa chỉ người nhận:{" "}
                    </span>
                    {record.address}, {record.city}
                  </div>
                  <div style={{ flex: "1", minWidth: "250px" }}>
                    <span style={{ color: "#1e85bc" }}>
                      Số điện thoại người nhận:{" "}
                    </span>
                    {record.phone}
                  </div>
                  <div style={{ flex: "1", minWidth: "250px" }}>
                    <span style={{ color: "#1e85bc" }}>
                      Mã đã áp dụng giảm giá:{" "}
                    </span>
                    {record.discountCode || "Không có mã giảm giá"}
                  </div>
                  <div style={{ flex: "1", minWidth: "250px" }}>
                    <span style={{ color: "#1e85bc" }}>Tỷ lệ giảm giá: </span>
                    {record.discountPercentage
                      ? `${record.discountPercentage}`
                      : "Không có giảm giá"}
                  </div>
                </div>
                {/* Sử dụng Composite Pattern để hiển thị các sản phẩm trong order */}
                <OrderComposite orderItems={record.orderItems} />
              </div>
            ),
          }}
          scroll={{
            x: 1000,
            y: 450,
          }}
        />
      </div>
    </div>
  );
};

export default AdminOrder;
