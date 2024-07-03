import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import requests from "../json_files/orders.json";
import companies from "../json_files/apiCompanies.json";

const OrdersContext = createContext();

export default function OrdersProvider({ children }) {
  const [requestsList, setRequestsList] = useState([]);
  const [reqNum, setReqNum] = useState(requestsList.length);
  const [reqCompleted, setReqCompleted] = useState(0);
  const [url, setUrl] = useState([]);
  const [alert, setAlert] = useState({});
  const [signal, setSignal] = useState("max");
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState({});

  // function to send the url to the server and verify if it is correct
  function sendToServer(body) {
    const matchedRequest = requestsList.find((request) => {
      if (request.req) {
        return request.req.some(
          (req) =>
            (req.domain == body[0] && req.body == body[1]) ||
            (req.domain == body[0] &&
              req.body == body[1] &&
              req.query == body[2]) ||
            (req.domain == body[0] &&
              req.body == body[1] &&
              req.query == body[2] &&
              req.params == body[3])
        );
      }
    });

    if (matchedRequest) {
      const updatedList = requestsList.filter(
        (request) => request.id !== matchedRequest.id
      );
      setAlert({ name: "Your URL was correct !", color: "bg-green-600/75" });
      setTimeout(() => {
        setRequestsList(updatedList);
        setReqCompleted((prevReq) => prevReq + 1);
        setAlert("");
      }, 3500);
    } else {
      setAlert({
        name: "Server didn't find the resource !",
        color: "bg-red-600/75",
      });
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  }

  // through the useEffect, generate every tot seconds a new request
  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * requests.length);
      const newRequest = requests[randomIndex];
      const alreadyAdded = requestsList.find((req) => req.id == newRequest.id);
      if (!alreadyAdded) {
        setRequestsList((prevReqList) => [...prevReqList, newRequest]);
        setReqNum(requestsList.length);
      } else {
        return;
      }
    }, Math.floor(Math.random() * 20000));

    return () => clearInterval(intervalId);
  }, [requestsList]);

  const values = {
    requestsList,
    setRequestsList,
    companies,
    url,
    setUrl,
    sendToServer,
    alert,
    signal,
    setSignal,
    dataIsLoading,
    setDataIsLoading,
    selectedButtons,
    setSelectedButtons,
    reqNum,
    setReqNum,
    reqCompleted,
  };

  return (
    <OrdersContext.Provider value={values}>{children}</OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
