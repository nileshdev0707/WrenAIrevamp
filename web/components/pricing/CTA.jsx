export default function CTA({ data }) {
      const base = process.env.NEXT_PUBLIC_STRAPI_URL || ''
    return (
        <section className="max-w-6xl mx-auto py-16">
        <div className="rounded-2xl bg-blue-600 text-white px-16 py-5">
          {data?.map((item, index) => {
             const url = item.image?.url
            return (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
               <div>
               <a
                  href={"#"}
                  className="cursor-pointer text-white text-md border border-white rounded-full px-4 py-2"
                >
                  {item?.topTitle}
                </a>
                <h3 className="text-5xl font-semibold mt-8">
                  {item?.title}
                </h3>
                <p className="text-sm opacity-90 mt-4">
                  {item?.subTitle}
                </p>
                <button className="bg-white cursor-pointer mt-8 px-4.5 py-3 rounded-md text-blue-600 text-sm">
                  {item?.btnBottomContentBlock?.[0]?.label}
                </button>
               </div>
              </div>
                <div className="flex justify-end items-center">
                 {url ? (
                  <img 
                    width={320}
                    height={320}
                    src={`${url.startsWith('http') ? '' : base}${url}`} 
                    alt={item?.name} 
                  />
                ) : (
                  <div className="text-gray-600">{item?.name}</div>
                )}
                </div>
           
            </div>
          )})}
        </div>
      </section>
    )
  }
  
  
  