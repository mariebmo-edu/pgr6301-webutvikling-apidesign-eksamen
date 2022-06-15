export function FormInput({ label, value, onChangeValue, type, inputId }) {
  if (type === "text") {
    return (
      <div className={"form-input"}>
        <label>
          <strong className={"input-label"}>{label}</strong>
          <input
            id={inputId}
            value={value}
            onChange={(event) => onChangeValue(event.target.value)}
          />
        </label>
      </div>
    );
  }

  const categories = [
    "corona",
    "international",
    "sport",
    "culture",
    "weather",
    "nature",
    "education",
    "local",
    "politics",
    "economy",
    "debate",
  ];

  if (type === "category-dropdown") {
    return (
      <label>
        {label}
        <select
          id={inputId}
          name={"categories"}
          onChange={(event) => {
            onChangeValue(event.target.value);
          }}
        >
          <option value={""}>All</option>
          {categories.sort().map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (type === "category-checkbox") {
    return (
      <div id={inputId}>
        {categories.sort().map((category) => (
          <CheckBox
            key={category}
            name={label}
            label={category}
            value={value}
            onChangeValue={onChangeValue}
          />
        ))}
      </div>
    );
  }
}

export function CheckBox({ name, label, value, onChangeValue }) {
  return (
    <div className={"checkbox-container"}>
      <input
        type={"checkbox"}
        id={label}
        name={name}
        value={label}
        onChange={(event) => {
          if (event.target.checked) {
            onChangeValue((arr) => [...arr, event.target.value]);
          } else {
            console.log(value);
            const tempArr = value;
            onChangeValue(
              tempArr.filter((item) => item.value === event.target.value)
            );
          }
        }}
      />
      <strong className={"checkbox-label"}>{label}</strong>
    </div>
  );
}
