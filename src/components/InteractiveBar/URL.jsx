import { useOrders } from "../../contexts/OrdersContext";
import SignalBar from "./SignalBar";
import LinearWithValueLabel from "../LoadingBar/LoadingBar";

const URL = () => {
  const {
    url,
    setUrl,
    sendToServer,
    dataIsLoading,
    setDataIsLoading,
    setSelectedButtons,
  } = useOrders();

  function handleSendToServer() {
    setDataIsLoading(true);
    setSelectedButtons({});

    setTimeout(() => {
      setDataIsLoading(false);
      setUrl([]);
    }, 3000);
  }

  return (
    <div className="border-t p-8 h-[100px] col-span-4 w-full bg-[#191919] absolute bottom-0">
      <div className="flex items-center gap-4 mb-2 flex-grow h-full justify-between">
        <SignalBar />
        <div>
          <strong className="w-full text-3xl">https://</strong>
          <span className=" text-green-400 text-3xl">{url}</span>
          {dataIsLoading && (
            <span className="text-2xl mx-4 my-1">sending to server...</span>
          )}
        </div>
        <div className="flex gap-6">
          <button
            onClick={() => {
              setUrl([]), setSelectedButtons({});
            }}
            className="border p-1 bg-red-800 text-white"
          >
            Clear URL
          </button>
          <button
            onClick={() => {
              sendToServer(url), handleSendToServer();
            }}
            className="border p-1"
          >
            Send API
          </button>
        </div>
      </div>

      <LinearWithValueLabel activateProgress={dataIsLoading} />
    </div>
  );
};

export default URL;
