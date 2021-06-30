import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import {
  GET_WAITERS,
  UPDATE_WAITER,
  DELETE_WAITER,
  DELETE_MULTIPLE_WAITER,
  GET_USER_DETAILS,
  GET_USERS,
} from "queries";
import { reactQueryConfig } from "constants/index";
import Table from "components/table";
import TableDropdown from "components/Dropdowns/TableDropdown.js";
import Modal from "components/Modal";
import Pagination from "@material-ui/lab/Pagination";
import { totalCount } from "util/pagination";
import moment from "moment";
import PlaceholderImage from "../../assets/img/placeholder.jpg";
import Loader from "react-loader-spinner";
import queryString from "query-string";
import Button from "@material-ui/core/Button";

import { checkWaiterName, alterWaiterStatus, handleAction } from "util/waiter";
import { useHistory } from "react-router-dom";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import "./styles/waiters.css";
import "./styles/styles.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

const Waiters = ({ searchInput }) => {
  const { mutate: UpdateWaiter } = useMutation(UPDATE_WAITER);
  const { mutate: DeleteWaiter } = useMutation(DELETE_WAITER);
  const { mutate: DeleteMultipleWaiter } = useMutation(DELETE_MULTIPLE_WAITER);
  const classes = useStyles();
  let history = useHistory();
  let splitPath = queryString.parse(history?.location?.search);
  const [query, setQuery] = useState({
    page_no: splitPath.page_no,
    records_per_page: 30,
    statuses: ["active", "reject", "archive"],
    sort_by: "updatedAt",
    order: -1,
  });
  const [options, setOptions] = useState(splitPath.status);
  const [notRenderFirst, setNotRenderFirst] = useState(false);
  const [open, setOpen] = useState(false);
  const [waiterDetails, setwaiterDetails] = useState();
  const [selectedWaiters, setSelectedWaiters] = useState([]);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const checkStatus = (event) => {
    if (event.target.value === "All") {
      return ["active", "reject", "archive"];
    } else {
      return [event.target.value];
    }
  };

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
        statuses:
          options === "All" ? ["active", "reject", "archive"] : [options],
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
      "GET_WAITERS",
      {
        ...query,
      },
    ],
    GET_WAITERS,
    {
      ...reactQueryConfig,
    }
  );
  // console.log(waitersData);

  const handleChangeSelect = (event) => {
    setOptions(event.target.value);
    history.push(`/admin/waiters?page_no=1&status=${event.target.value}`);
    setQuery({
      ...query,
      statuses: checkStatus(event),
      page_no: 1,
    });
  };

  const handleChange = (event, value) => {
    history.push(`/admin/waiters?page_no=${value}&status=${options}`);
    setQuery({ ...query, page_no: value });
  };

  const HandleLinkWaiter = () => {
    onOpenModal();
  };

  const validateCheckbox = (item) => {
    let duplicateArray = [...selectedWaiters];
    let filteredArray = duplicateArray.filter(
      (obj) => obj.waiter_id != item._id
    );
    setSelectedWaiters(filteredArray);
  };

  const handleCheckbox = (e, item) => {
    let waiterDetails = {
      waiter_id: item?._id,
      user_id: item?.user_id?._id,
    };
    if (e.target.checked) {
      setSelectedWaiters([...selectedWaiters, waiterDetails]);
    } else {
      validateCheckbox(item);
    }
  };

  return (
    <>
      <Table
        tableColumns={[
          "",
          "",
          "Staff",
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
          "Action",
        ]}
        tableHeading={
          <div className="waitersHeader">
            <span style={{ marginTop: "0.1rem" }}>Staff</span>
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
            <span>
              <FormControl className={classes.formControl}>
                <Select
                  value={options}
                  onChange={handleChangeSelect}
                  style={{ marginLeft: "2rem" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="active">Confirmed</MenuItem>
                  <MenuItem value="reject">Rejected</MenuItem>
                  <MenuItem value="archive">Archived</MenuItem>
                </Select>
              </FormControl>
            </span>
            {selectedWaiters.length != 0 && (
              <Button
                onClick={() => {
                  let refetchData = async () => {
                    await refetchWaitersData();
                    setSelectedWaiters([]);
                  };
                  handleAction(
                    { waiter_ids: selectedWaiters },
                    "All selected waiters",
                    "deleted",
                    DeleteMultipleWaiter,
                    refetchData
                  );
                }}
                variant="contained"
                style={{
                  backgroundColor: "#ee3e54",
                  color: "white",
                  marginLeft: "1rem",
                  fontSize: "0.7rem",
                }}
              >
                Delete
              </Button>
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
                  data-tip="Click here to check the waiter reviews."
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    history.push(
                      `/admin/waiter-details?waiter_id=${item?._id}&page_no=1`,
                      {
                        waiterName: checkWaiterName(item),
                      }
                    )
                  }
                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
                >
                  <DoubleArrowIcon className="details" fontSize="small" />
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  <input
                    onChange={(e) => {
                      handleCheckbox(e, item);
                    }}
                    checked={selectedWaiters.some(
                      (i) => i.waiter_id === item._id
                    )}
                    type="checkbox"
                  />
                </td>
                <td
                  style={{
                    minWidth: "10rem",
                    maxWidth: "22rem",
                  }}
                  className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs  p-4 text-left flex items-center"
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
                    <div
                      style={{
                        fontSize: "0.8rem",
                      }}
                    >
                      {checkWaiterName(item)}
                    </div>
                    <div
                      style={{
                        marginTop: "0.2rem",
                        minWidth: "12rem",
                      }}
                    >
                      <i className="fas fa-map-marker-alt text-orange-500 mr-2"></i>{" "}
                      {item?.restaurant?.name || ""}
                    </div>
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
                <td className="border-t-0 px-0 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center">
                  <TableDropdown
                    LinkWaiter={() => {
                      setwaiterDetails({
                        id: item._id,
                        name: checkWaiterName(item),
                      });
                      HandleLinkWaiter();
                    }}
                    archiveWaiter={() => {
                      let waiterDetails = {
                        id: item?._id,
                        status: "archive",
                      };
                      handleAction(
                        waiterDetails,
                        checkWaiterName(item),
                        "archived",
                        UpdateWaiter,
                        refetchWaitersData
                      );
                    }}
                    DeleteLabel="Delete Waiter"
                    Delete={() => {
                      let waiterDetails = {
                        id: item?._id,
                        user_id: item?.user_id?._id,
                      };
                      handleAction(
                        waiterDetails,
                        checkWaiterName(item),
                        "deleted",
                        DeleteWaiter,
                        refetchWaitersData
                      );
                    }}
                  />
                </td>
              </React.Fragment>
            </tr>
          );
        })}
      </Table>
      <Modal
        waitersData={waiterDetails}
        refetchWaitersData={refetchWaitersData}
        onCloseModal={onCloseModal}
        open={open}
      />
    </>
  );
};

export default Waiters;
