import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((resp) => resp.json());

export function useFetchArticles() {
  const [articles, setArticles] = useState([]);
  const {
    data,
    error,
    isLoading = !data && !error,
    mutate,
  } = useSWR(
    `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`,
    fetcher,
    { revalidateOnFocus: false }
    
  );

  useEffect(() => {
    setArticles([]);
    if (data) {
      data.Data?.forEach((item) => {
        setArticles((prev) => [
          ...prev,
          {
            imgArticles: item.imageurl,
            titleArticles: item.title,
            bodyArticles: item.body,
            urlArticles: item.url,
            author:item.source_info.name
          },
        ]);
      }); 
    }
  }, [data]);
  return { articles, error, isLoading, mutate };
}
