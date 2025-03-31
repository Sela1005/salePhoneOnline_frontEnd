import React, { useEffect, useState } from "react";
import { Row, Col, Select } from "antd"; 
import { MainContainer, FilterByCriteriaStyle, WapperProduct } from "./style";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../hooks/useDebounce";
import { useSelector } from "react-redux";
import * as ProductService from "../../services/ProductServices";
import ProductFactory from "../../factories/ProductFactory.jsx";  // Import Factory
import Loading from "../../components/LoadingComponent/Loading";
import Footer from "../../components/Footer/Footer";

const ProductsPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(25);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const [sortOrder, setSortOrder] = useState("none");

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const sort = sortOrder === "none" ? null : sortOrder;
    const res = await ProductService.getAllProduct(search, limit, sort);
    return res;
  };

  const { isLoading, data: products } = useQuery({
    queryKey: ["products", limit, searchDebounce, sortOrder],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

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
            style={{
              width: 240,
            }}
            onChange={handleChange}
            options={[
              {
                value: "none",
                label: "Không",
              },
              {
                value: "desc",
                label: "Cao đến Thấp",
              },
              {
                value: "asc",
                label: "Thấp đến cao",
              },
            ]}
          />
        </div>
      </div>

      <Loading isPending={isLoading || loading}>
        <WapperProduct>
          {products?.data?.map((product) => {
            return (
              <ProductFactory key={product._id} product={product} />  // Sử dụng Factory ở đây
            );
          })}
        </WapperProduct>
        <Footer />
      </Loading>
    </MainContainer>
  );
};

export default ProductsPage;
