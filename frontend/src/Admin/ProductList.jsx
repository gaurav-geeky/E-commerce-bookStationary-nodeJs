
import axios from "axios";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [mydata, setmydata] = useState([]);
  const [newdata, setnewdata] = useState([]);
  const [searchone, setsearchone] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  /* ---------------- SEARCH ---------------- */
  const handlesearchone = async () => {
    if (!searchone.trim()) {
      setnewdata([]);
      return;
    }
    const api = `${import.meta.env.VITE_BACKURL}/admin/searchproduct`;
    const res = await axios.post(api, { search: searchone });
    setnewdata(res.data);
  };

  /* ---------------- LOAD DATA ---------------- */
  const loadData = async () => {
    const api = `${import.meta.env.VITE_BACKURL}/admin/showproduct`;
    const res = await axios.get(api);
    setmydata(res.data.myproduct);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!searchone.trim()) setnewdata([]);
  }, [searchone]);

  const displayData = newdata.length > 0 ? newdata : mydata;

  /* ---------------- EDIT ---------------- */
  const myEdit = (id) => {
    const selected = displayData.find((p) => p._id === id);
    setEditId(id);
    setEditData(selected);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const saveEdit = async (id) => {
    const api = `${import.meta.env.VITE_BACKURL}/admin/productupdate?id=${id}`;
    await axios.put(api, editData);
    setEditId(null);
    loadData();
  };

  const myDel = async (id) => {
    const api = `${import.meta.env.VITE_BACKURL}/admin/productdelete?id=${id}`;
    await axios.delete(api);
    loadData();
  };

  /* ---------------- TABLE ROWS ---------------- */
  const rows = displayData.map((item) => (
    <tr key={item._id} className="hover:bg-gray-50">

      {/* PRODUCT NAME */}
      <td className="p-3 align-top border text-gray-700">
        {editId === item._id ? (
          <input
            value={editData.name}
            onChange={(e) =>
              setEditData({ ...editData, name: e.target.value })
            }
            className="w-full border px-2 py-1 rounded"
          />
        ) : (
          item.name
        )}
      </td>

      {/* CATEGORY */}
      <td className="p-3 align-top border text-gray-700">
        {editId === item._id ? (
          <select
            value={editData.category}
            onChange={(e) =>
              setEditData({ ...editData, category: e.target.value })
            }
            className="w-full border px-2 py-1 rounded"
          >
            <option>Books</option>
            <option>Novels</option>
            <option>Pens & Pencils</option>
            <option>Notebooks</option>
          </select>
        ) : (
          item.category
        )}
      </td>

      {/* DESCRIPTION */}
      <td className="p-3 align-top border text-gray-700">
        {editId === item._id ? (
          <textarea
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
            className="w-full border px-2 py-1 rounded resize-none h-[120px]"
          />
        ) : (
          <p className="text-sm leading-relaxed">
            {item.description}
          </p>
        )}
      </td>

      {/* PRICE */}
      <td className="p-3 align-top border font-medium text-gray-800">
        {editId === item._id ? (
          <input
            type="number"
            value={editData.price}
            onChange={(e) =>
              setEditData({ ...editData, price: e.target.value })
            }
            className="w-full border px-2 py-1 rounded"
          />
        ) : (
          `₹${item.price}`
        )}
      </td>

      {/* IMAGE */}
      <td className="p-3 align-top border">
        <img
          src={item.defaultImage}
          alt=""
          className="w-16 h-16 object-cover rounded"
        />
      </td>

      {/* ACTION */}
      <td className="p-3 align-top border">
        {editId === item._id ? (
          <div className="flex gap-2">
            <button
              onClick={() => saveEdit(item._id)}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => myEdit(item._id)}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => myDel(item._id)}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm mt-2"
        >
          Delete
        </button>
      </td>
    </tr>
  ));


  return (
    <div className="w-full">

      {/* PAGE HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          📋 Product Management
        </h2>
        <p className="text-sm text-gray-500">
          View, edit and delete products
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-xl shadow-md p-6">

        {/* SEARCH */}
        <div className="mb-4 flex gap-3">
          <input
            type="text"
            placeholder="Search product..."
            value={searchone}
            onChange={(e) => setsearchone(e.target.value)}
            className="border px-4 py-2 rounded-md w-[450px] focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handlesearchone}
            style={{ borderRadius: "5px" }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Search
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <colgroup>
              <col className="w-[18%]" />
              <col className="w-[12%]" />
              <col className="w-[36%]" />
              <col className="w-[8%]" />
              <col className="w-[10%]" />
              <col className="w-[16%]" />
            </colgroup>

            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border text-left">Product Name</th>
                <th className="p-3 border text-left">Category</th>
                <th className="p-3 border text-left">Description</th>
                <th className="p-3 border text-left">Price</th>
                <th className="p-3 border text-left">Image</th>
                <th className="p-3 border text-left">Action</th>
              </tr>
            </thead>

            <tbody>{rows}</tbody>
          </table>
        </div>

      </div>
    </div>
  );

};

export default ProductList;


