import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const loadData = async () => {
    const api = `${import.meta.env.VITE_BACKURL}/product/getorder`;
    const res = await axios.get(api);
    setOrders(res.data.order || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="w-full">

      {/* ===== PAGE HEADER ===== */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📦 Orders</h1>
        <p className="text-sm text-gray-500">
          View all customer orders and details
        </p>
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="border px-3 py-2">Buyer</th>
              <th className="border px-3 py-2">Products</th>
              <th className="border px-3 py-2">Quantity</th>
              <th className="border px-3 py-2">Total</th>
              <th className="border px-3 py-2">Alt Address</th>
              <th className="border px-3 py-2">Instructions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {orders.length > 0 ? (
              orders.map((order, idx) => (
                <tr key={idx} className="hover:bg-gray-50">

                  <td className="border px-3 py-2 font-medium text-blue-700 ">
                    {order.name}
                  </td>

                  <td className="border px-3 py-2">
                    {order.products.map((item, i) => (
                      <div key={i}>• {item.name}</div>
                    ))}
                  </td>

                  <td className="border px-3 py-2">
                    {order.products.map((item, i) => (
                      <div key={i}>× {item.quantity}</div>
                    ))}
                  </td>

                  <td className="border px-3 py-2 font-semibold">
                    ₹{order.totalPrice}
                  </td>

                  <td className="border px-3 py-2">
                    {order.userId?.alternateaddress || "-"}
                  </td>

                  <td className="border px-3 py-2">
                    {order.userId?.instructions || "-"}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-400"
                >
                  No orders placed yet.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Orders;
