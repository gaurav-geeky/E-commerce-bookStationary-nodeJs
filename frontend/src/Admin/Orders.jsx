import React from "react";
import { useSelector } from "react-redux"; 


const Orders = () => {
  // 🔹 Dummy data (replace with API later)
  const orders = [
    {
      _id: "ord001",
      user: {
        name: "Gaurav Negi",
        address: "Dehradun, Uttarakhand",
      },
      products: [
        { title: "Book A", qnty: 2 },
        { title: "Book B", qnty: 1 },
      ],
      totalAmount: 897,
      status: "New Order",
      createdAt: "09 Jun 2023, 03:02 PM",
    },
    {
      _id: "ord002",
      user: {
        name: "Amit Sharma",
        address: "Delhi, India",
      },
      products: [{ title: "Notebook", qnty: 3 }],
      totalAmount: 450,
      status: "Accepted",
      createdAt: "11 Jun 2023, 11:47 AM",
    },
  ];

  const cart = useSelector((state) => state.mycart.cart);  

  cart.forEach((item) => {
        totalAmount += item.price * item.qnty;
        proName += item.name + ", ";
        myImg = item.image;
    });

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-6 text-white">Orders</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Address</th>
              <th className="p-3">Products</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3 font-medium text-blue-600">
                  {order._id}
                </td>

                <td className="p-3">
                  {order.user.name}
                </td>

                <td className="p-3">
                  {order.user.address}
                </td>

                <td className="p-3">
                  {order.products.map((p, index) => (
                    <div key={index}>
                      {p.title} × {p.qnty}
                    </div>
                  ))}
                </td>

                <td className="p-3 font-semibold">
                  ₹{order.totalAmount}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        order.status === "New Order"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-3 text-sm text-gray-600">
                  {order.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
