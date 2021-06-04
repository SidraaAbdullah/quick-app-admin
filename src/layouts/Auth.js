import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { getLocalStorageValues } from "../constants";

// components
import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";

export default function Auth() {
  let { Email } = getLocalStorageValues();
  if (Email.Email) {
    return <Redirect from="*" to="/admin/dashboard" />;
  }
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png") + ")",
            }}
          ></div>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            {/* <Route path="/auth/register" exact component={Register} /> */}
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
