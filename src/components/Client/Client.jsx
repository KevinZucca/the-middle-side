import CompaniesList from "./CompaniesList";
import Requests from "./Requests";
import Error from "./Alert";

const Client = () => {
  return (
    <>
      <Error />
      <Requests />
      <CompaniesList />
    </>
  );
};

export default Client;
