import { Row, Col, Typography } from "antd";

function Dashboard() {
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
              fontWeight: 700,
              letterSpacing: 12,
              writingMode: "vertical-lr",
              transform: "rotate(-180deg)",
              WebkitTextFillColor: "white",
              textShadow: "0 0 6px rgba(0, 0, 0, 1)",
            }}
          >
            THIS MONTH
          </Typography>
        </Col>
        <Col span="6" style={{ alignSelf: "center" }}>
          {/* <List
            itemLayout="horizontal"
            dataSource={budgetData}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: ColorList[index],
                        verticalAlign: "middle",
                      }}
                      size='large'
                    >
                      {item.category[0]}
                    </Avatar>
                  }
                  title={item.category}
                  description={`£${item.amount}`}
                />
              </List.Item>
            )}
          /> */}
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
