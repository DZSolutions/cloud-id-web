import { useParams } from "react-router-dom";
import { useEffect, Fragment, useState } from "react";
import { API_BASE_URL } from "../constrants/apiConstrants";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { Ticket } from "./Ticket";

import { NavBar } from "./NavBar";
import { Landing_cret } from "./Landing_cret";

export function CompanyPage(props) {
  const { orgName } = useParams();
  const [organizationExists, setOrganizationExists] = useState();
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/v1/organization-exist?name=" + orgName)
      .then(function (response) {
        // handle success
        setOrganizationExists(true);
        console.log(response.data.message);
      })
      .catch(function (error) {
        // handle error
        setOrganizationExists(false);
        console.log(error);
      })
      .then(function () {
        // always executed
        setLoading(false);
      });
  }, [orgName]);

  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center items-center h-screen">
            <div className="bg-black flex space-x-2 p-5 rounded-full justify-center items-center">
              <div className="bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce blue-circle"></div>
              <div className="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce green-circle"></div>
              <div className="bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce red-circle"></div>
            </div>
          </div>
        </>
      ) : null}
      {/* Organization Name {orgName} <br />
      Organization Exists {organizationExists} */}
      {organizationExists ? (
        <>
          <Route path="/:org/logout">
            <Redirect to={`/${orgName}/login`} />
          </Route>
          <Route path="/:org/login" component={Login} />
          <Route exact path="/:org">
            <Redirect to={`/${orgName}/login`} />
          </Route>
          <Route path="/:org/register" component={Register}/>
          <Route path="/:org/issue" component={Ticket} />
        </>
      ) : (
        <>
          <Route path="/Landing_cret" component={Landing_cret}/>
        </>
      )}
      {organizationExists && accessToken ? <NavBar /> : null}
    </>
  );
}
