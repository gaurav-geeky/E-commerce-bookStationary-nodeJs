import React from "react";
import img1 from "../images/home/book1.jpg";
import img2 from "../images/home/books1.png";
import img3 from "../images/home/books2.png";
import img4 from "../images/home/pencil.png";
import img5 from "../images/home/stationary.png";

const Slider = () => {
  return (
    <section className="w-full bg-gray-200 py-6">

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 items-center px-4">

        {/* -------- LEFT QUOTE (Desktop only) -------- */}
        <div className="hidden lg:flex col-span-2 h-full items-center">
          <div className="bg-white shadow-lg rounded-xl p-4 text-center">
            <p className="italic text-gray-700 text-sm leading-relaxed">
              “A room without books is like a body without a soul.”
            </p>
            <span className="block mt-3 text-xs font-semibold text-gray-500">
              — Cicero
            </span>
          </div>
        </div>

        {/* -------- CENTER SLIDER -------- */}
        <div className="col-span-12 lg:col-span-8">
          <div
            id="mainCarousel"
            className="carousel slide rounded-xl overflow-hidden shadow-lg"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">

              {/* Slide 1 */}
              <div className="carousel-item active">
                <div className="bg-emerald-300 h-[250px] sm:h-[400px] lg:h-[550px] flex items-center justify-center">
                  <img
                    src={img1}
                    className="max-h-full max-w-full object-contain"
                    alt="Slide 1"
                  />
                </div>
              </div>

              {/* Slide 2 */}
              <div className="carousel-item">
                <div className="bg-sky-200 h-[250px] sm:h-[400px] lg:h-[550px] flex items-center justify-center">
                  <img src={img2} className="max-h-full object-contain" alt="Slide 2" />
                </div>
              </div>

              {/* Slide 3 */}
              <div className="carousel-item">
                <div className="bg-orange-200 h-[250px] sm:h-[400px] lg:h-[550px] flex items-center justify-center">
                  <img src={img3} className="max-h-full object-contain" alt="Slide 3" />
                </div>
              </div>

              {/* Slide 4 */}
              <div className="carousel-item">
                <div className="bg-purple-200 h-[250px] sm:h-[400px] lg:h-[550px] flex items-center justify-center">
                  <img src={img4} className="max-h-full object-contain" alt="Slide 4" />
                </div>
              </div>

              {/* Slide 5 */}
              <div className="carousel-item">
                <div className="bg-yellow-200 h-[250px] sm:h-[400px] lg:h-[550px] flex items-center justify-center">
                  <img src={img5} className="max-h-full object-contain" alt="Slide 5" />
                </div>
              </div>

            </div>

            {/* Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#mainCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#mainCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" />
            </button>
          </div>
        </div>

        {/* -------- RIGHT CTA (Desktop only) -------- */}
        <div className="hidden lg:flex col-span-2 h-full items-center">
          <div className="bg-white shadow-lg rounded-xl p-4 w-full text-center space-y-4">
            <button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded-lg font-semibold transition">
              🛒 Shop Now
            </button>
            <button className="w-full border border-gray-800 hover:bg-gray-800 hover:text-white py-2 rounded-lg font-semibold transition">
              📚 Explore New Arrivals
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Slider;




// import React from 'react'
// import img1 from "../images/home/book1.jpg";
// import img2 from "../images/home/books1.png";
// import img3 from "../images/home/books2.png";
// import img4 from "../images/home/pencil.png";
// import img5 from "../images/home/stationary.png";

// const Slider = () => {
//   return (
//     <>
//       {/* ------------------ HERO CAROUSEL ------------------ */}
//       <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
//         <div  className="carousel-inner ">

//           <div className="carousel-item active  bg-emerald-300">
//             <img src={img1} className="d-block w-full h-[250px] sm:h-[400px] lg:h-[550px] object-contain bg-white" alt="Slide 1" />
//           </div>

//           <div className="carousel-item">
//             <img src={img2} className="d-block w-full h-[250px] sm:h-[400px] lg:h-[550px] object-contain bg-white" alt="Slide 2" />
//           </div>

//           <div className="carousel-item">
//             <img src={img3} className="d-block w-full h-[250px] sm:h-[400px] lg:h-[550px] object-contain bg-white" alt="Slide 3" />
//           </div>

//           <div className="carousel-item">
//             <img src={img4} className="d-block w-full h-[250px] sm:h-[400px] lg:h-[550px] object-contain bg-white" alt="Slide 4" />
//           </div>

//           <div className="carousel-item">
//             <img src={img5} className="d-block w-full h-[250px] sm:h-[400px] lg:h-[550px] object-contain bg-white" alt="Slide 4" />
//           </div>

//         </div>

//         <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
//           <span className="carousel-control-prev-icon " aria-hidden="true"> </span>
//         </button>

//         <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
//           <span className="carousel-control-next-icon" aria-hidden="true">  </span>
//         </button>
//       </div>

//     </>
//   )
// }

// export default Slider; 



