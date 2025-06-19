import { useEffect, useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import { base_url } from "../../../base_url";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${base_url}/payment/get-all-orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus, currentStatus) => {
    // Prevent unnecessary update if status is unchanged
    if (newStatus === currentStatus) return;

    try {
      await axios.put(
        `${base_url}/payment/update-order-status/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex">
      <main className="p-6 w-full min-h-screen bg-[#E7E7E3]">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-[#003F62] text-white">
              <th className="py-2 px-4 text-left">Products</th>
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Customer Name</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Total ($)</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-100 cursor-pointer"
              >
                <td className="py-2 px-4">
                  {order.products
                    .map((p) => p.typeRef || p.type || "Product")
                    .join(", ")}
                </td>
                <td className="py-2 px-4">{order._id}</td>
                <td className="py-2 px-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">
                  {order.user?.username || "Unknown"}
                </td>
                <td className="py-2 px-3 font-medium">
                  <div className="flex items-center gap-1">
                    <RxDotFilled
                      className={`text-xl ${
                        order.status === "Delivered"
                          ? "text-[#003F62]"
                          : order.status === "Accepted"
                          ? "text-[#1E90FF]"
                          : order.status === "Canceled"
                          ? "text-[#FF0000]"
                          : "text-[#FFA52F]"
                      }`}
                    />
                    {order.status || "Pending"}
                  </div>
                </td>
                <td className="py-2 px-4">${order.totalAmount.toFixed(2)}</td>
                <td className="py-2 px-4">
                  <select
                    className="border px-2 py-1 rounded"
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value, order.status)
                    }
                    disabled={
                      order.status === "Delivered" ||
                      order.status === "Canceled"
                    }
                  >
                    <option value={order.status}>{order.status}</option>

                    {order.status === "Pending" && (
                      <option value="Accepted">Accepted</option>
                    )}
                    {order.status === "Accepted" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default OrderList;
