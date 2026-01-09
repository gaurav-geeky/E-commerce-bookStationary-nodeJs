
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

const AddProduct = () => {


  const initialState = {
    name: "",
    category: "",
    description: "",
    price: "",
    isTopBrand: false,
  };

  const resetForm = () => {
    setInput(initialState);
    setImages([]);
    setPreview([]);
  };
  // for form clear on cancel


  const [input, setInput] = useState(initialState);

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleInput = (e) => {
    const { name, type, value, checked } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  // handels input values 


  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const api = `${import.meta.env.VITE_BACKURL}/admin/addproduct`;
    const formData = new FormData();

    for (let key in input) {
      formData.append(key, input[key]);
    }
    images.forEach((img) => formData.append("images", img));

    const res = await axios.post(api, formData);

    // CLEAR ALL FIELDS AFTER SUCCESSFUL SUBMIT
    resetForm();
    alert(res.data.msg);
  };


  return (
    <div className="w-full flex justify-center px-4 py-8">
      {/* MAIN CARD */}
      <div className="w-full max-w-3xl bg-[#f9fafb] rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">

        {/* HEADER */}
        <div className="mb-6 border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            🔖 Add Product
          </h2>
          <p className="text-sm text-gray-500">
            Fill product details to list it in store
          </p>
        </div>

        <Form onSubmit={handleSubmit}>

          {/* PRODUCT NAME */}
          <Form.Group className="mb-4">
            <Form.Label className="text-gray-700 font-medium">
              Product Name
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={input.name}
              placeholder="Enter product name"
              onChange={handleInput}
            />
          </Form.Group>

          {/* TOP BRAND */}
          <Form.Group className="mb-4 flex items-center gap-2">
            <Form.Check
              type="checkbox"
              name="isTopBrand"
              checked={input.isTopBrand}
              onChange={handleInput}
            />
            <span className="text-gray-700">Mark as Top Brand</span>
          </Form.Group>

          {/* CATEGORY */}
          <Form.Group className="mb-4">
            <Form.Label className="text-gray-700 font-medium">
              Category
            </Form.Label>
            <Form.Select name="category" onChange={handleInput}>
              <option value="">Select category</option>
              <option value="Books">Books</option>
              <option value="Novels">Novels</option>
              <option value="Pens&Pencils">Pens & Pencils</option>
              <option value="Notebooks">Notebooks</option>
            </Form.Select>
          </Form.Group>

          {/* DESCRIPTION */}
          <Form.Group className="mb-4">
            <Form.Label className="text-gray-700 font-medium">
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={input.description}
              placeholder="Short product description"
              onChange={handleInput}
            />
          </Form.Group>

          {/* PRICE */}
          <Form.Group className="mb-4">
            <Form.Label className="text-gray-700 font-medium">
              Price (₹)
            </Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={input.price}
              placeholder="Enter price"
              onChange={handleInput}
            />
          </Form.Group>

          {/* IMAGE UPLOAD */}
          <Form.Group className="mb-3">
            <Form.Label className="text-gray-700 font-medium">
              Upload Images
            </Form.Label>
            <Form.Control
              type="file"
              multiple
              key={preview.length}
              onChange={handleImage} />
          </Form.Group>

          {/* IMAGE PREVIEW */}
          {preview.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {preview.map((img, index) => (
                <div key={img} className="relative">
                  <img
                    src={img}
                    alt="preview"
                    className="w-full h-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="secondary"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </Button>

            <Button variant="primary" type="submit">
              Submit Product
            </Button>
          </div>

        </Form>
      </div>
    </div>
  );
};

export default AddProduct;


/*
images   → real File objects (for upload)
preview  → temporary URLs (for UI)

*/