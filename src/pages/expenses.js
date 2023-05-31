import { Row, Col, Typography, Tag, Table } from "antd";
import { PieChartFilled, UnorderedListOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import PieComponent from "../components/pieChart";
import { getTotalExpenses } from "../utils/helperFuncs";

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
          color: amount < 0 ? "green" : "red",
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

const getComponents = (columnMetadata, expensesData, categoryColors, totalExpenses) => [
  {
    key: '1',
    name: "Expenses List",
    icon: <UnorderedListOutlined/>,
    component: <Table columns={columnMetadata} dataSource={expensesData} size={"middle"} />
  },
  {
    key: '2',
    name: "Total Expenses",
    icon: <PieChartFilled/>,
    component: <PieComponent colors={categoryColors} data={totalExpenses} />
  }
]

// TODO: Refactor to remove redundancy between expenses and incomes
function Expenses({ categoryColors, expensesData }) {
  console.log("category", categoryColors);
  const columnMetadata = getColumnMetadata(categoryColors);
  const totalExpenses = getTotalExpenses(expensesData);
  console.log("total", totalExpenses);

  return (
    <>
      <Row align="middle" justify="center">
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
            EXPENSES
          </Typography>
        </Col>
        <Col span="18" style={{ alignSelf: "center" }}>
          {/* <Table columns={columnMetadata} dataSource={expensesData} />; */}
          <Tabs
            defaultActiveKey="1"
            // centered
            items={getComponents(columnMetadata, expensesData, categoryColors, totalExpenses).map((comp) => {
              return {
                label: (
                  <span>
                    {comp.icon}
                    {comp.name}
                  </span>
                ),
                key: comp.key,
                children: comp.component ,
              };
            })}
          />
        </Col>
      </Row>
    </>
  );
}

export default Expenses;
