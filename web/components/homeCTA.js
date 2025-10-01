import { base } from "../service/serviceConfig";
import Link from 'next/link';
import { useLocalizedUrl } from "../utils/languageUtils";
import Button from "./common/Button";

export default function HomeCTA({ data }) {
  const getUrl = useLocalizedUrl();
  return (
    <section className="max-w-7xl mx-auto lg:px-6 sm:px-4 px-2 sm:py-10 py-4 md:py-16 ">
      <div className="rounded-2xl bg-blue-600 text-white md:px-16 sm:px-8 py-10 px-5 group hover:bg-blue-700 transition-colors duration-300">
        {data?.map((item, index) => {
          const url = item.image?.url;
          return (
            <div key={index} className="grid sm:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <div>
                  <Link
                    href={"#"}
                    className="cursor-pointer text-white text-md border border-white rounded-full px-4 py-2 hover:opacity-80 transition-opacity duration-200 inline-block"
                  >
                    {item?.topTitle}
                  </Link>
                  <h3 className="md:text-3xl text-2xl lg:text-4xl md:font-medium font-normal md:mt-8 mt-4 max-w-md group-hover:opacity-95 transition-opacity duration-300">
                    {item?.title}
                  </h3>

                  <p className="text-sm opacity-90 mt-4 group-hover:opacity-100 transition-opacity duration-300">{item?.subTitle}</p>
                  <div className="flex justify-center sm:hidden ">
                    {url ? (
                      <img
                        width={200}
                        height={200}
                        src={`${url.startsWith("http") ? "" : base}${url}`}
                        alt={item?.name}
                        className="hover:opacity-90 transition-opacity duration-200"
                      />
                    ) : (
                      <div className="text-gray-600 group-hover:opacity-80 transition-opacity duration-200">{item?.name}</div>
                    )}
                  </div>
                  <div className="sm:flex sm:gap-5 gap-2 md:mt-8 sm:mt-4 mt-3 space-y-3">
                    {item?.btnBottomContentBlock?.map((btn) => (
                       <div key={btn.id}>
                        <Button href={getUrl(btn.url)} label={btn?.label} target={btn.url?.startsWith("http") ? "_blank" : "_self"} variant="elevated">
                          {btn?.label}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="justify-end items-center sm:flex hidden">
                <div className="group-hover:opacity-95 transition-opacity duration-300 overflow-hidden">   
                {url ? (
                  <img
                    width={320}
                    height={320}
                    src={`${url.startsWith("http") ? "" : base}${url}`}
                    alt={item?.name}
                    className="transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                ) : (
                  <div className="text-gray-600 group-hover:opacity-80 transition-opacity duration-200">{item?.name}</div>
                )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
