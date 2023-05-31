import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  PoundOutlined,
  PieChartOutlined,
  CalendarOutlined,
  TagsOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const items = [
  {
    label: "This Month",
    key: "dashboard",
    icon: <CalendarOutlined />,
    path: "/",
  },
  {
    label: "Expenses",
    key: "expenses",
    icon: <TagsOutlined />,
    path: "/expenses",
  },
  {
    label: "Income",
    key: "income",
    icon: <PoundOutlined />,
    path: "/income",
  },
  {
    label: "Budget",
    key: "budget",
    icon: <PieChartOutlined />,
    path: "/budgets",
  },
];

const Navbar = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const onClick = (e) => {
    setCurrent(e.key);
  };
  
  // TODO: Need to make a better logo
  return (
    <>
      <div style={{float: 'left', margin: 5}}>
        <BankOutlined style={{ color: 'white', fontSize: 35}}/>
      </div>
      <div className="heading"> WealthWise </div>
      <Menu
        style={{
          justifyContent: "end",
        }}
        onClick={onClick}
        selectedKeys={[current]}
        theme="dark"
        mode="horizontal"
      >
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <NavLink to={item.path}>{item.label}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};

export default Navbar;
