import { Provider } from 'react-redux';
import { store } from './store/store';
import BillForm from './components/BillForm';
import BillList from './components/BillList';
import BillChart from './components/BillChart';

function App() {
  return (
    <Provider store={store}>
      <div className='relative bg-[#123524] flex justify-center items-center'>
        <div className="flex justify-center items-center py-8">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#EFE3C2]">Bill Manager</h1>
              <p className="mt-2 text-[#85A947]">Manage your monthly bills efficiently</p>
            </div>
            
            <div className="flex gap-2">
                <div className='flex flex-col gap-2 w-1/2'> 
                  <BillForm />
                  <BillList />
                </div>
                <div className='flex flex-col w-1/2'>
                  <BillChart />
                </div>
            </div>
          </div>
        </div>
        </div>
    </Provider>
  );
}

export default App;