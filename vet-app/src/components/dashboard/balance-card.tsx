import React, { useState } from "react";

import { Col, Row } from "antd";
import Chart from "react-apexcharts";

export default function BalanceCard() {
  const [data] = useState<any>({
    series: [
      {
        name: "Balance",
        data: [
          28877, 29334, 33233, 36439, 32675, 32333, 33457, 38345, 36783, 39457,
          22459, 39840,
        ],
      },
    ],
    options: {
      chart: {
        fontFamily: "Manrope, sans-serif",
        type: "bar",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      labels: {
        style: {
          fontSize: "14px",
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        borderColor: "#B2BEC3",
        row: {
          opacity: 0.5,
        },
        // opacity: 1,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 2,
          columnWidth: "45%",
          endingShape: "rounded",
          colors: {
            backgroundBarColors: ["#0063F7", "#00F7BF"],
            backgroundBarOpacity: 0.2,
          },
        },
      },
      fill: {
        opacity: 1,
        colors: ["#2D3436"],
      },
      stroke: {
        show: true,
        width: 4,
        colors: ["transparent"],
      },
      xaxis: {
        axisTicks: {
          show: false,
          borderType: "solid",
          color: "#78909C",
          height: 6,
          offsetX: 0,
          offsetY: 0,
        },
        tickPlacement: "between",
        labels: {
          style: {
            colors: [
              "#B2BEC3",
              "#B2BEC3",
              "#B2BEC3",
              "#B2BEC3",
              "#B2BEC3",
              "#B2BEC3",
              "#B2BEC3",
              "#B2BEC3",
              "#B2BEC3",
              "#B2BEC3",
              "#B2BEC3",
              "#B2BEC3",
            ],
            fontSize: "12px",
          },
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        horizontalAlign: "right",
        offsetX: 40,
        position: "top",
        markers: {
          radius: 12,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: ["#636E72"],
            fontSize: "14px",
          },
          formatter: (value) => {
            return value == "0" ? value / 1000 : value / 1000 + "K";
          },
        },
        min: 0,
        max: 60000,
        tickAmount: 4,
      },
    },
  });

  return (
    <Row justify={"center"}>
      <Col span={24} className="hp-mb-18">
        <Row align="middle" justify="space-between">
          <Col>
            <span className="hp-d-block hp-p1-body">Total Sales </span>
            <span className="hp-d-block hp-mt-4 h3 hp-font-weight-600 hp-text-color-black-bg hp-text-color-dark-0">
              12.389 XAF
            </span>
          </Col>

          <Col>
            <span className="hp-p1-body hp-d-block">Past 30 Days</span>
          </Col>
        </Row>
      </Col>

      <Col span={24} className="hp-overflow-hidden">
        <Chart
          options={data.options!}
          series={data.series}
          type="bar"
          width="100%"
          height={250}
          legend="legend"
        />
      </Col>
    </Row>
  );
}
