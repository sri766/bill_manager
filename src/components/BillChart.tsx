import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RootState } from '../store/store';
import { formatDate } from '../utils/dateUtils';

export default function BillChart() {
  const { bills } = useSelector((state: RootState) => state.bills);

  const chartData = [...bills]
    .sort((a, b) => {
      const dateA = new Date(a.date.split('-').reverse().join('-'));
      const dateB = new Date(b.date.split('-').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    })
    .map(bill => ({
      date: formatDate(bill.date),
      amount: parseFloat(bill.amount)
    }));

  return (
    <div className="h-[514px] bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Monthly Billing Cycle</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#3b82f6" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}