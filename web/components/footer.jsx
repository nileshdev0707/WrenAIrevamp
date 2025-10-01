import { base } from "../service/serviceConfig";
import { useLocalizedUrl } from "../utils/languageUtils";
import Link from "next/link";
import Button from "./common/Button";

export default function Footer({ data }) {
  const getUrl = useLocalizedUrl();
  return (
    <section className="max-w-6xl mx-auto py-10 md:py-16 xl:px-0">
      <div className="group rounded-2xl bg-blue-600 text-white md:px-16 sm:px-8 py-10 px-5">
        {data?.map((item, index) => {
          const url = item.image?.url;
          return (
            <div key={index} className="grid sm:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <div>
                  {item?.topTitle && (
                    <Link
                      href={"#"}
                      className="cursor-pointer text-white text-md border border-white rounded-full px-4 py-2"
                    >
                      {item?.topTitle}
                    </Link>
                  )}
                  {item?.title && (
                    <h3 className="text-3xl lg:text-4xl font-medium mt-8 leading-tight">
                      {item?.title}
                    </h3>
                  )}
                  {item?.subTitle && (
                    <p className="text-sm opacity-90 mt-4">{item?.subTitle}</p>
                  )}
                  {item?.btnBottomContentBlock?.length && (
                    <div className="flex flex-col sm:flex-row gap-5  mt-8">
                      {item?.btnBottomContentBlock?.map((btn) => (
                        <Button
                          href={getUrl(btn?.url)}
                          key={btn.id}
                          variant="elevated"
                          label={btn?.label}
                        >
                          {btn?.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="justify-end items-center sm:flex hidden">
                <div className="group-hover:opacity-95 transition-opacity duration-300 overflow-hidden">
                {url ? (
                  <img
                    width={320}
                    height={320}
                    src={`${url.startsWith("http") ? "" : base}${url}`}
                    alt={item?.name}
                     className="transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                ) : (
                  <div className="text-gray-600">{item?.name}</div>
                )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
