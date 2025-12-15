
import React from "react";

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


const Home = () => {
  return (
    <div className="bg-gray-100">

      {/* CAROUSEL */}
      <Slider />

      {/* ------------------ AMAZON STYLE CATEGORY BOXES ------------------ */}
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
    </div>
  );
};

export default Home;



// import React from "react";
// import img1 from "../images/home/books.avif";
// import img2 from "../images/home/geometry.avif";
// import img3 from "../images/home/pencil.avif";
// import img4 from "../images/home/stationary.png";

// const Home = () => {
//   return (
//     <div>
//       <div
//         id="mainCarousel"
//         className="carousel slide"
//         data-bs-ride="carousel"
//       >
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <img  src={img1} className="d-block w-full h-[500px] object-contain bg-gray-200" alt="Slide 1" />
//           </div>
//           <div className="carousel-item">
//             <img  src={img2} className="d-block w-full h-[500px] object-contain bg-gray-200" alt="Slide 2" />
//           </div>
//           <div className="carousel-item">
//             <img  src={img3} className="d-block w-full h-[500px] object-contain bg-gray-200" alt="Slide 3" />
//           </div>
//           <div className="carousel-item">
//             <img  src={img4} className="d-block w-full h-[500px] object-contain bg-gray-200" alt="Slide 4" />
//           </div>
//         </div>

//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#mainCarousel"
//           data-bs-slide="prev"
//         >
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Previous</span>
//         </button>

//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#mainCarousel"
//           data-bs-slide="next"
//         >
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;

