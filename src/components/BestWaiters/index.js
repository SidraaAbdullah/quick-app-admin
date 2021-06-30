import React from "react";
import Table from "components/table";
import moment from "moment";
import PlaceholderImage from "../../assets/img/placeholder.jpg";

import { checkWaiterName, alterWaiterStatus } from "util/waiter";

const BestWaiters = ({ waitersData }) => {
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
          "Company Name",
          "Business Reg No",
          "Manager Name",
          "Manager Contact",
          "Created By",
          "Updated On",
          "Created On",
        ]}
        tableHeading={
          <div className="waitersHeader">
            <span style={{ marginTop: "0.1rem", fontWeight: "200" }}>
              Best Staffs
            </span>
          </div>
        }
        color="dark"
      >
        {(waitersData || []).map((item, key) => {
          return (
            <tr key={key}>
              <React.Fragment>
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
                  <span className={"ml-3"}>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "white",
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
                  {item?.rating || "0"}
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
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
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
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  {item?.user_id
                    ? item?.user_id?.full_name
                    : item?.created_by?.full_name}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">
                      {item?.updatedAt ? moment(item?.updatedAt).fromNow() : ""}
                    </span>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">
                      {moment(item?.createdAt).fromNow()}
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

export default BestWaiters;
