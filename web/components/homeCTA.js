import { base } from "./service/axios";

export default function HomeCTA({ data }) {
    return (
      <section className="max-w-7xl mx-auto lg:px-6 sm:px-4 px-2 sm:py-10 py-8 md:py-16 ">
        <div className="rounded-2xl bg-blue-600 text-white md:px-16 sm:px-8 py-10 px-5">
          {data?.map((item, index) => {
            const url = item.image?.url;
            return (
              <div key={index} className="grid sm:grid-cols-2 gap-8">
                <div className="flex flex-col justify-center">
                  <div>
                    <a
                      href={"#"}
                      className="cursor-pointer text-white text-md border border-white rounded-full px-4 py-2"
                    >
                      {item?.topTitle}
                    </a>
                    <h3 className="md:text-3xl text-2xl lg:text-4xl md:font-medium font-normal md:mt-8 mt-4 max-w-md">{item?.title}</h3>
                  
                    <p className="text-sm opacity-90 mt-4">{item?.subTitle}</p>
                    <div className="flex justify-center sm:hidden ">
                  {url ? (
                    <img
                      width={200}
                      height={200}
                      src={`${url.startsWith("http") ? "" : base}${url}`}
                      alt={item?.name}
                    />
                  ) : (
                    <div className="text-gray-600">{item?.name}</div>
                  )}
                </div>
                      <div  className="sm:flex sm:gap-5 gap-2">
                    {item?.btnBottomContentBlock?.map((btn) => (
                       <div key={btn.id}> 
                         <button className="bg-white w-full sm:w-fit cursor-pointer md:mt-8 sm:mt-4 mt-3 px-4.5 py-3 rounded-md text-blue-600 text-sm">
                          {btn?.label}
                        </button>
                        </div>
                    ))}
                      </div>
                      
                  </div>
                </div>
                <div className="justify-end items-center sm:flex hidden">
                  {url ? (
                    <img
                      width={320}
                      height={320}
                      src={`${url.startsWith("http") ? "" : base}${url}`}
                      alt={item?.name}
                    />
                  ) : (
                    <div className="text-gray-600">{item?.name}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  