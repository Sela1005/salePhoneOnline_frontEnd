// src/pages/ProductsPage.jsx
import React, { useState } from "react";
import { Select } from "antd";
import { MainContainer, WapperProduct } from "./style";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../hooks/useDebounce";
import { useSelector } from "react-redux";
import * as ProductService from "../../services/ProductServices";
import CardComponent from "../../components/CardComponent/CardComponent";
import Loading from "../../components/LoadingComponent/Loading";
import Footer from "../../components/Footer/Footer";
import ProductIterator from "../../Pattern/ProductIterator"; // Import Iterator

const ProductsPage = () => {
  // Lấy giá trị tìm kiếm từ Redux store
  const searchProduct = useSelector((state) => state?.product?.search);
  const [loading, setLoading] = useState(false);
  const [limit] = useState(25);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const [sortOrder, setSortOrder] = useState("none");

  // Hàm fetch dữ liệu sản phẩm từ API
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const sort = sortOrder === "none" ? null : sortOrder;
    const res = await ProductService.getAllProduct(search, limit, sort);
    return res;
  };

  // Sử dụng React Query để gọi API lấy danh sách sản phẩm
  const { isLoading, data: products } = useQuery({
    queryKey: ["products", limit, searchDebounce, sortOrder],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  // Xử lý thay đổi giá trị sắp xếp từ Select
  const handleChange = (value) => {
    setSortOrder(value);
  };

  return (
    <MainContainer>
      <div style={{ display: "flex", gap: "30px" }}>
        <div style={{ width: "240px" }}>
          <div style={{ padding: "10px" }}>
            <span>Lọc sản phẩm theo giá: </span>
          </div>
          <Select
            defaultValue="none"
            style={{ width: 240 }}
            onChange={handleChange}
            options={[
              { value: "none", label: "Không" },
              { value: "desc", label: "Cao đến Thấp" },
              { value: "asc", label: "Thấp đến cao" },
            ]}
          />
        </div>
      </div>

      <Loading isPending={isLoading || loading}>
        <WapperProduct>
          {(() => {
            // Sử dụng Iterator để duyệt qua danh sách sản phẩm
            const iterator = new ProductIterator(products?.data || []);
            const renderedProducts = [];
            while (iterator.hasNext()) {
              const product = iterator.next();
              renderedProducts.push(
                <CardComponent
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  selled={product.selled}
                  id={product._id}
                />
              );
            }
            return renderedProducts;
          })()}
        </WapperProduct>
        <Footer />
      </Loading>
    </MainContainer>
  );
};

export default ProductsPage;
