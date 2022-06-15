import { useContext } from "react";
import { NewsApiContext } from "../context/newsApiContext";
import { useLoading } from "../utils/loadingUtils";
import { LoadingState } from "../components/states/loadingState";
import { ErrorState } from "../components/states/errorState";

export function ArticlePage() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const paramTitle = params.title;

  const { getNewsArticle } = useContext(NewsApiContext);
  const { loading, error, data } = useLoading(async () =>
    getNewsArticle({ paramTitle })
  );

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <>
        <ErrorState error={error} />
      </>
    );
  }

  return (
    <div className={"window-content-container"}>
      <img src={data.image} alt={"header image of article"} />
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}
