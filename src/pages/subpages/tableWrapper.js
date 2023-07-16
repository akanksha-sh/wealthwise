import { Avatar, Table, Tag } from "antd";
import { getInitials } from "../../utils/utilFunctions";

const getColumnMetadata = (categoryColors) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, record) => {
      const comp = record.logo?.includes(".png") ? (
        <Avatar src={<img src={record.logo} alt="icon" />} />
      ) : record.logo ? (
        <Avatar
          style={{
            backgroundColor: "white",
            lineHeight: "25px",
            border: `4px solid ${categoryColors[record.category]}`,
          }}
        >
          {record.logo}
        </Avatar>
      ) : (
        <Avatar style={{ backgroundColor: categoryColors[record.category] }}>
          {getInitials(record.name)}
        </Avatar>
      );
      return (
        <>
          {comp}
          <span
            style={{
              marginLeft: 10,
            }}
          >
            {record.name}
          </span>
        </>
      );
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (amount) => {
      let tamount = amount;
      if (amount < 0) {
        tamount *= -1;
        tamount = tamount.toFixed(2);
      } else {
        tamount = tamount.toFixed(2);
        tamount = "+" + tamount;
      }
      return (
        <span
          style={{
            fontWeight: 700,
            color: amount < 0 ? "black" : "green",
          }}
        >
          {tamount}
        </span>
      );
    },
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
  {
    title: "Date Created",
    dataIndex: "date_created",
    key: "date_created",
    sorter: (a, b) => new Date(a.date_created) - new Date(b.date_created),
  },
];

function TableWrapper({ colors, datasource }) {
  const columnMetadata = getColumnMetadata(colors);

  return (
      <Table columns={columnMetadata} dataSource={datasource} size={"small"} />
  );
}
export default TableWrapper;
