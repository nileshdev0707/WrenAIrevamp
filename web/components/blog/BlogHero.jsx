import Link from "next/link";
import { base } from "../../service/serviceConfig";
import Button from "../common/Button";

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
            <Link href={`/`}>
            <div className="sm:flex sm:gap-8 gap-5 lg:pt-22 pt-10 px-5">
              <div className="md:block hidden  w-1/2">
                {url ? (
                <div className="w-full h-full flex flex-none">
                    <img
                    src={`${url.startsWith("http") ? "" : base}${url}`}
                    alt={item?.image?.name}
                    className="w-auto object-contain h-full"
                  />
                  </div>
                ) : (
                  <div className="text-gray-600">{item?.image?.name}</div>
                )}
              </div>
              <div className="sm:w-1/2">
                <div className="flex gap-2">
                  {item.buttons.map((button, index) => (
                    <Button
                      key={index}
                      href={button?.url}
                      className="lg:mb-5 mb-3" 
                      variant={index === 0 ? "primary" : "gray"}
                      label={button?.label}
                    >
                      {button?.label}
                    </Button>
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
            </Link>
          </div>
        );
      })}
    </section>
  );
}
