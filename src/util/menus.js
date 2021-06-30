export default [
  {
    to: "/admin/dashboard",
    name: "Dashboard",
    match: "/admin/dashboard",
  },
  {
    to: "/admin/users?page_no=1",
    name: "Users",
    match: "/admin/users",
  },
  {
    to: "/admin/waiters?page_no=1&status=All",
    name: "Staffs",
    match: "/admin/waiters",
  },
  {
    to: "/admin/restaurants?page_no=1",
    name: "Places",
    match: "/admin/restaurants",
  },
  {
    to: "/admin/waiters-ratings?page_no=1",
    name: "Place Ratings",
    match: "/admin/place-ratings",
  },
  {
    to: "/admin/waiter-approval?page_no=1",
    name: "Staffs Approval",
    match: "/admin/waiter-approval",
  },
  {
    to: "/admin/waiters-ratings?page_no=1",
    name: "Staff Ratings",
    match: "/admin/waiters-ratings",
  },
];
