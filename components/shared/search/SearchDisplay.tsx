import React from "react";

const SearchDisplay = React.memo(async function SearchDisplay({
  text,
}: {
  text: string;
}) {
  console.log(text);
  // await testing = fetchData()
  return <h1>Hello, {text}</h1>;
});

export default SearchDisplay;
