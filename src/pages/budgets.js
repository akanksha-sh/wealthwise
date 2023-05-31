import { Avatar, List, Row, Col, Typography } from "antd";
import React, { useEffect, useState } from "react";
import PieComponent from "../components/pieChart";
import { readBudgets } from "../handles/firestoreFunctions";

function Budgets({ categoryColors }) {
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await readBudgets("budget");
        setBudgetData(data);
      } catch (error) {
        console.error("Error fetching budget data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Row
        align="stretch"
        justify="center"
        gutter={20}
        style={{ height: "100%" }}
      >
        <Col span="4" offset={1} style={{ alignSelf: "center" }}>
          <Typography
            style={{
              fontSize: "80px",
              fontWeight: 500,
              letterSpacing: 12,
              writingMode: "vertical-lr",
              transform: "rotate(-180deg)",
              WebkitTextFillColor: "white",
              textShadow: "0 0 6px rgba(0, 0, 0, 1)",
            }}
          >
            BUDGETS
          </Typography>
        </Col>
        <Col span="6" style={{ alignSelf: "center" }}>
          <List
            itemLayout="horizontal"
            dataSource={budgetData}
            renderItem={(item, _) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: categoryColors[item.category],
                        verticalAlign: "middle",
                      }}
                      size="large"
                    >
                      {item.category[0]}
                    </Avatar>
                  }
                  title={item.category}
                  description={`£${item.amount}`}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span="13" style={{ alignSelf: "center" }}>
          {" "}
          <PieComponent
            colors={categoryColors}
            data={budgetData}
            view="budget"
          />
        </Col>
      </Row>
    </>
  );
}

export default Budgets;
