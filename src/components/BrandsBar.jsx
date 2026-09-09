import React from 'react'
import img1 from '../assets/brands/1.png'
import img2 from '../assets/brands/2.png'
import img3 from '../assets/brands/3.png'
import img4 from '../assets/brands/4.png'
import img5 from '../assets/brands/5.png'

function BrandsBar() {
  const brands = [img1, img2, img3, img4, img5];

  return (
    <div className="bg-black py-4 sm:py-6 px-4 w-full">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-6 lg:gap-8">
        {brands.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Brand ${index + 1}`}
            className="h-4 xs:h-5 sm:h-6 md:h-7 w-auto object-contain transition-all duration-300"
          />
        ))}
      </div>
    </div>
  )
}

export default BrandsBar