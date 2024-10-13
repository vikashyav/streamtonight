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

const ImageGallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Track index of selected image
  const [isAutoSliding, setIsAutoSliding] = useState(true); // Manage auto sliding
  const [isFullScreen, setIsFullScreen] = useState(false); // Track if full-screen modal is open
  const thumbnailRef = useRef(null); // Reference for thumbnail container

  // Function to handle image change when a thumbnail is clicked
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setIsAutoSliding(false); // Stop auto sliding when thumbnail is clicked
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

  // Open image in full-screen mode
  const openFullScreen = () => {
    setIsFullScreen(true);
  };

  // Close the full-screen modal
  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Auto-Sliding Image Gallery</h1>

      {/* Display Selected Image */}
      <div className="relative overflow-hidden rounded-lg mb-6 cursor-pointer" onClick={openFullScreen}>
        <img
          src={images[selectedImageIndex]} // Display the currently selected image
          alt="Selected"
          className="w-full h-96 object-cover transition-transform duration-300"
        />
      </div>

      {/* Thumbnails - Scrollable Row */}
      <div
        className="flex overflow-x-auto no-scrollbar justify-center mb-4"
        ref={thumbnailRef}
      >
        {thumbnails.map((thumb, index) => (
          <div
            key={index}
            id={`thumb-${index}`}
            onClick={() => handleThumbnailClick(index)} // Set main image on click
            className={`cursor-pointer border-2 mx-2 ${
              selectedImageIndex === index ? "border-blue-500" : "border-transparent"
            } hover:border-blue-500 rounded-lg overflow-hidden transition-all`}
          >
            <img
              src={thumb}
              alt={`Thumbnail ${index + 1}`}
              className="w-24 h-24 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Auto Slide Controls */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-4"
          onClick={() => setIsAutoSliding(true)} // Resume auto sliding
        >
          Start Auto Slide
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          onClick={() => setIsAutoSliding(false)} // Pause auto sliding
        >
          Stop Auto Slide
        </button>
      </div>

      {/* Full-Screen Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center">
          <button
            onClick={closeFullScreen}
            className="absolute top-5 right-5 text-white text-3xl font-bold"
          >
            &times;
          </button>
          <img
            src={images[selectedImageIndex]} // Display full-screen version of the image
            alt="Full Screen"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
