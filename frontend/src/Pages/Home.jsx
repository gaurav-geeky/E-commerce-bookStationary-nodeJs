import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "./Slider";

import pencil1 from "../images/home/products/apsara.webp";
import pencil2 from "../images/home/products/colorpencil.avif";
import pencil3 from "../images/home/products/natraj.webp";
import pencil4 from "../images/home/products/pencil1.webp";

import pen1 from "../images/home/products/pen1.webp";
import pen2 from "../images/home/products/pen2.webp";
import pen3 from "../images/home/products/pen3.webp";
import pen4 from "../images/home/products/pen4.png";

import novel1 from "../images/home/products/novel1.jpg";
import novel2 from "../images/home/products/novel2.jpg";
import novel3 from "../images/home/products/novel3.jpg";
import novel4 from "../images/home/products/novel4.jpg";

import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../CartSlice";

import "../css/Home.css";   // ✅ NEW CSS FILE

const Home = () => {
  const [mydata, setmydata] = useState([]);
  const dispatch = useDispatch();

  const loadData = async () => {
    let api = `${import.meta.env.VITE_BACKURL}/product/branddisplay`;
    const response = await axios.get(api);
    setmydata(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const ans = mydata.map((key) => (
    <Card key={key._id} className="product-card">
      <Card.Img src={key.defaultImage} className="product-img" />

      <Card.Body>
        <Card.Title>{key.name}</Card.Title>

        <p className="product-desc">
          Description : {key.description}
        </p>

        <b>For : {key.category}</b>
        <br />
        <span className="product-price">Price : {key.price}</span>

        <Button
          variant="primary"
          className="mt-2"
          onClick={() =>
            dispatch(
              addToCart({
                id: key._id,
                name: key.name,
                description: key.description,
                category: key.category,
                price: key.price,
                image: key.defaultImage,
                qnty: 1,
              })
            )
          }
        >
          Add to Cart
        </Button>
      </Card.Body>

    </Card>
  ));

  return (
    <div className="home-wrapper">
      <Slider />

      {/* CATEGORY SECTION */}
      <section className="category-section">
        <div className="category-grid">

          {/* CARD */}
          <div className="category-card">
            <h2>Pencils</h2>
            <div className="category-items">
              <CategoryItem img={pencil1} text="Apsara pencils" />
              <CategoryItem img={pencil2} text="Color pencils" />
              <CategoryItem img={pencil3} text="Natraj pencils" />
              <CategoryItem img={pencil4} text="Faber-Castell pencils" />
            </div>
            <p className="shop-link">Shop now</p>
          </div>

          <div className="category-card">
            <h2>Pens</h2>
            <div className="category-items">
              <CategoryItem img={pen1} text="Fountain Ink pens" />
              <CategoryItem img={pen2} text="Cello gripper" />
              <CategoryItem img={pen3} text="Cello Butterflow" />
              <CategoryItem img={pen4} text="Nataraj Classic Pens" />
            </div>
            <p className="shop-link">Shop now</p>
          </div>

          <div className="category-card">
            <h2>Novels</h2>
            <div className="category-items">
              <CategoryItem img={novel1} text="Madeline Martin" />
              <CategoryItem img={novel2} text="Harry Potter" />
              <CategoryItem img={novel3} text="Chetan Bhagat" />
              <CategoryItem img={novel4} text="Prem Chand" />
            </div>
            <p className="shop-link">Shop now</p>
          </div>

          <div className="category-card">
            <h2>Full Stationery</h2>
            <img src={pen3} className="single-img" alt="Stationery" />
            <p className="shop-link">Shop now</p>
          </div>

        </div>
      </section>

      <h2 className="brand-title">Top Brands</h2>

      <div className="product-grid">{ans}</div>
    </div>
  );
};

const CategoryItem = ({ img, text }) => (
  <div className="category-item">
    <img src={img} alt={text} />
    <p>{text}</p>
  </div>
);

export default Home;
