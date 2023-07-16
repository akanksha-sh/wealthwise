import { Avatar, List, Row, Col, Progress } from "antd";
import React, { useEffect, useState } from "react";
import PieComponent from "../components/pieChart";
import { readBudgets } from "../handles/firestoreFunctions";

function augmentData(budgetData, totalExpenses) {
  return budgetData.map((b) => ({
    ...b,
    total:
      totalExpenses.find((e) => e.category === b.category)?.amount * -1 ?? 0,
  }));
}

function adjustColor(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function displayAmount(budget, total, op = "proportion") {
  let val = total;
  const diff = budget - total;
  if (op === "diff") {
    val = diff;
  }
  const color = val < 0 ? "red" : "green";
  val = val < 0 ? `- £${(val * -1).toFixed(0)}` : `£${val.toFixed(0)}`;
  if (op === "diff") {
    val = diff < 0 ? `${val} Over` : `+ ${val} Left`;
  } else {
    val = `${val} / £${budget}`;
  }
  return { val, color };
}
function Budgets({ categoryColors, totalExpenses }) {
  const [budgetData, setBudgetData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await readBudgets("budget");
        const augData = augmentData(data, totalExpenses);
        console.log(augData);
        setBudgetData(augData);
      } catch (error) {
        console.error("Error fetching budget data:", error);
      }
    }
    fetchData();
  }, [totalExpenses]);

  return (
    <>
      <Row align="stretch" justify="center" style={{ height: "100%" }}>
        <Col span="9" offset={1} style={{ alignSelf: "center" }}>
          <List
            itemLayout="horizontal"
            dataSource={budgetData}
            renderItem={(item, _) => (
              <List.Item style={{ paddingBottom: 0, paddingTop: 7 }}>
                <List.Item.Meta
                  style={{ paddingBottom: 3, paddingTop: 5 }}
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
                  title={
                    <Row>
                      <Col span={18}>{item.category}</Col>
                      <Col
                        span={6}
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {displayAmount(item.amount, item.total).val}
                      </Col>
                    </Row>
                  }
                  description={
                    <Row>
                      <Col span={18}>
                        <Progress
                          percent={((item.total / item.amount) * 100).toFixed(
                            0
                          )}
                          size={[320, 10]}
                          strokeColor={{
                            "0%": adjustColor(
                              categoryColors[item.category],
                              -50
                            ),
                            "50%": categoryColors[item.category],
                            "100%": adjustColor(
                              categoryColors[item.category],
                              50
                            )
                          }}
                        />
                      </Col>
                      <Col
                        span={6}
                        style={{
                          textAlign: "center",
                          fontWeight: 500,
                          color: displayAmount(item.amount, item.total, "diff")
                            .color,
                        }}
                      >
                        {displayAmount(item.amount, item.total, "diff").val}
                      </Col>
                    </Row>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span="12" offset="1" style={{ alignSelf: "center" }}>
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
