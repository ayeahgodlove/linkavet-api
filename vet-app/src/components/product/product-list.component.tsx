import { Card, Typography, Input, Space, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useProduct } from "hooks/product.hook";
import { ProductService } from "services/product.service";
import { fetchproductSuccess } from "redux/product.slice";
import { IProduct } from "models/product.model";
import search from "utils/search";
import { FiGrid, FiList } from "react-icons/fi";
import ButtonGroup from "antd/es/button/button-group";
import useWindowSize from "hooks/shared/window-resize.hook";
import GridView from "./product-card-grid.component";
import ListView from "./product-list-view.component";

const { Search } = Input;

const ProductList: React.FC = () => {
  const { products } = useProduct();
  const [query, setQuery] = useState<string>("");
  const [view, setView] = useState("grid");

  const { width } = useWindowSize();
 
  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const onClickGrid = () => {
    setView("grid");
  };
  const onClickList = () => {
    setView("list");
  };

  const resultProducts: IProduct[] =
    products && products.length
      ? products.filter((product) => search(product, ["name"], query, false))
      : [];

  useEffect(() => {
    const getProducts = async () => {
      const products = await ProductService.list();
      fetchproductSuccess(products.data);
      return products;
    };

    getProducts();
  }, []);

  return (
    <>
      <Card
        bordered={true}
        title={
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {width >= 768 && (
                <Space>
                  {width >= 768 ? (
                    <span>Showing 1- 40 products of 1,000</span>
                  ) : (
                    <>
                      {" "}
                      <Typography.Title level={5}>Products</Typography.Title>
                      <Typography.Text>
                        (Showing 1- 40 products of 1,000)
                      </Typography.Text>
                    </>
                  )}
                </Space>
              )}

              <>
                <Space>
                  <Search
                    placeholder="Search products"
                    onChange={(product) => onChange(product)}
                  />
                  {width >= 768 && (
                    <ButtonGroup>
                      <Button
                        type={view === "list" ? "primary" : "ghost"}
                        icon={<FiList size={25} />}
                        onClick={onClickList}
                      />

                      <Button
                        type={view === "grid" ? "primary" : "ghost"}
                        icon={<FiGrid size={25} />}
                        onClick={onClickGrid}
                      />
                    </ButtonGroup>
                  )}
                </Space>
              </>
            </div>
          </>
        }
        style={{ marginBottom: 20 }}
        bodyStyle={{ background: "#f4f7fe" }}
        size="small"
      >
        {view === "grid" ? (
          <GridView products={products} resultProducts={resultProducts} />
        ) : (
          <ListView products={products} resultProducts={resultProducts} />
        )}
      </Card>
    </>
  );
};

export default ProductList;
