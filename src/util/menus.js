export default [
  {
    to: "/admin/dashboard",
    name: "Dashboard",
    match:'/admin/dashboard'
  },
  {
    to: "/admin/users?page_no=1",
    name: "Users",
    match:'/admin/users'
  },
  {
    to: "/admin/waiters?page_no=1&status=All",
    name: "Waiters",
    match:'/admin/waiters'
  },
  {
    to: "/admin/restaurants?page_no=1",
    name: "Restaurants",
    match:'/admin/restaurants'

  },
  {
    to: "/admin/waiter-approval?page_no=1",
    name: "Waiter Approval",
    match:'/admin/waiter-approval'
  },
  {
    to: "/admin/waiters-ratings?page_no=1",
    name: "Waiters Ratings",
    match:'/admin/waiters-ratings'
  },
  {
    to: "/admin/voters-lottery-numbers?page_no=1",
    name: "Lottery Numbers",
    match:'/admin/voters-lottery-numbers'
  },
  {
    to: "/admin/open-to-work?page_no=1",
    name: "Open to Work",
    match:'/admin/open-to-work'
  },
];
