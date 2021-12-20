import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
// import jwt_decode from "jwt-decode";
import DZLOGO from "../images/dzcard.png";
import { Link, useHistory } from "react-router-dom";
import { API_BASE_URL } from "../constrants/apiConstrants";
import axios from "axios";
export function Login(props) {
  let history = useHistory();
  const { state } = props.location;
  const accessToken = localStorage.getItem("accessToken");
  const [logo, setLogo] = useState(null);
  useEffect(async() => {
    await axios
      .get(API_BASE_URL + "/v1/organizationlist", {
      })
      .then((response) => {
        for (var organize in response.data)
        {
          if(response.data[organize].name === props.match.params.org)
          {
            setLogo(response.data[organize].logo);
          }
        }

      });
    if (accessToken) {
      // props.history.push("upload");
      props.history.push("layout");
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const [username, setUsername] = useState("12812"); /** Thitikorn.s */
  // const [password, setPassword] = useState("abc123!@#"); /** .5yw8smrwxcp */
  const [username, setUsername] = useState(null); /** Thitikorn.s */
  const [password, setPassword] = useState(null); /** .5yw8smrwxcp */
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const required = (value) => {
    if (!value) {
      return <div>This field is required!</div>;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);
    AuthService.login(props.match.params.org,username, password).then(
      () => {
        // history.push("upload");
        history.push({pathname:"home",state:{id:"login"}});
        window.location.reload();
      },
      (error) => {
        setLoading(false);
        if(error.response === undefined)
        {
          setMessage(error);
        }
        else
        {
          setMessage(error.response.data.detail);
        }

        // const resMessage =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();

        // setLoading(false);
        // setMessage(resMessage);
      }
    );
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <img className="mx-auto h-20 w-auto" src={DZLOGO} alt="org_image" /> */}
        <img className="mx-auto h-20 w-auto" src={logo} alt="org_image" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            {state ? (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-5 w-5 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      {state}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
            {message ? (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">
                      {message}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={username}
                  autoComplete="username"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href=" "
                  className="font-medium text-rose-600 hover:text-rose-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="flex space-x-4 justify-center mt-3">
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-1/2 flex items-center justify-center rounded-full bg-red-600 text-white h-10 hover:bg-red-700 focus:outline-none focus:ring"
              >
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                )}
                Login
              </button>
              <Link
                to="register"
                className="w-1/2 flex items-center justify-center rounded-full bg-red-600 text-white h-10 hover:bg-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Register
              </Link>
            </div>
            <div className="flex justify-center mt-3">
              <Link
                to="issue"
                className="w-1/2 flex items-center justify-center text-xs"
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
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Report Issue
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
