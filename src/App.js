import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
} from "react-router-dom";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { ImageCropper } from "./ImageCropper";
import { ImageEditor } from "./ImageEditor";
import DZ from "./images/DZ.png";
import DZLOGO from "./images/dzcard.png";
import templateDZ from "./images/templateDZ.jpg";

const navigation = ["Home", "Crop Image", "Image Editor"];
const navigationRoute = ["/", "/CropImage", "/ImageEditor"];
const profile = ["Your Profile", "Settings", "Sign out"];

function App() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Router>
      <div>
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-8 w-8" src={DZLOGO} alt="Workflow" />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item, itemIdx) =>
                          itemIdx === 0 ? (
                            <Fragment key={item}>
                              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                              <NavLink
                                exact
                                to={"/"}
                                activeClassName="active"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                              >
                                {item}
                              </NavLink>
                            </Fragment>
                          ) : (
                            <NavLink
                              key={item}
                              to={navigationRoute[itemIdx]}
                              activeClassName="active"
                              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                              {item}
                            </NavLink>
                          )
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
                                      <a
                                        href={"FF"}
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
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              <Switch>
                {navigation.map((item, itemIdx) =>
                  itemIdx === 0 ? (
                    <Route key={item} exact path="/">
                      Home
                    </Route>
                  ) : (
                    <Route key={item} path={navigationRoute[itemIdx]}>
                      {navigation[itemIdx]}
                    </Route>
                  )
                )}
              </Switch>
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/CropImage">
                <ImageCropper />
              </Route>
              <Route path="/ImageEditor">
                <ImageEditor />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    // <div classNameName="px-4 py-6 sm:px-0">
    //   <div classNameName="border-4 border-dashed border-gray-200 rounded-lg h-96" />
    // </div>
    <div className="relative mt-12 sm:mt-4 lg:mt-12">
      <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
        <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
          <img className="relative mx-auto" src={templateDZ} alt="" />
        </div>

        <div className="lg:col-start-2 md:mt-4 lg:mt-0">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid gap-6 grid-cols-6">
                <div className="col-span-6 sm:col-span-4">
                  <p className="block text-gray-700 text-sm font-medium">
                    Employee/Student ID
                  </p>
                  <input
                    readOnly
                    type="text"
                    className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <p className="block text-gray-700 text-sm font-medium">
                    First name
                  </p>
                  <input
                    readOnly
                    type="text"
                    className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <p className="block text-gray-700 text-sm font-medium">
                    Last name
                  </p>
                  <input
                    readOnly
                    type="text"
                    className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <p className="block text-gray-700 text-sm font-medium">
                    Mobile No.
                  </p>
                  <input
                    readOnly
                    type="text"
                    className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <p className="block text-gray-700 text-sm font-medium">
                    Email address
                  </p>
                  <input
                    readOnly
                    type="text"
                    autoComplete="email"
                    className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <p className="block text-gray-700 text-sm font-medium">
                    Department / Faculty
                  </p>
                  <input
                    readOnly
                    type="text"
                    className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <p className="block text-gray-700 text-sm font-medium">
                    Issue Date
                  </p>
                  <input
                    readOnly
                    type="text"
                    className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <p className="block text-gray-700 text-sm font-medium">
                    Expire Date
                  </p>
                  <input
                    readOnly
                    type="text"
                    className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6"></div>
              </div>
            </div>
            <div className="px-4 py-3 text-center bg-gray-100 sm:px-6">
              <div className="flex items-center justify-center col-span-2">
                <input
                  id="accept_tos"
                  name="accept_tos"
                  type="checkbox"
                  className="h-8 w-8 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded"
                ></input>
                <label className="ml-2 block text-sm font-medium text-gray-700">
                  I agree to the terms and conditions and the privacy policy
                </label>
              </div>
              <Link
                to="/CropImage"
                className="inline-flex justify-center px-4 py-2 text-white text-3xl font-medium bg-rose-600 hover:bg-rose-500 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-rose-500 focus:ring-offset-2 focus:ring-2"
              >
                Upload Photo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
