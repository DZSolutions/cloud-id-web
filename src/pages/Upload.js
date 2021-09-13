import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import templateDZ from "../images/templateDZ.jpg";
import templateDZ_Back from "../images/templateDZ_Back.jpg";
import AuthService from "../services/auth.service";
import axios from "axios";
import mergeImages from "merge-images";
import { API_BASE_URL } from "../constrants/apiConstrants";
import Select, { components } from "react-select";

export function Upload() {
  const [post, setPost] = useState(null);
  const [image, setImage] = useState(templateDZ);
  const [start, setStart] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [print, setPrint] = useState(false);

  const [selectedOrgUnit, setSelectOrgUnit] = useState(null);
  const [selectedLocation, setSelectLocation] = useState(null);
  const [selectedConsole, setSelectConsole] = useState(null);
  const [selectedPrinter, setSelectPrinter] = useState(null);

  const orgUnits = [
    {
      value: "ku",
      label: "KU",
      locations: [
        {
          value: "ku_bangkhen",
          label: "KU Bangkhen",
          consoles: [
            {
              value: "science",
              label: "คณะวิทยาศาสตร์",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
            {
              value: "social",
              label: "คณะสังคม",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
          ],
        },
        {
          value: "ku_khampangsan",
          label: "KU Khampangsan",
          consoles: [
            {
              value: "science",
              label: "คณะวิทยาศาสตร์",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
            {
              value: "social",
              label: "คณะสังคม",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
          ],
        },
        {
          value: "ku_sriracha",
          label: "KU Sriracha",
          consoles: [
            {
              value: "science",
              label: "คณะวิทยาศาสตร์",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
            {
              value: "social",
              label: "คณะสังคม",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
          ],
        },
      ],
    },
    {
      value: "swu",
      label: "SWU",
      locations: [
        {
          value: "swu_bangkhen",
          label: "SWU Bangkhen",
          consoles: [
            {
              value: "science",
              label: "คณะวิทยาศาสตร์",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
            {
              value: "social",
              label: "คณะสังคม",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
          ],
        },
        {
          value: "swu_khampangsan",
          label: "SWU Khampangsan",
          consoles: [
            {
              value: "science",
              label: "คณะวิทยาศาสตร์",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
            {
              value: "social",
              label: "คณะสังคม",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
          ],
        },
        {
          value: "swu_sriracha",
          label: "SWU Sriracha",
          consoles: [
            {
              value: "science",
              label: "คณะวิทยาศาสตร์",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
            {
              value: "social",
              label: "คณะสังคม",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
          ],
        },
      ],
    },
    {
      value: "cmu",
      label: "CMU",
      locations: [
        {
          value: "cmu_bangkhen",
          label: "CMU Bangkhen",
          consoles: [
            {
              value: "science",
              label: "คณะวิทยาศาสตร์",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
            {
              value: "social",
              label: "คณะสังคม",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
          ],
        },
        {
          value: "cmu_khampangsan",
          label: "CMU Khampangsan",
          consoles: [
            {
              value: "science",
              label: "คณะวิทยาศาสตร์",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
            {
              value: "social",
              label: "คณะสังคม",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
          ],
        },
        {
          value: "cmu_sriracha",
          label: "CMU Sriracha",
          consoles: [
            {
              value: "science",
              label: "คณะวิทยาศาสตร์",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
            {
              value: "social",
              label: "คณะสังคม",
              printers: [
                { value: "printer1", label: "Printer No. 1" },
                { value: "printer2", label: "Printer No. 2" },
              ],
            },
          ],
        },
      ],
    },
  ];

  const Input = (props) => (
    <components.Input
      {...props}
      inputClassName="outline-none border-none shadow-none focus:ring-transparent"
    />
  );

  function togglePrint() {
    setPrint((wasOpened) => !wasOpened);
  }

  const currentUser = AuthService.getCurrentUser();
  AuthService.getAccessToken();
  const accessToken = localStorage.getItem("accessToken");

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
                onClick={() => togglePrint(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {print ? "Information" : "Print Card"}
              </button>
            </div>
          </div>
          <div className="lg:col-start-2 md:mt-4 lg:mt-0">
            <div className="shadow overflow-hidden sm:rounded-md">
              {print ? (
                <>
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid gap-6 grid-cols-6">
                      <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium pb-2">
                          Organization Unit
                        </p>
                        <Select
                          menuPortalTarget={document.querySelector("body")}
                          defaultValue={selectedOrgUnit}
                          onChange={setSelectOrgUnit}
                          options={orgUnits}
                          components={{ Input }}
                        />
                      </div>
                      <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium pb-2">
                          Locations
                        </p>
                        <Select
                          menuPortalTarget={document.querySelector("body")}
                          defaultValue={selectedLocation}
                          onChange={setSelectLocation}
                          options={
                            selectedOrgUnit ? selectedOrgUnit.locations : []
                          }
                          components={{ Input }}
                        />
                      </div>
                      <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium pb-2">
                          Consoles
                        </p>
                        <Select
                          menuPortalTarget={document.querySelector("body")}
                          defaultValue={selectedConsole}
                          onChange={setSelectConsole}
                          options={
                            selectedLocation ? selectedLocation.consoles : []
                          }
                          components={{ Input }}
                        />
                      </div>
                      <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium pb-2">
                          Printers
                        </p>
                        <Select
                          menuPortalTarget={document.querySelector("body")}
                          defaultValue={selectedPrinter}
                          onChange={setSelectPrinter}
                          options={
                            selectedConsole ? selectedConsole.printers : []
                          }
                          components={{ Input }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 text-center bg-gray-100 sm:px-6">
                    <Link
                      to="/CropImage"
                      className="inline-flex justify-center px-4 py-2 text-white text-3xl font-medium bg-blue-600 hover:bg-blue-500 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-blue-500 focus:ring-offset-2 focus:ring-2"
                    >
                      Print Card
                    </Link>
                  </div>
                </>
              ) : (
                <>
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
                        I agree to the terms and conditions and the privacy
                        policy
                      </label>
                    </div>
                    <Link
                      to="/CropImage"
                      className="inline-flex justify-center px-4 py-2 text-white text-3xl font-medium bg-rose-600 hover:bg-rose-500 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-rose-500 focus:ring-offset-2 focus:ring-2"
                    >
                      Upload Photo
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
