import React from "react";
// components
import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats(props) {
  return (
    <>
      {/* Header */}
      <div
        style={{
          // background: "linear-gradient(0deg, #FCDF6F, #FCDF6F, #955251)",
          background: "#FDDF6F",
        }}
        className="relative md:pt-32 pb-32 pt-12"
      >
        <div className="px-4 md:px-10 mx-auto w-full">
          {/* Card stats */}
          <div className="flex flex-wrap justify-center">
            {(props.pathname === "/admin/dashboard" ||
              props.pathname === "/admin/users") && (
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  BgColor="white"
                  color="grey"
                  statSubtitle="USERS"
                  statTitle={
                    props.dashboardData?.users?.total_number_of_users || "-"
                  }
                  // statArrow="up"
                  // statPercent={
                  //   props.dashboardData?.users?.users_percentage.toFixed(2) ||
                  //   "-"
                  // }
                  // statPercentColor="text-green-500"
                  // statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-600"
                />
              </div>
            )}
            {props.pathname === "/admin/users" && (
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  BgColor="white"
                  color="grey"
                  statSubtitle="ANDROID USERS"
                  statTitle={
                    props.dashboardData?.users?.total_android_users || "-"
                  }
                  statIconName="fas fa-robot"
                  statIconColor="bg-red-600"
                />
              </div>
            )}
            {props.pathname === "/admin/users" && (
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  BgColor="white"
                  color="grey"
                  statSubtitle="APPLE USERS"
                  statTitle={
                    props.dashboardData?.users?.total_apple_users || "-"
                  }
                  statIconName="fab fa-apple"
                  statIconColor="bg-red-600"
                />
              </div>
            )}
            {(props.pathname === "/admin/dashboard" ||
              props.pathname === "/admin/waiters") && (
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  BgColor="white"
                  color="grey"
                  statSubtitle="TOTAL WAITERS"
                  statTitle={props.dashboardData?.waiters.total_waiters || "-"}
                  // statArrow="up"
                  // statPercent={
                  //   props.dashboardData?.waiters.waiters_percentage.toFixed(
                  //     2
                  //   ) || "-"
                  // }
                  // statPercentColor="text-green-500"
                  // statDescripiron="Since last month"
                  statIconName="fas fa-user-tie"
                  statIconColor="bg-orange-500"
                />
              </div>
            )}
            {props.pathname === "/admin/waiters" && (
              <>
                {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    BgColor="white"
                    color="grey"
                    statSubtitle="BEST WAITERS"
                    statTitle={
                      props.dashboardData?.waiters?.best_waiters || "-"
                    }
                    statIconName="fas fa-user-tie"
                    statIconColor="bg-orange-500"
                  />
                </div> */}
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    BgColor="white"
                    color="grey"
                    statSubtitle="ACTIVE WAITERS"
                    statTitle={
                      props.dashboardData?.waiters?.total_active_waiters || "-"
                    }
                    statIconName="fas fa-user-tie"
                    statIconColor="bg-orange-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    BgColor="white"
                    color="grey"
                    statSubtitle="ARCHIVE WAITERS"
                    statTitle={
                      props.dashboardData?.waiters?.total_archived_waiters ||
                      "-"
                    }
                    statIconName="fas fa-user-tie"
                    statIconColor="bg-orange-500"
                  />
                </div>
              </>
            )}
            {(props.pathname === "/admin/dashboard" ||
              props.pathname === "/admin/waiters-ratings") && (
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  BgColor="white"
                  color="grey"
                  statSubtitle="REVIEWS"
                  statTitle={props.dashboardData?.reviews.total_reviews || "-"}
                  // statArrow="up"
                  // statPercent={
                  //   props.dashboardData?.reviews.reviews_percentage.toFixed(
                  //     2
                  //   ) || "-"
                  // }
                  // statPercentColor="text-green-500"
                  // statDescripiron="Since last month"
                  statIconName="fas fa-money-bill-wave"
                  statIconColor="bg-red-600"
                />
              </div>
            )}
            {(props.pathname === "/admin/dashboard" ||
              props.pathname === "/admin/restaurants") && (
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  BgColor="white"
                  color="grey"
                  statSubtitle="RESTAURANTS"
                  statTitle={
                    props.dashboardData?.restaurant.total_restaurants || "-"
                  }
                  // statArrow="up"
                  // statPercent={
                  //   props.dashboardData?.restaurant.restaurants_percentage.toFixed(
                  //     2
                  //   ) || "-"
                  // }
                  // statPercentColor="text-green-500"
                  // statDescripiron="Since last month"
                  statIconName="fas fa-utensils"
                  statIconColor="bg-blue-800"
                />
              </div>
            )}
            {props.pathname === "/admin/restaurants" && (
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    BgColor="white"
                    color="grey"
                    statSubtitle="MENU LINKS"
                    statTitle={
                      props.dashboardData?.restaurant
                        ?.restaurants_with_menu_url || "-"
                    }
                    statIconName="fas fa-link"
                    statIconColor="bg-blue-800"
                  />
                </div>
            )}
            {props.pathname === "/admin/waiter-approval" && (
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  BgColor="white"
                  color="grey"
                  statSubtitle="PENDING WAITERS"
                  statTitle={
                    props.dashboardData?.waiters.total_pending_waiters || "-"
                  }
                  statIconName="fas fa-user"
                  statIconColor="bg-blue-800"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
