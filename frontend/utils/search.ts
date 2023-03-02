import { SearchBarQuery } from "../interfaces/searchBarQuery";

type Data = [Object];

export default function search(data: Data, query: SearchBarQuery) {
  const result = data.filter((obj) =>
    obj[query.option.toLowerCase()]
      .toLowerCase()
      .trim()
      .includes(query.text.toLowerCase().trim())
  );

  return result;
}
