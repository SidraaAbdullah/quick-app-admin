import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { GET_WAITER_REVIEWS } from "queries";
import { reactQueryConfig } from "constants/index";
import Table from "components/table";
import Pagination from "@material-ui/lab/Pagination";
import { totalCount } from "util/pagination";
import moment from "moment";
import PlaceholderImage from "assets/img/placeholder.jpg";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

const WaiterDetails = ({ searchInput }) => {
  const [notRenderFirst, setNotRenderFirst] = useState(false);
  let history = useHistory();
  let splitPath = queryString.parse(history.location.search)
  const [query, setQuery] = useState({
    page_no: splitPath?.page_no || 1,
    records_per_page: 30,
    waiter_id: splitPath.waiter_id,
  });

  useEffect(() => {
    searchInput.setSearchInput("");
  }, []);

  useEffect(() => {
    if (searchInput?.searchInput) {
      setNotRenderFirst(true);
      setQuery({
        ...query,
        search: searchInput?.searchInput,
        search_by: ["user"],
        page_no: 1,
      });
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
  } = useQuery(["GET_WAITER_REVIEWS", { ...query }], GET_WAITER_REVIEWS, {
    ...reactQueryConfig,
  });
  // console.log(ratingsData);

  const handleChange = (event, value) => {
    history.push({
      pathname: '/admin/waiter-details',
      search: `waiter_id=${splitPath.waiter_id}&page_no=${value}`
    });
    setQuery({ ...query, page_no: value });
  };

  return (
    <Table
      tableColumns={[
        "Voter Name",
        "Hospitality",
        "Professionalism",
        "Service",
        "Speed",
        "Overall Rating",
        "Tip",
        "Created On",
      ]}
      tableHeading={
        <div className="flex whitespace-no-wrap">
          <span style={{ marginRight: "0.7rem" }}>
            Waiter Ratings ({ratingsData?.data?.length || "0"})
          </span>
          <span style={{ fontWeight: "lighter" }}>
            ({history?.location?.state?.waiterName})
          </span>
          {(ratingsIsLoading || ratingsIsFetching) && (
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
                ratingsData?.total_number_of_votes,
                ratingsData?.records_per_page
              )}
              color="secondary"
              onChange={handleChange}
            />
          </div>
        </div>
      }
      color="light"
    >
      {(ratingsData?.data || []).map((item, key) => {
        return (
          <tr key={key}>
            <React.Fragment>
              <th
                style={{ minWidth: "8rem", maxWidth: "24rem" }}
                className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs  p-4 text-left flex items-center"
              >
                <img
                  src={
                    item?.user_id?.picture || PlaceholderImage
                  }
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
                  {item?.user_id?.full_name}
                </span>
              </th>
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
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {moment(item?.createdAt).format('l')}
              </td>
            </React.Fragment>
          </tr>
        );
      })}
    </Table>
  );
};

export default WaiterDetails;
