import PieComponent from "../../components/pieChart";
import { partition } from "lodash";
import Stats from "../../components/stats";
import { Col, Row } from "antd";

function SpendingPie({ colors, totalExpenses }) {

  const [expenses, savingExpenses] = partition(
    totalExpenses,
    (expense) => expense.amount < 0 && expense.category !== 'Savings'
  );
  const tExpenses = expenses.map((e) => ({
    ...e,
    amount: e.amount * -1,
  }));
  const totalSavings = savingExpenses.reduce((sum, entry) => sum + entry.amount, 0) + 200; // for pension
  const totalSpending = tExpenses.reduce((sum, entry) => sum + entry.amount, 0)
  console.log("savings", savingExpenses);
  return (
    <>
      <Row align="stretch" justify="center" style={{ height: "100%", }}>
        <Col span="13" style={{ alignSelf: "center" }}>
          <PieComponent
            colors={colors}
            data={tExpenses}
            view="spending"
          />
        </Col>
        <Col span="8" offset={2} style={{ alignSelf: "center"}}>
          <Stats moneyIn={totalSavings} moneyOut={totalSpending} />
        </Col>
      </Row>
    </>
  );
}

export default SpendingPie;
