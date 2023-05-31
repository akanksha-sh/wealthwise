import { Row, Col, Typography, Table, Tag } from "antd";

const getColumnMetadata = (categoryColors) => [
  {
    title: "Date Created",
    dataIndex: "date_created",
    key: "date_created",
    sorter: (a, b) => new Date(a.date_created) - new Date(b.date_created),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (amount) => (
      <span
        style={{
          fontWeight: 700,
          color: amount < 0 ? "red" : "green",
        }}
      >
        {amount}
      </span>
    ),
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (_, record) => (
      <Tag color={categoryColors[record.category]} key={record.category}>
        {record.category}
      </Tag>
    ),
  },
];

// TODO: Refactor to remove redundancy
function IncomeTable({ categoryColors, incomeData }) {
  const columnMetadata = getColumnMetadata(categoryColors);

  return (
    <>
      <Row align="middle" justify="center" style={{ height: "100%" }}>
        <Col span="3" style={{ alignSelf: "center" }}>
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
            INCOME
          </Typography>
        </Col>
        <Col span="18" style={{ alignSelf: "center" }}>
          <Table columns={columnMetadata} dataSource={incomeData} />;
        </Col>
      </Row>
    </>
  );
}

export default IncomeTable;
