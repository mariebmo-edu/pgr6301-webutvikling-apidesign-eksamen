import { TopBar } from "./components/layout/topBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NewsPage } from "./pages/newsPage";
import React, { useContext } from "react";
import { useLoading } from "./utils/loadingUtils";
import { ErrorState } from "./components/states/errorState";
import { LoadingState } from "./components/states/loadingState";
import { LoginApiContext } from "./context/loginApiContext";
import { LoginPage } from "./pages/loginPage";
import { AddNewsArticlePage } from "./pages/addNewsArticlePage";
import { ArticlePage } from "./pages/articlePage";
import { ProfilePage } from "./pages/profilePage";

export function App() {
  const { fetchLogin } = useContext(LoginApiContext);
  const { data, error, loading, reload } = useLoading(fetchLogin);

  if (error) {
    return <ErrorState error={error} />;
  }

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <BrowserRouter>
        <TopBar user={data?.user} />
        <Routes>
          <Route path={"/"} element={<NewsPage />} />
          <Route path={"/profile"} element={<ProfilePage user={data.user} />} />
          <Route
            path={"/login/*"}
            element={<LoginPage config={data.config} reload={reload} />}
          />
          <Route
            path={"/new"}
            element={
              <AddNewsArticlePage userName={data.user?.microsoft?.name} />
            }
          />
          <Route path={"article/*"} element={<ArticlePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
