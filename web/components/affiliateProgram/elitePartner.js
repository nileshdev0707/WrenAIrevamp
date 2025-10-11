import React, { useState,useEffect, useRef } from 'react'
import Link from 'next/link';
import FrequentlyQuestions from './frequentlyQuestions'
import HomeCTA from '../homeCTA'
import { base } from '../../service/serviceConfig'
import { useRouter } from 'next/router';

const ElitePartner = ({data, tab}) => {
  const router = useRouter();
  const eliteRef = useRef(null)
  const affiliateRef = useRef(null)
  const elitePartnerData = data
  const [activeTab, setActiveTab] = useState(elitePartnerData?.CloudElitePartners?.[0]?.title)

  const words = elitePartnerData?.CloudElitePartners?.[0]?.subtitle?.split(" ");
  const firstPart1 = words?.slice(0, 2).join(" ");
  const secondPart1 = words?.slice(2).join(" ");

  const words2 = elitePartnerData?.CloudElitePartners?.[1]?.subtitle?.split(" ") || [];
  const firstPart2 = words2.slice(0, 1).join(" ");; 
  const centerPart2 = words2.slice(1, 3).join(" "); // "20% commission"
  const lastPart2 = words2.slice(3).join(" ");      // "as an affiliate"

  const elitePerks = data?.CloudElitePartners?.[0]?.CloudElitePartnersItems;

  const affiliatePerks = data?.CloudElitePartners?.[1]?.CloudElitePartnersItems;
  const frequentlyAskedQuestions = data?.CloudElitePartners?.[1]?.FrequentlyAskedQuestions;
  const eliteFrequentlyAskedQuestions = data?.CloudElitePartners?.[0]?.FrequentlyAskedQuestions;

  useEffect(() => {
    setActiveTab(elitePartnerData?.CloudElitePartners?.[0]?.title)
  }, [elitePartnerData])

  const currentPerks = activeTab === elitePartnerData?.CloudElitePartners?.[0]?.title ? elitePerks : affiliatePerks
  const affiliatePartner = elitePartnerData?.AffiliatePartner?.[0]
  const affiliatePartnerUrl = affiliatePartner?.images;

  const eliteTitle = elitePartnerData?.CloudElitePartners?.[0]?.title;
  const affiliateTitle = elitePartnerData?.CloudElitePartners?.[1]?.title;
  // Sync tab with URL
  useEffect(() => {
    if (tab === "elite") setActiveTab(eliteTitle);
    else if (tab === "affiliate") setActiveTab(affiliateTitle);
    else setActiveTab(eliteTitle);
  }, [tab]);

   // Scroll to section when tab changes
   useEffect(() => {
    const ref = activeTab === eliteTitle ? eliteRef : affiliateRef;
    if (ref.current) {
      const top = ref.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
    if (activeTab === eliteTitle) {
      router.replace({ pathname: router.pathname, query: { ...router.query, tab: "elite" } }, undefined, { shallow: true });
    } else if (activeTab === affiliateTitle) {
      router.replace({ pathname: router.pathname, query: { ...router.query, tab: "affiliate" } }, undefined, { shallow: true });
    }
  }, [activeTab]);

  return (
    <div ref={activeTab === elitePartnerData?.CloudElitePartners?.[0]?.title ? eliteRef : affiliateRef} >
    <div className="bg-white md:py-16 sm:py-10 py-5 px-4 sm:px-6 lg:px-0">
      <div className="">
        {/* Tab Buttons */}
        <div className="flex justify-center md:mb-12 mb-6">
          <div className="flex border-gray-100 border rounded-lg md:p-2 p-1 gap-2">
            {elitePartnerData?.CloudElitePartners?.map((item, index) => (
              <button
              key={index}
                onClick={() => setActiveTab(item?.title)}
                className={`cursor-pointer md:px-6 sm:px-3 px-2 py-3  font-regular transition-all duration-200 ${
                  activeTab === item?.title
                    ? 'bg-blue-600 text-white rounded-lg shadow-lg text-normal'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {item?.title}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="text-center md:mb-16 sm:mb-10 mb-5">
            <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold text-gray-900">
              { activeTab === elitePartnerData?.CloudElitePartners?.[0]?.title ? (
                <>
                      <span>{firstPart1}</span>
                      <span className="text-blue-600"> {secondPart1}</span>
               </>
              ) : (
                <>
                  <span>{firstPart2}</span>
                  <span className="text-blue-600"> {centerPart2}</span>
                  <span> {lastPart2}</span>
                </>
              )}
            </h1>
        </div>

        {/* Perks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8  gap-6 max-w-6xl mx-auto">
          {currentPerks?.map((perk, index) => (
            <PerkCard key={index} perk={perk} />
          ))}
        </div>
        {activeTab === elitePartnerData?.CloudElitePartners?.[1]?.title && (
          <>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:my-15 sm:my-10 my-5 sm:px-4 ">
              <button
                onClick={() => window.open('https://partners.getwren.ai/signup', '_blank')}
                className="cursor-pointer bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] hover:-translate-y-0.5 transition-all text-white font-semibold md:py-4 py-3 md:px-8 px-4 rounded-lg lg:text-lg md:text-md text-sm duration-200 shadow-lg hover:shadow-xl"
              >
                Register Now
              </button>
              <button
                onClick={() => window.open('https://partners.getwren.ai/', '_blank')}
                className="cursor-pointer bg-[#F5F5F5] text-black hover:-translate-y-0.5 transition-all font-semibold md:py-4 py-3 md:px-8 px-4 rounded-lg lg:text-lg md:text-md text-sm duration-200 shadow-lg hover:shadow-xl"
              >
                Affiliate Dashboard
              </button>
            </div>
            <FrequentlyQuestions frequentlyAskedQuestions={frequentlyAskedQuestions} />
          </>
        )}
          {activeTab === elitePartnerData?.CloudElitePartners?.[0]?.title && (
         <div>
          <div className='bg-[#F7FBFE] lg:mt-20 sm:mt-10 mt-5'>
            <div className='max-w-[1400px] mx-auto lg:py-20 md:py-10 py-5 px-4'>

              <div className='text-center max-w-2xl mx-auto'>
                <h2 className='lg:text-[42px] md:text-[32px] text-[28px] font-medium text-[#1E1E1E]'>
                 {affiliatePartner?.headline}
              </h2>
              </div>
              <div className="flex flex-wrap justify-center lg:gap-6 md:gap-4 gap-3 lg:my-20 md:my-10 sm:my-8 my-5">
                {affiliatePartnerUrl?.map(({image, url},i) => (
                  <Link href={url} className='bg-white p-5 flex gap-6 justify-center md:rounded-[16px] rounded-[10px] border border-[#D9D9D9] lg:h-[139px] md:h-[110px] sm:h-[90px] h-[80px] lg:w-[302px] md:w-[250px] sm:w-[200px]' key={i}>
                    <img className='w-[200px] object-contain h-auto' src={`${image?.url?.startsWith('http') ? '' : base}${image?.url}`} alt={image?.title}/>
                  </Link>
                ))}
                      
              </div>
              <div className='flex flex-col sm:flex-row justify-center'>
                <button onClick={() => window.open(affiliatePartner?.button?.url, '_self')} className='cursor-pointer bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] hover:-translate-y-0.5 transition-all text-white font-semibold md:py-4 py-3 md:px-8 px-4 rounded-lg lg:text-lg md:text-md text-sm duration-200 shadow-lg hover:shadow-xl'>
                  {affiliatePartner?.button?.label}
                </button>
                </div>
            </div>
              
          </div>
          <FrequentlyQuestions frequentlyAskedQuestions={eliteFrequentlyAskedQuestions} />
         </div>
        )}
          <HomeCTA data={elitePartnerData?.bottomBlock} tab={tab}/>
      </div>
    </div>
    </div>
  )
}

const PerkCard = ({ perk }) => {
  const perkUrl = perk?.logo[0]?.url;
  console.log("perkUrl ==> ", perkUrl);
  return (
    <div className="bg-white transition-shadow duration-300 flex flex-col items-center sm:items-start  sm:border-0  border sm:border-transparent border-gray-200 sm:rounded-none rounded-md p-4">
      {/* Icon */}
      <div className="md:w-12 md:h-12 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center sm:mb-8.5 mb-4">
      <img src={`${perkUrl.startsWith('http') ? '' : base}${perkUrl}`} alt={perk?.title} />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-[#1E1E1E] md:mb-4 mb-2 text-center sm:text-left">
        {perk?.title}
      </h3>

      {/* Description */}
      <p className="text-[#757575] leading-relaxed text-center sm:text-left">
        {perk.detail}
      </p>
    </div>
  )
}

export default ElitePartner
