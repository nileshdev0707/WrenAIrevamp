import React from 'react'

const TrustedLogo = () => {
  const data = [
    {
      image: '/image/kdan.png',
      name: 'Logo 1'
    },
    {
      image: '/image/motork.png',
      name: 'Logo 2'
    },
    {
      image: '/image/uber.png',
      name: 'Logo 3'
    },
    {
      image: '/image/osklly.png',
      name: 'Logo 4'
    },
    {
      image: '/image/dsw.png',
      name: 'Logo 5'
    },
    {
      image: '/image/broadcom.png',
      name: 'Logo 6'
    },
    {
      image: '/image/impactbene.png',
      name: 'Logo 7'
    },
    {
      image: '/image/henkel.png',
      name: 'Logo 8'
    },
    {
      image: '/image/iqvia.png',
      name: 'Logo 9'
    },
    {
      image: '/image/applid.png',
      name: 'Logo 10'
    }
  ]
  return (
    <div className='md:my-9 sm:my-5 my-3'>
      <div className='text-[#757575] text-center text-base font-medium uppercase'>
          Trusted by
      </div>
        <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-12 px-2  py-9'>
          {data.map((item, index) => (
            <div key={index} className='sm:px-12 sm:flex sm:flex-col sm:justify-center'>
              <img src={item.image} alt={item.name} className=''/>
            </div>
          ))}
        </div>
    </div>
  )
}

export default TrustedLogo