import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import templateDZ from "../images/templateDZ.jpg";
import AuthService from "../services/auth.service";
import axios from "axios";
import mergeImages from "merge-images";
import { API_BASE_URL } from "../constrants/apiConstrants";
export function Upload() {
  const [post, setPost] = useState(null);
  const [image, setImage] = useState(templateDZ);
  const [start, setStart] = useState(0);
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
    var ctx = canvas.getContext("2d");
    console.log(ctx);
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
    <div className="relative mt-12 sm:mt-4 lg:mt-12">
      <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
        <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
          <img className="mx-auto" src={image} alt="" />
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
  );
}
