import { Link } from "react-router-dom";
import { useState, useEffect, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import templateDZ from "../images/templateDZ.jpg";
import templateDZ_Back from "../images/templateDZ_Back.jpg";
import AuthService from "../services/auth.service";
import axios from "axios";
import mergeImages from "merge-images";
import { API_BASE_URL } from "../constrants/apiConstrants";
import { CheckIcon } from "@heroicons/react/outline";
export function Upload() {
  const [post, setPost] = useState(null);
  const [image, setImage] = useState(templateDZ);
  const [start, setStart] = useState(0);
  const [isFront, setIsFront] = useState(true);

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const currentUser = AuthService.getCurrentUser();
  AuthService.getAccessToken();
  const accessToken = localStorage.getItem("accessToken");

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  let [categories] = useState({
    SCB1: [
      {
        id: 1,
        title: "Chiang Mai University",
        status: true,
        location:
          "239 Huay Kaew Rd, Suthep, Mueang Chiang Mai District, Chiang Mai 50200",
        // date: "5h ago",
        // commentCount: 5,
        // shareCount: 2,
      },
      {
        id: 2,

        title: "Bangkok University",
        status: false,
        location:
          "999 Buay Haew Rd, Suthep, Mueang Chiang Mai District, Chiang Mai 50200",
        // date: "2h ago",
        // commentCount: 3,
        // shareCount: 2,
      },
    ],
    SCB2: [
      {
        id: 1,
        title: "SCB Branch Bang Phli",
        status: true,
        location:
          "239 Huay Kaew Rd, Suthep, Mueang Chiang Mai District, Chiang Mai 50200",
        // date: "Jan 7",
        // commentCount: 29,
        // shareCount: 16,
      },
      {
        id: 2,
        title: "SCB Branch Paradise",
        status: true,
        location:
          "239 Huay Kaew Rd, Suthep, Mueang Chiang Mai District, Chiang Mai 50200",
        // date: "Mar 19",
        // commentCount: 24,
        // shareCount: 12,
      },
    ],
    SCB3: [
      {
        id: 1,
        title: "Etc Branch 1",
        status: false,
        location:
          "239 Huay Kaew Rd, Suthep, Mueang Chiang Mai District, Chiang Mai 50200",
        // date: "2d ago",
        // commentCount: 9,
        // shareCount: 5,
      },
      {
        id: 2,
        title: "Etc Branch 2",
        status: false,
        location:
          "239 Huay Kaew Rd, Suthep, Mueang Chiang Mai District, Chiang Mai 50200",
        // date: "4d ago",
        // commentCount: 1,
        // shareCount: 2,
      },
    ],
  });

  useEffect(() => {
    axios
      .get(API_BASE_URL + "/v1/userlist", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPost(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post) return "Loading";

  const mixImage = async () => {
    const cardPlusMan = await mergeImages(
      [templateDZ, { src: post.results[0].photo, x: 41, y: 123 }],
      {
        crossOrigin: "*",
      }
    );
    var temp = new Image();
    temp.src = cardPlusMan;

    let canvasWidth = 340;
    let canvasHeight = 534;
    let canvas = new OffscreenCanvas(canvasWidth, canvasHeight);
    // let fontColor = "#000000";
    // let textPosX = 20;
    // let firstNamePosY = 345;
    // let lastNamePosY = 455;
    // let picPosX = 38;
    // let picPosY = 117;
    // let croppieWidth = 298;
    // let croppieHeight = 195;
    // let previewHeight = 500;
    // let profile_id_PosY = 511;
    // let facultyPosY = 369;
    // var ctx = canvas.getContext("2d");
    // console.log(ctx);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    temp.onload = function () {
      // ctx.drawImage(image, 0, 0);
      // ctx.fillText(
      //   post.results[0].first_name_en + " " + post.results[0].last_name_en,
      //   textPosX,
      //   firstNamePosY
      // );
      // ctx.fillText({ currentUser }, textPosX, profile_id_PosY);
      // ctx.fillText(post.results[0].faculty, textPosX, facultyPosY);
    };

    setImage(cardPlusMan);
  };

  if (post.results[0].photo != null && start === 0) {
    mixImage();
    setStart(1);
  }

  return (
    <>
      <div className="relative mt-12 sm:mt-4 lg:mt-12">
        <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
            {isFront ? (
              <img className="mx-auto" src={image} alt="" />
            ) : (
              <img className="mx-auto" src={templateDZ_Back} alt="" />
            )}
            <div className="flex justify-center mt-2 space-x-5">
              <span className="relative z-0 inline-flex shadow-sm rounded-md">
                <button
                  type="button"
                  onClick={() => setIsFront(true)}
                  autoFocus
                  className={
                    "relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  }
                >
                  Front Card
                </button>
                <button
                  type="button"
                  onClick={() => setIsFront(false)}
                  className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Back Card
                </button>
              </span>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Print Card
              </button>
            </div>
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
                      value={currentUser}
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
                      value={post.results[0].first_name_en}
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
                      value={post.results[0].last_name_en}
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
                      value={post.results[0].phone}
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
                      value={post.results[0].faculty}
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
                      value={post.results[0].issue_date}
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
                      value={post.results[0].expire_date}
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

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  {/* <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div> */}
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Choose organization unit and location to print
                    </Dialog.Title>
                    <div className="w-full max-w-md px-2 py-4 sm:px-0">
                      <Tab.Group>
                        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                          {Object.keys(categories).map((category) => (
                            <Tab
                              key={category}
                              className={({ selected }) =>
                                classNames(
                                  "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                                  selected
                                    ? "bg-blue-200 shadow"
                                    : "bg-blue-50 text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                )
                              }
                            >
                              {category}
                            </Tab>
                          ))}
                        </Tab.List>
                        <Tab.Panels className="mt-2">
                          {Object.values(categories).map((posts, idx) => (
                            <Tab.Panel
                              key={idx}
                              className={classNames(
                                "bg-white rounded-xl p-3",
                                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                              )}
                            >
                              <ul>
                                {posts.map((post) => (
                                  <li
                                    key={post.id}
                                    className="relative p-3 rounded-md bg-gray-50 hover:bg-gray-100 mt-2"
                                  >
                                    <h3 className="text-sm font-medium leading-5">
                                      {post.title}
                                    </h3>

                                    <ul className="flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                      {post.status ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                          Active
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                          Offline
                                        </span>
                                      )}
                                      <li>{post.location}</li>
                                      {/* <li>{post.date}</li>
                                      <li>&middot;</li>
                                      <li>{post.commentCount} comments</li>
                                      <li>&middot;</li>
                                      <li>{post.shareCount} shares</li> */}
                                    </ul>

                                    <a
                                      href="#"
                                      className={classNames(
                                        "absolute inset-0 rounded-md",
                                        "focus:z-10 focus:outline-none focus:ring-2 ring-blue-400"
                                      )}
                                    />
                                  </li>
                                ))}
                              </ul>
                            </Tab.Panel>
                          ))}
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
                    {/* <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Eius aliquam laudantium explicabo pariatur iste
                        dolorem animi vitae error totam. At sapiente aliquam
                        accusamus facere veritatis.
                      </p>
                    </div> */}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Print
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
