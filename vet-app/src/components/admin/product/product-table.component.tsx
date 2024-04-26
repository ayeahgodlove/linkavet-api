import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Input, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useProduct } from "hooks/product.hook";
import { NoContent } from "components/shared/no-content/no-content.component";
import { useDispatch } from "react-redux";
import search from "utils/search";
import { fetchproductSuccess } from "redux/product.slice";
import { SpinnerComponent } from "components/shared/spinner";
import { useProductColumn } from "./product-column.component";
import { IProduct } from "models/product.model";
import slugify from "slugify";
import { API_URL } from "config/constant";

const { Search } = Input;

const ProductTable: React.FC = () => {
  const { products, setProduct, initialFetch } = useProduct();
  const router = useNavigate();
  const { productTableColumns } = useProductColumn()

  const [query, setQuery] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const createProduct = () => {
    navigate("/admin/products/create")
  };


  const getProducts = useCallback(async (): Promise<IProduct[]> => {
    setLoading(true);
    const response = await fetch(`${API_URL}/api/products`);
    const { data } = await response.json();
    return data;
  }, []);

  const resultProducts: IProduct[] = products.filter((client) =>
    search(client, ["name", "amount", "shortDescription"], query, false)
  );

  const onChange = (query: any) => {
    setQuery(query.target.value);
  };

  const { Paragraph } = Typography;

  const inputRef = useRef(null);

  // const route = use
  const handleRowClick = (product: IProduct) => {
    setProduct(product);
    router(`/admin/products/${slugify(product.name,"-")}`);
  };

  useEffect(() => {
    (async () => {
      const productDATas = await getProducts();
      dispatch(fetchproductSuccess([...productDATas]));
      setLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SpinnerComponent message="Products loading..." height="65vh" />;
  }

  return (
    <>
      {products && products.length ? (
        <Card
          title={
            <Col xs={24} md={10} lg={6}>
              <Search
                placeholder="Search by name"
                onChange={(banner) => onChange(banner)}
              />
            </Col>
          }
          bordered={false}
          size="small"
        >
          <Table<IProduct>
            dataSource={
              resultProducts && resultProducts.length > 0
                ? resultProducts
                : products
            }
            columns={productTableColumns}
            style={{ borderRadius: 0 }}
            size={"small"}
            rowKey={"id"}
            onRow={(record: IProduct) => {
              return {
                onClick: (e) => {
                  console.log(e);
                  handleRowClick(record);
                },
              };
            }}
            ref={inputRef}
          />
        </Card>
      ) : (
        <NoContent
          title="No data for product"
          showButton={true}
          buttonLabel="Add Product"
          handleClick={createProduct}
        />
      )}
    </>
  );
};

export default ProductTable;
