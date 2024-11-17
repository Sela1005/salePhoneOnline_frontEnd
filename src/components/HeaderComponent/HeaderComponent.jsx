import React, { useEffect, useState } from "react";
import { Badge, Col, Popover } from "antd";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperShoppingHeader,
  WrapperAccountHeader,
  WrapperShipperHeader,
  ProductTypeItem,
  WrapperContentPopup,
} from "./style";
import { UserOutlined, ShoppingCartOutlined, CaretDownOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserServices";
import { searchProduct } from "../../redux/slices/productSlide";
import { resetUser } from "../../redux/slices/userSlide";
import TypeProduct from "../TypeProduct/TypeProduct";
import * as ProductService from "../../services/ProductServices";
import logo from "../../../src/assets/images/logo.png"

const HeaderComponent = () => {
  const user = useSelector((state) => state.user);
  const [typeProducts, setTypeProducts] = useState([]);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [loading, setloading] = useState(false);
  const [search, setSearch] = useState("");
  const order = useSelector((state) => state.order);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  const handleLogout = async () => {
    setloading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    navigate("/");
    setloading(false);
  };

  useEffect(() => {
    setloading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setloading(false);
  }, [user?.name, user?.avatar]);

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleNavigateLogo = () => {
    navigate("/");
  };

  const goToProduct = () => {
    navigate("/products");
  };

  const handleNavigateAdmin = () => {
    navigate("/system/admin");
  };

  const handleNavigateProfile = () => {
    navigate("/profile-user");
  };

  const handleNavigateMyOrder = () => {
    navigate("/myorder");
  };

  const handleNavigateContact = () => {
    navigate("/contact");  // Giả sử bạn có một trang liên hệ
  };

  const content = (
    <div>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={handleNavigateAdmin}>
          Quản lý hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleNavigateProfile}>
        Thông tin người dùng
      </WrapperContentPopup>
      <WrapperContentPopup onClick={handleNavigateMyOrder}>
        Lịch sử mua hàng
      </WrapperContentPopup>
      <WrapperContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  return (
    <div>
      <WrapperHeader>
        <Col span={4}>
          <WrapperTextHeader onClick={handleNavigateLogo}>
            <img src={logo} style={{ height: '70px', paddingTop: '5px' }} />
          </WrapperTextHeader>
        </Col>

        <Col span={10}>
          <ButtonInputSearch
            placeholder="Tìm kiếm... "
            size="large"
            onChange={onSearch}
          />
        </Col>

        <Col span={4}>
          <WrapperShoppingHeader
            onClick={() => navigate("/order")}
            style={{ cursor: "pointer", fontWeight:"500 " }}
          >
            <Badge count={order?.orderItems?.length} size="small">
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
            content={user?.access_token ? content : null}
          >
            {user?.access_token ? (
              <WrapperAccountHeader onClick={handleNavigateProfile}>
                {userAvatar ? (
                  <img
                    src={userAvatar}
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
                  {userName?.length ? userName : user?.email}
                  <CaretDownOutlined style={{ marginLeft: "10px" }} />
                </div>
              </WrapperAccountHeader>
            ) : (
              <WrapperAccountHeader onClick={handleNavigateLogin} style={{ cursor: "pointer", fontWeight:"500 " }}>
                <UserOutlined style={{ fontSize: "20px" }} />
                Đăng Nhập
              </WrapperAccountHeader>
            )}
          </Popover>
        </Col>

        {/* Thêm phần liên hệ vào bên phải của đăng nhập */}
        <Col span={3}>
          <WrapperAccountHeader onClick={handleNavigateContact} style={{ cursor: "pointer", fontWeight:"500 " }}>
            HOTLINE:

            1900 1234
          </WrapperAccountHeader>
        </Col>
      </WrapperHeader>

      <div
        style={{
          width: "92.15%",
          textAlign: "center",
          position: "relative",
          margin: "0 auto",
          background: "#008bd4",
          paddingLeft: "120px",
        }}
      >
        {typeProducts.map((item) => (
          <ProductTypeItem key={item}>
            <TypeProduct name={item} />
          </ProductTypeItem>
        ))}
      </div>
    </div>
  );
};

export default HeaderComponent;
