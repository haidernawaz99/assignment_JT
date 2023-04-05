import Home from "../components/home/Home";
import Layout from "../components/Layout/Layout";

const IndexPage = () => {
  return <Home />;
};

export default IndexPage;

IndexPage.getLayout = (page) => {
  return <>{page} </>;
};
