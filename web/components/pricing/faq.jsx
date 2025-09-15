import React, { useState } from "react";


export default function FAQ({ frequentlyAskedQuestions }) {
    const [openIds, setOpenIds] = useState(frequentlyAskedQuestions?.map((faq) => faq.id)); // all open by default

    const toggle = (id) => {
      if (openIds.includes(id)) {
        setOpenIds(openIds.filter((openId) => openId !== id));
      } else {
        setOpenIds([...openIds, id]);
      }
    };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Left Side Title */}
    <div className="col-span-1">
      <h2 className="text-3xl md:text-4xl font-medium leading-tight">
        Frequently <br /> Asked Questions
      </h2>
    </div>

    {/* Right Side Accordion */}
    <div className="col-span-2 space-y-5">
      {frequentlyAskedQuestions?.map((faq) => (
        <div
          key={faq.id}
          className="border-b border-gray-200 pb-5 cursor-pointer"
          onClick={() => toggle(faq.id)}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-base font-medium text-gray-900">
              {faq.title}
            </h3>
            <span
              className={`inline-block w-2 h-2 border-r-2 border-b-2 border-gray-600 transform transition-transform duration-300 ${
                openIds.includes(faq.id) ? "rotate-45" : "-rotate-45"
              }`}
            ></span>
          </div>
          {openIds.includes(faq.id) && (
            <div
              className="mt-3 text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: faq.detail }}
            />
          )}
        </div>
      ))}
    </div>
  </section>
  )
}
