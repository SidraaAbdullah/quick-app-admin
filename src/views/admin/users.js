import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { GET_USERS, GET_USER_DETAILS } from "queries";
import { reactQueryConfig } from "constants/index";
import Table from "components/table";
import Pagination from "@material-ui/lab/Pagination";
import { totalCount } from "util/pagination";
import moment from "moment";
import PlaceholderImage from "../../assets/img/placeholder.jpg";
import Loader from "react-loader-spinner";
import { getSearchData } from "util/search";
import { useHistory } from "react-router-dom";

const Users = ({ searchInput }) => {
  const [notRenderFirst, setNotRenderFirst] = useState(false);
  let history = useHistory();
  let splitPath = history.location.search.split("=")[1] || 1;
  const [query, setQuery] = useState({
    page_no: splitPath,
    records_per_page: 30,
  });
  const [userId, setUserId] = useState(false);
  const {
    data: usersData,
    isLoading: usersIsLoading,
    isFetching: usersIsFetching,
    isError: usersIsError,
  } = useQuery(["GET_USERS", { ...query }], GET_USERS, {
    ...reactQueryConfig,
  });

  useEffect(() => {
    searchInput.setSearchInput("");
  }, []);

  useEffect(() => {
    if (searchInput?.searchInput) {
      setNotRenderFirst(true);
      setQuery({ ...query, full_name: searchInput?.searchInput, page_no: 1 });
    } else if (notRenderFirst) {
      setQuery({
        ...query,
        full_name: "",
      });
    }
  }, [searchInput?.searchInput]);

  // const {
  //   data: userDetailsData,
  //   isLoading: userDetailsIsLoading,
  //   isError: userDetailsIsError,
  // } = useQuery(["GET_USER_DETAILS", {id: userId}], GET_USER_DETAILS, {
  //   ...reactQueryConfig,
  //   enabled: userId ? true : false,
  //   onSuccess: res => {
  //     console.log(res);
  //   }
  // });

  const handleChange = (event, value) => {
    history.push(`/admin/users?page_no=${value}`);
    setQuery({ ...query, page_no: value });
  };
  return (
    <Table
      tableColumns={[
        "User",
        "Email",
        "City",
        "Login By",
        "Mobile Name",
        "Status",
        "waiter",
        "Last Login",
        "Created On",
        // "Action",
      ]}
      tableHeading={
        <div className="flex">
          <span>Users</span>
          {(usersIsLoading || usersIsFetching) && (
            <span style={{ marginLeft: "1rem" }}>
              <Loader
                type="BallTriangle"
                color="black"
                height={30}
                width={30}
              />
            </span>
          )}
          <div className="d-flex justify-content-center w-full pagination">
            <Pagination
              page={Number(query.page_no)}
              count={totalCount(
                usersData?.total_number_of_users,
                usersData?.records_per_page
              )}
              color="secondary"
              onChange={handleChange}
            />
          </div>
        </div>
      }
      color="light"
    >
      {(usersData?.data || []).map((item, key) => {
        return (
          // <tr style={{cursor: 'pointer'}} onClick={()=>{setUserId(item?._id)}} key={key}>
          <tr key={key}>
            <React.Fragment>
              <th className="border-t-0 px-6 align-middle whitespace-no-wrap border-l-0 border-r-0 text-xs p-4 text-left flex items-center">
                <img
                  src={item.picture ? item.picture : PlaceholderImage}
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
                  {item?.full_name || ""}
                </span>
              </th>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {item?.email || ""}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {item?.city || ""}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {item?.login_type || ""}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {item?.mobile_type || ""}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <i className="fas fa-circle text-orange-500 mr-2"></i>{" "}
                {item?.status || ""}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {item.is_waiter ? "Yes" : "No"}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <div className="flex items-center">
                  <span className="mr-2">
                    {item?.last_login_at
                      ? moment(item?.last_login_at).format('l')
                      : ""}
                  </span>
                </div>
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <div className="flex items-center">
                  <span className="mr-2">
                    {moment(item?.createdAt).format('l') || ""}
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
