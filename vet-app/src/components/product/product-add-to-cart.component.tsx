import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";
import { IProduct } from "models/product.model";
import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface IProp {
  product: IProduct;
  primary?: boolean;
}

const ProductAddToCart: React.FC<IProp> = ({ product, primary = false }) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    removeFromCart,
    decreaseCartQuantity,
  } = useShoppingCart();
  const quantity = getItemQuantity(product.id);
  return (
    <>
      {quantity === 0 ? (
        <Button
          type={primary ? "primary" : "default"}
          size="middle"
          style={{ borderRadius: 15 }}
          onClick={() => increaseCartQuantity(product.id)}
        >
          <Space
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PlusOutlined />
            <span>Add To Cart</span>
          </Space>
        </Button>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "0.5rem",
            }}
          >
            <Button
              icon={<FiMinus />}
              size="small"
              onClick={() => decreaseCartQuantity(product.id)}
            />
            <small>
              <Typography.Title level={5} style={{ display: "inline" }}>
                {quantity}
              </Typography.Title>{" "}
              in cart
            </small>
            <Space
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              size={"small"}
            >
              <Button
                icon={<FiPlus />}
                size="small"
                onClick={() => increaseCartQuantity(product.id)}
              />
              <Button
                size="small"
                type="primary"
                onClick={() => removeFromCart(product.id)}
              >
                <DeleteOutlined />
              </Button>
            </Space>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductAddToCart;
