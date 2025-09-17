import { base } from "./service/axios";

export default function Footer({ data }) {
  return (
    <section className="max-w-6xl mx-auto py-10 md:py-16 xl:px-0 px-8">
      <div className="rounded-2xl bg-blue-600 text-white md:px-16 sm:px-8 py-10 px-5">
        {data?.map((item, index) => {
          const url = item.image?.url;
          return (
            <div key={index} className="grid sm:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <div>
                  {item?.topTitle && (
                    <a
                      href={"#"}
                      className="cursor-pointer text-white text-md border border-white rounded-full px-4 py-2"
                  >
                    {item?.topTitle}
                  </a>
                  )}
                  {item?.title && (
                    <h3 className="text-3xl lg:text-4xl font-medium mt-8">{item?.title}</h3>
                  )}
                  {item?.subTitle && (
                    <p className="text-sm opacity-90 mt-4">{item?.subTitle}</p>
                  )}
                  {item?.btnBottomContentBlock?.length && (
                  <div className="flex gap-5">
                    {item?.btnBottomContentBlock?.map((btn) => (
                      <a href={btn?.url} className="bg-white cursor-pointer mt-8 px-4.5 py-3 rounded-md text-blue-600 text-sm" key={btn.id}>
                        {btn?.label}
                      </a>
                    ))}
                  </div>
                  )}
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
