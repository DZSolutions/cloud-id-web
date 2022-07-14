import { useParams } from "react-router-dom";
import { Fragment } from "react";
// import { API_BASE_URL } from "../constrants/apiConstrants";
// import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon ,UserIcon} from "@heroicons/react/outline";
import { ImageCropper } from "./ImageCropper";
import { ImageEditor } from "./ImageEditor";
import { Home } from "./Home";
import { Upload } from "./Upload";
import { History } from "./History";
import { Layout } from "./Layout";
import { Ticket } from "./Ticket";
import DZ from "../images/DZ.png";
import DZLOGO from "../images/dzcard.png";
import AuthService from "../services/auth.service";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constrants/apiConstrants";
import axios from "axios";

export function NavBar(props) {
  const { orgName } = useParams();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [logo, setLogo] = useState(null);
  const [post, setPost] = useState(null);
  const currentUser = AuthService.getCurrentUser();
  AuthService.getAccessToken();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(async() => {
    await axios
      .get(API_BASE_URL + "/v1/organizationlist", {
      })
      .then((response) => {
        for (var organize in response.data)
        {
          if(response.data[organize].name === orgName)
          {
            setLogo(response.data[organize].logo);
          }
        }

      });
      await axios
      .get(API_BASE_URL + "/v1/userlist", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPost(response.data);
      });
  }, []);
  const navigation = ["History"];
  // const navigationRoute = ["/Home","/History"];
  const navigationRoute = ["/History"];
  // const profile = ["Your Profile", "Settings", "Sign out"];
  const profile = ["Sign out"];

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {/* <img className="h-8 w-8" src={DZLOGO} alt="Workflow" /> */}
                    <img className="h-8 w-8" src={logo} alt="Workflow" />
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
                            key={"XXHH-"+itemIdx}
                            to={"/" + orgName + navigationRoute[itemIdx]}
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
                              {/* <img
                                className="h-8 w-8 rounded-full"
                                src={DZ}
                                alt=""
                              /> */}
                               <UserIcon className="h-6 w-6 bg-gray-800 text-gray-400 rounded-full ring-2 ring-gray-400"/>
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
                                    <a
                                      href={"logout"}
                                      onClick={AuthService.logout}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item}
                                    </a>
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
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
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
                        key={"FFD-"+itemIdx}
                        to={"/" + orgName + navigationRoute[itemIdx]}
                        activeClassName="active"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        {item}
                      </NavLink>
                    </Fragment>
                  ) : (
                    <NavLink
                      key={item}
                      to={"/" + orgName + navigationRoute[itemIdx]}
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
                    {/* <img className="h-10 w-10 rounded-full" src={DZ} alt="" /> */}
                    <UserIcon className="h-6 w-6 bg-gray-800 text-gray-400 rounded-full ring-2 ring-gray-400"/>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {post &&(
                        <div>
                          {post.results[0].first_name_en} {post.results[0].last_name_en}
                        </div>
                      )}
                    </div>
                    {/* <div className="text-sm font-medium leading-none text-gray-400">
                      Developer@dzcard.com
                    </div> */}
                  </div>
                  <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {profile.map((item,index) => (

                    <a
                    key={"CC "+index}
                    href={"logout"}
                    onClick={AuthService.logout}
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
                  <Route key={item} path={"/:org/" + navigationRoute[itemIdx]}>
                    {navigation[itemIdx]}
                  </Route>
                )
                // )
              )}
            </Switch>
          </h1>
        </div>
      </header>
      <main style={{background: "linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(207 235 255) 100%)"}}>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Switch>
          <Route path="/:org/Home" component={Home} />
            <Route path="/:org/Layout" component={Layout} />
            <Route path="/:org/Upload" component={Upload} />
            <Route path="/:org/CropImage" component={ImageCropper} />
            <Route path="/:org/ImageEditor" component={ImageEditor} />
            <Route path="/:org/Ticket" component={Ticket} />
            <Route path="/:org/History" component={History} />
            <Route>404 NOT FOUND</Route>
          </Switch>
        </div>
      </main>
    </div>
  );
}
