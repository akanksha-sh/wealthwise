import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Col, Progress, Row, Statistic } from "antd";

const Stats = ({ moneyIn, moneyOut }) => {
  const savings = moneyIn - moneyOut;
  return (
    <>
      <Row gutter={16} style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Col span={11}>
          <Card bordered={true}>
            <Statistic
              title="Money In"
              value={`£${moneyIn.toFixed(0)}`}
              precision={2}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<PlusOutlined />}
            />
          </Card>
        </Col>
        <Col span={13}>
          <Card bordered={true}>
            <Statistic
              title="Money out"
              value={`£${moneyOut.toFixed(0)}`}
              precision={2}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<MinusOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Col span={16}>
          <Progress
            percent={50}
            size={[300, 15]}
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
          />
        </Col>
        <Col span={6} offset={1}>
          Days left
        </Col>
      </Row>
      <Row gutter={16} style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Col span={11}>
          <Card bordered={true}>
            <Statistic
              title="Savings"
              value={`£${Math.abs(savings).toFixed(0)}`}
              precision={2}
              valueStyle={{
                color: "blue",
              }}
              prefix={savings > 0 ? <PlusOutlined /> : <MinusOutlined/>}
            />
          </Card>
        </Col>
        <Col span={13}>
          <Card bordered={true}>
            <Statistic
              title="Budget"
              value={`£${moneyOut.toFixed(0)}`}
              precision={2}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<MinusOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Stats;
