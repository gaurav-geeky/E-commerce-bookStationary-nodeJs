
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
    <tr key={item._id} className="border-b border-gray-700">
      {/* PRODUCT NAME */}
      <td className="p-3 align-top border border-gray-600">
        {editId === item._id ? (
          <input
            value={editData.name}
            onChange={(e) =>
              setEditData({ ...editData, name: e.target.value })
            }
            className="w-full bg-gray-800 text-white px-2 py-1 rounded"
          />
        ) : (
          item.name
        )}
      </td>

      {/* CATEGORY */}
      <td className="p-3 align-top border border-gray-600">
        {editId === item._id ? (
          <select
            value={editData.category}
            onChange={(e) =>
              setEditData({ ...editData, category: e.target.value })
            }
            className="w-full bg-gray-800 text-white px-2 py-1 rounded"
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

      {/* DESCRIPTION (WIDEST) */}
      <td className="p-3 align-top border border-gray-600">
        <div className="h-[140px] overflow-hidden">
          {editId === item._id ? (
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              className="w-full h-full bg-gray-800 text-white px-2 py-1 rounded resize-none"
            />
          ) : (
            <p className="text-sm leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      </td>

      {/* PRICE */}
      <td className="p-3 align-top border border-gray-600">
        {editId === item._id ? (
          <input
            type="number"
            value={editData.price}
            onChange={(e) =>
              setEditData({ ...editData, price: e.target.value })
            }
            className="w-full bg-gray-800 text-white px-2 py-1 rounded"
          />
        ) : (
          `₹${item.price}`
        )}
      </td>

      {/* IMAGE */}
      <td className="p-3 align-top border border-gray-600">
        <img
          src={item.defaultImage}
          alt=""
          className="w-16 h-16 object-cover rounded"
        />
      </td>

      {/* ACTION */}
      <td className="p-3 align-top border border-gray-600">
        {editId === item._id ? (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => saveEdit(item._id)}
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => myEdit(item._id)}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => myDel(item._id)}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm mt-2"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">
        Product Management
      </h2>

      {/* SEARCH */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search product..."
          value={searchone}
          onChange={(e) => setsearchone(e.target.value)}
          className="bg-white text-black px-3 py-2 rounded w-64"
        />
        <button
          onClick={handlesearchone}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full table-fixed border border-gray-600">
        {/* 🔑 COLUMN WIDTH CONTROL */}
        <colgroup>
          <col className="w-[18%]" />
          <col className="w-[12%]" />
          <col className="w-[36%]" />
          <col className="w-[8%]" />
          <col className="w-[10%]" />
          <col className="w-[16%]" />
        </colgroup>

        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 text-left border border-gray-600">Product Name</th>
            <th className="p-3 text-left border border-gray-600">Category</th>
            <th className="p-3 text-left border border-gray-600">Description</th>
            <th className="p-3 text-left border border-gray-600">Price</th>
            <th className="p-3 text-left border border-gray-600">Image</th>
            <th className="p-3 text-left border border-gray-600">Action</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default ProductList;


