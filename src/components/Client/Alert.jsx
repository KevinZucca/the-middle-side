import { useOrders } from "../../contexts/OrdersContext";

const Alert = () => {
  const { alert } = useOrders();
  return (
    <>
      {alert.name && (
        <div className={`absolute ${alert.color} top-0 left-1/2 p-7 mt-2 z-30`}>
          {alert.name}
        </div>
      )}
    </>
  );
};

export default Alert;
