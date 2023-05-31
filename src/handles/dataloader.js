import axios from "axios";
import moment from "moment";
import { aggregate, toCapitalCase } from "../utils/helperFuncs";

// Access information
const accessToken =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYiI6InFMZDdiemViTHpEdWNndVUyMWpBIiwianRpIjoiYWNjdG9rXzAwMDBBV0RpaGFmU2RkbWhlOEpIYlYiLCJ0eXAiOiJhdCIsInYiOiI2In0._TunYTLOMN5K61zlVUVCIb2kh0xLcGOYKqu0hvoUmRnEPFtZZ02z6IkqC1ng-91CPSca9uAkdPZgAMydkyJTdA";

const apiBaseUrl = "https://api.monzo.com";

const transformations = [
  {
    column: "name",
    oldVal: "pot_0000A7Hp65O8I7e9PKCTMv",
    newVal: "Monzo Savings Pot",
  },
];

function transformExpensesData(data) {
  for (const de of data) {
    de.amount = de.amount.toFixed(2);
    if (de.category !== "Bills") {
      continue;
    }
    const subsNames = ["Apple", "VOXI"];
    const note = de.notes.toLowerCase();
    if (subsNames.includes(de.name) || note.includes("subscription")) {
      de.category = "Subscriptions";
    } else if (note.includes("rent") || de.amount === "1050.00") {
      de.category = "Rent";
    }
  }
  return data;
}

const transformIncomeData = (data) => {
  const aggregatedData = aggregate(
    data,
    transformations.map(({ column }) => column),
    transformations.map(({ oldVal }) => oldVal)
  );
  const { column, oldVal, newVal } = transformations[0];
  for (const de of aggregatedData) {
    if (de[column] === oldVal) {
      de.amount *= -1;
      de[column] = newVal;
    }
    de.amount = de.amount.toFixed(2);
  }
  return aggregatedData;
};

function transformAmount(num, isIncome) {
  num = isIncome ? num : num * -1
  return (num / 100);
}

function transformDate(date) {
  return moment(date).format("D MMM, YYYY");
}


// Function to retrieve expenses data
export default async function getAllTransactions() {
  const expenses = [];
  const incomes = [];
  const categories = new Set();

  try {
    const currentDate = moment();
    const startDate = currentDate.startOf("month").format("YYYY-MM-DD");
    const endDate = currentDate.endOf("month").format("YYYY-MM-DD");
    // Make API request to retrieve transactions
    const response = await axios.get(`${apiBaseUrl}/transactions`, {
      params: {
        account_id: "acc_0000A7FPj7EIOQUBhFzfve",
        expand: ["merchant"],
        since: startDate,
        before: endDate,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // Process and display expenses data
    for (const e of response.data.transactions) {
      const tranformedCategory = toCapitalCase(e.category);
      categories.add(tranformedCategory);
      const target =
        tranformedCategory === "Savings" || tranformedCategory === "Income"
          ? incomes
          : expenses;
      if (e.decline_reason || e.amount === 0) {
        continue;
      }
      target.push({
        key: e.id,
        name: e.merchant?.name ?? e.counterparty?.name ?? e.description,
        amount: transformAmount(e.amount, target === incomes),
        date_created: transformDate(e.created),
        category: tranformedCategory,
        notes: e.notes
      });
    }
  } catch (error) {
    console.error("Error retrieving data:", error.response.data);
  }

  return [transformExpensesData(expenses), transformIncomeData(incomes), [...categories]];
}
