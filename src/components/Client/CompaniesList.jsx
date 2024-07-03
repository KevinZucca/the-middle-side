import { useOrders } from "../../contexts/OrdersContext";
import CompanyCard from "./CompanyCard";

const CompaniesList = () => {
  const { companies } = useOrders();

  return (
    <>
      <ul
        className="flex justify-center flex-wrap gap-5 pt-10 pb-48 p-2 col-span-3 overflow-y-scroll scrollbar-hide"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
        }}
      >
        {companies.map((company, index) => (
          <li key={company.id}>
            <CompanyCard company={company} index={index} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default CompaniesList;
