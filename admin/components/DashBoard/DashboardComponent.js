import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const DashboardComponent = () => {
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

  return (
    <div className="p-8 bg-white h-full overflow-y-scroll">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-4 text-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className='grid grid-cols-5 col-span-4 gap-4'>
        <div className="col-span-1 p-4 border border-gray-200 rounded">
          <h2 className="text-xl text-center">Total orders</h2>
          <div className="text-xl font-semibold text-center">100 Orders</div>
        </div>
        <div className="col-span-1 p-4 border border-gray-200 rounded">
          <h2 className="text-xl text-center">Canceled</h2>
          <div className="text-xl font-semibold text-center">100 Orders</div>
        </div>
        <div className="col-span-1 p-4 border border-gray-200 rounded">
          <h2 className="text-xl text-center">Order successful</h2>
          <div className="text-xl font-semibold text-center">100 Orders</div>
        </div>
        <div className="col-span-1 p-4 border border-gray-200 rounded">
          <h2 className="text-xl text-center">Pending Orders</h2>
          <div className="text-xl font-semibold text-center">100 Orders</div>
        </div>
        <div className="col-span-1 p-4 border border-gray-200 rounded">
          <h2 className="text-xl text-center">Total revenue of July</h2>
          <div className="text-xl font-semibold text-center">1đ</div>
        </div>
        </div>
        

        <div className="col-span-2">
          <Bar data={barData} />
          <p className="text-center mt-2">Revenue of 2024</p>
        </div>
        <div className="col-span-2">
          <Pie data={pieData} />
          <p className="text-center mt-2">Revenue by brand of 2024</p>
        </div>

        <div className="col-span-2 p-4 border border-gray-200 rounded">
          <h2 className="text-xl">List product out of stock</h2>
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Sold</th>
              </tr>
            </thead>
            <tbody>
              {/* Add rows here */}
              <tr>
                <td className="border p-2">Product 1</td>
                <td className="border p-2">10</td>
                <td className="border p-2">5</td>
              </tr>
              <tr>
                <td className="border p-2">Product 2</td>
                <td className="border p-2">0</td>
                <td className="border p-2">3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-span-2 p-4 border border-gray-200 rounded">
          <h2 className="text-xl">Top 5 customer potential</h2>
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">User</th>
                <th className="border p-2">Orders</th>
                <th className="border p-2">Total Spend</th>
              </tr>
            </thead>
            <tbody>
              {/* Add rows here */}
              <tr>
                <td className="border p-2">User 1</td>
                <td className="border p-2">10</td>
                <td className="border p-2">$10000</td>
              </tr>
              <tr>
                <td className="border p-2">User 2</td>
                <td className="border p-2">8</td>
                <td className="border p-2">$8000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
