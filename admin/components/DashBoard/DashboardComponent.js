import React, { useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAnalytic } from '@/state/Admin/Action';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

export function formatCurrency(num, to = 0, currency = "USD") {
  let newNum = Number.parseFloat(num).toFixed(to);
  switch (currency) {
    case "USD":
      return `$${Number(newNum).toLocaleString('en-US')}`;
    default:
      return `${Number(newNum).toLocaleString('vi-VN')} VND`;
  }
}


const DashboardComponent = () => {
  const dispatch = useDispatch()
  const dataAnalytic = useSelector(store => store?.admin?.analytic)
  console.log(dataAnalytic)
  useEffect(() => {
    dispatch(getDataAnalytic());
  }, []);

  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Revenue of 2024',
        data: [
          dataAnalytic?.statisticalDTO?.totalRevenueOfJanuary || 0,
          dataAnalytic?.statisticalDTO?.totalRevenueOfFebruary || 0,
          dataAnalytic?.statisticalDTO?.totalRevenueOfMarch || 0,
          dataAnalytic?.statisticalDTO?.totalRevenueOfApril || 0,
          dataAnalytic?.statisticalDTO?.totalRevenueOfMay || 0,
          dataAnalytic?.statisticalDTO?.totalRevenueOfJune || 0,
          dataAnalytic?.statisticalDTO?.totalRevenueOfJuly || 0
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: dataAnalytic?.revenueOfBrandDTO?.map(brand => brand.brandName) || [],
    datasets: [
      {
        data: dataAnalytic?.revenueOfBrandDTO?.map(brand => brand.totalRevenueOfYear) || [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="h-full p-8 overflow-y-scroll bg-white">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-4 text-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="grid grid-cols-5 col-span-4 gap-4">
          <div className="col-span-1 p-4 border border-gray-200 rounded">
            <h2 className="text-xl text-center">Total orders</h2>
            <div className="text-xl font-semibold text-center">
              {dataAnalytic?.statisticalDTO?.totalOrders}
            </div>
          </div>
          <div className="col-span-1 p-4 border border-gray-200 rounded">
            <h2 className="text-xl text-center">Canceled</h2>
            <div className="text-xl font-semibold text-center">
              {dataAnalytic?.statisticalDTO?.canceledOrders}
            </div>
          </div>
          <div className="col-span-1 p-4 border border-gray-200 rounded">
            <h2 className="text-xl text-center">Order successful</h2>
            <div className="text-xl font-semibold text-center">
              {dataAnalytic?.statisticalDTO?.orderSuccessful}
            </div>
          </div>
          <div className="col-span-1 p-4 border border-gray-200 rounded">
            <h2 className="text-xl text-center">Pending Orders</h2>
            <div className="text-xl font-semibold text-center">
              {dataAnalytic?.statisticalDTO?.pendingOrders}
            </div>
          </div>
          <div className="col-span-1 p-4 border border-gray-200 rounded">
            <h2 className="text-xl text-center">Total revenue of July</h2>
            <div className="text-xl font-semibold text-center">
              {formatCurrency(dataAnalytic?.statisticalDTO?.totalRevenueOfJuly)}
            </div>
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
              {dataAnalytic?.productStatisticDTOS?.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border ">
                    <div title={item.title} className="w-96 text-nowrap overflow-x-hidden  text-ellipsis">
                      {item.title}
                    </div>
                  </td>{" "}
                  {/* w-64 là 16rem, bạn có thể điều chỉnh giá trị này */}
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">{item.countPurchase}</td>
                </tr>
              ))}
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
              {dataAnalytic?.userPotentialDTOS?.map((data, index) => (
                <tr key={index}>
                  <td className="p-2 border">{data.username}</td>
                  <td className="p-2 border">{data.totalOrders}</td>
                  <td className="p-2 border">
                    {formatCurrency(data.totalSpend)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
