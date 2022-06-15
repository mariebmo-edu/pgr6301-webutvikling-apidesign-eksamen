import { useContext, useEffect, useState } from "react";
import { NewsApiContext } from "../context/newsApiContext";
import { useLoading } from "../utils/loadingUtils";
import { CompactNewsCard } from "../components/modules/compactNewsCard";
import { LoadingState } from "../components/states/loadingState";
import { ErrorState } from "../components/states/errorState";
import { FormInput } from "../components/modules/formInput";
import { Link } from "react-router-dom";

export function NewsPage() {
  const { listNews } = useContext(NewsApiContext);

  const [category, setCategory] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [reloadNews, setReloadNews] = useState(false);

  const { loading, error, data } = useLoading(
    async () => await listNews({ category }),
    [category, reloadNews]
  );

  const [webSocket, setWebSocket] = useState();

  useEffect(() => {
    const webSocket = new WebSocket(window.location.origin.replace(/^http/, "ws"));

    webSocket.onopen = (event) => {
      console.log("The socket is open");
    };

    webSocket.onmessage = (event) => {
      console.log("message", event.data);
      setReloadNews(!reloadNews);
    };
    setWebSocket(webSocket);
  }, []);

  function handleSubmitQuery(event) {
    event.preventDefault();
    setCategory(categoryQuery);
  }

  return (
    <>
      <div className={"side-bar-container secondary-background"}>
        <form onSubmit={handleSubmitQuery}>
          <FormInput
            id="news-category-dropdown"
            inputId={"categories"}
            value={category}
            label={"Categories:"}
            type={"category-dropdown"}
            onChangeValue={setCategoryQuery}
          />
          <button>Filter</button>
        </form>
      </div>

      <div className={"window-content-container"}>
        {loading && <LoadingState key={"loading-component"} />}
        {error && <ErrorState error={error} key={"error-component"} />}
        {data && (
          <div className={"flex-container"} key={"data-component"}>
            {data.map((news) => (
              <Link to={`article?title=${news.title}`} key={news.title}>
                <CompactNewsCard news={news} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
