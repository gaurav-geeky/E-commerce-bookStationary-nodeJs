
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [input, setInput] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    isTopBrand: false
  });

  const [images, setImages] = useState([]);

  const [preview, setPreview] = useState([]); // 👈 NEW (for image preview)

  const handleInput = (e) => {
    const { name, type, value, checked } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };


  const handleImage = (e) => {
    const files = Array.from(e.target.files); // convert FileList → Array
    setImages(files); // existing logic (for upload)

    // 👇 NEW: create preview URLs
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreview(previewUrls);
  };

  // remove img function
  const removeImage = (removeIndex) => {
    setPreview(prev =>
      prev.filter((_, index) => index !== removeIndex)
    );

    setImages(prev =>
      prev.filter((_, index) => index !== removeIndex)
    );
  };



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
            <Form.Check
              type="checkbox"
              label="Mark as Top Brand"
              name="isTopBrand"
              checked={input.isTopBrand}
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

          {/* IMAGE PREVIEW WITH REMOVE BUTTON */}
          {preview.length > 0 && (
            <div className="flex gap-3 flex-wrap mb-4">
              {preview.map((img, index) => (
                <div key={img} className="relative">

                  {/* ❌ REMOVE BUTTON */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white 
                     rounded-full w-5 h-5 flex items-center justify-center
                     text-xs hover:bg-red-700"
                  >
                    ✕
                  </button>

                  {/* IMAGE */}
                  <img
                    src={img}
                    className="w-24 h-24 object-cover rounded border"
                    alt="preview"
                  />
                </div>
              ))}
            </div>
          )}


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


/*
images   → real File objects (for upload)
preview  → temporary URLs (for UI)

*/