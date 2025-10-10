import React, { useState } from "react";
import { X } from "lucide-react";
import RevealAnimation from "./RevealAnimation";

const galleryImages = [
  {
    id: 1,
    src: "https://tse2.mm.bing.net/th/id/OIP.S0F9fFQRoqd4VyuRR6q8iAHaE9?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Rajgad Fort Trek",
    location: "Maharashtra - Pune",
  },
  {
    id: 2,
    src: "https://nomadsofindia.com/wp-content/uploads/2023/04/Kalsubai-Trek-2.jpg",
    alt: "Kalsubai Peak",
    location: "Maharashtra - Highest Peak",
  },
  {
    id: 3,
    src: "https://harishchandragad.in/wp-content/uploads/2022/04/IMG_20201029_114832-scaled.jpg",
    alt: "Harishchandragad Trek",
    location: "Maharashtra - Ahmednagar",
  },
  {
    id: 4,
    src: "https://www.holidify.com/images/bgImages/RAJMACHI.jpg",
    alt: "Rajmachi Fort",
    location: "Maharashtra - Lonavala",
  },
  {
    id: 5,
    src: "https://tse2.mm.bing.net/th/id/OIP.o7IOpWYcTexStqlegb0h5wHaEc?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Sahyadri Mountain Range",
    location: "Maharashtra - Western Ghats",
  },
  {
    id: 6,
    src: "https://pbs.twimg.com/media/FDKAXTOVQAQOZOn.jpg:large",
    alt: "Monsoon Treks",
    location: "Maharashtra - Raigad",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealAnimation animationType="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Photo <span className="text-orange-600">Gallery</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the stunning landscapes of Maharashtra's trekking
              destinations
            </p>
          </div>
        </RevealAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <RevealAnimation
              key={image.id}
              animationType="zoomIn"
              delay={index * 100}
            >
              <div
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-lg">{image.alt}</h3>
                    <p className="text-sm text-gray-200">{image.location}</p>
                  </div>
                </div>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg"
            />
            <div className="text-white mt-4 text-center">
              <h3 className="text-2xl font-bold">{selectedImage.alt}</h3>
              <p className="text-gray-300">{selectedImage.location}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
