import React from "react";
import { base } from "../../service/serviceConfig";
import { useLocalizedUrl } from "../../utils/languageUtils";
import Button from "../common/Button";

const PartnerEcosystem = ({data}) => {
    const getUrl = useLocalizedUrl();
    const industry = data?.ContentBlock || [];
    const partnerEcosystem = industry[2];
    const title = partnerEcosystem?.title ?? '';
    const partnerEcosystemUrl = partnerEcosystem?.image?.url;

    return (
        <div>
            <div className="text-center justify-center flex">
                         <div className="my-4 glow-effect justify-center inline-flex text-base items-center gap-2 rounded-full border border-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-white px-4 py-2 font-medium text-blue-700">
                                <div className="w-2 h-2 bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] rounded-full"></div>
                                <span className="text-black ">{partnerEcosystem?.badge}</span>
                            </div>
                        </div> 
                        <h1 className="text-center text-2xl max-w-3xl mx-auto sm:text-3xl md:text-4xl lg:text-[64px] font-medium leading-tight sm:mt-8 mt-5">
                                {title ? title.split(" ").map((word, i) =>
                                    word === "Data" || word === "Stack" ? (
                                        <span key={i} className="text-[#2F54EB]">
                                        {i === 0 ? "" : " "}{word}
                                        </span>
                                    ) : (
                                        <span key={i}>{i === 0 ? "" : " "}{word}</span>
                                    )
                            ) : null}
                        </h1>
                        <p className="fade-up mt-3 text-[#757575] text-base show max-w-[550px] mx-auto">
                            {partnerEcosystem?.subtitle}
                        </p>
                        <div className="fade-up lg:my-19 md:my-15 sm:my-10 my-5 show">
                            <img src={`${partnerEcosystemUrl.startsWith('http') ? '' : base} ${partnerEcosystemUrl}`} alt={partnerEcosystem?.title} />
                        </div>
                        <div className="fade-up px-6 lg:my-19 md:my-15 sm:my-10 my-5 show flex flex-col sm:flex-row justify-center">
                            <Button variant="primary" onClick={() => window.open(getUrl(partnerEcosystem?.contentBlockButton?.[0]?.url), "_self", "noopener,noreferrer")} className="cursor-pointer bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] hover:-translate-y-0.5   transition-all text-white font-semibold md:py-4 py-3 md:px-8 px-4 rounded-lg lg:text-lg md:text-md text-sm duration-200 shadow-lg hover:shadow-xl">
                                {partnerEcosystem?.contentBlockButton[0]?.label}
                            </Button>
                        </div>
        </div>
    );
};

export default PartnerEcosystem;