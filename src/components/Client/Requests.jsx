import { useState, useEffect } from "react";
import { Avatar, Stack } from "@mui/material";
import { useOrders } from "../../contexts/OrdersContext";
import users from "../../json_files/users.json";

const Requests = () => {
  const { requestsList, reqNum, reqCompleted } = useOrders();
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    const newMap = {};
    requestsList.forEach((order, index) => {
      if (!userMap[order.id]) {
        const randomIndex = Math.floor(Math.random() * users.length);
        newMap[order.id] = users[randomIndex];
      }
    });
    setUserMap((prevMap) => ({ ...prevMap, ...newMap }));
  }, [requestsList]);

  return (
    <div
      className="h-full w-full overflow-y-scroll overflow-x-hidden p-4"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "transparent transparent",
      }}
    >
      {requestsList.length < 1 ? (
        <p>Requests from the users are arriving...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 text-center border text-black bg-white ml-1 p-">
            <strong className="text-red-500/65">
              {reqNum + 1} req in pending
            </strong>
            <strong className="text-green-600/65">
              {reqCompleted} req completed
            </strong>
          </div>
          <ul className="flex flex-col w-full h-full gap-4 m-1 flex-grow">
            {requestsList.map((order, index) => {
              const userProfile = userMap[order.id];

              return (
                <li
                  className="flex justify-start gap-4 items-center p-2 border border-white/25"
                  key={index}
                >
                  <Stack direction="row" spacing={0.5}>
                    <Avatar alt="User Profile" src={userProfile} />
                  </Stack>
                  {order.requestName}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Requests;
