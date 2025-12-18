import React from 'react'
import img1 from "../images/home/book1.jpg";
import img2 from "../images/home/books1.png";
import img3 from "../images/home/books2.png";
import img4 from "../images/home/pencil.png";
import img5 from "../images/home/stationary.png";

const Slider = () => {
  return (
    <>

     {/* ------------------ HERO CAROUSEL ------------------ */}
          <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
    
              <div className="carousel-item active">
                <img src={img1} className="d-block w-full h-[250px] sm:h-[400px] lg:h-[500px] object-contain bg-white" alt="Slide 1" />
              </div>
    
              <div className="carousel-item">
                <img src={img2} className="d-block w-full h-[250px] sm:h-[400px] lg:h-[500px] object-contain bg-white" alt="Slide 2" />
              </div>
    
              <div className="carousel-item">
                <img src={img3} className="d-block w-full h-[250px] sm:h-[400px] lg:h-[500px] object-contain bg-white" alt="Slide 3" />
              </div>
    
              <div className="carousel-item">
                <img src={img4} className="d-block w-full h-[250px] sm:h-[400px] lg:h-[500px] object-contain bg-white" alt="Slide 4" />
              </div>
    
              <div className="carousel-item">
                <img src={img5} className="d-block w-full h-[250px] sm:h-[400px] lg:h-[500px] object-contain bg-white" alt="Slide 4" />
              </div>
    
            </div>
    
            <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
    
            <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
      
    </>
  )
}

export default Slider; 
