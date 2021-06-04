import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { GET_RESTAURANT_WAITERS } from "queries";
import { reactQueryConfig } from "constants/index";
import Table from "components/table";
import Pagination from "@material-ui/lab/Pagination";
import { totalCount } from "util/pagination";
import moment from "moment";
import PlaceholderImage from "../../assets/img/placeholder.jpg";
import Loader from "react-loader-spinner";
import queryString from "query-string";
import { checkWaiterName, alterWaiterStatus } from "util/waiter";
import { useHistory } from "react-router-dom";

const RestaurantWaiters = ({ searchInput }) => {
  let history = useHistory();
  let splitPath = queryString.parse(history?.location?.search);
  const [query, setQuery] = useState({
    page_no: splitPath?.page_no || 1,
    records_per_page: 30,
    statuses: ["active"],
    sort_by: "updatedAt",
    order: -1,
    restaurant_id: splitPath?.restaurant_id,
  });
  const [notRenderFirst, setNotRenderFirst] = useState(false);

  useEffect(() => {
    searchInput.setSearchInput("");
  }, []);

  useEffect(() => {
    if (searchInput?.searchInput) {
      setNotRenderFirst(true);
      setQuery({
        ...query,
        full_name: searchInput?.searchInput,
        search_by: ["user"],
        page_no: 1,
      });
    } else if (notRenderFirst) {
      setQuery({
        ...query,
        full_name: "",
        search_by: ["user"],
      });
    }
  }, [searchInput?.searchInput]);

  const {
    data: waitersData,
    isLoading: waitersIsLoading,
    refetch: refetchWaitersData,
    isFetching: waitersIsFetching,
    isError: waitersIsError,
  } = useQuery(
    [
      "GET_RESTAURANT_WAITERS",
      {
        ...query,
      },
    ],
    GET_RESTAURANT_WAITERS,
    {
      ...reactQueryConfig,
    }
  );
  // console.log(waitersData);

  const handleChange = (event, value) => {
    history.push(
      `/admin/restaurant-waiters?restaurant_id=${splitPath?.restaurant_id}&page_no=${value}`
    );
    setQuery({ ...query, page_no: value });
  };

  return (
    <>
      <Table
        tableColumns={[
          "Waiter",
          "Rating",
          "Tips",
          "Added Method",
          "Status",
          "Linked Email",
          // "Company Name",
          // "Business Reg No",
          // "Manager Name",
          // "Manager Contact",
          "Created By",
          "Updated On",
          "Created On",
        ]}
        tableHeading={
          <div className="waitersHeader whitespace-no-wrap">
            <span style={{ marginRight: "0.7rem" }}>
              Restaurant Waiters ({waitersData?.data?.length || "0"})
            </span>
            <span style={{ fontWeight: "lighter" }}>
              ({history?.location?.state?.restaurantName})
            </span>
            {(waitersIsLoading || waitersIsFetching) && (
              <span style={{ marginLeft: "1rem" }}>
                <Loader
                  type="BallTriangle"
                  color="black"
                  height={30}
                  width={30}
                />
              </span>
            )}
            <div className="d-flex justify-content-center w-full Pagination pagination">
              <Pagination
                page={Number(query.page_no)}
                count={totalCount(
                  waitersData?.total_number_of_waiters,
                  waitersData?.records_per_page
                )}
                color="secondary"
                onChange={handleChange}
              />
            </div>
          </div>
        }
        color="light"
      >
        {(waitersData?.data || []).map((item, key) => {
          return (
            <tr key={key}>
              <React.Fragment>
                <td
                  style={{
                    minWidth: "10rem",
                    maxWidth: "22rem",
                  }}
                  className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap  p-4 text-left flex items-center"
                >
                  <img
                    src={item?.user_id?.picture || PlaceholderImage}
                    style={{
                      height: "3rem",
                      width: "3rem",
                      objectFit: "cover",
                      marginTop: "0.25rem",
                    }}
                    className="bg-white rounded-full border"
                    alt="..."
                  />
                  <span className={"ml-3 font-bold text-gray-700"}>
                    {checkWaiterName(item)}
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  <i className="fas fa-star text-orange-500 mr-2"></i>{" "}
                  {(Number(item?.rating) > 0
                    ? Number(item?.rating).toFixed(1)
                    : item?.rating) || "0"}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {item?.waiterVotes?.length || "0"}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {item.user_id ? "User" : "Referred"}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor:
                        item?.status === "active"
                          ? "green"
                          : item?.status === "reject"
                          ? "maroon"
                          : "red",
                      padding: "0.2rem 0.4rem",
                      borderRadius: "25px",
                    }}
                  >
                    {" "}
                    {alterWaiterStatus(item?.status) || ""}{" "}
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {item?.user_id?.email || ""}
                </td>
                {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {item?.company_name}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {item?.business_registration_number}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {item?.manager_name}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {item?.manager_contact}
                </td> */}
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {item?.user_id
                    ? item?.user_id?.full_name
                    : item?.created_by?.full_name}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">
                      {item?.updatedAt
                        ? moment(item?.updatedAt).format("l")
                        : ""}
                    </span>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">
                      {moment(item?.createdAt).format("l")}
                    </span>
                  </div>
                </td>
              </React.Fragment>
            </tr>
          );
        })}
      </Table>
    </>
  );
};

export default RestaurantWaiters;
