import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { GET_WAITERS_CANIDATES } from "queries";
import { reactQueryConfig } from "constants/index";
import Table from "components/table";
import Pagination from "@material-ui/lab/Pagination";
import { totalCount } from "util/pagination";
import moment from "moment";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import PlaceholderImage from "../../assets/img/placeholder.jpg";

const Users = ({ searchInput }) => {
  const [notRenderFirst, setNotRenderFirst] = useState(false);
  let history = useHistory();
  let splitPath = history.location.search.split("=")[1] || 1;
  const [query, setQuery] = useState({
    page_no: splitPath,
    records_per_page: 30,
  });
  const {
    data: waitersCanidates,
    isLoading: waitersCanidatesIsLoading,
    isFetching: waitersCanidatesIsFetching,
  } = useQuery(["GET_WAITERS_CANIDATES", { ...query }], GET_WAITERS_CANIDATES, {
    ...reactQueryConfig,
  });

  useEffect(() => {
    searchInput.setSearchInput("");
  }, []);

  useEffect(() => {
    if (searchInput?.searchInput) {
      setNotRenderFirst(true);
      setQuery({ ...query, search: searchInput?.searchInput, page_no: 1 });
    } else if (notRenderFirst) {
      setQuery({
        ...query,
        search: "",
      });
     
    }
  }, [searchInput?.searchInput]);

  const handleChange = (event, value) => {
    history.push(`/admin/open-to-work?page_no=${value}`);
    setQuery({ ...query, page_no: value });
  };
  return (
    <Table
      tableColumns={[
        "User",
        "Email",
        "Experience",
        "Position",
        "Last Experience",
        "Education",
        "Time",
        "Created On",
        // "Action",
      ]}
      tableHeading={
        <div className="flex">
          <span className="flex" style={{ width: "50%" }}>
            Open To Work
            {(waitersCanidatesIsLoading || waitersCanidatesIsFetching) && (
              <span style={{ marginLeft: "1rem" }}>
                <Loader
                  type="BallTriangle"
                  color="black"
                  height={30}
                  width={30}
                />
              </span>
            )}
          </span>
          <div className="d-flex justify-content-center w-full pagination">
            <Pagination
              page={Number(query.page_no)}
              count={totalCount(
                waitersCanidates?.total_number_of_forms,
                waitersCanidates?.records_per_page
              )}
              color="secondary"
              onChange={handleChange}
            />
          </div>
        </div>
      }
      color="light"
    >
      {(waitersCanidates?.data || []).map((item, key) => {
        return (
          // <tr style={{cursor: 'pointer'}} onClick={()=>{setUserId(item?._id)}} key={key}>
          <tr key={key}>
            <React.Fragment>
            <td className="border-t-0 px-6 align-middle whitespace-no-wrap border-l-0 border-r-0 text-xs p-4 text-left flex items-center">
                <img
                  src={item?.user_id ? item?.user_id.picture : PlaceholderImage}
                  className="bg-white rounded-full border"
                  style={{
                    height: "3rem",
                    width: "3rem",
                    objectFit: "cover",
                    marginTop: "0.25rem",
                  }}
                  alt="..."
                ></img>{" "}
                <span className={"ml-3 font-bold text-gray-700"}>
                  {item?.user_id.full_name || ""}
                </span>
              </td>
              <td style={{paddingLeft:'2rem'}} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {item?.user_id?.email || ""}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {item?.experience + " years" || "0"}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {item?.position || ""}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {(item?.last_experience?.last_exp ? item?.last_experience?.last_exp  : item?.last_experience) || ''}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {item?.education || ""}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {item?.time || ""}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <div className="flex items-center">
                  <span className="mr-2">
                    {moment(item?.createdAt).format("l") || ""}
                  </span>
                </div>
              </td>
              {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                  <TableDropdown />
                </td> */}
            </React.Fragment>
          </tr>
        );
      })}
    </Table>
  );
};

export default Users;
