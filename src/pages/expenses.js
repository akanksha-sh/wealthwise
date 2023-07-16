import { Row, Col } from "antd";
import { PieChartFilled, UnorderedListOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import SpendingPie from "./subpages/spendingPie";
import TableWrapper from "./subpages/tableWrapper";

const getComponents = (data, categoryColors, totals) => [
  {
    key: '1',
    name: "Overview",
    icon: <PieChartFilled/>,
    component: <SpendingPie colors={categoryColors} totalExpenses={totals} />
  },
  {
    key: '2',
    name: "Transactions",
    icon: <UnorderedListOutlined/>,
    component: <TableWrapper colors={categoryColors} datasource={data} />
  },
]

// TODO: Refactor to remove redundancy between expenses and incomes
function Spending({ categoryColors, transactionData, totalExpenses }) {
  return (
    <>
      <Row align="stretch" justify="center" style={{height: '100%'}}>
        <Col span="22">
          <Tabs
            defaultActiveKey="1"
            items={getComponents(transactionData, categoryColors, totalExpenses).map((comp) => {
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

export default Spending;
