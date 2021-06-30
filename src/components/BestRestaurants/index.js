import React from "react";
import Table from "components/table";
import moment from "moment";
import { LimitWords } from "util/waiterApproval";

const BestRestaurants = ({ data }) => {
  return (
    <Table
      color="dark"
      tableColumns={[
        "Restaurant",
        "Our Rating",
        "Staffs",
        "Url",
        "Updated On",
        "Created On",
      ]}
      tableHeading={
        <div className="flex">
          <span style={{ fontWeight: "200" }}>Best Restaurants</span>
        </div>
      }
      // color="light"
    >
      {(data || []).map((item, key) => {
        return (
          <tr key={key}>
            <React.Fragment>
              <td
                style={{ minWidth: "18rem", maxWidth: "25rem", color: "#fff" }}
                className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs  p-4 text-left flex items-center"
              >
                <span className={"ml-3"}>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "white",
                    }}
                  >
                    {item?.name || ""}
                  </div>
                  <div
                    data-tip={
                      item?.vicinity ? item?.vicinity : item?.formatted_address
                    }
                    style={{
                      marginTop: "0.2rem",
                      color: "white",
                    }}
                  >
                    <i className="fas fa-map-marker-alt text-orange-500 mr-2"></i>{" "}
                    {item.vicinity
                      ? LimitWords(item.vicinity, 35)
                      : LimitWords(item.formatted_address, 35)}
                  </div>
                </span>
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <i className="fas fa-star text-orange-500 mr-2"></i>{" "}
                {item?.our_rating || ""}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                {item?.waiter_id?.length || "0"}
              </td>
              <td
                style={{ maxWidth: "18rem", cursor: "pointer" }}
                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  p-4"
              >
                <a target="_blank" href={item?.menu_url || ""}>
                  {item?.menu_url || ""}
                </a>
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
                    {item?.createdAt ? moment(item?.createdAt).fromNow() : ""}
                  </span>
                </div>
              </td>
            </React.Fragment>
          </tr>
        );
      })}
    </Table>
  );
};

export default BestRestaurants;
