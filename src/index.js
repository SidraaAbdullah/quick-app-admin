import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { QueryClient, QueryClientProvider } from "react-query";
// layouts
import "assets/styles/index.css";
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Switch>
        {/* add routes with layouts */}
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/admin" />
      </Switch>
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById("root")
);
