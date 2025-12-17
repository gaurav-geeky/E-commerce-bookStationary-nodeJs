

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [input, setInput] = useState({});
  const [images, setImages] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target
    setInput(values => ({ ...values, [name]: value }));
    console.log(input);
  }

  const handleImage = (e) => {
    console.log(e.target.files);
    setImages(e.target.files);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${import.meta.env.VITE_BACKURL}/admin/addproduct`;
    const formData = new FormData();

    for (let key in input) {
      formData.append(key, input[key]);
    }

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    const response = await axios.post(api, formData);
    alert(response.data.msg);
    console.log(response.data)
  }


  return (
    <div className="w-full flex justify-center">

      {/* ===== FORM CARD ===== */}
      <div
        className="
          w-full 
          max-w-md sm:max-w-lg lg:max-w-xl
          bg-gray-900 text-white
          p-4 sm:p-5 lg:p-6
          rounded-lg
          shadow-[0_4px_20px_rgba(255,255,255,0.15)]
        "
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 border-b border-gray-600 pb-2">
          Add Product
        </h2>

        <Form>

          <Form.Group className="mb-3">
            <Form.Label>Enter Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Category</Form.Label>
            <Form.Select name="category" onChange={handleInput}>
              <option>Open this select menu</option>
              <option value="Books">Books</option>
              <option value="Novels">Novels</option>
              <option value="Pens&Pencils">Pens & Pencils</option>
              <option value="Notebooks">Notebooks</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              onChange={handleInput}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Upload Images</Form.Label>
            <Form.Control
              type="file" multiple onChange={handleImage}
            />
          </Form.Group>

          <div className="text-center ">
            <Button variant="primary" type="submit" className="px-4 py-1 w-100 sm:w-auto" onClick={handleSubmit}>
              Submit
            </Button>
          </div>

        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
