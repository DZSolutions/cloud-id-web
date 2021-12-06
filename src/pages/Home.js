import { Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import templateDZ from "../images/templateDZ.jpg";
import templateDZ_Back from "../images/templateDZ_Back.jpg";
import AuthService from "../services/auth.service";
import axios from "axios";
import { API_BASE_URL } from "../constrants/apiConstrants";
import Select, { components } from "react-select";
import { Dialog, Transition } from "@headlessui/react";
import { ClockIcon,HomeIcon,CreditCardIcon } from "@heroicons/react/outline";
import usestateref from 'react-usestateref';
import { useHistory } from "react-router-dom";

export function Home(props) {
  const [post, setPost] = useState(null);
  const [start, setStart] = useState(0);
  const [showdialog, setShowdialog] = useState(true);
  const data = props.history.location.state?.id

  const Input = (props) => (
    <components.Input
      {...props}
      inputClassName="outline-none border-none shadow-none focus:ring-transparent"
    />
  );

  const handleClose = (e, redirect) => {
    if (redirect === 'backdropClick') {
        return false
    }
    else if(redirect ==='closedialog'){
      return true
    }
    };

    const history = useHistory();
  const goBuildCard =()=>{
    history.push({pathname:"/"+ props.match.params.org+"/Layout",state:{id:""}});
  }
  const goHistory =()=>{
    history.push({pathname:"/"+ props.match.params.org+"/History",state:{id:""}});
  }

  const currentUser = AuthService.getCurrentUser();
  AuthService.getAccessToken();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(async() => {
      await axios
      .get(API_BASE_URL + "/v1/userlist", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPost(response.data);
        console.log("response.data");
        console.log(response.data.results[0].ref_id);
        if(response.data.results[0].ref_id === null){

          if(data ==="login")
          {
            goBuildCard();
          }
        }
        else if(response.data.results[0].ref_id != null){

          if(data ==="login")
          {
            goHistory();
          }
        }

      });
  }, []);


  if (!post) return ("Loading..." );

  var daatajson ="";

  return (
    <>

      <Transition.Root show={showdialog} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={(event, reason) => {
              handleClose(event, reason);
          }}
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <HomeIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Build card or History
                    </Dialog.Title>

                    <div className="flex justify-center mt-2 space-x-5">

                    <span className="relative z-0 flex shadow-sm rounded-md">

                        <span className="justify-center" >
                        <CreditCardIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                        />
                        <button
                        type="button"
                        className="mt-5 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        onClick={() => {
                            goBuildCard();
                        }}
                                >

                        Build Card
                        </button>
                        </span>
                    <span className="justify-center">

                    <ClockIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                        />
                    <button
                        type="button"
                        className="mt-5 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        onClick={() => {
                        goHistory();
                        }}
                    >
                        History
                    </button>
                    </span>
                    </span>
                    </div>


                  </div>
                </div>

              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

    </>
  );
}
