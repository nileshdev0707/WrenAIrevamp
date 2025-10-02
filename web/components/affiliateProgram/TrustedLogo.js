import React from 'react'
import { base} from '../../service/serviceConfig'
const TrustedLogo = ({data}) => {
  
  const trustedByData = data?.trustedBy ?? data ?? null;
console.log(trustedByData,'trustedByData');
  return (
    <div className='md:my-9 sm:my-5 my-3'>
      <div className='text-[#757575] text-center text-base font-medium uppercase'>
          Trusted by
      </div>
        <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-12 px-2  py-9 place-items-center'>
          {trustedByData.map((item, index) => (
            <div key={index} className='sm:px-12 sm:flex sm:flex-col sm:justify-center'>
               <img src={`${item?.image?.url.startsWith('http') ? '' : base}${item?.image?.url}`} alt={item?.title} />
            </div>
          ))}
        </div>
    </div>
  )
}

export default TrustedLogo