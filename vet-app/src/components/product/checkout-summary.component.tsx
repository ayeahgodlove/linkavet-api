import { Typography } from "antd";
import { useProduct } from "hooks/product.hook";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";
import React from "react";
import { PiEqualsLight } from "react-icons/pi";
import { TiTimes } from "react-icons/ti";

const CheckoutSummaryComponent: React.FC = () => {
  const { products } = useProduct();
  const { cartItems, findMatchingProducts, cartQuantity } = useShoppingCart();
  const matchingProducts = findMatchingProducts(products, cartItems);

  return (
    <>
      {matchingProducts && matchingProducts.length > 0 ? (
        <>
          <Typography.Title
            style={{ marginBottom: 0, opacity: 0.78 }}
            level={5}
          >
            Summary Details:{" "}
          </Typography.Title>
          {matchingProducts.map((prod) => (
            <Typography.Paragraph
              key={prod.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span>Unit Price ({prod.name})</span> <PiEqualsLight />{" "}
              <span>{prod.amount + "XAF"}</span>
            </Typography.Paragraph>
          ))}
          <Typography.Paragraph
            style={{ display: "flex", alignItems: "center" }}
          >
            <span>Total Qtty</span> <PiEqualsLight />{" "}
            <span>{cartQuantity}</span>
          </Typography.Paragraph>
        </>
      ) : (
        <></>
      )}

      <Typography.Title style={{ marginBottom: 0, opacity: 0.78 }} level={5}>
        Total Amount:{" "}
      </Typography.Title>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Typography.Text
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span>Unit Price</span> <TiTimes /> <span>Quantity</span>
        </Typography.Text>

        <Typography.Title
          style={{
            marginBottom: 0,
            marginTop: 0,
            display: "flex",
            alignItems: "center",
          }}
          level={4}
        >
          <PiEqualsLight />{" "}
          <span>
            {matchingProducts.map((p) => p.amount).reduce((a, b) => a + b) *
              cartQuantity || 0}{" "}
            {" XAF"}
          </span>
        </Typography.Title>
      </div>
    </>
  );
};

export default CheckoutSummaryComponent;
