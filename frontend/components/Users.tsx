import { useQuery, gql } from "@apollo/client";
const QUERY = gql`
  query {
    getAllUsers {
      firstname
      lastname
      email
      password
      id
    }
  }
`;
export default function Users() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const users = data.getAllUsers.slice(0, 4);

  return (
    <div>
      {users.map((user) => (
        <div>
          <h3>{user.firstname}</h3>
        </div>
      ))}
    </div>
  );
}
