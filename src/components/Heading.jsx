import React from 'react'

function Heading({ title }) {
  return (
    <div className="w-full px-4">
      <h1 className="font-integral text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold text-center py-6 sm:py-8 lg:py-12 text-black leading-tight uppercase tracking-tight">
        {title}
      </h1>
    </div>
  )
}

export default Heading