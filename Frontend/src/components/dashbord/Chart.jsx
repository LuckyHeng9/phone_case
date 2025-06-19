import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RxDotFilled } from "react-icons/rx";
import axios from "axios";
import { base_url } from "../../base_url";
import { useDispatch } from "react-redux";
import { setCardStats } from "../../redux/slice/dashboardSlice";

const Chart = () => {
  const [activeFilter, setActiveFilter] = useState("DAILY");
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const dispatch = useDispatch();

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      // Fetch orders
      const orderRes = await axios.get(`${base_url}/payment/get-all-orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Fetch products
      const productRes = await axios.get(`${base_url}/products/get-all-products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const sortedOrders = orderRes.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      const totalOrders = sortedOrders.length;
      const completedOrders = sortedOrders.filter(
        (order) => order.status === "Delivered"
      ).length;
      const activeOrders = sortedOrders.filter(
        (order) => order.status === "Accepted"
      ).length;

      // ✅ FIXED: count total products from productRes.data array
      const totalProducts = Array.isArray(productRes.data)
        ? productRes.data.length
        : 0;

      // Set data to Redux
      dispatch(
        setCardStats({
          totalOrders,
          completedOrders,
          activeOrders,
          totalProducts,
        })
      );

      // Update local state
      setOrders(sortedOrders);
      processDailySales(sortedOrders);
      processBestSellers(sortedOrders);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  };

  fetchDashboardData();
}, [dispatch]);



  const processDailySales = (orderList) => {
    const dailyTotals = {};

    orderList.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString("en-CA"); // yyyy-mm-dd

      if (!dailyTotals[date]) {
        dailyTotals[date] = 0;
      }
      dailyTotals[date] += order.totalAmount;
    });

    const formatted = Object.entries(dailyTotals).map(([date, sales]) => ({
      date,
      sales: parseFloat(sales.toFixed(2)),
    }));

    setSalesData(formatted);
  };

  const processMonthlySales = (orderList) => {
    const monthlyTotals = {};

    orderList.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "short",
      });

      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }

      monthlyTotals[month] += order.totalAmount;
    });

    const formatted = Object.entries(monthlyTotals).map(([month, sales]) => ({
      month,
      sales: parseFloat(sales.toFixed(2)),
    }));

    setSalesData(formatted);
  };

  const processBestSellers = (orderList) => {
  const productSales = {};

  orderList.forEach((order) => {
    order.products?.forEach(({ product, quantity, price, typeRef }) => {
      if (!product || typeRef !== "Product") return; 

      const key = product._id;
      if (!productSales[key]) {
        productSales[key] = {
          name: product.title,
          sales: 0,
          price: product.price,
          img: product.image_path,
        };
      }
      productSales[key].sales += quantity;
    });
  });

  const bestSellersArr = Object.values(productSales)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  setBestSellers(bestSellersArr);
};

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="p-2 grid gap-4 grid-cols-1 lg:grid-cols-[2fr_1fr] z-0">
      {/* Sales Graph Section */}
      <div className="bg-white px-5 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Sales Graph</h2>
          <div className="flex gap-2 my-4">
            {["DAILY", "MONTHLY"].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  if (filter === "DAILY") processDailySales(orders);
                  else processMonthlySales(orders);
                }}
                className={`border px-4 py-2 rounded ${
                  activeFilter === filter ? "bg-[#003F62] text-white" : ""
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <hr className="border-1 border-black" />
        <div className="w-full h-72 py-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <XAxis
                dataKey={activeFilter === "DAILY" ? "date" : "month"}
                tick={{ fontSize: 12 }}
              />
              <YAxis domain={[0, "dataMax + 100"]} />
              <Tooltip />
             <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
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
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="flex-1 pl-4">{item.name}</p>
              <div className="flex flex-col">
                <p className="font-semibold text-lg">${item.price}</p>
                <p className="text-sm">{item.sales} sold</p>
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
              <th className="py-2 px-3 text-left">Product Type</th>
              <th className="py-2 px-3 text-left">Order ID</th>
              <th className="py-2 px-3 text-left">Date</th>
              <th className="py-2 px-3 text-left">Customer Name</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.length > 0 ? (
              sortedOrders.slice(0, 5).map((order, index) => (
                <tr
                  key={order._id || index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-2 px-3">
                    <input type="checkbox" />
                  </td>
                  <td className="py-2 px-3">
                    {order.products?.[0]?.typeRef || "N/A"}
                  </td>
                  <td className="py-2 px-3">{order._id}</td>
                  <td className="py-2 px-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <img
                        src="src/assets/user.png"
                        alt="User profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {order.user?.username || "Unknown"}
                  </td>
                  <td className="py-2 px-3 font-medium">
                    <div className="flex items-center gap-1">
                      <RxDotFilled
                        className={`text-xl ${
                          order.status === "Delivered"
                            ? "text-[#003F62]"
                            : order.status === "Accepted"
                            ? "text-[#1A8F5E]"
                            : "text-[#FFA52F]"
                        }`}
                      />
                      {order.status || "Pending"}
                    </div>
                  </td>
                  <td className="py-2 px-3">${order.totalAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Chart;
