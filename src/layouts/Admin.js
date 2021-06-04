import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import Dashboard from "views/admin/Dashboard.js";
import Users from "views/admin/users";
import Waiters from "views/admin/waiters";
import WaiterApproval from "views/admin/waiterApproval";
import WaiterDetails from "views/admin/waiterDetails";
import Restaurants from "views/admin/restaurants";
import WaitersRatings from "views/admin/waitersRatings";
import RestaurantWaiters from "views/admin/restaurantWaiters";
import OpenToWork from "views/admin/openToWork";
import { getLocalStorageValues } from "../constants";
import { GET_HEADER_STATS } from "queries";
import { reactQueryConfig } from "constants/index";
import { useQuery } from "react-query";
import "./admin.css";

export default function Admin() {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState();
  const [searchClicked, setSearchClicked] = useState(false);

  const {
    data: dashboardData,
    isLoading: dashboardIsLoading,
    isError: dashboardIsError,
  } = useQuery(["GET_HEADER_STATS"], GET_HEADER_STATS, {
    ...reactQueryConfig,
  });

  let searchProps = {
    searchInput,
    setSearchInput,
    searchClicked,
    setSearchClicked,
  };
  let { Email } = getLocalStorageValues();
  if (!Email.Email) {
    return <Redirect from="*" to="/auth/login" />;
  }
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats
          pathname={location.pathname}
          dashboardData={dashboardData}
        />
        {location.pathname != "/admin/dashboard" && (
          <div
            style={{
              marginTop: "-6rem",
              width: "60%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <span
              onClick={() => {
                if (searchInput) {
                  setSearchClicked(true);
                }
              }}
              className="admin z-10 leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
            >
              <i className="fas fa-search"></i>
            </span>
            <input
              style={{ fontWeight: "500" }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (searchInput) {
                    setSearchClicked(true);
                  }
                }
              }}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput}
              type="text"
              placeholder="Search here..."
              className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
            />
          </div>
        )}
        <div
          className={`absolute px-4 md:px-10 mx-auto w-full ${
            location.pathname != "/admin/dashboard" ? "-m-10" : "-m-24"
          }`}
        >
          <Switch>
            <Route
              render={(props) => (
                <Dashboard {...props} dashboardData={dashboardData} />
              )}
              path="/admin/dashboard"
              exact
            />
            {/* <Route path="/admin/maps" exact component={Maps} /> */}
            {/* <Route path="/admin/settings" exact component={Settings} /> */}
            <Route
              render={(props) => <Users {...props} searchInput={searchProps} />}
              path="/admin/users"
              exact
            />
            <Route
              render={(props) => (
                <Waiters {...props} searchInput={searchProps} />
              )}
              path="/admin/waiters"
              exact
            />
            <Route
              render={(props) => (
                <Restaurants {...props} searchInput={searchProps} />
              )}
              path="/admin/restaurants"
              exact
            />
            <Route
              render={(props) => (
                <WaiterApproval {...props} searchInput={searchProps} />
              )}
              path="/admin/waiter-approval"
              exact
            />
            <Route
              render={(props) => (
                <WaitersRatings {...props} searchInput={searchProps} />
              )}
              path="/admin/waiters-ratings"
              exact
            />
            <Route
              render={(props) => (
                <WaiterDetails {...props} searchInput={searchProps} />
              )}
              path="/admin/waiter-details"
              exact
            />
            <Route
              render={(props) => (
                <RestaurantWaiters {...props} searchInput={searchProps} />
              )}
              path="/admin/restaurant-waiters"
              exact
            />
             <Route
              render={(props) => (
                <WaitersRatings lotteryTab={true} {...props} searchInput={searchProps} />
              )}
              path="/admin/voters-lottery-numbers"
              exact
            />
             <Route
              render={(props) => (
                <OpenToWork  {...props} searchInput={searchProps} />
              )}
              path="/admin/open-to-work"
              exact
            />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
