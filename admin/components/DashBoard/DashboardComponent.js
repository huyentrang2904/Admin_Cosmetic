import React, { useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAnalytic } from '@/state/Admin/Action';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const DashboardComponent = () => {
  const dispatch = useDispatch()
  const test = useSelector(store => store?.admin?.analytic)
  console.log(test)
  useEffect(() => {
    dispatch(getDataAnalytic());
  }, []);
  const barData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: 'Revenue of 2024',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: ['Brand A', 'Brand B', 'Brand C'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  if (test) return (
    <div className="h-full p-8 overflow-y-scroll bg-white">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-4 text-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className='grid grid-cols-5 col-span-4 gap-4'>
          <div className="col-span-1 p-4 border border-gray-200 rounded">
            <h2 className="text-xl text-center">Total orders</h2>
            <div className="text-xl font-semibold text-center">{test?.statisticalDTO.totalOrders}</div>
          </div>
          <div className="col-span-1 p-4 border border-gray-200 rounded">
            <h2 className="text-xl text-center">Canceled</h2>
            <div className="text-xl font-semibold text-center">{test?.statisticalDTO.canceledOrders}</div>
          </div>
          <div className="col-span-1 p-4 border border-gray-200 rounded">
            <h2 className="text-xl text-center">Order successful</h2>
            <div className="text-xl font-semibold text-center">{test?.statisticalDTO.orderSuccessful}</div>
          </div>
          <div className="col-span-1 p-4 border border-gray-200 rounded">
            <h2 className="text-xl text-center">Pending Orders</h2>
            <div className="text-xl font-semibold text-center">{test?.statisticalDTO.pendingOrders}</div>
          </div>
          <div className="col-span-1 p-4 border border-gray-200 rounded">
            <h2 className="text-xl text-center">Total revenue of July</h2>
            <div className="text-xl font-semibold text-center">{test?.statisticalDTO.totalRevenueOfJuly}</div>
          </div>
        </div>


        <div className="col-span-2">
          <Bar data={barData} />
          <p className="mt-2 text-center">Revenue of 2024</p>
        </div>
        <div className="col-span-2">
          <Pie data={pieData} />
          <p className="mt-2 text-center">Revenue by brand of 2024</p>
        </div>

        <div className="col-span-2 p-4 border border-gray-200 rounded">
          <h2 className="text-xl">List product out of stock</h2>
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Sold</th>
              </tr>
            </thead>
            <tbody>
              {/* Add rows here */}
              <tr>
                <td className="p-2 border">Product 1</td>
                <td className="p-2 border">10</td>
                <td className="p-2 border">5</td>
              </tr>
              <tr>
                <td className="p-2 border">Product 2</td>
                <td className="p-2 border">0</td>
                <td className="p-2 border">3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-span-2 p-4 border border-gray-200 rounded">
          <h2 className="text-xl">Top 5 customer potential</h2>
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">User</th>
                <th className="p-2 border">Orders</th>
                <th className="p-2 border">Total Spend</th>
              </tr>
            </thead>
            <tbody>
              {test?.userPotentialDTOS.map((data, index) => (
                <tr key={index}>
                  <td className="p-2 border">{data.username}</td>
                  <td className="p-2 border">{data.totalOrders}</td>
                  <td className="p-2 border">{data.totalSpend}$</td>
                </tr>
              ))}
              {/* Add rows here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
