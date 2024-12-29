export function findOptimalBills(bills: any[], budget: number) {
  // Sort bills by amount/value ratio (in this case, just by amount)
  const sortedBills = [...bills].sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
  
  let currentSum = 0;
  const selectedBills = [];
  
  // Add bills while we can still fit them within the budget
  for (const bill of sortedBills) {
    const amount = parseFloat(bill.amount);
    if (currentSum + amount <= budget) {
      selectedBills.push(bill.id);
      currentSum += amount;
    } else {
      // If we can't add this bill, and we can't add any of the remaining bills
      // (since they're sorted by amount), we're done
      break;
    }
  }
  
  return selectedBills;
}