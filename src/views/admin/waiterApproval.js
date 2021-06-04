import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { GET_WAITERS, UPDATE_WAITER } from "queries";
import { reactQueryConfig } from "constants/index";
import Table from "components/table";
import TableDropdown from "components/Dropdowns/TableDropdown.js";
import Pagination from "@material-ui/lab/Pagination";
import { totalCount } from "util/pagination";
import moment from "moment";
import PlaceholderImage from "assets/img/placeholder.jpg";
import Loader from "react-loader-spinner";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import { LimitWords } from "util/waiterApproval";
import { getSearchData } from "util/search";
import { useHistory } from "react-router-dom";

const WaiterApproval = ({ searchInput }) => {
  const [notRenderFirst, setNotRenderFirst] = useState(false);
  const { mutate } = useMutation(UPDATE_WAITER);
  let history = useHistory();
  let splitPath = history.location.search.split("=")[1] || 1;
  const [query, setQuery] = useState({
    page_no: splitPath,
    records_per_page: 30,
    status: "pending",
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

  const {
    data: waitersData,
    refetch: refetchWaitersData,
    isFetching: waitersIsFetching,
    isLoading: waitersIsLoading,
    isError: waitersIsError,
  } = useQuery(["GET_WAITERS", { ...query }], GET_WAITERS, {
    ...reactQueryConfig,
  });
  // console.log(waitersData);

  const handleChange = (event, value) => {
    history.push(`/admin/waiter-approval?page_no=${value}`);
    setQuery({ ...query, page_no: value });
  };

  const handleApprovalWaiter = async (id, status, modalText, modalTextMore) => {
    let waiterDetails = {
      id: id,
      status,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${modalText} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Action in Process!",
          text: "Please Wait...",
          onOpen: function () {
            Swal.showLoading();
          },
        });
        await mutate(waiterDetails, {
          onSuccess: async () => {
            await refetchWaitersData();
            Swal.fire({
              icon: "success",
              title: "Changes Done Successfully!",
              text: `The waiter has been ${modalTextMore}.`,
            });
          },
          onError: () => {
            Swal.fire({
              icon: "error",
              title: "Action Failed!",
              text: `The action has been failed.`,
              onOpen: function () {
                Swal.hideLoading();
              },
            });
          },
        });
      }
    });
  };

  return (
    <Table
      tableColumns={[
        "Waiter",
        "Rating",
        "Email",
        "Added Method",
        "Status",
        // "Company Name",
        // "Business Reg No",
        // "Manager Name",
        // "Manager Contact",
        "Created On",
        "Action",
      ]}
      tableHeading={
        <div className="flex">
          <span className="flex" style={{ width: "50%" }}>
            Waiter Approval
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
          </span>
          <div className="d-flex justify-content-center w-full pagination">
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
              <th
                style={{ minWidth: "16rem", maxWidth: "20rem" }}
                className="border-t-0 px-1 align-middle border-l-0 border-r-0 text-xs p-4 text-left flex items-center"
              >
                <img
                  src={item.user_id ? item?.user_id?.picture : PlaceholderImage}
                  className="bg-white rounded-full border"
                  style={{
                    height: "3rem",
                    width: "3rem",
                    objectFit: "cover",
                    marginTop: "0.4rem",
                  }}
                  alt="..."
                />
                <span className={"ml-3 font-bold text-gray-700"}>
                  <div>
                    {item.user_id ? item?.user_id?.full_name : item?.full_name}
                  </div>
                  <div
                    data-tip={item.restaurant ? item?.restaurant?.name : "none"}
                    style={{
                      marginTop: "0.2rem",
                    }}
                    className={"font-bold text-gray-700"}
                  >
                    <i className="fas fa-utensils text-orange-500 mr-2"></i>{" "}
                    {item.restaurant
                      ? LimitWords(item.restaurant.name, 20)
                      : "none"}
                  </div>
                </span>
              </th>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <i className="fas fa-star text-orange-500 mr-2"></i>{" "}
                {(Number(item?.rating) > 0
                  ? Number(item?.rating).toFixed(1)
                  : item?.rating) || "0"}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {item?.email}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {item.user_id ? "User" : "Referred"}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <span
                  style={
                    item?.status && {
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "maroon",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "25px",
                    }
                  }
                >
                  {" "}
                  {item?.status || ""}{" "}
                </span>
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
                <div className="flex items-center">
                  <span className="mr-2">
                    {moment(item?.createdAt).format("l")}
                  </span>
                </div>
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                <Button
                  disabled={waitersIsLoading || waitersIsFetching}
                  onClick={() =>
                    handleApprovalWaiter(
                      item._id,
                      "active",
                      "Accept",
                      "accepted"
                    )
                  }
                  variant="contained"
                  style={{
                    backgroundColor: "#93bc39",
                    color: "white",
                    fontSize: "0.7rem",
                  }}
                >
                  Accept
                </Button>
                <Button
                  disabled={waitersIsLoading || waitersIsFetching}
                  onClick={() =>
                    handleApprovalWaiter(
                      item._id,
                      "reject",
                      "Reject",
                      "rejected"
                    )
                  }
                  variant="contained"
                  style={{
                    backgroundColor: "#ee3e54",
                    color: "white",
                    marginLeft: "0.5rem",
                    fontSize: "0.7rem",
                  }}
                >
                  Reject
                </Button>
              </td>
            </React.Fragment>
          </tr>
        );
      })}
    </Table>
  );
};

export default WaiterApproval;
