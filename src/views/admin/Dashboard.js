import React from "react";
import CardStats from "components/Cards/CardStats.js";
import CardLineChart from "components/Cards/CardLineChart";
import "./styles/dashboard.css";
import Tab from "components/tabs/tabs";
import BestRestaurants from "components/BestRestaurants";
import BestWaiters from "components/BestWaiters";

export default function Dashboard(props) {
  let IconColor = "#FF6F61";
  let backgroundColor = "#2f3872";
  // "linear-gradient(145deg, #955251, #f0ad4e)";
  return (
    <>
      <div style={{ marginTop: "1.5rem" }} className="flex flex-wrap">
        <div className="dashboard w-full lg:w-6/12 xl:w-4/12 px-4 ">
          <CardStats
            BgColor={backgroundColor}
            fontColor="white"
            color="white"
            statSubtitle="TOTAL ANDROID USERS"
            statTitle={props.dashboardData?.users?.total_android_users || "0"}
            statIconName="fas fa-robot"
            IconColor="white"
            IconNameColor={IconColor}
          />
        </div>
        <div className="dashboard w-full lg:w-6/12 xl:w-4/12 px-4 ">
          <CardStats
            BgColor={backgroundColor}
            fontColor="white"
            color="white"
            statSubtitle="TOTAL IPHONE USERS"
            statTitle={props.dashboardData?.users?.total_apple_users || "0"}
            statIconName="fab fa-apple"
            IconColor="white"
            IconNameColor={IconColor}
          />
        </div>
        <div className="dashboard w-full lg:w-6/12 xl:w-4/12 px-4 ">
          <CardStats
            BgColor={backgroundColor}
            fontColor="white"
            color="white"
            statSubtitle="TOTAL MENU LINKS"
            statTitle={
              props.dashboardData?.restaurant?.restaurants_with_menu_url || "0"
            }
            statIconName="fas fa-link"
            IconColor="white"
            IconNameColor={IconColor}
          />
        </div>
        <div className="dashboard w-full lg:w-6/12 xl:w-4/12 px-4">
          <CardStats
            BgColor={backgroundColor}
            fontColor="white"
            color="white"
            statSubtitle="TOTAL BEST WAITERS"
            statTitle={props.dashboardData?.waiters?.best_waiters || "0"}
            statIconName="fab fa-gratipay"
            IconColor="white"
            IconNameColor={IconColor}
          />
        </div>
        <div className="dashboard w-full lg:w-6/12 xl:w-4/12 px-4">
          <CardStats
            BgColor={backgroundColor}
            fontColor="white"
            color="white"
            statSubtitle="TOTAL BEST RESTAURANTS"
            statTitle={props.dashboardData?.restaurant?.best_restaurants || "0"}
            statIconName="fas fa-hamburger"
            IconColor="white"
            IconNameColor={IconColor}
          />
        </div>
      </div>
      <div style={{ marginTop: 40 }}>
        <Tab
          users={<CardLineChart Data={props.dashboardData?.charts} />}
          bestWaiters={
            <BestWaiters
              waitersData={props.dashboardData?.waiters?.bestWaitersOfMonth}
            />
          }
          bestRestaurants={
            <BestRestaurants
              data={props.dashboardData?.restaurant?.bestRestaurantOfMonth}
            />
          }
        />
      </div>
    </>
  );
}
