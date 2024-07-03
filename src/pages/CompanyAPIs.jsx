import { Link, useParams } from "react-router-dom";
import Requests from "../components/Client/Requests";
import URL from "../components/InteractiveBar/URL";
import Alert from "../components/Client/Alert";
import companies from "../json_files/apiCompanies.json";
import { useEffect, useState } from "react";
import { useOrders } from "../contexts/OrdersContext";
import APITable from "../components/Client/APITable";

const CompanyAPIs = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState("");
  const excludedKeys = ["apiName", "id", "url"];
  const { url, setUrl } = useOrders();

  useEffect(() => setCompany(companies.find((el) => el.id == companyId)), []);

  return (
    <div className=" relative w-screen h-screen bg-black/90 text-white overflow-x-hidden overflow-y-hidden">
      <div className="grid grid-cols-4">
        <Requests />

        <div className="flex col-span-3 flex-col items-center p-5">
          {/* Alert for correct or wrong url sent*/}
          <Alert />

          {/* right column */}
          <div className="flex gap-5 w-full items-center">
            <div className="flex items-center gap-4 flex-grow pl-24">
              <h2 className="text-4xl">{company.apiName}</h2>
              <img
                className="w-10 rounded-full"
                src={company.url}
                alt="company-logo"
              />
            </div>
            <Link
              className="border m-4 py-4 px-8 bg-white text-black/70 text-center font-bold rounded-md hover:bg-white/90"
              to="/"
            >
              <p>API list</p>
            </Link>
          </div>

          {/* API methods table */}
          <APITable
            company={company}
            excludedKeys={excludedKeys}
            setUrl={setUrl}
          />
        </div>
      </div>

      {/* URL Bar */}
      <URL />
    </div>
  );
};

export default CompanyAPIs;
