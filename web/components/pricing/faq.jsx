import React, { useState } from "react";

export default function FAQ({ frequentlyAskedQuestions }) {
console.log("frequentlyAskedQuestions ==> ", frequentlyAskedQuestions);
  const [openIds, setOpenIds] = useState([]);

  const toggle = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // function to extract [Label] from question
  const parseLabelAndQuestion = (title) => {
    const match = title.match(/^\[(.*?)\]\s*(.*)$/);
    if (match) {
      return { label: match[1], question: match[2] };
    }
    return { label: null, question: title };
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 px-3">
      {/* Left Side Title */}
      <div className="col-span-2 sm:col-span-1">
        <h2 className="text-3xl md:text-4xl font-medium leading-tight text-center sm:text-left">
          Frequently <br /> Asked Questions
        </h2>
      </div>

      {/* Right Side Accordion */}
      <div className="col-span-2 space-y-5">
        {frequentlyAskedQuestions?.map((faq) => {
          const { label, question } = parseLabelAndQuestion(faq.title);

          return (
            <div
              key={faq.id}
              className="border-b border-gray-200 pb-5 cursor-pointer"
              onClick={() => toggle(faq.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {/* Label Tag */}
                  {label && (
                    <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      {label}
                    </span>
                  )}
                  <h3 className="text-base font-medium text-gray-900">
                    {question}
                  </h3>
                </div>
                <span
                  className={`inline-block w-2 h-2 border-r-2 border-b-2 border-gray-600 transform transition-transform duration-300 mt-1 ${
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
          );
        })}
      </div>
    </section>
  );
}
