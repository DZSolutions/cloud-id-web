import axios from "axios";
import { useState, useEffect } from "react";
import dzLogo from "../images/dzcard.png";
import { API_BASE_URL } from "../constrants/apiConstrants";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
export function Register(props) {
  const [organizationList, setOrganizationList] = useState([]);

  // const onChangeOrganization = (e) => {
  //   const organization = e.target.value;
  //   setOrganization(organization);
  // };

  useEffect(() => {
    fetch(API_BASE_URL + "/v1/organizationlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setOrganizationList(resp));
  }, []);

  // const onChangeOrganization = (e) => {
  //   console.log(e.target);
  //   const organizationId = e.target;
  //   const organization = e.target.value;
  //   setOrganization({ organizationId, organization });
  // };

  const [state, setState] = useState({
    organization: props.match.params.org,
    username: "",
    email: "",
    title: "Mr",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    faculty: "",
    major: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();

    if (state.password === state.confirmPassword) {
      sendDetailsToServer();
    } else {
      swal({
        title: "Oops!",
        text: "Passwords do not match",
        icon: "warning",
        dangerMode: true,
      });
     // props.showError("Passwords do not match");

    }
  };

  const sendDetailsToServer = () => {
    // console.log(organization);
    // console.log(state);
    // const payload = {
    //   email: state.email,
    //   password: state.password,
    // };
    // axios
    //   .post(API_BASE_URL + "/user/", payload)
    //   .then(function (response) {
    //     if (response.status === 200) {
    //       setState((prevState) => ({
    //         ...prevState,
    //         successMessage:
    //           "Registration successful. Redirecting to home page..",
    //       }));
    //       // localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
    //       // redirectToHome();
    //       props.showError(null);
    //     } else {
    //       props.showError("Some error ocurred");
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    axios
      // .post(API_URL + "signin", {
      .post(API_BASE_URL + "/v1/register", {
        organization: state.organization,
        username: state.username,
        email: state.email,
        title: state.title,
        password: state.password,
        firstName: state.firstName,
        lastName: state.lastName,
        faculty: state.faculty,
        major: state.major,
        phone: state.phone,
      })
      .then((response) => {
        if (response.status === 200) {
          props.history.push({
            pathname: "login",
            state: response.data.message,
          });
          window.location.reload();
        } else {
          swal("Oops!", "Something went wrong!", "error");
          props.showError("Some error ocurred");
        }
      })
      .catch(function (error) {
        // swal("Oops!", "This account is allready!", "error");
        swal({
          title: "Oops!",
          text: "This account is allready!" + error,
          icon: "warning",
          dangerMode: true,
        });
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          src={dzLogo}
          className="mx-auto w-auto rounded-md border border-gray-100"
          alt="dz-logo"
        />
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-3" onSubmit={handleSubmitClick}>
            <div>
              <div className="mt-1">
                <label
                  htmlFor="organiation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  autoComplete="off"
                  placeholder="Choose your organization"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                  list="organizations"
                  onChange={handleChange}
                  value={props.match.params.org}
                  disabled
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
                  name="organization"
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
                  value={state.email}
                  onChange={handleChange}
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
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  value={state.password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  value={state.confirmPassword}
                  onChange={handleChange}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <select
                  value={state.title}
                  onChange={handleChange}
                  id="title"
                  name="title"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                >
                  <option defaultValue value="Mr">
                    Mr
                  </option>
                  <option value="Ms">Ms</option>
                </select>
              </div>
              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  value={state.firstName}
                  onChange={handleChange}
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="given-name"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  value={state.lastName}
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="faculty"
                  className="block text-sm font-medium text-gray-700"
                >
                  Faculty/Department
                </label>
                <div className="mt-1">
                  <input
                    value={state.faculty}
                    onChange={handleChange}
                    id="faculty"
                    name="faculty"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="major"
                  className="block text-sm font-medium text-gray-700"
                >
                  Major/Section
                </label>
                <div className="mt-1">
                  <input
                    value={state.major}
                    onChange={handleChange}
                    id="major"
                    name="major"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="tel"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Phone
              </label>
              <div className="mt-1">
                <input
                  value={state.phone}
                  onChange={handleChange}
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="tel"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Link
                to={"/" + props.match.params.org}
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
                className="w-full flex items-center justify-center rounded-full bg-red-600 text-white h-10 hover:bg-red-700"
              >Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
