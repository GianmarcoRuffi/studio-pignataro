export default function Slider() {
  return (
    
<div><div className="slideshow-container">
    
    {/* <!-- Full-width images with number and caption text --> */}
    <div className="mySlides fade">
      <div className="numbertext">1 / 3</div>
      <img src="/Home/01.jpg"/>
      <div className="text">Caption Text</div>
    </div>
  
    <div className="mySlides fade">
      <div className="numbertext">2 / 3</div>
      <img src="/Home/01.jpg"/>
      <div className="text">Caption Two</div>
    </div>
  
    <div className="mySlides fade">
      <div className="numbertext">3 / 3</div>
      <img src="/Home/01.jpg"/>
      <div className="text">Caption Three</div>
    </div>
  
    {/* <!-- Next and previous buttons --> */}
    <a className="prev">&#10094;</a>
    <a className="next">&#10095;</a>
  </div>
  <br/></div>
  
    
    
 


  );
}