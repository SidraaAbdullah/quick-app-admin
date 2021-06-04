import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { GET_ALL_WAITERS_REVIEWS, DELETE_WAITER_REVIEW } from "queries";
import { reactQueryConfig } from "constants/index";
import Table from "components/table";
import { ExportCsvContact } from "components/CsvExport";
import Pagination from "@material-ui/lab/Pagination";
import { totalCount } from "util/pagination";
import moment from "moment";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import TableDropdown from "components/Dropdowns/TableDropdown.js";
import { handleAction, pad } from "util/waiter";

const WaitersRatings = ({ searchInput, lotteryTab }) => {
  const [notRenderFirst, setNotRenderFirst] = useState(false);
  const { mutate: DeleteWaiterReview } = useMutation(DELETE_WAITER_REVIEW);
  let history = useHistory();
  let splitPath = history.location.search.split("=")[1] || 1;
  const [query, setQuery] = useState({
    page_no: splitPath,
    records_per_page: 30,
  });

  useEffect(() => {
    searchInput.setSearchInput("");
  }, []);

  useEffect(() => {
    if (searchInput?.searchInput) {
      setNotRenderFirst(true);
      if (lotteryTab) {
        setQuery({
          ...query,
          search: searchInput?.searchInput,
          page_no: 1,
          search_by: ["user"],
        });
      } else {
        setQuery({
          ...query,
          search: searchInput?.searchInput,
          page_no: 1,
          search_by: [],
        });
      }
    } else if (notRenderFirst) {
      setQuery({
        ...query,
        search: "",
      });
    }
  }, [searchInput?.searchInput]);

  const {
    data: ratingsData,
    refetch: refetchRatingsData,
    isFetching: ratingsIsFetching,
    isLoading: ratingsIsLoading,
    isError: ratingsIsError,
  } = useQuery(
    ["GET_ALL_WAITERS_REVIEWS", { ...query }],
    GET_ALL_WAITERS_REVIEWS,
    {
      ...reactQueryConfig,
    }
  );

  const { data: CSVData } = useQuery(
    ["GET_ALL_WAITERS_REVIEWS", { no_extra_data: true }],
    GET_ALL_WAITERS_REVIEWS,
    {
      enabled: lotteryTab ? true : false,
      ...reactQueryConfig,
    }
  );

  const handleChange = (event, value) => {
    if (lotteryTab) {
      history.push(`/admin/voters-lottery-numbers?page_no=${value}`);
    } else {
      history.push(`/admin/waiters-ratings?page_no=${value}`);
    }
    setQuery({ ...query, page_no: value });
  };

  return (
    <Table
      tableColumns={
        lotteryTab
          ? [
              "Voter Name",
              "Voter Email",
              "Lottery Number",
              "Restaurant Name",
              "Created On",
            ]
          : [
              "Waiter Name",
              "Voter Name",
              "Voter Email",
              "Hospitality",
              "Professionalism",
              "Service",
              "Speed",
              "Overall Rating",
              "Tip",
              "Created On",
              "Action",
            ]
      }
      tableHeading={
        <div className="waitersHeader">
          <span style={{ width: "15rem" }}>
            {lotteryTab ? "Lottery Numbers" : "Waiters Ratings"}
          </span>
          {(ratingsIsLoading || ratingsIsFetching) && (
            <span style={{ padding: "0 2rem" }}>
              <Loader
                type="BallTriangle"
                color="black"
                height={30}
                width={30}
              />
            </span>
          )}
          <span className="csv">
            {lotteryTab && ratingsData && (
              <ExportCsvContact data={ratingsData?.data || []} />
            )}
          </span>
          <div className="d-flex justify-content-center w-full pagination">
            <Pagination
              page={Number(query.page_no)}
              count={
               
                  totalCount(
                      ratingsData?.total_number_of_votes,
                      ratingsData?.records_per_page
                    )
              }
              color="secondary"
              onChange={handleChange}
            />
          </div>
        </div>
      }
      color="light"
    >
      {(ratingsData?.data || []).map(
        (item, key) => {
          return (
            <tr key={key}>
              <React.Fragment>
                {!lotteryTab && (
                  <td
                    style={{
                      maxWidth: "20rem",
                      minWidth: "18rem",
                    }}
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4"
                  >
                    <span>
                      <div
                        className={"font-bold text-gray-700"}
                        style={{
                          fontSize: "0.8rem",
                        }}
                      >
                        {item?.waiter_id?.user_id?.full_name ||
                          item?.waiter_id?.full_name}
                      </div>
                      <div
                        data-tip={
                          item?.vicinity
                            ? item?.vicinity
                            : item?.formatted_address
                        }
                        style={{
                          marginTop: "0.2rem",
                        }}
                      >
                        <i className="fas fa-map-marker-alt text-orange-500 mr-2"></i>{" "}
                        {item?.place_id?.name}
                      </div>
                    </span>
                  </td>
                )}
                <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap  p-4 text-left flex items-center">
                  {item?.user_id?.full_name}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {item?.user_id?.email}
                </td>
                {lotteryTab && (
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {pad(item?.token, 8, "0").replace(
                      /(\d{4})(\d{4})/,
                      "$1-$2"
                    )}
                  </td>
                )}
                {!lotteryTab && (
                  <>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      <i className="fas fa-star text-orange-500 mr-2"></i>{" "}
                      {item?.rating?.hospitality}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      <i className="fas fa-star text-orange-500 mr-2"></i>{" "}
                      {item?.rating?.professionalism}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      <i className="fas fa-star text-orange-500 mr-2"></i>{" "}
                      {item?.rating?.service}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      <i className="fas fa-star text-orange-500 mr-2"></i>{" "}
                      {item?.rating?.speed}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      <i className="fas fa-star text-orange-500 mr-2"></i>{" "}
                      {item?.overall_rating}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {item?.tip + " " + item?.currency}
                    </td>
                  </>
                )}
                {lotteryTab && (
                  <td
                    style={{
                      maxWidth: "20rem",
                      minWidth: "18rem",
                    }}
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4"
                  >
                    <div
                      data-tip={
                        item?.vicinity
                          ? item?.vicinity
                          : item?.formatted_address
                      }
                      style={{
                        marginTop: "0.2rem",
                      }}
                    >
                      <i className="fas fa-map-marker-alt text-orange-500 mr-2"></i>{" "}
                      {item?.place_id?.name}
                    </div>
                  </td>
                )}
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {moment(item?.createdAt).format("l")}
                </td>
                {!lotteryTab && (
                  <td className="border-t-0 px-0 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center">
                    <TableDropdown
                      DeleteLabel="Delete Waiter Review"
                      Delete={() => {
                        let waiterDetails = {
                          id: item?._id,
                        };
                        handleAction(
                          waiterDetails,
                          item?.waiter_id?.user_id?.full_name ||
                            item?.waiter_id?.full_name,
                          "deleted",
                          DeleteWaiterReview,
                          refetchRatingsData,
                          "Review"
                        );
                      }}
                    />
                  </td>
                )}
              </React.Fragment>
            </tr>
          );
        }
      )}
    </Table>
  );
};

export default WaitersRatings;
