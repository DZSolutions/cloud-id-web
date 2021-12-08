import { Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import templateDZ from "../images/templateDZ.jpg";
import templateDZ_Back from "../images/templateDZ_Back.jpg";
import AuthService from "../services/auth.service";
import axios from "axios";
import { API_BASE_URL } from "../constrants/apiConstrants";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon,CreditCardIcon, HomeIcon } from "@heroicons/react/outline";
import usestateref from 'react-usestateref';
import { useHistory } from "react-router-dom";

export function History(props) {
  const [post, setPost] = useState(null);
  const [image, setImage] = useState(templateDZ);
  const [imageB, setImageBack] = useState(templateDZ_Back);
  const [historyList, setHistoryList,refHistoryList] = usestateref([]);
  const [historyList2, setHistoryList2,refHistoryList2] = usestateref([]);

  const [selectedLayout, setSelectLayout,refresultLayout] = usestateref(null);
  const [layoutloaded, setlayoutloaded] = useState(false);
  const [showpreviewCard, setShowpreviewCard] = useState(false);
  const [textlayoutname, setTextlayoutname] = useState("Layout name");

  const data = props.history.location.state?.id
  const handleClose = (e, redirect) => {

    if (redirect === 'backdropClick') {
        return false
    }
    else if(redirect ==='closedialog'){
      return true
    }

};

  const history = useHistory();
  // const Home =()=>{
  //   history.push({pathname:"/"+ props.match.params.org+"/Home",state:{id:selectedLayout}});
  // }

  const currentUser = AuthService.getCurrentUser();
  AuthService.getAccessToken();
  const accessToken = localStorage.getItem("accessToken");

  const goNewCard =()=>{
    history.push({pathname:"/"+ props.match.params.org+"/Layout",state:{id:""}});
  }
  const goupload =()=>{
    history.push({pathname:"/"+ props.match.params.org+"/upload",state:{id:"preview"}});
  }

  useEffect(async() => {
    var arrlistlayout = [];
      await axios
      .get(API_BASE_URL + "/v1/userlist", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPost(response.data);
        setHistoryList2(response.data.results);
      });

      await axios
      .get(API_BASE_URL + "/v1/userlistprintHistory", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setHistoryList(response.data.results);
      });

  }, []);


  if (!post) return ("Loading..." );

  var daatajson ="";
  const historyChosen = (e) => {
    setShowpreviewCard(true);
    const data = e.target.getAttribute('data-item');
    setTextlayoutname(data);
    const user = historyList.find(u => u.id == e.target.dataset.id)
    if (historyList != null){
      for (var layout in historyList)
      {
        if(historyList[layout].img_card_front === e)
        {
          setImage(historyList[layout].img_card_front);
          setImageBack(historyList[layout].img_card_back);
          setlayoutloaded(true)
          break;
        }
      }
    }
  };

  return (
    <>
      <div className="relative sm:mt-4 lg:mt-12">
        <p className="block text-gray-700 text-3xl font-medium">
            History
        </p>

        <table class="mt-5 min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Layout name
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Status approve
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    Status print
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" >
                    {historyList2.map((user, index) =>(
                      <tr class="text-sm text-gray-700 transition duration-300 hover:bg-indigo-50 cursor-pointer"
                      key={index} data-item={user} onClick={historyChosen} >
                        <td class="px-4 py-4 whitespace-nowrap">
                        <div class="flex items-center space-x-4" >
                        <div class="flex-shrink-0 h-10 w-10">
                          <img class="h-10 w-10" src={user.img_card_front} alt="" />
                        </div>
                        <div>
                        {user.layout_name}
                        </div>
                        </div>
                    </td>
                        <td class="px-4 py-4 whitespace-nowrap">
                          {(user.status == 0)&&("Noaction")}
                          {(user.status == 1)&&("Wait for Appoval 1")}
                          {(user.status == 2)&&("Wait for Appoval 2")}
                          {(user.status == 3)&&("Approved")}
                          {(user.status == 4)&&("Reject")}
                        </td>
                        <td class="px-4 py-4 whitespace-nowrap">
                        {(user.status_print == 0)&&("NOACTION")}
                        {(user.status_print == 1)&&("Sending")}
                        {(user.status_print == 2)&&("Success")}
                        {(user.status_print == 3)&&("Fail")}
                        </td>
                      </tr>
                        ))}
              </tbody>
        </table>
        <button
                type="button"
                className=" inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={goupload}
              >
                Back
              </button>
        <button
                type="button"
                className="m-8 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={goNewCard}
              >
                New Card
              </button>


      </div>

      <Transition.Root show={showpreviewCard} as={Fragment}>
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
                    <CreditCardIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">

                    <p> {textlayoutname}</p>
                    {layoutloaded &&(
                      <div >
                        <p>Front</p>
                        <image src={image}>Front</image>
                        <image src={imageB}>Back</image>
                      </div>
                    )}


                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => {
                      setShowpreviewCard(false);
                    }}
                  >
                    close
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
