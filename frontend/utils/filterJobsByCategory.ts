import { SearchBarQuery } from "../interfaces/searchBarQuery";
import search from "../utils/search";

const filterJobsByCategory = (data, searchBar: SearchBarQuery) => {
  let jobs = data.jobs;
  // map object's id to key
  jobs = data.jobs.map((job) => ({ ...job, key: job.id }));

  if (searchBar != null && (searchBar.text !== "" || searchBar.text != null)) {
    // if search bar is not empty, factor that in!
    const searchResults = search(jobs, searchBar);
    jobs = searchResults;
  }

  const designJobs = jobs.filter((job) => job.category === "Design");
  const developmentJobs = jobs.filter((job) => job.category === "Development");
  const productJobs = jobs.filter((job) => job.category === "Product");
  const otherJobs = jobs.filter((job) => job.category === "Other");

  return {
    designJobs,
    developmentJobs,
    productJobs,
    otherJobs,
  };
};

export default filterJobsByCategory;
