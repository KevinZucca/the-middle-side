import { Link } from "react-router-dom";

const CompanyCard = ({ company, index }) => {
  return (
    <Link
      to={`/company/${company.id}`}
      className="grid grid-cols-1 justify-items-center xl:grid-cols-2 gap-3 transition-all hover:opacity-70 items-center border rounded-full text-gray-900 xl:w-[200px] xl:h-[200px] w-[200px] h-[200px] p-5 bg-white"
      style={{
        backgroundImage: `url(${
          company.url
            ? company.url
            : "https://www.svgrepo.com/show/432206/image-on.svg"
        })`,
        backgroundSize: "40% 40%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <p className="bg-black/20 p-1 m-1 text-white col-span-2 self-start">
        {company.apiName}
      </p>
    </Link>
  );
};

export default CompanyCard;
