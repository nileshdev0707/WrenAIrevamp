import React from "react";

export default function ContactHero({ contact }) {
  return (
    <section className="py-10 sm:py-16 text-center">
      {contact?.map((item, index) => (
        <div key={index}>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight pt-10 sm:pt-25">
            {item?.title}
          </h1>

          <p className="pt-10 max-w-2xl mx-auto text-black xl:text-xl lg:text-lg text-base">
            {item?.subtitle}
          </p>
        </div>
      ))}
    </section>
  );
}
