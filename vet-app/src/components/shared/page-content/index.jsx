import React from "react";
import { Breadcrumb, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

export default function PageContent(props) {
  const { title, breadcrumb, desc } = props;

  return (
    <Row justify={"center"}>
      <Col
        span={23}
        style={{
          marginTop: 20,
          marginBottom: 20,
          borderRadius: 15,
          backgroundImage: `url(images/mauricio-fanfa-qoUD1YmMZOM-unsplash.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#212529",
          padding: "2.5rem",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Row justify={"center"} style={{ zIndex: 2 }}>
          {title && (
            <Col span={24}>
              <Typography.Title
                style={{
                  marginTop: "0.75rem",
                  color: "#164502",
                  textTransform: "capitalize",
                }}
              >
                {title}
              </Typography.Title>
            </Col>
          )}

          {breadcrumb && (
            <Col span={24}>
              <Breadcrumb
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: "1.5rem",
                  color: "#091902",
                  fontSize: 17,
                }}
                items={[
                  {
                    title: (
                      <Link to={"/"} style={{ textDecoration: "none" }}>
                        Home
                      </Link>
                    ),
                  },
                  ...breadcrumb.map((item) => {
                    return {
                      title: (
                        <Link to={item.link ? item.link : "#"}>
                          {item.title}
                        </Link>
                      ),
                    };
                  }),
                ]}
              />
            </Col>
          )}

          {desc && (
            <Col span={24}>
              <p className="h5 mt-5 text-dark">{desc}</p>
            </Col>
          )}
        </Row>
        <div
          className="overlay"
          style={{
            backgroundColor: "rgba(243, 243, 243, 0.2)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></div>
      </Col>
    </Row>
  );
}
