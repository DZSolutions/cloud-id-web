import { Fragment, useEffect, useState, useLocation } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
  useParams,
  Link,
} from "react-router-dom";
import { withRouter } from "react-router";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { ImageCropper } from "./pages/ImageCropper";
import { ImageEditor } from "./pages/ImageEditor";
import { Ticket } from "./pages/Ticket";
import { Upload } from "./pages/Upload";
import { ComponentError } from "./pages/Error";
import DZ from "./images/DZ.png";
import DZLOGO from "./images/dzcard.png";
import { Login } from "./pages/Login";
import AuthService from "./services/auth.service";
import { Register } from "./pages/Register";
import { API_BASE_URL } from "./constrants/apiConstrants";
import axios from "axios";

const navigation = ["Upload", "Crop Image", "Image Editor", "Ticket"];
const navigationRoute = ["Upload", "CropImage", "ImageEditor", "Ticket"];
const profile = ["Your Profile", "Settings", "Sign out"];

function App(props) {
  AuthService.getAccessToken();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  function clearAccessToken() {
    setAccessToken(null);
    AuthService.logout();
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // const LoginContainer = () => (
  //   <div>
  //     LOGIN CONTAINER
  //     <Switch>
  //       <Route exact path="/" render={() => <Redirect to="/login" />} />
  //       <Route exact path="/logout" render={() => <Redirect to="/login" />} />
  //       <Route path="/login" component={Login} />
  //       <Route path="/register" component={Register} />
  //       <Route path="/ticket">
  //         <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-4 sm:px-6 lg:px-8">
  //           <Ticket />
  //         </div>
  //       </Route>
  //     </Switch>
  //   </div>
  // );

  function DefaultContainer() {
    const { org } = useParams();
    return (
      <div>
        {accessToken ? (
          <>
            <NavBarContainer />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Route path="/:org/Upload" component={Upload} />
              <Route path="/:org/CropImage" component={ImageCropper} />
              <Route path="/:org/ImageEditor" component={ImageEditor} />
              <Route path="/:org/Ticket" component={Ticket} />
            </div>
          </>
        ) : (
          <main>
            <Switch>
              <Route
                exact
                path="/:org"
                component={Login}
                // render={() => <Redirect to="/login" />}
              ></Route>
              <Route
                exact
                path="/:org/logout"
                component={Login}
                // render={() => <Redirect to="/login" />}
              ></Route>
              <Route path="/:org/Login" component={Login} />
              <Route path="/:org/Register" component={Register} />
              <Route path="/:org/Ticket">
                <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-4 sm:px-6 lg:px-8">
                  <Ticket />
                </div>
              </Route>
              <Route component={ComponentError} />
            </Switch>
          </main>
        )}
      </div>
    );
  }

  function NavBarContainer() {
    return (
      <>
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-8 w-8" src={DZLOGO} alt="Workflow" />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map(
                          (item, itemIdx) => (
                            // itemIdx === 0 ? (
                            //   <Fragment key={item}>
                            //     {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                            //     <NavLink
                            //       exact
                            //       to={"/"}
                            //       activeClassName="active"
                            //       className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            //     >
                            //       {item}
                            //     </NavLink>
                            //   </Fragment>
                            // ) : (
                            <NavLink
                              key={item}
                              to={navigationRoute[itemIdx]}
                              activeClassName="active"
                              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                              {item}
                            </NavLink>
                          )
                          // )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        {({ open }) => (
                          <>
                            <div>
                              <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={DZ}
                                  alt=""
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              show={open}
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                static
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                {profile.map((item) => (
                                  <Menu.Item key={item}>
                                    {({ active }) => (
                                      <Link
                                        to={"logout"}
                                        onClick={clearAccessToken}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        {item}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item, itemIdx) =>
                    itemIdx === 0 ? (
                      <Fragment key={item}>
                        <NavLink
                          exact
                          to="/"
                          activeClassName="active"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                          {item}
                        </NavLink>
                      </Fragment>
                    ) : (
                      <NavLink
                        key={item}
                        to={navigationRoute[itemIdx]}
                        activeClassName="active"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        {item}
                      </NavLink>
                    )
                  )}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={DZ} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        DZCard Developer
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        Developer@dzcard.com
                      </div>
                    </div>
                    <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {profile.map((item) => (
                      <a
                        key={item}
                        href={"DD"}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              <Switch>
                {navigation.map(
                  (item, itemIdx) => (
                    // itemIdx === 0 ? (
                    //   <Route key={item} exact path="/">
                    //     Home
                    //   </Route>
                    // ) : (
                    <Route key={item} path={navigationRoute[itemIdx]}>
                      {navigation[itemIdx]}
                    </Route>
                  )
                  // )
                )}
              </Switch>
            </h1>
          </div>
        </header>
      </>
    );
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            path="/:org"
            // render={({ location }) =>
            //   ["/", "/login", "/logout", "/register", "/ticket"].includes(
            //     location.pathname
            //   ) ? (
            //     <LoginContainer />
            //   ) : (
            //     <DefaultContainer />
            //   )
            // }
          >
            <DefaultContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
