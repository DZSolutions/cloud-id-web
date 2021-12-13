import { Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import templateDZ from "../images/templateDZ.jpg";
import templateDZ_Back from "../images/templateDZ_Back.jpg";
import AuthService from "../services/auth.service";
import axios from "axios";
import { API_BASE_URL } from "../constrants/apiConstrants";
import Select, { components } from "react-select";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon,CreditCardIcon } from "@heroicons/react/outline";
import usestateref from 'react-usestateref';
import { useHistory } from "react-router-dom";
import Loading from "react-loading";

export function Layout(props) {
  const [post, setPost] = useState(null);
  const [postmapping, setPostMapping,refpostmapping] = usestateref(null);
  const [jsonGencard, setJsonData] = useState(null);
  const [image, setImage] = useState(templateDZ);
  const [imageB, setImageBack] = useState(templateDZ_Back);
  const [start, setStart] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [print, setPrint] = useState(false);

  const [consoleList, setConsoleList] = useState(null);
  const [printerList, setPrinterList] = useState(null);
  const [mappingList, setMappingList,refmappingList] = usestateref([]);

  const [selectedConsole, setSelectConsole] = useState(null);
  const [selectedPrinter, setSelectPrinter] = useState(null);

  const [selectedLayout, setSelectLayout,refresultLayout] = usestateref(null);
  const [Layoutlist, setLayoutlist,refLayoutlist] = usestateref([]);

  const ennabelEdit =false;

  const [openemployId, setOpenEmployId] = useState(ennabelEdit);
  const [opentitleTh, setOpentitleTh] = useState(ennabelEdit);
  const [openNameTh, setOpenNameTh] = useState(ennabelEdit);
  const [openLastNameTh, setOpenLastNameTh] = useState(ennabelEdit);
  const [opentitleEn, setOpentitleEn] = useState(ennabelEdit);
  const [openNameEn, setOpenNameEn] = useState(ennabelEdit);
  const [openLastNameEn, setOpenLastNameEn] = useState(ennabelEdit);
  const [openMobile, setOpenMobile] = useState(ennabelEdit);
  const [openEmail, setOpenEmail] = useState(ennabelEdit);
  const [openDepartment, setOpenDepartment] = useState(ennabelEdit);
  const [openFaculty, setOpenFaculty] = useState(ennabelEdit);
  const [openMajor, setOpenMajor] = useState(ennabelEdit);

  const [ReadOnly, setReadOnly,refReadOnly] = usestateref(false);

  const [confirm, setConfirm] = useState(false);
  const [layoutloaded, setlayoutloaded] = useState(false);
  const [confirmLayout, setConfirmLayout] = useState(true);
  const [genlayout, setGenlayout] = useState(false);

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


   function genResultmapping() {
    return new Promise(resolve => {
      var dataarry={};
      if (postmapping.results != null){
        for (var layout in postmapping.results)
        {
          if(postmapping.results[layout].layout_name === selectedLayout)
          {
            var keyjson= Object.keys(postmapping.results[layout].api_field_name);
            var valuejson= Object.values(postmapping.results[layout].api_field_name);
            for(var key in keyjson)
            {
              const myObj = JSON.parse(JSON.stringify(post.results[0]));
              dataarry[valuejson[key]]=myObj[keyjson[key]];
            }
            break;
          }
        }
      }
      resolve(dataarry);
    });
  }

  const listOfImages = []
  const imageChosen = (e) => {
    setSelectLayout(e);
    if (mappingList != null){
      for (var layout in mappingList)
      {
        if(mappingList[layout].layout_name === e)
        {
          setImage(mappingList[layout].front);
          setImageBack(mappingList[layout].back);
          break;
        }
      }
    }
  };
  const history = useHistory();
   const confirmSelectLayout =async()=>{

    if (postmapping.results != null){
      for (var layout in postmapping.results)
      {

        if(postmapping.results[layout].layout_name === selectedLayout)
        {
          if (postmapping.results[layout].upload_photo === true) {
            history.push({pathname:"/"+ props.match.params.org+"/CropImage",state:{id:selectedLayout}});
          }
          else if(postmapping.results[layout].upload_photo === false) {
            setGenlayout(true);
            await AutobuildCard();
            await gotoUpload();
          }
          setGenlayout(false);
          break;
        }
      }
    }

  }
  async function gotoUpload(){
    history.push({pathname:"upload",state:{id:selectedLayout}});
  }
  var tempimg;
  async function AutobuildCard() {
    let resultmap = await genResultmapping();
    if(post!=null){
      const resultCombine =await combineDataAndImg(resultmap);
      await requestCardimg(resultCombine);
      await onUploadToServer2();
    }
  }
  function combineDataAndImg(DataAr) {
    return new Promise(resolve => {
      DataAr["PHOTO64_1"]=null;
      resolve(DataAr);
    });
  }
  const onUploadToServer2 = async () => {
    let serverHeader = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const filef = await dataURLtoFile(tempimg['front']);
    const fileb = await dataURLtoFile(tempimg['back']);
    const data = new FormData();

    data.append("ref_id", props.match.params.org+post.results[0].id+currentUser);
    data.append("layout_name", selectedLayout);
    data.append("img_card_front", filef,  props.match.params.org+post.results[0].id+currentUser+data + "_F.jpg");
    data.append("img_card_back", fileb,  props.match.params.org+post.results[0].id+currentUser+data + "_B.jpg");
    // put file into form data
    axios.patch(
      API_BASE_URL + "/v1/userlist/" + post.results[0].id + "/",
      data,
      serverHeader
    );

  };
  async function requestCardimg(dataInput) {
    // return new Promise(resolve => {
    var date = new Date();
    var dateandtime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let imgfs={};
    await axios
      .post("http://13.212.202.194:8033/gen_card_img/", {
        with_background:true,
        layout_name: selectedLayout,
        tag: dateandtime,
        input:[dataInput]
      })
      .then((response) => {
         tempimg = JSON.parse(JSON.stringify(response.data.output[0]));
      });
  }
  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1);
      n -= 1; // to make eslint happy
    }
    return new File([u8arr], filename, { type: mime });
  };
  const currentUser = AuthService.getCurrentUser();
  AuthService.getAccessToken();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(async() => {
    var arrlistlayout = [];
    await axios
      .get(API_BASE_URL + "/v1/organizationlist", {
      })
      .then((response) => {
        for (var organize in response.data)
        {
          if(response.data[organize].name === props.match.params.org)
          {
            setImage(response.data[organize].logo);
          }
        }

      });
    await axios
      .get(API_BASE_URL + "/v1/mappinglist", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        let layoutname='';
        for( var layout in response.data.results)
        {
          arrlistlayout[arrlistlayout.length] = response.data.results[layout].layout_name;
        }
        setPostMapping(response.data);
        //setLayoutlist()
        //setMappingList(response.data.results);
      });

      await axios
      .post("http://13.212.202.194:8033/card_design_img/", {
        layout_name: arrlistlayout
      })
      .then((response) => {
        setMappingList(response.data.output);
      });

      await axios
      .get(API_BASE_URL + "/v1/userlist", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPost(response.data);
      });
      setlayoutloaded(true);
  }, []);


  if (!post) return ("Loading..." );

  var daatajson ="";

  return (
    <>
      <div className="relative mt-12 sm:mt-4 lg:mt-12">
        <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
          {/* {showcardImgage && */}

          <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
            {isFront ? (
              <img className="mx-auto" src={image} alt="" />
            ) : (
              <img className="mx-auto" src={imageB} alt="" />
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
                          Consoles
                        </p>
                        <Select
                          menuPortalTarget={document.querySelector("body")}
                          defaultValue={selectedConsole}
                          onChange={setSelectConsole}
                          options={consoleList ? consoleList : []}
                          components={{ Input }}
                          getOptionValue={(option) => option.id}
                          getOptionLabel={(option) => option.name}
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
                          options={printerList ? printerList : []}
                          components={{ Input }}
                          getOptionValue={(option) => option.id}
                          getOptionLabel={(option) => option.name}
                        />
                      </div>
                    </div>
                  </div>


                </>
              ) : (
                <>
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-3 gap-4 ">

                      {openemployId && (
                      <div className="col-span-6 sm:col-span-4">
                        <p className="block text-gray-700 text-sm font-medium">
                          Employee/Student ID
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          value={currentUser}
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>)}


                      {opentitleTh && (
                        <div className="col-span-5 sm:col-span-3 lg:col-span-2">
                          <p className="block text-gray-700 text-sm font-medium">
                            Title.
                          </p>
                          <input
                            readOnly= {ReadOnly}
                            type="text"
                            className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        )}

                        {openNameTh && (
                          <div className="col-span-6 sm:col-span-2">
                          <p className="block text-gray-700 text-sm font-medium">
                          First name TH
                          </p>
                          <input
                            readOnly= {ReadOnly}
                            type="text"
                            className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        )}

                      {openLastNameTh && (
                        <div className="col-span-6 sm:col-span-2">
                        <p className="block text-gray-700 text-sm font-medium">
                          Last name TH
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                        </div>
                      )}

                      {opentitleEn && (
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <p className="block text-gray-700 text-sm font-medium">
                          Title
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}

                      {openNameEn && (
                        <div className="col-span-6 sm:col-span-2">
                        <p className="block text-gray-700 text-sm font-medium">
                          First name
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}

                      {openLastNameEn && (
                        <div className="col-span-6 sm:col-span-2">
                        <p className="block text-gray-700 text-sm font-medium">
                          Last name
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}

                      {openMobile && (
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <p className="block text-gray-700 text-sm font-medium">
                          Mobile No.
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}

                      {openEmail && (
                      <div className="col-span-6 sm:col-span-4">
                        <p className="block text-gray-700 text-sm font-medium">
                          Email address
                        </p>
                        <input
                          readOnly = {ReadOnly}
                          type="text"
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}

                      {openDepartment && (
                        <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium">
                          Department
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}
                      {openFaculty && (
                        <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium">
                          Faculty
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}

                      {openMajor && (
                        <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium">
                          Major
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}

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
                    </div>
                  </div>
                  <div className="px-4 py-3 text-center bg-gray-100 sm:px-6">
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Transition.Root show={confirmLayout} as={Fragment}>
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
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      STEP 1: Select template.
                    </Dialog.Title>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                      {props.match.params.org} Membership : {props.match.params.org} Card
                      </p>
                    </div>

                    {layoutloaded &&(

                      <div>
                        {mappingList.map((images, index) => (
                          <div className={selectedLayout === images.layout_name ?
                            "mt-5 m-0.5 inline-flex justify-center rounded-md border border-transparent shadow-sm px-1 py-1 bg-green-700 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm w-5/12 float-left"
                            :"mt-5 m-0.5 inline-flex justify-center rounded-md border border-transparent shadow-sm px-1 py-1 bg-green-100 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm w-5/12 float-left"}
                          >
                            <div>
                              <div>
                                <img onClick={(e) => imageChosen(e.target.alt)} src={images.front} key={index} alt={images.layout_name}></img>
                              </div>

                                <div>{images.layout_name} </div>
                              </div>
                          </div>
                        ))}
                      </div>
                    )}


                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    disabled ={genlayout}
                    className="mt-5 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => {
                      // setConfirmLayout(false);
                      confirmSelectLayout();
                    }}
                  >

                    {genlayout ? (
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
             null
            )}
            {genlayout ? (
              "Loading template..."
            ):("Confirm")}
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
