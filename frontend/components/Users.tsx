import { useQuery, gql } from "@apollo/client";
const QUERY = gql`
  query {
    jobs {
      position
      id
      jobDescription
    }
  }
`;
export default function Users() {
  const { data, loading, error } = useQuery(QUERY);

  if (!data) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const jobs = data.jobs;

  return (
    <div>
      {jobs.map((job) => (
        <div>
          <h3>{job.id}</h3>
          <h3>{job.position}</h3>
        </div>
      ))}
    </div>
  );
}
