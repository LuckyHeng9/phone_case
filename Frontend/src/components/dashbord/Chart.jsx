import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RxDotFilled } from "react-icons/rx";

const salesData = [
  { month: "JUL", sales: 504 },
  { month: "AUG", sales: 70 },
  { month: "SEP", sales: 950 },
  { month: "OCT", sales: 110 },
  { month: "NOV", sales: 150 },
  { month: "DEC", sales: 1400 },
];

const recentOrders = [
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Delivered",
    amount: "$200.00",
    product: "Laptop",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Komael",
    status: "Canceled",
    amount: "$200.00",
    product: "Smartphone",
  },
  {
    id: "#25424",
    date: "Nov 6th, 2023",
    customer: "Nikhil",
    status: "Delivered",
    amount: "$200.00",
    product: "Headphones",
  },
  {
    id: "#25423",
    date: "Nov 5th, 2023",
    customer: "Shivam",
    status: "Canceled",
    amount: "$200.00",
    product: "Monitor",
  },
  {
    id: "#25422",
    date: "Nov 4th, 2023",
    customer: "Shadab",
    status: "Delivered",
    amount: "$200.00",
    product: "Keyboard",
  },
  {
    id: "#25421",
    date: "Nov 2nd, 2023",
    customer: "Yogesh",
    status: "Delivered",
    amount: "$200.00",
    product: "Mouse",
  },
];

const bestSellers = [
  { name: "Red Flame Case", price: 12.5, sales: 120, img: "src/assets/img1.jpeg" },
  { name: "Red Flame Case", price: 13, sales: 90, img: "src/assets/img0.jpeg" },
  { name: "Specail one", price: 9.99, sales: 75, img: "src/assets/img2.jpeg" },
];

const Chart = () => {
  const [activeFilter, setActiveFilter] = useState("MONTHLY");

  return (
    <div className="p-2 grid gap-4 grid-cols-1 lg:grid-cols-[2fr_1fr] z-0">
      {/* Sales Graph Section */}
      <div className="bg-white px-5 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Sales Graph</h2>
          <div className="flex gap-2 my-4 ">
            {["WEEKLY", "MONTHLY", "YEARLY"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`border px-4 py-2 rounded  ${
                  activeFilter === filter ? "bg-[#003F62] text-white" : ""
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <hr className="border-1 border-black" />
        <div className="w-full h-72 py-6 ">
          <ResponsiveContainer width="100%" height="100%" >
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis domain={[0, "dataMax + 100"]} />
              <Tooltip />
              <Line className="-z-50"
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                
                strokeWidth={2}
                strokeLinecap="round"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="w-[360px] bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold">Best Sellers</h2>
        <hr className="border-1 border-black my-2" />
        <ul className="mt-2">
          {bestSellers.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 border-b"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img
                  src={item.img}
                  alt={`${item.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="flex-1 pl-4">{item.name}</p>
              <div className="flex flex-col">
                <p className=" font-semibold text-lg ">${item.price}</p>
                <p className="text-sm">{item.sales} sales</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Orders Table */}
      <div className="lg:col-span-2 bg-white px-5 py-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        <table className="w-full mt-4 border-t">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-3 text-left"></th>
              <th className="py-2 px-3 text-left">Product</th>
              <th className="py-2 px-3 text-left">Order ID</th>
              <th className="py-2 px-3 text-left">Date</th>
              <th className="py-2 px-3 text-left">Customer Name</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">
                  <input type="checkbox" id={`order-${index}`} />
                </td>
                <td className="py-2 px-3">{order.product}</td>
                <td className="py-2 px-3">{order.id}</td>
                <td className="py-2 px-3">{order.date}</td>
                <td className="py-2 px-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src="src/assets/user.png"
                      alt="User profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {order.customer}
                </td>
                <td className="py-2 px-3 font-medium">
                  <div className="flex items-center gap-1">
                    {order.status === "Delivered" ? (
                      <RxDotFilled className="text-[#003F62] text-xl" />
                    ) : (
                      <RxDotFilled className="text-[#FFA52F] text-xl" />
                    )}
                    {order.status}
                  </div>
                </td>
                <td className="py-2 px-3">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Chart;
