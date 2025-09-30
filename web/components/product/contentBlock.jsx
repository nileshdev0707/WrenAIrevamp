import React, { useState } from "react";
import { base } from "../../service/serviceConfig";
import Button from "../common/Button";
import { useLocalizedUrl } from "../../utils/languageUtils";

export default function ProductHero({ product }) {
  const [openIds, setOpenIds] = useState([]);

  const toggle = (id) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((openId) => openId !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };
  const getUrl = useLocalizedUrl();
  return (
    <div>
      {product?.map((item, index) => {
        const url = item?.image?.url;
        const image = item?.image;
        const isRightAligned = item?.alignment === "right";
        return (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 xl:gap-10 gap-5 pt-20 md:pb-16 xl:px-0 px-5"
          >
            <div
              className={`xl:px-10 px-5 order-1 ${
                isRightAligned ? "md:order-2" : "md:order-1 md:text-left"
              }`}
            >
              <h2 className="text-blue-600 text-sm font-semibold">
                {item.badge}
              </h2>
              <h1 className="text-2xl md:text-3xl xl:text-4xl font-medium leading-tight mt-5">
                {item.title}
              </h1>
              <p className="text-gray-600 text-sm mt-4 pb-8">{item.subtitle}</p>
              <div dangerouslySetInnerHTML={{ __html: item.description }} />  
              <div className="flex flex-col sm:flex-row gap-2">
                {item?.contentBlockButton?.map((button, index) => (
                  <Button
                    key={index}
                    href={getUrl(button?.url)}
                    target={
                      button?.url?.startsWith("http") ? "_blank" : "_self"
                    }
                    className="mt-5"
                  >
                    {button?.label}
                  </Button>
                ))}
              </div>
            </div>

            <div
              className={`md:block hidden order-2  ${
                isRightAligned ? "md:order-1" : "md:order-2"
              }`}
            >
              {url ? (
                <div className="glow-effect">
                <img
                  src={`${url.startsWith("http") ? "" : base}${url}`}
                    alt={image?.name}
                    className=""
                  />
                </div>
              ) : (
                <div className="text-gray-600">{image?.name}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
