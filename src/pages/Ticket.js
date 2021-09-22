import axios from "axios";
import { useState, useEffect } from "react";
import dzLogo from "../images/dzcard.png";
import { API_BASE_URL } from "../constrants/apiConstrants";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
export function Ticket(props) {
  const [post, setPost] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const currentUser = AuthService.getCurrentUser();
  AuthService.getAccessToken();
  const accessToken = localStorage.getItem("accessToken");
  const [organizationList, setOrganizationList] = useState([]);

  useEffect(() => {
    fetch(API_BASE_URL + "/v1/organizationlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setOrganizationList(resp));

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

  const handleSubmitClick = (e) => {
    e.preventDefault();
    sendDetailsToServer();
  };

  const [state, setState] = useState({
    organization: props.match.params.org,
    username: currentUser,
    email: "",
  });

  const sendDetailsToServer = () => {
    axios
      // .post(API_URL + "signin", {
      .post(API_BASE_URL + "/v1/ticket", {
        organization: state.organization,
        username: state.username,
        email: state.email,
      })
      .then((response) => {
        if (response.status === 200) {
          // props.history.push({
          //   pathname: "/login",
          //   state: response.data.message,
          // });
          // window.location.reload();
        } else {
          props.showError("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      className={
        accessToken
          ? null
          : "min-h-screen bg-gray-50 flex flex-col justify-center py-4 sm:px-6 lg:px-8"
      }
    >
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-3">
            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-gray-700"
              >
                Organization
              </label>
              <div className="mt-1">
                <input
                  onChange={handleChange}
                  // value={
                  //   post
                  //     ? post.results[0].user.organization
                  //     : state.organization
                  // }
                  value={props.match.params.org}
                  disabled
                  id="organization"
                  name="organization"
                  type="text"
                  autoComplete="organization"
                  required
                  placeholder="Choose your organization"
                  list="organizations"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
                <datalist id="organizations">
                  {organizationList.map((organization) => (
                    <option key={organization.id} value={organization.name} />
                  ))}
                </datalist>
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                User ID
              </label>
              <div className="mt-1">
                <input
                  value={state.username}
                  onChange={handleChange}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  onChange={handleChange}
                  value={post ? post.results[0].user.email : ""}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="ticket_detail"
                className="block text-sm font-medium text-gray-700"
              >
                Issue Detail
              </label>
              <div className="mt-1">
                <textarea
                  onChange={handleChange}
                  id="ticket_detail"
                  name="ticket_detail"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
            <div>
              <label
                htmlFor="ticket_image"
                className="block text-sm font-medium text-gray-700"
              >
                Issue Image
              </label>
              <div className="mt-1">
                <input
                  value={state.phone}
                  onChange={handleChange}
                  id="ticket_image"
                  name="ticket_image"
                  type="file"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex space-x-2 pt-4">
              <Link
                to={
                  "/" + props.match.params.org + accessToken
                    ? "upload"
                    : "login"
                }
                className="flex justify-center py-2 px-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <button
                type="submit"
                onClick={handleSubmitClick}
                className="w-full flex items-center justify-center rounded-full bg-red-600 text-white h-10 hover:bg-red-700"
              >
                Submit Issue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
