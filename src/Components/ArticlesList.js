import { useFetchArticles } from "../Features/useFetchArticles";
import { ArticlesCard } from "./ArticlesCard";

export function ArticlesList() {
  const { articles, error, isLoading } = useFetchArticles();
  return (
    <div className="flex justify-center">
      <div style={{maxWidth:"618px"}}className="flex flex-col justify-center items-center gap-5 mt-5 pb-20">
        {!isLoading && !error
          ? articles.map((item, i) => {
              return (
      
                <ArticlesCard
                  key={item + i}
                  imgArticles={item.imgArticles}
                  titleArticles={item.titleArticles}
                  urlArticles={item.urlArticles}
                  author={item.author}
                  bodyArticles={item.bodyArticles}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}
