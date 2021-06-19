import React from "react";
import { Typography } from "antd";
import ErrorImg from "../assets/images/404-img.png";

const { Title } = Typography;

export default function () {
  return (
    <section style={{ height: "90vh", width: "100vw", verticalAlign: "middle", display: "table-cell" }}>
      <img src={ErrorImg} alt="Error 404" />
      <Title level={3}>SORRY, PAGE NOT FOUND</Title>
    </section>
  );
}
