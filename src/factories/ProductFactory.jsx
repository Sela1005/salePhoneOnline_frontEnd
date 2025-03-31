// src/factories/ProductFactory.js
import React from "react";
import CardComponent from "../components/CardComponent/CardComponent";

// Hàm Factory sẽ nhận vào một đối tượng sản phẩm và trả về một CardComponent tương ứng
const ProductFactory = ({ product }) => {
    if (!product) {
        return null; // Nếu không có sản phẩm, trả về null
    }

    const { countInStock, discount, ...otherProps } = product;

    // Logic: Nếu sản phẩm có giảm giá, thêm thông tin giảm giá vào component
    if (discount && countInStock > 0) {
        return (
            <CardComponent
                {...otherProps}
                countInStock={countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                type={product.type}
                selled={product.selled}
            >
                <div style={{ color: "red", fontWeight: "bold" }}>
                    Giảm giá: {discount}%!
                </div>
            </CardComponent>
        );
    }

    // Nếu sản phẩm hết hàng, bạn có thể áp dụng một số logic tùy chỉnh như: giảm opacity hoặc thay đổi nội dung
    if (countInStock === 0) {
        return (
            <CardComponent
                {...otherProps}
                countInStock={countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                type={product.type}
                selled={product.selled}
            >
                <div
                    style={{
                        color: "red",
                        fontSize: "18px",
                        textAlign: "center",
                        fontWeight: "bold",
                        padding: "10px 0",
                    }}
                >
                    Hết hàng
                </div>
            </CardComponent>
        );
    }

    // Trả về card sản phẩm mặc định nếu không có đặc biệt nào
    return (
        <CardComponent
            {...otherProps}
            countInStock={countInStock}
            description={product.description}
            image={product.image}
            name={product.name}
            price={product.price}
            rating={product.rating}
            type={product.type}
            selled={product.selled} />
    );
};

export default ProductFactory;
