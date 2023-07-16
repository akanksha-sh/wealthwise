import "./App.css";
import { Layout, theme } from "antd";
import Navbar from "./components/navbar";
import Budgets from "./pages/budgets";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import React, { useEffect, useState } from "react";
import Spending from "./pages/expenses";
import getAllTransactions from "./handles/dataloader";
import { getCategoryColors } from "./handles/firestoreFunctions";
import { getTotalExpenses } from "./utils/utilFunctions";
import moment from "moment";

const { Header, Content, Footer } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [categoryColors, setCategoryColors] = useState({});
  const [transactionData, setTransactionData] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment());

  useEffect(() => {
    async function fetchData() {
      try {
        const [transactions, categories] = await getAllTransactions();
        setTransactionData(transactions);
        const cc = await getCategoryColors(categories);
        setCategoryColors(cc);
      } catch (error) {
        console.error("Error fetching category color data:", error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    const totals = getTotalExpenses(transactionData); 
    setTotalExpenses(totals);
      
  }, [transactionData]);
  return (
    <Layout className="layout">
      <Header style={{ position: "sticky", zIndex: 1 }}>
        <Navbar />
      </Header>
      <Content
        style={{
          padding: "30px",
          background: colorBgContainer,
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />} />
          <Route
            path="/spending"
            element={
              <Spending
                categoryColors={categoryColors}
                transactionData={transactionData}
                totalExpenses={totalExpenses}
              />
            }
          />
          {/* <Route
            path="/savings"
            element={
            }
          /> */}
          <Route
            path="/budgets"
            element={<Budgets categoryColors={categoryColors} totalExpenses={totalExpenses} />}
          />
        </Routes>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          padding: 15
        }}
      >
        WealthWise ©2023 Created by Aki S.
      </Footer>
    </Layout>
  );
}

export default App;
