import { SearchBarQuery } from "../interfaces/searchBarQuery";

interface DataType {
  __typename: string;
  location: string;
  position: string;
  company: string;
  category: string;
  id: string;
}

type Data = [DataType];

export default function search(data: Data, query: SearchBarQuery) {
  console.log(data, query);
  const result = data.filter((obj) =>
    obj[query.option.toLowerCase()]
      .toLowerCase()
      .trim()
      .includes(query.text.toLowerCase().trim())
  );

  // console.log(result);

  return result;
}
