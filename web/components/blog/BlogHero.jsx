import { base } from "../../service/serviceConfig";

export default function BlogHero({ data }) {
  return (
    <section className="py-10 md:py-16">
      {data?.map((item, index) => {
        const words = item?.title?.split(" ");
        const firstPart = words.slice(0, 3).join(" ");
        const secondPart = words.slice(3).join(" ");
        const url = item?.image?.url;
        return (
          <div key={index}>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
                <span>{firstPart}</span>&nbsp;
                <span className="text-blue-600">{secondPart}</span>
              </h1>
              <p className="mt-5 max-w-3xl mx-auto text-black xl:text-xl lg:text-lg text-base">
                {item?.subtitle}
              </p>
            </div>
            <div className="grid md:grid-cols-2 xl:gap-10 gap-5 lg:pt-22 pt-10 px-5">
              <div className="md:block hidden">
                {url ? (
                  <img
                    src={`${url.startsWith("http") ? "" : base}${url}`}
                    alt={item?.image?.name}
                  />
                ) : (
                  <div className="text-gray-600">{item?.image?.name}</div>
                )}
              </div>
              <div>
                <div className="flex gap-2">
                  {item.buttons.map((button, index) => (
                    <a
                      key={index}
                      href={button?.url}
                      className="btn bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white lg:mb-5 mb-3"
                    >
                      {button?.label}
                    </a>
                  ))}
                </div>
                <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl font-medium lg:mb-5 mb-3 leading-tight">
                  {item?.FeaturedTitle}
                </h1>
                <p className="text-gray-500 text-base">
                  {item?.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
