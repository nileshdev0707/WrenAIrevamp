import React from "react";
import { base } from "../../service/serviceConfig";

const Industry = ({ data }) => {

    const industry = data?.ContentBlock || [];
    const industry0 = industry[0] || {};
    const industry1 = industry[1] || {};

    const industry0Url = industry0?.image?.url;
    const industry1Url = industry1?.image?.url;
    const title = industry0?.title ?? '';

    return (
        <div className="bg-white rounded-2xl lg:my-18 md:my-15 sm:my-10 my-6">
                    <div className="text-center justify-center flex">
                        <div className="my-4 justify-center inline-flex text-base items-center gap-2 rounded-full border border-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-white px-4 py-2 font-medium text-blue-700">
                                <div className="w-2 h-2 bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] rounded-full"></div>
                                <span className="text-black ">{industry0?.badge}</span>
                            </div>
                        </div>  
                        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-[64px] font-medium leading-tight sm:mt-8 mt-5">
                                {title ? title.split(" ").map((word, i) =>
                                    word === "Industry" || word === "Leaders" ? (
                                        <span key={i} className="text-[#2F54EB]">
                                        {i === 0 ? "" : " "}{word}
                                        </span>
                                    ) : (
                                        <span key={i}>{i === 0 ? "" : " "}{word}</span>
                                    )
                            ) : null}
                        </h1>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 md:my-15 sm:my-10 my-5">
                            <div>
                                 <div>
                                <img src={`${industry0Url.startsWith('http') ? '' : base} ${industry0Url}`} alt={industry0?.title} />
                                </div> 
                                <div dangerouslySetInnerHTML={{
            __html: industry0.description
          }} />
                            </div>
                            
                        <div>
                            <div>
                               <img src={`${industry1Url.startsWith('http') ? '' : base} ${industry1Url}`} alt={industry1?.title} />
                            </div> 
                            <div dangerouslySetInnerHTML={{
            __html: industry1.description
          }} />

                        </div>
                        
                    </div>    
            </div> 
    );
};

export default Industry;