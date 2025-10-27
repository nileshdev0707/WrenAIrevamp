import Link from "next/link";
import { base } from "../../service/serviceConfig";
import Button from "../common/Button";

export default function BlogHero({ data, blogs }) {
  const featuredPost = blogs.find((post) => post.isFeatured) || blogs[0];

  return (
    <section className="pt-10 md:pt-16 sm::px-6 px-4">
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
          </div>
        );
      })}

      {featuredPost && (
        <div
          className="cursor-pointer sm:flex sm:gap-8 md:gap-10 md:px-10 gap-5 lg:pt-22 pt-10 lg:px-20"
          onClick={() => window.open(`/post/${featuredPost?.slug}`, "_self")}
        >
          <div className="w-full sm:w-1/2">
            {featuredPost?.featuredImage?.url ? (
              <div className=" flex flex-none justify-center">
                <img
                  src={`${
                    featuredPost.featuredImage.url.startsWith("http")
                      ? ""
                      : base
                  }${featuredPost.featuredImage.url}`}
                  alt={featuredPost?.featuredImage?.name}
                  className="lg:w-[628px] object-contain lg:h-[353px] rounded-2xl"
                />
              </div>
            ) : (
              <div className="text-gray-600">
                {featuredPost?.featuredImage?.name}
              </div>
            )}
          </div>
          <div className="sm:w-1/2">
            <button
              // key={index}  
              href={`/post/${featuredPost?.slug}`}
              label="Featured"
              className="btn bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white lg:mb-5 mb-3 mt-5 sm:mt-0 w-[101px] h-[38px]"
              
            >
              Featured
            </button>

            <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl font-medium lg:mb-5 mb-3 leading-tight">
              {featuredPost?.title}
            </h1>
            <p className="text-gray-500 text-base">{featuredPost?.excerpt}</p>
          </div>
        </div>
      )}
    </section>
  );
}
