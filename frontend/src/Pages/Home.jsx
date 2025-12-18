
import React, { useState, useEffect } from "react";
import axios from "axios";

import Slider from "./Slider";

import pencil1 from "../images/home/products/apsara.webp";
import pencil2 from "../images/home/products/colorpencil.avif";
import pencil3 from "../images/home/products/natraj.webp";
import pencil4 from "../images/home/products/pencil1.webp";

import pen1 from "../images/home/products/pen1.webp"
import pen2 from "../images/home/products/pen2.webp";
import pen3 from "../images/home/products/pen3.webp";
import pen4 from "../images/home/products/pen4.png";

import novel1 from "../images/home/products/novel1.jpg";
import novel2 from "../images/home/products/novel2.jpg";
import novel3 from "../images/home/products/novel3.jpg";
import novel4 from "../images/home/products/novel4.jpg";

import { Card, Button } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { addToCart } from "../CartSlice";



const Home = () => {
  const [mydata, setmydata] = useState([]);
  const dispatch = useDispatch();

  const loadData = async () => {
    let api = `${import.meta.env.VITE_BACKURL}/product/branddisplay`;
    const response = await axios.get(api)
    console.log(response.data);
    setmydata(response.data);
  }

  useEffect(() => {
    loadData();
  }, []);


  const ans = mydata.map((key) => {
    return (
      <Card key={key._id} className=" w-full max-w-[18rem] shadow-md"
      >
        <Card.Img variant="top" src={key.defaultImage} className="h-[300px]object-cover"
        />

        <Card.Body>
          <Card.Title>{key.name}</Card.Title>

          <Card.Text>
            Description : {key.description}
            <br />
            <b>For : {key.category}</b>
            <br />
            <span className="text-green-600 font-bold">
              Price : {key.price}
            </span>
          </Card.Text>

          <Button
            variant="primary"
            onClick={() => dispatch(addToCart({
              id: key._id, name: key.name,
              description: key.description,
              category: key.category, price: key.price,
              image: key.defaultImage, qnty: 1,
            }))
            } >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    );
  });


  return (
    <div className="bg-gray-100">

      {/* CAROUSEL */}
      <Slider />

      {/* ------------ AMAZON STYLE CATEGORY BOXES --------- */}
      <section className="mt-[-50px] px-4 pb-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1 */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-3">Pencils</h2>
            <div className="grid grid-cols-2">
              <div>
                <img src={pencil1} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]" >Apsara pencils</p>
              </div>
              <div>
                <img src={pencil2} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]" >Color pencils</p>
              </div>
              <div>
                <img src={pencil3} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]" > Natraj pencil</p>
              </div>
              <div>
                <img src={pencil4} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]" >Faber-Castell pencils</p>
              </div>
            </div>

            <p className="text-blue-600 mt-2 cursor-pointer">Shop now</p>
          </div>


          {/* Card 2 */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-3">Pens</h2>
            <div className="grid grid-cols-2">
              <div>
                <img src={pen1} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Fountain Ink pens</p>
              </div>
              <div>
                <img src={pen2} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Cello gripper</p>
              </div>
              <div>
                <img src={pen3} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Cello Butterflow</p>
              </div>
              <div>
                <img src={pen4} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Nataraj Classic Use & Throw Ball Pens Blue</p>
              </div>
            </div>
            <p className="text-blue-600 mt-2 cursor-pointer">Shop now</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-3">Novels</h2>

            <div className="grid grid-cols-2">
              <div>
                <img src={novel1} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Madeline Martin</p>
              </div>
              <div>
                <img src={novel2} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Harry Potter</p>
              </div>
              <div>
                <img src={novel3} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Chetan Bhagat</p>
              </div>
              <div>
                <img src={novel4} className="w-full h-40 object-cover p-1 " alt="Books" />
                <p className="text-[12px]">Prem Chand</p>
              </div>
            </div>
            <p className="text-blue-600 mt-2 cursor-pointer">Shop now</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-3">Full Stationery</h2>
            <img src={pen3} className="w-full h-40 object-cover rounded" alt="Stationery" />
            <p className="text-blue-600 mt-2 cursor-pointer">Shop now</p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-3">Full Stationery</h2>
            <img src={pen2} className="w-full h-40 object-cover rounded" alt="Stationery" />
            <p className="text-blue-600 mt-2 cursor-pointer">Shop now</p>
          </div>

        </div>
      </section>
      {/* ------------ AMAZON STYLE END --------- */}

      <div className="text-blue-500 text-center text-4xl font-bold px-4 py-3 mt-6">Top Brands</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pb-10 place-items-center">
        {ans}
      </div>



    </div>
  );
};

export default Home;




