import { SearchBarQuery } from "../interfaces/searchBarQuery";
import search from "../utils/search";
import expiresAtDays from "./expiresAtDay";

const filterJobsByCategory = (data, searchBar: SearchBarQuery) => {
  let jobs = data.jobs;
  // map object's id to key
  jobs = data.jobs.map((job) => ({ ...job, key: job.id }));

  if (searchBar != null && (searchBar.text !== "" || searchBar.text != null)) {
    // if search bar is not empty, factor that in!
    const searchResults = search(jobs, searchBar);
    jobs = searchResults;
  }

  // remove expired jobs -- only show jobs that expire in 5 days or more
  jobs = jobs.filter((job) => expiresAtDays(job.expiresAt) >= 5);

  // get unique categories from the jobs
  const categories = [...new Set(jobs.map((job) => job.category))];

  const filterJobsByCategory = {};

  //filter jobs array by the categories
  categories.forEach((category: string) => {
    // jobs = jobs.filter((job) => job.category === category);
    filterJobsByCategory[category] = jobs.filter(
      (job) => job.category === category
    );
  });

  console.log(filterJobsByCategory);

  // const designJobs = jobs.filter((job) => job.category === "Design");
  // const developmentJobs = jobs.filter((job) => job.category === "Development");
  // const productJobs = jobs.filter((job) => job.category === "Product");
  // const otherJobs = jobs.filter((job) => job.category === "Other");

  return filterJobsByCategory;
};

export default filterJobsByCategory;
