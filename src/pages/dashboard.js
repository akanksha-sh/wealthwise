import { Row, Col } from "antd";
import { DatePicker } from "antd";

function Dashboard({ selectedMonth, setSelectedMonth }) {
  return (
    <>
      <Row
        align="stretch"
        justify="center"
        gutter={20}
        style={{ height: "100%" }}
      >
        <Col span="4" offset={1} style={{ alignSelf: "center" }}>
          <DatePicker
            value={selectedMonth}
            onChange={(date) => setSelectedMonth(date)}
            picker="month"
          />
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
