import axios from "axios";
import moment from "moment";
import { toCapitalCase } from "../utils/utilFunctions";

// Access information
const accessToken =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYiI6IlozVlhWaGdsQTFReHpSVUsrU21oIiwianRpIjoiYWNjdG9rXzAwMDBBV3BSbVlpQjFYMXB0b2xGRlQiLCJ0eXAiOiJhdCIsInYiOiI2In0.Qcc1c05XLzAqG7OvYLKoT7n4B050NrNXac4y29vaxizerGMK15c4w1TZilX5Dej54rvojb-YTubwGykU5iiP0Q"
const apiBaseUrl = "https://api.monzo.com";

function resolveTransaction(e, subsNames = ["Apple", "VOXI", 'AMERICAN EXP 3773']) {
  const tname = e.merchant?.name ?? e.counterparty?.name ?? e.description;
  let category = toCapitalCase(e.category);
  if (tname === "pot_0000A7Hp65O8I7e9PKCTMv") return;
  if (category === "Bills") {
    category = subsNames.includes(tname)
      ? "Subscriptions"
      : e.notes.toLowerCase().includes("rent") || e.amount === 1050
      ? "Rent"
        : category;
  }
  if (tname === 'AMERICAN EXP 3773') category = 'Expenses';
  if (tname.toLowerCase().includes('sophie thompson') && e.notes.toLowerCase().includes("splitwise")) category = 'Bills'
  return {
    key: e.id,
    name: tname,
    amount: e.amount / 100,
    date_created: moment(e.created).format("D MMM, YYYY"),
    category: category,
    notes: e.notes,
    logo: e.merchant?.logo && (e.merchant?.logo).includes('.png') ? e.merchant?.logo : e.merchant?.emoji
  };
}

// Function to retrieve transactions
export default async function getAllTransactions(month='05') {
  const transactions = [];
  const categories = new Set();

  try {
    const startDate = moment(`2023-${month}-01`).startOf("month").format("YYYY-MM-DD");
    const endDate = moment(`$2023-${month}-01`).endOf("month").format("YYYY-MM-DD");

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

    for (const e of response.data.transactions) {
      if (e.decline_reason || e.amount === 0) {
        continue;
      }
      const t = resolveTransaction(e);
      if (!t) continue;
      categories.add(t.category);
      transactions.push(t);
    }
  } catch (error) {
    console.error("Error retrieving data:", error.response.data);
  }

  return [transactions, [...categories]];
}
