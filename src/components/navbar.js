import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  PieChartOutlined,
  CalendarOutlined,
  TagsOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const items = [
  {
    label: "This Month",
    key: "home",
    icon: <CalendarOutlined />,
    path: "/",
  },
  {
    label: "Spending",
    key: "spending",
    icon: <TagsOutlined />,
    path: "/spending",
  },
  // {
  //   label: "Savings",
  //   key: "savings",
  //   icon: <PoundOutlined />,
  //   path: "/savings",
  // },
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
