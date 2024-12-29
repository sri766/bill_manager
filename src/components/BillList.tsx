import { useSelector, useDispatch } from 'react-redux';
import { Edit2, Trash2 } from 'lucide-react';
import { RootState } from '../store/store';
import { removeBill, setFilteredCategory } from '../store/billSlice';
import { formatDisplayDate } from '../utils/dateUtils';

export default function BillList() {
  const dispatch = useDispatch();
  const { bills, filteredCategory } = useSelector((state: RootState) => state.bills);
  
  const categories = Array.from(new Set(bills.map(bill => bill.category)));
  
  const filteredBills = filteredCategory
    ? bills.filter(bill => bill.category === filteredCategory)
    : bills;

  const totalAmount = filteredBills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <select
          value={filteredCategory || ''}
          onChange={(e) => dispatch(setFilteredCategory(e.target.value || null))}
          className="rounded-md px-2 py-1 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <div className="text-lg text-white font-semibold">
          Total: ₹{totalAmount.toFixed(2)}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBills.map((bill) => (
              <tr key={bill.id}>
                <td className="px-6 py-4 whitespace-nowrap">{bill.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bill.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{parseFloat(bill.amount).toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDisplayDate(bill.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {/* TODO: Implement edit */}}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => dispatch(removeBill(bill.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}