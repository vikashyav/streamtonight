import React, { useState, useEffect, useRef } from "react";

const images = [
  "https://via.placeholder.com/1200x800", // replace with your image URLs
  "https://via.placeholder.com/1200x800",
  "https://via.placeholder.com/1200x800",
  "https://via.placeholder.com/1200x800",
  "https://via.placeholder.com/1200x800",
];

const thumbnails = [
  "https://via.placeholder.com/150", // thumbnails, smaller versions of the main images
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
];

const ImgGallery = ({images}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Track index of selected image
  const [isAutoSliding, setIsAutoSliding] = useState(true); // Manage auto sliding
  const thumbnailRef = useRef(null); // Reference for thumbnail container
  const [isFullScreen, setIsFullScreen] = useState(false); // Track if full-screen modal is open


  // Function to handle image change when a thumbnail is clicked
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setIsAutoSliding(false); // Stop auto sliding when thumbnail is clicked
  };

  
  // Open image in full-screen mode
  const openFullScreen = () => {
    setIsFullScreen(true);
  };

  // Close the full-screen modal
  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  // Automatically change image after a specified time interval (e.g., 3 seconds)
  useEffect(() => {
    if (!isAutoSliding) return; // Stop auto sliding if it's disabled

    const autoSlideInterval = setInterval(() => {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(autoSlideInterval); // Cleanup on component unmount
  }, [isAutoSliding]);

    // Scroll the selected thumbnail into view
    useEffect(() => {
        const selectedThumbnail = document.querySelector(`#thumb-${selectedImageIndex}`);
        if (selectedThumbnail && thumbnailRef.current) {
          const thumbnailContainer = thumbnailRef.current;
          const containerWidth = thumbnailContainer.offsetWidth;
          const thumbnailOffset = selectedThumbnail.offsetLeft + selectedThumbnail.offsetWidth / 2;
          const scrollPos = thumbnailOffset - containerWidth / 2;
    
          thumbnailContainer.scroll({
            left: scrollPos,
            behavior: "smooth",
          });
        }
      }, [selectedImageIndex]);
    
  return (
    <div className={`container mx-auto px-4 sm:px-1 ${isFullScreen && "fixed top-0 max-w-full max-h-full sm:max-h-[98vh] bg-black bg-opacity-90 z-10 "}`}>
      <h1 className="text-3xl font-bold text-center mb-6 sm:mb-1 ">Auto-Sliding Image Gallery</h1>

      {/* Display Selected Image */}
      <div className="relative overflow-hidden rounded-lg mb-6 sm:mb-1 cursor-pointer z-20"
      >
        {isFullScreen && 
         <button
         onClick={closeFullScreen}
         className="absolute top-5 right-5 text-white text-3xl font-bold z-30"
       >
         &times;
       </button>
        }
     
        <img
          src={images[selectedImageIndex]?.original} // Display the currently selected image
          alt="Selected"
       onClick={openFullScreen}
          className={`w-full ${isFullScreen ? "h-[70vh] " : "h-96"} object-contain transition-transform duration-300 bg-black`}
        />
      </div>

      {/* Thumbnails grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-4 */}

      <div
        //   no-scrollbar
        className="flex overflow-x-auto  justify-center mb-4 sm:mb-1  "
        ref={thumbnailRef}
      >
        {images.map((thumb, index) => (
          <div
            key={index}
            id={`thumb-${index}`}
            onClick={() => handleThumbnailClick(index)} // Set main image on click
            className={`cursor-pointer border-2 mx-2 min-w-[200px] sm:min-w-[100px] ${
              selectedImageIndex === index ? "border-blue-500" : "border-transparent"
            } hover:border-blue-500 rounded-lg overflow-hidden transition-all`}
          >
            <img
              src={thumb?.thumbnail}
              alt={`Thumbnail ${index + 1}`}
              className="min-w-[200px] sm:min-w-[100px]"
            />
          </div>
        ))}
      </div>


      {/* Auto Slide Controls */}
      <div className="flex justify-center mt-4 sm:mt-2">
        <button
          className={`px-4 py-2 ${isAutoSliding ? "bg-blue-500" : "bg-gray-500"} text-white rounded-lg mr-4`}
          onClick={() => setIsAutoSliding(true)} // Resume auto sliding
        >
          Start Auto Slide
        </button>
        <button
        //   className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        className={`px-4 py-2 ${!isAutoSliding ? "bg-blue-500" : "bg-gray-500"} text-white rounded-lg mr-4`}

          onClick={() => setIsAutoSliding(false)} // Pause auto sliding
        >
          Stop Auto Slide
        </button>
      </div>
    </div>
  );
};

export default ImgGallery;
