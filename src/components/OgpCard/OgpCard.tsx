import useSWR from "swr";

interface Props {
  url: string;
}

export const OgpCard: React.FC<Props> = ({ url }) => {
  const { data } = useSWR("/api/ogp?url=" + url, (url) =>
    fetch(url).then((r) => r.json())
  );

  if (!data) {
    return (
      <div className="my-10 border rounded-xl shadow-md animate-pulse flex content-center flex-col-reverse xl:flex-row">
        <p className="break-all p-5 flex-1">{url}</p>
        <div className="w-full xl:max-w-sm aspect-ogImage bg-slate-100"></div>
      </div>
    );
  }
  return (
    <div className="my-10 border rounded-xl overflow-hidden shadow-md hover:shadow-sm transition hover:opacity-80">
      <div className="flex content-center flex-col-reverse xl:flex-row">
        <div className=" p-5 overflow-hidden flex-1 flex flex-col">
          <div className="mb-2 flex-1">
            <p className="font-bold">{data.title}</p>
            {data.seo.description && (
              <p className="text-sm truncate">{data.seo.description}</p>
            )}
          </div>
          <div className="flex items-center">
            <div className="mr-1">
              <img
                src={data.favicon}
                width={12}
                height={12}
                alt={`${data.domain}のファビコン`}
              />
            </div>
            <p>{data.domain}</p>
          </div>
        </div>
        {data.ogp.ogImage && (
          <div className="relative w-full xl:max-w-sm aspect-ogImage bg-slate-50">
            <img
              src={data.ogp.ogImage}
              className="object-contain"
              width={793}
              height={500}
              alt={data.title}
            />
          </div>
        )}
      </div>
    </div>
  );
};
