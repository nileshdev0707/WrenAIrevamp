import React from "react";
import ReactMarkdown from "react-markdown";

export default function ReactMarkdownDetails({ data }) {
  return (
    <ReactMarkdown
    components={{
      h1: ({ node, ...props }) => (
        <h1 className="text-2xl md:text-3xl lg:text-4xl leading-tight mt-6 mb-4 text-black" {...props} />
      ),
      h2: ({ node, ...props }) => (
        <h2 className="text-xl md:text-2xl lg:text-3xl leading-tight mt-5 mb-3 text-black" {...props} />
      ),
      h3: ({ node, ...props }) => (
        <h3 className="text-lg md:text-xl lg:text-2xl leading-tight mt-4 mb-2 text-black" {...props} />
      ),
      h4: ({ node, ...props }) => (
        <h4 className="text-base md:text-lg lg:text-xl leading-tight mt-3 mb-1 text-black " {...props} />
      ),
      p: ({ node, ...props }) => (
        <p className="text-base leading-relaxed mb-2 text-black" {...props} />
      ),
      ul: ({ node, ...props }) => (
        <ul className="list-disc list-inside pl-5 space-y-2 mb-4 text-black" {...props} />
      ),
      ol: ({ node, ...props}) => (
        <ol className="list-decimal list-inside pl-5 space-y-2 mb-4 text-black" {...props} />
      ),
      li: ({ node, ...props }) => (
        <li className="text-black" {...props} />
      ),
      a: ({ node, ...props }) => (
        <a
          className="text-blue-600 underline hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      ),
    }}
  >
    {data}
  </ReactMarkdown>
  );
}
