
import axios from 'axios';
import { useEffect, useState } from 'react';
import "../css/Home.css";

const ProductList = () => { 

    // get details of all the products. 
    const [mydata, setmydata] = useState([]);

    // 🔴 CHANGE 1: store id of product being edited
    const [editId, setEditId] = useState(null);

    // 🔴 CHANGE 2: get current value editable so i type new values
    const [editData, setEditData] = useState({}); 


    const loadData = async () => {
        let api = `${import.meta.env.VITE_BACKURL}/admin/showproduct`;
        const response = await axios.get(api);
        setmydata(response.data.myproduct);
    };

    useEffect(() => {
        loadData();
    }, []);


    // 🔴 CHANGE 3: handle inline input change
    const handleInput = (e) => { 
        let name = e.target.name; 
        let value = e.target.value; 
        setEditData({ ...editData, [name]: value });
    };

    // 🔴 CHANGE 4: SAVE edited product
    const saveEdit = async (id) => {
        let api = `${import.meta.env.VITE_BACKURL}/admin/productupdate?id=${id}`;
        const response = await axios.put(api, editData);
        alert(response.data.msg);
        setEditId(null);
        loadData(); 
    };

    // 🔴 CHANGE 5: EDIT now receives key._id (same pattern as delete)
    const myEdit = (id) => {
        const selectedProduct = mydata.find(item => item._id === id);
        setEditId(id);
        setEditData(selectedProduct);
    };


    
    // ❌ DELETE (UNCHANGED)
    const myDel = async (id) => {
        let api = `${import.meta.env.VITE_BACKURL}/admin/productdelete?id=${id}`;
        const response = await axios.delete(api);
        alert(response.data.msg);
        loadData();
    };


    // 🔴 CHANGE 6: textarea size increased
    const ans = mydata.map((key) => (
        <tr key={key._id}>
            <td className="text-white">
                {editId === key._id ? (
                    <input
                        name="name"
                        value={editData.name}
                        onChange={handleInput}
                        className="form-control"
                    />
                ) : (
                    key.name
                )}
            </td>

            <td className="text-white">
                {editId === key._id ? (
                    <select name="category"
                    value={editData.category}
                    onChange={handleInput}
                    className='form-control'
                    >
                        <option value="">-- Select Category --</option>
                        <option value="Books">Books</option>
                        <option value="Novels">Novels</option>
                        <option value="Pens & Pencils">Pens & Pencils</option>
                        <option value="Notebooks">Notebooks</option>
                    </select>
                ) : (
                    key.category
                )}
            </td>

            <td className="text-white">
                {editId === key._id ? (
                    <textarea
                        name="description"
                        value={editData.description}
                        onChange={handleInput}
                        rows="4"                // 🔴 increased height
                        style={{ width: "100%" }} // 🔴 full width
                        className="form-control"
                    />
                ) : (
                    key.description
                )}
            </td>

            <td className="text-white">
                {editId === key._id ? (
                    <input
                        type="number"
                        name="price"
                        value={editData.price}
                        onChange={handleInput}
                        className="form-control"
                    />
                ) : (
                    `₹${key.price}`
                )}
            </td>

            <td>
                <img
                    src={key.defaultImage}
                    alt={key.name}
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
            </td>

{/*  button to delete / edit or save edit */}
            <td className=''>
                {editId === key._id ? (
                    <button
                        className="m-2 btn btn-sm btn-success me-2"
                        onClick={() => saveEdit(key._id)}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="m-2 btn btn-sm btn-primary me-2"
                        onClick={() => myEdit(key._id)}  // 🔴 id passed like delete
                    >
                        Edit
                    </button>
                )}

                <button
                    className="m-2 btn btn-sm btn-danger"
                    onClick={() => myDel(key._id)}
                >
                    Delete
                </button>
            </td>

        </tr>
    ));

    return (
        <div className="container mt-4">
            <h2 className="text-white mb-3">Product Management</h2>

            <table className="table table-dark table-bordered align-middle">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Select Category</th>
                        <th>Product Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>{ans}</tbody>
            </table>
        </div>
    );
};

export default ProductList;


