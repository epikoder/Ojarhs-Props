import React from 'react'

function DashCards({name, lengths}) {
  return (
    <div className={`px-8 py-4 space-y-3  justify-self-auto `}>
      <h1 className='uppercase text-white text-lg'> {name}</h1>
      <h1 className="text-white text-3xl "> {lengths} </h1>
      <button className='rounded-full px-4 py-1 bg-white '>View All</button>
    </div>
  )
}

export default DashCards