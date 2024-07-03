import Client from "../components/Client/Client";
import URL from "../components/InteractiveBar/URL";
import Alert from "../components/Client/Alert";

const Main = () => {
  return (
    <>
      <div className="grid sm:grid-cols-4 lg:grid-cols-4 relative w-[100vw] h-[100vh] bg-black/90 text-white">
        <Client />
        <Alert />
        <URL />
      </div>
    </>
  );
};

export default Main;
