import React, { useEffect, useState } from "react";
import { Badge, Col, Popover } from "antd";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperShoppingHeader,
  WrapperAccountHeader,
  WrapperContentPopup,
  ProductTypeItem,
} from "./style";
import {
  UserOutlined,
  ShoppingCartOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserServices";
import { searchProduct } from "../../redux/slices/productSlide";
import { resetUser } from "../../redux/slices/userSlide";
import TypeProduct from "../TypeProduct/TypeProduct";
import * as ProductService from "../../services/ProductServices";
import logo from "../../../src/assets/images/logo.png";

const HeaderComponent = () => {
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [typeProducts, setTypeProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Gọi API lấy danh sách loại sản phẩm
  const fetchAllTypeProduct = async () => {
    try {
      const res = await ProductService.getAllTypeProduct();
      if (res?.status === "OK" && Array.isArray(res?.data)) {
        setTypeProducts(res?.data);
      } else {
        console.error("API trả dữ liệu không hợp lệ:", res);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách loại sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  return (
    <div>
      <WrapperHeader>
        <Col span={4}>
          <WrapperTextHeader onClick={() => navigate("/")}>
            <img src={logo} alt="logo" style={{ height: "70px", paddingTop: "5px" }} />
          </WrapperTextHeader>
        </Col>

        <Col span={10}>
          <ButtonInputSearch
            placeholder="Tìm kiếm... "
            size="large"
            onChange={(e) => dispatch(searchProduct(e.target.value))}
          />
        </Col>

        <Col span={4}>
          <WrapperShoppingHeader
            onClick={() => navigate("/order")}
            style={{ cursor: "pointer", fontWeight: "500 " }}
          >
            <Badge count={order?.orderItems?.length || 0} size="small">
              <ShoppingCartOutlined
                style={{
                  fontSize: "25px",
                  color: "#fff",
                  marginRight: "5px",
                }}
              />
            </Badge>
            Giỏ Hàng
          </WrapperShoppingHeader>
        </Col>

        <Col span={3}>
          <Popover
            placement="bottom"
            content={
              user?.access_token ? (
                <div>
                  {user?.isAdmin && (
                    <WrapperContentPopup onClick={() => navigate("/system/admin")}>
                      Quản lý hệ thống
                    </WrapperContentPopup>
                  )}
                  <WrapperContentPopup onClick={() => navigate("/profile-user")}>
                    Thông tin người dùng
                  </WrapperContentPopup>
                  <WrapperContentPopup onClick={() => navigate("/myorder")}>
                    Lịch sử mua hàng
                  </WrapperContentPopup>
                  <WrapperContentPopup onClick={async () => {
                    await UserService.logoutUser();
                    dispatch(resetUser());
                    navigate("/");
                  }}>
                    Đăng xuất
                  </WrapperContentPopup>
                </div>
              ) : null
            }
          >
            {user?.access_token ? (
              <WrapperAccountHeader>
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <UserOutlined style={{ fontSize: "20px" }} />
                )}
                <div style={{ cursor: "pointer", padding: "5px" }}>
                  {user?.name || user?.email}
                  <CaretDownOutlined style={{ marginLeft: "10px" }} />
                </div>
              </WrapperAccountHeader>
            ) : (
              <WrapperAccountHeader
                onClick={() => navigate("/sign-in")}
                style={{ cursor: "pointer", fontWeight: "500 " }}
              >
                <UserOutlined style={{ fontSize: "20px" }} />
                Đăng Nhập
              </WrapperAccountHeader>
            )}
          </Popover>
        </Col>

        <Col span={3}>
          <WrapperAccountHeader
            onClick={() => navigate("/contact")}
            style={{ cursor: "pointer", fontWeight: "500 " }}
          >
            HOTLINE: 1900 1234
          </WrapperAccountHeader>
        </Col>
      </WrapperHeader>

      {/* Menu chính */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#008bd4",
          padding: "10px 0",
          position: "relative",
        }}
      >
        <div
          style={{ padding: "0 15px", color: "#fff", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Trang chủ
        </div>
        <div
          style={{
            padding: "0 15px",
            color: "#fff",
            cursor: "pointer",
            position: "relative",
          }}
          onMouseOver={() => setShowPopup(true)}
          onMouseOut={() => setTimeout(() => setShowPopup(false), 300)}
        >
          Điện thoại
          {showPopup && typeProducts?.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                backgroundColor: "#fff",
                padding: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                zIndex: 10,
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {typeProducts.map((item) => (
                <ProductTypeItem key={item.id}>
                  <TypeProduct name={item.name} />
                </ProductTypeItem>
              ))}
            </div>
          )}
        </div>
        <div
          style={{ padding: "0 15px", color: "#fff", cursor: "pointer" }}
          onClick={() => navigate("/contact")}
        >
          Liên hệ
        </div>
        <div
          style={{ padding: "0 15px", color: "#fff", cursor: "pointer" }}
          onClick={() => navigate("/about")}
        >
          Giới thiệu
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
