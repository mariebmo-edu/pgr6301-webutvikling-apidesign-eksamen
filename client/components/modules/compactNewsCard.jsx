export function CompactNewsCard({ news }) {
  const { title, authors, image, categories } = news;

  return (
    <div className={"compact-news-card card flex-item"} key={news.title}>
      <img
        src={image}
        alt={"image for news " + title}
        className={"img-adapt"}
      />
      <div className={"padding-10"}>
        <h1>{title}</h1>
        <h4>{authors}</h4>
        <div className={"flex-container tag-container"}>
          {categories.map((category) => (
            <div
              className={"category tag flex-item primary-background"}
              key={category}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
