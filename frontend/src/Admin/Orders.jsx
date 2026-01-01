import axios from "axios";
import React, { useEffect, useState } from "react";
axios

const Orders = () => {
  const [mydata, setmydata] = useState([]);

  const loadData = async (req, res) => {
    let api = `${import.meta.env.VITE_BACKURL}/product/getorder`;
    const response = await axios.get(api);
    console.log(response.data.order);
    setmydata(response.data.order)
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="text-white p-6 w-full">
      <h1 className="text-2xl font-semibold mb-6 text-white">Orders</h1>

      <table className="text-white w-full border text-center">
        <thead>
          <tr>
            <th className="text-white border p-2">Buyer Name</th>
            <th className="text-white border p-2">Products</th>
            <th className="text-white border p-2">Quantity</th>
            <th className="text-white border p-2">Total Price</th>
            <th className="text-white border p-2">Alternate Address</th>
            <th className="text-white border p-2">Instructions</th>
          </tr>
        </thead>

        <tbody>
          {mydata.length > 0 ? 
            (mydata.map((key, idx) => (
              <tr key={idx}>
                <td className="text-white border p-2">{key.name}</td>

                <td className="text-white border p-2">
                  {key.products.map((item, i) => (
                    <div key={i}>{item.name}</div>
                  ))}
                </td>

                <td className="text-white border p-2">
                  {key.products.map((item, i) => (
                    <div key={i}>pro quantity : {item.quantity}</div>
                  ))}
                </td>

                <td className="text-white border p-2">₹{key.totalPrice}</td>

                <td className="text-white border p-2">
                  {key.userId?.alternateaddress || "-"}
                </td>

                <td className="text-white border p-2">
                  {key.userId?.instructions || "-"}
                </td>
              </tr>
            ))
            ): 
            <div className="min-h-[50vh]">
              no product ordered yet. 
            </div>
            
          }
        </tbody>
      </table>



    </div>
  );
};

export default Orders;
