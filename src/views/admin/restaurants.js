import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import {
  GET_RESTAURANTS,
  ADD_MENU_URL_RESTAURANTS,
  SEARCH_RESTAURANTS,
} from "queries";
import { reactQueryConfig } from "constants/index";
import Table from "components/table";
import TableDropdown from "components/Dropdowns/TableDropdown.js";
import Pagination from "@material-ui/lab/Pagination";
import { totalCount } from "util/pagination";
import moment from "moment";
import Loader from "react-loader-spinner";
import Swal from "sweetalert2";
import { LimitWords } from "util/waiterApproval";
import { useHistory } from "react-router-dom";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import "./styles/styles.css";

const Restaurants = ({ searchInput }) => {
  let history = useHistory();
  let splitPath = history.location.search.split("=")[1] || 1;
  const [query, setQuery] = useState({
    page_no: splitPath,
    records_per_page: 30,
    sort_by: "updatedAt",
    order: -1,
  });
  const [searchedData, setSearchedData] = useState([]);
  const { mutate } = useMutation(ADD_MENU_URL_RESTAURANTS);

  useEffect(() => {
    searchInput.setSearchInput("");
  }, []);

  const {
    data: restaurantsData,
    isLoading: restaurantsIsLoading,
    refetch: refetchRestaurantsData,
    isFetching: restaurantsIsFetching,
    isError: restaurantsIsError,
  } = useQuery(["GET_RESTAURANTS", { ...query }], GET_RESTAURANTS, {
    ...reactQueryConfig,
  });
  // console.log(restaurantsData);

  const {
    data: searchRestaurantsData,
    isLoading: searchRestaurantsIsLoading,
    refetch: refetchSearchRestaurantsData,
    isFetching: searchRestaurantsIsFetching,
    isError: searchRestaurantsIsError,
  } = useQuery(
    ["SEARCH_RESTAURANTS", { search: searchInput?.searchInput }],
    SEARCH_RESTAURANTS,
    {
      enabled: searchInput.searchClicked,
      ...reactQueryConfig,
      onSuccess: (res) => {
        searchInput.setSearchClicked(false);
        setSearchedData(res.data);
      },
      onError: () => {
        searchInput.setSearchClicked(false);
      },
    }
  );

  let searchCondition =
    searchInput?.searchInput &&
    searchRestaurantsData &&
    !searchRestaurantsIsLoading &&
    !searchRestaurantsIsFetching;

  let mapData = () => {
    if (searchCondition) {
      return searchedData || [];
    } else {
      return restaurantsData?.data || [];
    }
  };

  const handleChange = (event, value) => {
    history.push(`/admin/restaurants?page_no=${value}`);
    setQuery({ ...query, page_no: value });
  };

  const AddMenuURL = async (
    id,
    formatted_address,
    name,
    rating,
    photos,
    our_rating
  ) => {
    Swal.fire({
      input: "url",
      inputLabel: "URL address",
      inputPlaceholder: "Enter the URL",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let URLDetails = {
          id,
          menu_url: result.value,
          formatted_address,
          name,
          rating,
          photos: photos,
          our_rating: our_rating,
        };
        Swal.fire({
          title: "Action in Process!",
          text: "Please Wait...",
          onOpen: function () {
            Swal.showLoading();
          },
        });
        await mutate(URLDetails, {
          onSuccess: async () => {
            await refetchRestaurantsData();
            searchInput.setSearchInput("");
            Swal.fire(
              "Menu URL Added Successfully!",
              `The Menu URL has been added to ${name}.`,
              "success"
            );
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
  const HandleDeleteMenuURL = async (id, ResName) => {
    let URLDetails = {
      id: id,
      menu_url: "empty",
    };
    Swal.fire({
      title: "Action in Process!",
      text: "Please Wait...",
      onOpen: function () {
        Swal.showLoading();
      },
    });
    await mutate(URLDetails, {
      onSuccess: async () => {
        await refetchRestaurantsData();
        Swal.fire(
          "Menu URL Deleted Successfully!",
          `The Menu URL has been deleted from ${ResName}.`,
          "success"
        );
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
  };

  return (
    <Table
      tableColumns={[
        "",
        "Restaurant",
        "Rating",
        "Waiters",
        "Menu Url",
        "Updated On",
        "Created On",
        "Action",
      ]}
      tableHeading={
        <div className="flex">
          <span>Restaurants</span>
          {(restaurantsIsLoading ||
            restaurantsIsFetching ||
            searchRestaurantsIsFetching ||
            searchRestaurantsIsLoading) && (
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
            {searchCondition ? (
              ""
            ) : (
              <Pagination
                page={Number(query.page_no)}
                count={totalCount(
                  restaurantsData?.total_number_of_restaurants,
                  restaurantsData?.records_per_page
                )}
                color="secondary"
                onChange={handleChange}
              />
            )}
          </div>
        </div>
      }
      color="light"
    >
      {mapData().map((item, key) => {
        return (
          <tr key={key}>
            <React.Fragment>
              <td
                style={{ cursor: "pointer" }}
                data-tip="Click here to see the restaurant waiters."
                onClick={() =>
                  history.push(
                    `/admin/restaurant-waiters?restaurant_id=${item?.place_id}&page_no=1`,
                    {
                      restaurantName: item?.name,
                    }
                  )
                }
                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"
              >
                <DoubleArrowIcon className="details" fontSize="small" />
              </td>
              <td
                style={{ minWidth: "18rem", maxWidth: "25rem" }}
                className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs  p-4 text-left flex items-center"
              >
                <span className={"ml-3 font-bold text-gray-700"}>
                  <div
                    style={{
                      fontSize: "0.8rem",
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
                {(Number(item?.our_rating) > 0
                  ? Number(item?.our_rating).toFixed(1) + " (Our Ratings)"
                  : item?.rating) || "0"}
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
                    {item?.updatedAt ? moment(item?.updatedAt).format("l") : ""}
                  </span>
                </div>
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <div className="flex items-center">
                  <span className="mr-2">
                    {item?.createdAt ? moment(item?.createdAt).format("l") : ""}
                  </span>
                </div>
              </td>
              <td className="border-t-0 px-0 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-center">
                <TableDropdown
                  AddMenuURL={() => {
                    AddMenuURL(
                      item?.place_id,
                      item?.formatted_address,
                      item?.name,
                      item?.rating,
                      item?.photos,
                      item?.our_rating || "0"
                    );
                  }}
                  {...(item?.menu_url
                    ? {
                        DeleteMenuURL: () => {
                          HandleDeleteMenuURL(item.place_id, item?.name);
                        },
                      }
                    : {})}
                />
              </td>
            </React.Fragment>
          </tr>
        );
      })}
    </Table>
  );
};

export default Restaurants;
