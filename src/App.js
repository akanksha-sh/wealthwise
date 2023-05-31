import "./App.css";
import { Layout, theme } from "antd";
import Navbar from "./components/navbar";
import Budgets from "./pages/budgets";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import React, { useEffect, useState } from "react";
import Expenses from "./pages/expenses";
import getAllTransactions from "./handles/dataloader";
import { getCategoryColors } from "./handles/firestoreFunctions";
import IncomeTable from "./pages/incomesTable";

const { Header, Content, Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [categoryColors, setCategoryColors] = useState({});
  const [expensesData, setExpensesData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [expenses, incomes, categories] = await getAllTransactions();
        setExpensesData(expenses);
        setIncomeData(incomes);
        const cc = await getCategoryColors(categories);
        setCategoryColors(cc);
      } catch (error) {
        console.error("Error fetching category color data:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <Layout className="layout">
      <Header style={{ position: "sticky", zIndex: 1 }}>
        <Navbar />
      </Header>
      <Content
        style={{
          padding: "20px 20px",
          background: colorBgContainer,
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/expenses"
            element={
              <Expenses
                categoryColors={categoryColors}
                expensesData={expensesData}
              />
            }
          />
          <Route
            path="/income"
            element={
              <IncomeTable
                categoryColors={categoryColors}
                incomeData={incomeData}
              />
            }
          />
          <Route
            path="/budgets"
            element={<Budgets categoryColors={categoryColors} />}
          />
        </Routes>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        WealthWise ©2023 Created by Aki S.
      </Footer>
    </Layout>
  );
}

export default App;
