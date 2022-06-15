import { useContext, useState } from "react";
import { NewsApiContext } from "../context/newsApiContext";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../components/modules/formInput";
import { ErrorState } from "../components/states/errorState";
import { useLoading } from "../utils/loadingUtils";

export function AddNewsArticlePage({ userName }) {
  const { createNewsArticle, getNewsArticle } = useContext(NewsApiContext);

  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState([userName]);
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { loading, error, data } = useLoading(
    async () => getNewsArticle({ paramTitle: title }),
    [title]
  );

  async function handleSubmit(event) {
    event.preventDefault();

    if (title !== "" && authors !== [] && categories !== [] && content !== "") {
      if (data && data.title === title) {
        setErrorMsg("Title already exists");
        setTitle("");
      } else if (!data || data.title !== title) {
        await createNewsArticle({ title, authors, image, categories, content });
        navigate("/");
      }
    } else {
      setErrorMsg("You need input in all fields.");
    }
  }

  return (
    <div>
      {errorMsg && <ErrorState error={errorMsg} />}
      <form onSubmit={handleSubmit}>
        <FormInput
          inputId={"title-input"}
          type={"text"}
          label={"Title:"}
          value={title}
          onChangeValue={setTitle}
        />
        <FormInput
          inputId={"image-input"}
          type={"text"}
          label={"Image Url:"}
          value={image}
          onChangeValue={setImage}
        />
        <FormInput
          inputId={"category-input"}
          type={"category-checkbox"}
          label={"Category"}
          value={categories}
          onChangeValue={setCategories}
        />
        <FormInput
          inputId={"content-input"}
          type={"text"}
          label={"Content:"}
          value={content}
          onChangeValue={setContent}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
