import axios from "axios";
import { useState, useEffect } from "react";
import dzLogo from "../images/dzcard.png";
import { API_BASE_URL } from "../constrants/apiConstrants";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'


// const useStyles = makeStyles(theme => ({
//   logo: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: '0.5rem',
//       color: '#745c97',
//       fontWeight: 'bold',
//       letterSpacing: '1rem'
//   },
//   border: {
//       border: '0.15rem solid #d597ce',
//       borderRadius: '2px',
//       padding: '2%',
//       width: '19rem',
//       textAlign: 'center'
//   },
//   topLayout: {
//       margin: '4rem 0',
//       [theme.breakpoints.down('xs')]: {
//           margin: '1rem 0'
//       }
//   },
//   paperLayout: {
//       padding: '2rem',
//       [theme.breakpoints.up('md')]: {
//           width: '35em'
//       },
//       marginTop: '10rem',
//       margin: 'auto',
//       border: '1px solid #ebedf0',
//       borderRadius: '4px',
//       [theme.breakpoints.down('xs')]: {
//           marginTop: '3rem'
//       }
//   },
// }));

export function Register(props) {
  const [organizationList, setOrganizationList] = useState([]);
  const [logo, setLogo] = useState(null);


  // const onChangeOrganization = (e) => {
  //   const organization = e.target.value;
  //   setOrganization(organization);
  // };

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
    faculty: "-",
    major: "-",
    phone: "",
    birthDate :"",
    gender :0,
    facebook :"",
    lineID :"",
    linkedin :"",
    address:"",
    other :"",
    details:""
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
    state.faculty = "-";
    state.major = "-";
    axios
      // .post(API_URL + "signin", {
      .post(API_BASE_URL + "/v1/register", {
        organization: state.organization,
        username: state.organization+"_"+state.username,
        email: state.email,
        title: state.title,
        password: state.password,
        firstName: state.firstName,
        lastName: state.lastName,
        // faculty: state.faculty,
        // major: state.major,
        faculty: "-",
        major: "-",
        phone: state.phone,
        birthDate :state.birthDate,
        gender :state.gender,
        facebook :state.facebook,
        lineID :state.lineID,
        linkedin :state.linkedin,
        address:state.address,
        other :state.other,
        details:state.details
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

{/* <Fragment>
            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.topLayout}
            >
                <Grid item md={11} xs={11}>
                    <Paper className={classes.paperLayout}>
                        <Grid container>
                            <Grid item md={12} xs={12}>
                                <div className={classes.logo}>
                                    <div className={classes.border}>
                                        REGISTER
                                    </div>
                                </div>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <StepperForm/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment> */}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <img
          src={dzLogo}
          className="mx-auto w-auto rounded-md border border-gray-100"
          alt="dz-logo"
        /> */}
        <img
          src={logo}
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
                User Name
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

            <div>
              <label
                htmlFor="tel"
                className="block text-sm font-medium text-gray-700"
              >
                Birth Date
              </label>
              <div className="mt-1">
                <input
                  value={state.birthDate}
                  onChange={handleChange}
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  autoComplete="off"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="sex"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <div className="mt-1">

                <select
                  value={state.gender}
                  onChange={handleChange}
                  id="gender"
                  name="gender"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                >
                  <option defaultValue value="0">Male</option>
                  <option value="1">Female</option>
                  <option value="2">Other</option>

                </select>
              </div>
            </div>

            {/* <div className="grid grid-cols-6 gap-6">
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
            </div> */}
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

            <div>
              <label
                htmlFor="tel"
                className="block text-sm font-medium text-gray-700"
              >
                Facebook
              </label>
              <div className="mt-1">
                <input
                  value={state.facebook}
                  onChange={handleChange}
                  id="facebook"
                  name="facebook"
                  type="text"
                  autoComplete="off"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="tel"
                className="block text-sm font-medium text-gray-700"
              >
                Line ID
              </label>
              <div className="mt-1">
                <input
                  value={state.lineID}
                  onChange={handleChange}
                  id="lineID"
                  name="lineID"
                  type="text"
                  autoComplete="off"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="tel"
                className="block text-sm font-medium text-gray-700"
              >
                Linkedin
              </label>
              <div className="mt-1">
                <input
                  value={state.linkedin}
                  onChange={handleChange}
                  id="linkedin"
                  name="linkedin"
                  type="text"
                  autoComplete="off"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="tel"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                 value={state.address}
                  onChange={handleChange}
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address-line1"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="tel"
                className="block text-sm font-medium text-gray-700"
              >
                Other
              </label>
              <div className="mt-1">
                <input
                  value={state.other}
                  onChange={handleChange}
                  id="other"
                  name="other"
                  type="text"
                  autoComplete="off"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="tel"
                className="block text-sm font-medium text-gray-700"
              >
                details
              </label>
              <div className="mt-1">
                <input
                  value={state.details}
                  onChange={handleChange}
                  id="details"
                  name="details"
                  type="text"
                  autoComplete="off"
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
