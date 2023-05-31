export function toCapitalCase(str) {
    str = str.replace(/_/g, " ");
    return str.replace(/\b\w/g, function (match) {
      return match.toUpperCase();
    });
}
  
export function aggregate(data, cols=[], vals=[]) {
    // TODO: Use lodash partition, assert that length cols= vals) 
    const remainingData = data.filter((item) => {
        return cols.every((c, index) => item[c] !== vals[index]) 
    })
    const filterData = data.filter((item) => {
        return cols.every((c, index) => item[c] === vals[index]) 
    })

    // TODO: JUST wrong !!! fix it by removing dependency on category 
    const aggregatedData = Object.values(filterData.reduce((accumulator, obj) => {
        const { category, amount, date_created, key, name, notes} = obj;
        if (!accumulator[name]) {
          accumulator[name] = { category, date_created, key, name, notes, amount: 0.00 };
        }
        accumulator[name].amount += parseFloat(amount);

        return accumulator;
      }, {}));

    return [...remainingData, ...aggregatedData]
}

export const getTotalExpenses = (data) => {
  const aggregatedData = Object.values(
    data.reduce((accumulator, obj) => {
      const { category, amount } = obj;
      if (!accumulator[category]) {
        accumulator[category] = { category, amount: 0.0 };
      }
      accumulator[category].amount += parseFloat(amount);

      return accumulator;
    }, {})
  );
  return aggregatedData;
};
