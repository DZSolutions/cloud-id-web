import { Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import templateDZ from "../images/templateDZ.jpg";
import templateDZ_Back from "../images/templateDZ_Back.jpg";
import AuthService from "../services/auth.service";
import axios from "axios";
import mergeImages from "merge-images";
import { API_BASE_URL,API_GENCARD_IMG_URL,API_REQUEST_PRINTER_URL,API_POST_PRINT_URL } from "../constrants/apiConstrants";
import Select, { components } from "react-select";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon,CreditCardIcon,IdentificationIcon,QrcodeIcon,RewindIcon ,PrinterIcon} from "@heroicons/react/outline";
import usestateref from 'react-usestateref';
import {Collapse} from 'react-collapse';
import { useHistory } from "react-router-dom";
import QRCode from "react-qr-code";

export function Upload(props) {
  const [post, setPost,refpost] = usestateref(null);
  const [postmapping, setPostMapping,refpostmapping] = usestateref(null);
  const [jsonGencard, setJsonData] = useState(null);
  const [image, setImage] = useState(templateDZ);
  const [imageB, setImageBack] = useState(templateDZ_Back);
  const [imageforprint, setImageforprint] = useState(templateDZ);
  const [imageBforprint, setImageBackforprint] = useState(templateDZ_Back);
  const [start, setStart] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [print, setPrint] = useState(false);

  const [printerror, setPrinterror] = useState(false);
  const [statusprinter, setStatusPrinter] = useState();


  const [consoleList, setConsoleList] = useState(null);
  const [printerList, setPrinterList] = useState(null);
  const [usePrinter, setUsePrinter] = useState(null);
  const [printerOptionList, setPrinterOptionList] = useState([{type:"auto"},{type:"manual"}]);

  const [mappingList, setMappingList,refmappingList] = usestateref(null);
  const [qrcodeData, setQrcodeData] = useState(null);

  const [selectedOrgUnit, setSelectOrgUnit] = useState(null);
  const [selectedLocation, setSelectLocation] = useState(null);
  const [selectedConsole, setSelectConsole] = useState(null);
  const [selectedPrinter, setSelectPrinter] = useState(null);
  const [selectedPrinterOption, setSelectPrinterOption] = useState(null);
  const [preview_mode, setPreview_mode] = useState(false);
  const [status_view, setStatus_view] = useState(false);
  const [status_text, setStatus_text,refstatus_text] = usestateref(null);
  const [profileID, setProfileID,refProfileID] = usestateref(null);
  const [uniqueprofileID, setuniqueProfileID,refuniqueProfileID] = usestateref(null);
  // const [selectedMapping, setSelectMapping,refselectmapping] = usestateref(null);


  const [resultforgencard, setresultForgencard,refresultForgencard] = usestateref({});
  const [selectedLayout, setSelectLayout,refresultLayout] = usestateref(null);
  const [checked, setChecked] = useState(false);


  const ennabelEdit=false;
  const [whitecard, setWhitecard,refWhitecard] = usestateref(false);

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
  const [openbirthDate, setopenBirthDate] = useState(ennabelEdit);
  const [openGender, setopenGender] = useState(ennabelEdit);
  const [openFacebook, setopenFacebook] = useState(ennabelEdit);
  const [openLineID, setopenLineID] = useState(ennabelEdit);
  const [openLinkedin, setopenLinkedin] = useState(ennabelEdit);
  const [openAddress, setopenAddress] = useState(ennabelEdit);
  const [openOther, setopenOther] = useState(ennabelEdit);

  const [employId, setEmployId,refEmployId] = usestateref(null);
  const [titleTh, settitleTh,reftitleTh] = usestateref(null);
  const [NameTh, setNameTh,refNameTh] = usestateref(null);
  const [LastNameTh, setLastNameTh,refLastNameTh] = usestateref(null);
  const [titleEn, settitleEn,reftitleEn] = usestateref(null);

  const [NameEn, setNameEn] = useState(null);
  const [LastNameEn, setLastNameEn,refLastNameEn] = usestateref(null);

  const [Mobile, setMobile,refMobile] = usestateref(null);
  const [Email, setEmail,refEmail] = usestateref(null);
  const [Department, setDepartment,refDepartment] = usestateref(null);
  const [Faculty, setFaculty,refFaculty] = usestateref(null);
  const [Major, setMajor,refMajor] = usestateref(null);
  const [BirthDate, setBirthDate,refBirthDate] = usestateref(null);
  const [Gender, setGender,refGender] = usestateref(null);
  const [Facebook, setFacebook,refFacebook] = usestateref(null);
  const [LineID, setLineID,refLineID] = usestateref(null);
  const [Linkedin, setLinkedin,refLinkedin] = usestateref(null);
  const [Address, setAddress,refAddress] = usestateref(null);
  const [Other, setOther,refOther] = usestateref(null);
  const [PhotoImage, setPhotoImage,refPhotoImage] = usestateref(null);

  const [ReadOnly, setReadOnly,refReadOnly] = usestateref(false);


  const [confirm, setConfirm] = useState(false);
  const [confirmLayout, setConfirmLayout] = useState(false);
  const [dialoginfomation, setDialoginfomation] = useState(true);
  const [dialogsuccess, setDialogsuccess] = useState(false);
  // const [waitting, setwaitting,refwaitting] = usestateref(false);
  const [waitting, setwaitting] = useState(false);
  const [loadingimge, setloadingimge] = useState(false);
  const [sendingtoprint, setsendingtoprint] = useState(false);
  const [allowPrint, setallowPrint,refallowPrint] = usestateref(false);
  const [allowQrcode, setallowQrcode,refallowQrcode] = usestateref(false);
  const [allowBuild, setallowBuild,refallowBuild] = usestateref(false);
  const [showcardImgage, setShowcardImgage,refShowcardImgage] = usestateref(false);
  const [adminApprove, setadminApprove] = useState(false);
  const [configPrinter, setConfigPrinter,refConfigPrinter] = usestateref([]);
  const [backcrop, setbackcrop] = useState(false);

  const [isEditData, setIsEditData,refIsEditData] = usestateref(false);
  var photoF;
  var photoB;
  const [layoutName, setlayoutName,reflayoutName] = usestateref(props.history.location.state?.id);
  const [status_text2, setstatus_text2,refstatus_text2] = usestateref(null);

  // var layoutName = props.history.location.state?.id
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

  const handleClose = (e, redirect) => {

    if (redirect === 'backdropClick') {
        return false
    }
    else if(redirect ==='closedialog'){
      return true
    }

};


  async function buildCard() {
    setwaitting(true);
    const resultmap = await setComfirmData();
    let resultImg =await getBase64FromUrl(post.results[0].photo)
    const resultCombine =await combineDataAndImg(resultmap,resultImg);
    setresultForgencard(resultCombine);
    await requestCardimg(resultCombine);
    setShowcardImgage(true);

    setallowBuild(false);
    setallowPrint(true);
    setallowQrcode(false);

  }

  async function AutobuildCard() {
    setloadingimge(true);
    let resultmap = await genResultmapping();
    if(post!=null){
      let resultImg =await getBase64FromUrl(post.results[0].photo)
      const resultCombine =await combineDataAndImg(resultmap,resultImg);
      setresultForgencard(resultCombine);
      await requestCardimg(resultCombine);
    }
  }

  function togglePrint() {
    setPrint((wasOpened) => !wasOpened);
  }

   function genResultmapping() {
    return new Promise(resolve => {
      var dataarry={};
      if (postmapping.results != null){
        for (var layout in postmapping.results)
        {
          //if(postmapping.results[layout].layout_name === refselectmapping.current.layout_name)
          // if(postmapping.results[layout].layout_name === selectedLayout)
          if(postmapping.results[layout].layout_name === layoutName)
          {
            console.log('postmapping.results[layout]: ',postmapping.results[layout]);
            setbackcrop(postmapping.results[layout].upload_photo);
            setUsePrinter(postmapping.results[layout].consolse_printer);
            var keyjson= Object.keys(postmapping.results[layout].api_field_name);
            var valuejson= Object.values(postmapping.results[layout].api_field_name);
            setQrcodeData(postmapping.results[layout].QRCODE);
            setEmail(post.results[0].user.email);
            setDepartment(post.results[0].department);
            setFaculty(post.results[0].faculty);
            setMajor(post.results[0].major);
            setadminApprove(postmapping.results[layout].admin_approve)

            setImage(post.results[0].img_card_front);
            setImageBack(post.results[0].img_card_back);

            for(var key in keyjson)
            {
              const myObj = JSON.parse(JSON.stringify(post.results[0]));
              dataarry[valuejson[key]]=myObj[keyjson[key]];

              let columnName =keyjson[key];
              if(columnName ==="profile_id")
              {
                setOpenEmployId(true);
                setEmployId(myObj[keyjson[key]]);
              }
              else if(columnName ==="title_name_th")
              {
                setOpentitleTh(true);
                settitleTh(myObj[keyjson[key]]);
              }
              else if(columnName ==="first_name_th")
              {
                setOpenNameTh(true);
                setNameTh(myObj[keyjson[key]]);
              }
              else if(columnName ==="last_name_th")
              {
                setOpenLastNameTh(true);
                setLastNameTh(myObj[keyjson[key]]);
              }
              else if(columnName ==="title_name_en")
              {
                setOpentitleEn(true);
                settitleEn(myObj[keyjson[key]]);
              }
              else if(columnName ==="first_name_en")
              {
                setOpenNameEn(true);
                setNameEn(myObj[keyjson[key]]);
              }
              else if(columnName ==="last_name_en")
              {
                setOpenLastNameEn(true);
                setLastNameEn(myObj[keyjson[key]]);
              }
              else if(columnName ==="phone")
              {
                setOpenMobile(true);
                setMobile(myObj[keyjson[key]]);
              }
              else if(columnName ==="title_name_th")
              {
                setOpenEmail(true);
                setEmail(post.results[0].user.email);
              }
              else if(columnName ==="department")
              {
                setOpenDepartment(true);
              }
              else if(columnName ==="faculty")
              {
                setOpenFaculty(true);
              }
              else if(columnName ==="major")
              {
                setOpenMajor(true);
              }
              else if(columnName ==="photo")
              {
                setPhotoImage(post.results[0].user.photo);
              }
              else if(columnName ==="birthDate")
              {
                setopenBirthDate(true);
              }
              else if(columnName ==="gender")
              {
                setopenGender(true);
              }
              else if(columnName ==="facebook")
              {
                setopenFacebook(true);
              }
              else if(columnName ==="lineID")
              {
                setopenLineID(true);
              }
              else if(columnName ==="linkedin")
              {
                setopenLinkedin(true);
              }
              else if(columnName ==="address")
              {
                setopenAddress(true);
              }
              else if(columnName ==="other")
              {
                setopenOther(true);
              }
            }
            break;
          }
        }
      }
      resolve(dataarry);
    });
  }

  function setComfirmData() {
    return new Promise(resolve => {
      var dataarry={};
      if (postmapping !=null)
      {

      if (postmapping.results != null){
        for (var layout in postmapping.results)
        {
          //if(postmapping.results[layout].layout_name === refselectmapping.current.layout_name)
          if(postmapping.results[layout].layout_name === selectedLayout)
          {
            var keyjson= Object.keys(postmapping.results[layout].api_field_name);
            var valuejson= Object.values(postmapping.results[layout].api_field_name);

            setEmail(post.results[0].user.email);
            setDepartment(post.results[0].department);
            setFaculty(post.results[0].faculty);
            setMajor(post.results[0].major);

            for(var key in keyjson)
            {
              let columnName =keyjson[key];
              if(columnName ==="profile_id")
              {
                dataarry[valuejson[key]]=employId;
              }
              else if(columnName ==="title_name_th")
              {
                dataarry[valuejson[key]]=titleTh;
              }
              else if(columnName ==="first_name_th")
              {
                dataarry[valuejson[key]]=NameTh;
              }
              else if(columnName ==="last_name_th")
              {
                dataarry[valuejson[key]]=LastNameTh;
              }
              else if(columnName ==="title_name_en")
              {
                dataarry[valuejson[key]]=titleEn;
              }
              else if(columnName ==="first_name_en")
              {
                dataarry[valuejson[key]]=NameEn;
              }
              else if(columnName ==="last_name_en")
              {
                dataarry[valuejson[key]]=LastNameEn;
              }
              else if(columnName ==="phone")
              {
                dataarry[valuejson[key]]=Mobile;
              }
              else if(columnName ==="title_name_th")
              {
                dataarry[valuejson[key]]=Email;
              }
              else if(columnName ==="department")
              {

              }
              else if(columnName ==="faculty")
              {
                dataarry[valuejson[key]]=Faculty;
              }
              else if(columnName ==="major")
              {
                dataarry[valuejson[key]]=Major;
              }
            }
            break;
          }
        }
      }
    }
      resolve(dataarry);
    });
  }

  function combineDataAndImg(DataAr,imgsBase64) {
    return new Promise(resolve => {
      DataAr["PHOTO64_1"]=imgsBase64;
      resolve(DataAr);
    });
  }

  function requestCardimg(dataInput) {
    return new Promise(resolve => {
    var date = new Date();
    var dateandtime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let imgfs={};
    axios
      .post(API_GENCARD_IMG_URL, {
        // layout_name: postmapping.results[0].layout_name,
        with_background:true,
        layout_name: selectedLayout,
        tag: dateandtime,
        input:[dataInput]
      })
      .then((response) => {
        var imgf = JSON.parse(JSON.stringify(response.data.output[0]));

        var images = new Image();
        var backcard =new Image();

        images.src = imgf['front'];
        backcard.src =imgf['back'];

        setImage(imgf['front']);
        setImageBack(imgf['back']);

        setImageforprint(imgf['front']);
        setImageBackforprint(imgf['back']);

        setwaitting(false);
        setloadingimge(false);

      });
      resolve(imgfs);
    });
  }
  const listOfImages = []


  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;

        resolve(base64data);
      }
    });
  }
  function checkedEditData(){

    if(isEditData === true)
    {
      setallowBuild(true);
      setallowPrint(false);
    }
    else if (isEditData === false)
    {
      setallowBuild(false);
      setallowPrint(true);
    }

  }
  const imageChosen = (e) => {
    setSelectLayout(e);
    if (postmapping.results != null){
      for (var layout in postmapping.results)
      {
        if(postmapping.results[layout].layout_name === e)
        {
          setImage(postmapping.results[layout].image_Font);
          setImageBack(postmapping.results[layout].image_Back);
          break;
        }
      }
    }
  };

  const handleemployIdChange  = (e) => {
    setEmployId(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }
  const handletitleThChange  = (e) => {
    settitleTh(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }
  const handNameThChange  = (e) => {
    setNameTh(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }
  const handLastNameThChange  = (e) => {
    setLastNameTh(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }
  const handtitleEnChange  = (e) => {
    settitleEn(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }
  const handNameEnChange  = (e) => {
    setNameEn(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }
  const handleLastNameEnChange  = (e) => {
    setLastNameEn(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }
  const handleMobileChange  = (e) => {
    setMobile(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }
  const handleEmailChange  = (e) => {
    setEmail(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }
  const handleDepartmentChange  = (e) => {
    setDepartment(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }
  const handleFacultyChange  = (e) => {
    setFaculty(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }
  const handleMajorChange  = (e) => {
    setMajor(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }
  const handleBirthDateChange  = (e) => {
    setBirthDate(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }
  const handleGenderChange  = (e) => {
    setGender(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }

  const handleFacebookChange  = (e) => {
    setFacebook(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }

  const handleLineIDChange  = (e) => {
    setLineID(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }

  const handleLinkedinChange  = (e) => {
    setLinkedin(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }

  const handleAddressChange  = (e) => {
    setAddress(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }

  const handleOtherChange  = (e) => {
    setOther(e.target.value);
    setIsEditData(true);
    setallowBuild(true);
    setPreview_mode(true);
  }

  const changeLayout = event => {
    formdataJson();
  }

  const changelayoutCard =() =>{
    setConfirmLayout(true);
  }
  const history = useHistory();

  async function RefreshLayout (layoutname){
    let objdata = await requestRefreshCardimg();
  }
  function requestRefreshCardimg() {
    return new Promise(resolve => {
    let imgfs={};
    axios
    .get(API_BASE_URL + "/v1/mappinglist", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      setPostMapping(response.data);
      imgfs =response.data;
      setMappingList(response.data.results);
      // setSelectMapping(response.data.results[0]);

      if (response.data.results != null){
        for (var layout in response.data.results)
        {

          if(response.data.results[layout].layout_name === layoutName)
          {
            setImage(response.data.results[layout].image_Font);
            setImageBack(response.data.results[layout].image_Back);
            break;
          }
        }
      }
    });
      resolve(imgfs);
    });
  }


  const confirmSelectLayout =()=>{
    let objlayout = genResulttempLayout();
    formdataJson();
    history.push({pathname:"/"+ props.match.params.org+"/CropImage",state:{id:selectedLayout}});
  }

  const dialogConfirminfomation =async()=>{
    await formdataJson();


    if (postmapping.results != null){
      for (var layout in postmapping.results)
      {
        if(postmapping.results[layout].layout_name === layoutName)
        {
          if(postmapping.results[layout].user_can_edit_info === true)
          {
            setReadOnly(false);
          }
          else if(postmapping.results[layout].user_can_edit_info === false)
          {
            setReadOnly(true);
          }

          setWhitecard(postmapping.results[layout].card_is_preprint);
          break;
        }
      }
    }
  }

  const currentUser = AuthService.getCurrentUser();
  AuthService.getAccessToken();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(async() => {
    setPreview_mode(true);
    if(layoutName != undefined)
    {
      setSelectLayout(layoutName);

    }
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
        setPostMapping(response.data);
        setMappingList(response.data.results);

        // setSelectMapping(response.data.results[0]);

       // genResultmapping();
      });

    //  axios
    //   .get(API_BASE_URL + "/v1/configprinter", {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   })
    //   .then((response) => {
    //     setConfigPrinter(response.data);
    //   });



    await axios
      .get(API_BASE_URL + "/v1/userlist", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPost(response.data);
        setlayoutName(response.data.results[0].layout_name);
        setProfileID(response.data.results[0].id);
        setuniqueProfileID(response.data.results[0].profile_id);
        if(response.data.results[0].ref_id.split('_')[2] === "igree")//layoutName ==="preview"
        {
          setPreview_mode(false);
          setStatus_view(true);

          setSelectLayout(response.data.results[0].layout_name);
          // layoutName = response.data.results[0].layout_name;
        }
        if (response.data.results[0].status ===0) {
          setStatus_text("Watting admin approve");
          setstatus_text2("Watting admin approve");
          setallowQrcode(true);
        }
        else if (response.data.results[0].status ===1) {
          setStatus_text("Pending");
          setstatus_text2("Pending");
          setallowQrcode(true);
        }
        else if (response.data.results[0].status ===2) {
          setStatus_text("Approve1");
          setstatus_text2("Approve1");
        }
        else if (response.data.results[0].status ===3) {
          setStatus_text("Approve2");
          setstatus_text2("Approve2");
        }
        else if (response.data.results[0].status ===4) {
          setStatus_text("Reject");
          setstatus_text2("Reject");
        }
      });

      // await axios
      // .get("http://122.248.202.159/api/consoles/", {
      //   // crossdomain: true,
      //   // withCredentials: false,
      //   // headers: {
      //   //   "Access-Control-Allow-Origin": "*",
      //   //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      //   // },
      // })
      // .then((response) => {
      //   setConsoleList(response.data);
      // });

      await axios
      .get(API_BASE_URL + "/v1/configprinter", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setConfigPrinter(response.data);
      });

      await axios
      .get(API_REQUEST_PRINTER_URL, {
        // crossdomain: true,
        // withCredentials: false,
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        // },
      })
      .then((response) => {
        setPrinterList(response.data);
      });

  }, []);

  // if(data != undefined)
  // {
  //   setConfirmLayout(false);
  // }


  if (!post) return ("Loading...");

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

  function genResulttempLayout() {
    return new Promise(resolve => {
      var dataarry={};

      if (postmapping.results != null){
        for (var layout in postmapping.results)
        {
          if(postmapping.results[layout].layout_name === selectedLayout)
          {
            dataarry =postmapping.results[layout];
            setImage(postmapping.results[layout].image_Font);
            setImageBack(postmapping.results[layout].image_Back);
            break;
          }
        }
      }
      resolve(dataarry);
    });
  }


  const defaultImg = ()=>{

    let im ="data:image/png;base64,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";
    setImage(im);
    setImageBack(im);
  }

  var daatajson ="";

  async function formdataJson()
  {
    const resultmap = await genResultmapping();
    //setresultSelectmap(resultmap);
    // let resultImg =await getBase64FromUrl(post.results[0].photo)
    // const resultCombine =await combineDataAndImg(resultmap,resultImg);
    // await requestCardimg(resultCombine);
  };
  const mixImages = () => {
    var date = new Date();
    var dateandtime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    axios
      .post(API_GENCARD_IMG_URL, {
        layout_name: postmapping.results[0].layout_name,
        tag: dateandtime,
        input:[daatajson]
        // input:[{
        //   FIRSTNAME:"testname",
        //   LASTNAME:"testlastname",
        //   ID:"1123",
        // }]
      })
      .then((response) => {
        var imgf = JSON.parse(JSON.stringify(response.data.output[0]));

        var images = new Image();
        var backcard =new Image();

        images.src = imgf['front'];
        backcard.src =imgf['back'];

        setImage(imgf['front']);
        setImageBack(imgf['back']);
      });
  };
  const mixImagedummy = () => {

    axios
      .post(API_GENCARD_IMG_URL, {
        layout_name: "TEST LAYOUT NAME XXX",
        tag: "TEST TAG TAG001",
        input:[{
        fristname:"testFieldfristName",
        lastname:"testFiledLastName",
        photo:"",
      }]
      })
      .then((response) => {
        setImage(response.data);
      });
  };

  if (post.results[0].photo != null && start === 0) {
    // mixImage();
    //formdataJson();
    //mixImages();
    setStart(1);
  }
  const onUploadToServer2 = async () => {
    let serverHeader = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    if(photoF === undefined)
    {
      photoF = await getBase64FromUrl(image);
      photoB = await getBase64FromUrl(imageB);
    }
    const filef = await dataURLtoFile(photoF);
    const fileb = await dataURLtoFile(photoB);
    const data = new FormData();

    data.append("ref_id", props.match.params.org+currentUser+"_igree");
    data.append("layout_name", layoutName);
    data.append("status",1);
    data.append("img_card_front", filef,  props.match.params.org+currentUser+data + "_F.jpg");
    data.append("img_card_back", fileb,  props.match.params.org+currentUser+data + "_B.jpg");
    // data.append("img_card_front", image);
    // data.append("img_card_back", imageB);

    // put file into form data
    axios.patch(
      API_BASE_URL + "/v1/userlist/" + post.results[0].id + "/",
      data,
      serverHeader
    );

  };
  const onUploadToServer = async () => {
    let serverHeader = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    //let dataToUpload = `data:image/jpeg;base64,${uploaded.image}`;
    const filef = await dataURLtoFile(imageforprint);
    const fileb = await dataURLtoFile(imageBforprint);
    const data = new FormData();

    data.append("organizations", props.match.params.org);
    data.append("profile_id", currentUser);
    data.append("ref_id", props.match.params.org+currentUser);
    data.append("layout_name", selectedLayout);
    data.append("img_card_front", filef,  props.match.params.org+currentUser+selectedLayout + "_F.jpg");
    data.append("img_card_back", fileb,  props.match.params.org+currentUser+selectedLayout + "_B.jpg");
    // put file into form data
    await axios.post(
      API_BASE_URL + "/v1/userlistprintHistory/",
      data,
      serverHeader
    );
  };

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

  const goLandingCret =()=>{
    history.push({pathname:"/"+ props.match.params.org+"/Landing_cret",state:{id:""}});
    window.location.reload();
  }

  if (post.results[0].photo === null && start === 0) {
    //mixImagedummy();
    setStart(1);
  }

  const checkstatusprinter =(printerID)=>{
    let status = "connection lose";
    setStatusPrinter("connection lose");
     axios
      .get(API_REQUEST_PRINTER_URL +printerID+"/", {
      })
      .then((response) => {
        setStatusPrinter(response.data.status);
        status = response.data.status;

      })
      .catch((error) => {
        setStatusPrinter("printer error");
        status = "printer error";
      });
      return status;
  }

   const sendPrint = async() => {
    let status = "admin_approve";
    if (whitecard === true)
    {
      setsendingtoprint(true);
      var date = new Date();
      var dateandtime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      await axios
        .post(API_GENCARD_IMG_URL, {
          // layout_name: postmapping.results[0].layout_name,
          with_background: false,
          layout_name: selectedLayout,
          tag: dateandtime,
          input:[resultforgencard]
        })
        .then((response) => {
          var imgf = JSON.parse(JSON.stringify(response.data.output[0]));
          photoF = imgf['front'];
          photoB = imgf['back'];
          setImageforprint(imgf['front']);
          setImageBackforprint(imgf['back']);
          setsendingtoprint(false);
          //setwaitting(false);
        });
    }

    if (adminApprove === true)
    {
      //onUploadToServer();
      onUploadToServer2();
    }
    else if(adminApprove === false)
    {

      photoF = await getBase64FromUrl(image);
      photoB = await getBase64FromUrl(imageB);
     let printerOption ;
     let numberprinter=0;
     for (var list in configPrinter.results)
        {
          if(configPrinter.results[list].id === usePrinter)
          {
            break;
          }
          numberprinter++
        }
      const statusprint = checkstatusprinter(configPrinter.results[numberprinter].printer_ID);
      if(statusprint ==="Console offline")
      {
        setStatus_text("Console offline");
        status = "Console offline";
        setPrinterror(true);
      }
      else if(statusprint ==="Not connected")
      {
        setStatus_text("Not connected");
        status = "Not connected";

        setPrinterror(true);
      }
      else if(statusprint ==="printer error")
      {
        setStatus_text("printer error");
        status = "printer error";

        setPrinterror(true);
      }
      else if(statusprint ==="connection lose")
      {
        setStatus_text("connection lose");
        status = "connection lose";

        setPrinterror(true);
      }
      else //if(statusprint ==="Printer Ready" || statusprint==="Printer Not Ready")
      {
        if(configPrinter.results[numberprinter].printer_type === 0)
        {
         printerOption = "auto";
        }
        else if(configPrinter.results[numberprinter].printer_type === 1)
        {
         printerOption = "manual";
        }
         //  console: console_name,
         //  printer: printer_name,
         //  print_option: printerOption,
         //  front_card: fronCard64,
         //  back_card: backcard64,
         //  name: 'send to print ' + user.first_name_en+user.layout_name + console_name + printer_name,
         //  submitted_by: username,
         //  card_layout: user.layout_name,

         await axios
            .post(API_POST_PRINT_URL, {
              console: configPrinter.results[numberprinter].consoleID,
              printer: configPrinter.results[numberprinter].printer_ID,
              print_option:printerOption,
              front_card: photoF,
              back_card:photoF,
              name: "send to ptint "+selectedLayout+configPrinter.results[numberprinter].printer_ID,
              submitted_by: currentUser,
              card_layout: selectedLayout,
            })
            .then((response) => {
              setConfirm(true);
            });
      }
    }
    if(status === "admin_approve")
    {

      if(qrcodeData != null)
      {
        setDialogsuccess(true);
      }
      await axios
        .get(API_BASE_URL + "/v1/userlist", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setPost(response.data);

          if (response.data.results[0].status ===0) {
            setStatus_text("Watting admin approve");
          }
          else if (response.data.results[0].status ===1) {
            setStatus_text("Pending");
          }
          else if (response.data.results[0].status ===2) {
            setStatus_text("Approve1");
          }
          else if (response.data.results[0].status ===3) {
            setStatus_text("Approve2");
          }
          else if (response.data.results[0].status ===4) {
            setStatus_text("Reject");
          }
        });
    }
    setStatus_view(true);
    setPreview_mode(false);
    setReadOnly(true);
  };

  const goHistory =()=>{
    history.push({pathname:"/"+ props.match.params.org+"/History",state:{id:selectedLayout}});
  }
  async function goBack() {

    if(backcrop === false)
    {
      props.history.push({pathname:"layout",state:{id:layoutName}});
      window.location.reload();
    }
    else if ( backcrop ===true)
    {
      props.history.push({pathname:"CropImage",state:{id:layoutName+"~show"}});
      window.location.reload();
    }


  }

  return (
    <>
      <div className="relative mt-12 sm:mt-4 lg:mt-12 ">
        <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
          {/* {showcardImgage && */}

          <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1 ">

          {loadingimge && (
            <div className="justify-items-center">
            <p className="relative" >
            <svg className="animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24">
            </svg>
            Loading...
          </p>
            </div>
          )}
              {
                isFront ? (
                  <img className="mx-auto rounded-3xl"  src={image} alt="" />
                ) : (
                  <img className="mx-auto rounded-3xl"  src={imageB} alt="" />
              )}

            {/* <div className="px-4 py-5 bg-white sm:p-6">
                <p className="block text-gray-700 text-sm font-medium">
                  Layout
                </p>
                <Select
                  menuPortalTarget={document.querySelector("body")}
                  defaultValue={selectedMapping}
                  // onChange= {setSelectMapping}
                  onChange= {changeLayout}
                  options={mappingList ? mappingList : []}
                  components={{ Input }}
                  getOptionValue={(option) => option.layout_name}
                  getOptionLabel={(option) => option.layout_name}
                  />
            </div> */}
            <div className="flex justify-center mt-2 space-x-5 ">
              <span className="relative z-0 inline-flex shadow-sm rounded-md ">
                <button
                  type="button"
                  onClick={() => setIsFront(true)}
                  autoFocus
                  className={
                    "relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  }
                >
                  Front
                </button>
                <button
                  type="button"
                  onClick={() => setIsFront(false)}
                  className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Back
                </button>
                <Collapse isOpened={allowQrcode} high={"auto"}>
                     <button
                    type="button"
                    onClick={() => { setDialogsuccess(true); }}
                    className="inline-flex justify-center px-4 py-2 text-white text-3xl font-medium border-gray-300 hover:border-gray-400 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
                    >
                     <QrcodeIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                    </button>
                   </Collapse>
              </span>

              {/* <button
                type="button"
                onClick={() => changelayoutCard()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {"Change Type Card"}
              </button> */}
              {/* <button
                type="button"
                onClick={() => buildCard()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {"Build Card"}
              </button> */}

              {/* <button
                type="button"
                onClick={() => togglePrint(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {print ? "Information" : "Print Card"}
              </button> */}

            </div>

          </div>
          {/* } */}
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
                          Printer Option
                        </p>
                        <Select
                          menuPortalTarget={document.querySelector("body")}
                          defaultValue={selectedPrinterOption}
                          onChange={setSelectPrinterOption}
                          options={printerOptionList ? printerOptionList : []}
                          components={{ Input }}
                          getOptionValue={(option) => option.type}
                          getOptionLabel={(option) => option.type}
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
                  <div className="px-4 py-3 text-center bg-gray-100 sm:px-6">
                    <button
                      type="button"
                      onClick={() => sendPrint()}
                      className="inline-flex justify-center px-4 py-2 text-white text-3xl font-medium bg-blue-600 hover:bg-blue-500 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-blue-500 focus:ring-offset-2 focus:ring-2"
                    >
                      Request to print
                    </button>
                  </div>

                </>
              ) : (
                <>
                 {status_view && (
                      <div className="col-span-6 sm:col-span-4 px-4 py-5">
                        <p className="block text-gray-700 text-4xl font-medium">
                          Status: {status_text}
                        </p>
                      </div>)}

                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-3 gap-4 ">
                      <div className="sm:col-span-2">
                          <p className="block text-gray-700 text-sm font-medium">
                          ID: {profileID}
                          </p>
                      </div>
                      <div className="sm:col-span-2">
                          <p className="block text-gray-700 text-sm font-medium">
                         Profile ID: {uniqueprofileID}
                          </p>
                      </div>


                      {openemployId && (
                      <div className="col-span-6 sm:col-span-4">
                        <p className="block text-gray-700 text-sm font-medium">
                          Employee/Student ID
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          value={currentUser} onChange={handleemployIdChange}
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
                            value={titleTh} onChange={handletitleThChange}
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
                            value={NameTh} onChange={handNameThChange}
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
                          value={LastNameTh} onChange={handLastNameThChange}
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
                          value={titleEn} onChange={handtitleEnChange}
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
                          value={NameEn} onChange={handNameEnChange}
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
                          value={LastNameEn} onChange={handleLastNameEnChange}
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
                          value={Mobile} onChange={handleMobileChange}
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
                          value={Email} onChange={handleEmailChange}
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
                          value={Department} onChange={handleDepartmentChange}
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
                          value={Faculty} onChange={handleFacultyChange}
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
                          value={Major} onChange={handleMajorChange}
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}

                      {openbirthDate && (
                        <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium">
                        Birth Date
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="date"
                          value={BirthDate} onChange={handleBirthDateChange}
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}

                      {openGender && (
                        <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium">
                        Gender
                        </p>

                         <select
                            value={Gender}
                            onChange={handleGenderChange}
                            className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm">
                            <option defaultValue value="0">Male</option>
                            <option value="1">Female</option>
                            <option value="2">Other</option>
                          </select>
                      </div>
                      )}

                      {openFacebook && (
                        <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium">
                        Facebook
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          value={Facebook} onChange={handleFacebookChange}
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}

                      {openLineID && (
                        <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium">
                        Line ID
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          value={LineID} onChange={handleLineIDChange}
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}

                      {openLinkedin && (
                        <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium">
                        Linkedin
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          value={Linkedin} onChange={handleLinkedinChange}
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}
                       {openAddress && (
                        <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium">
                        Address
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          value={Address} onChange={handleAddressChange}
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}
                      {openOther && (
                        <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium">
                        Other
                        </p>
                        <input
                          readOnly= {ReadOnly}
                          type="text"
                          value={Other} onChange={handleOtherChange}
                          className="block mt-1 w-full border-gray-300 focus:border-blue-500 rounded-md shadow-sm focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      )}


                      {/* <div className="col-span-6 sm:col-span-6 lg:col-span-2">
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
                      </div> */}
                    </div>
                  </div>

                  {preview_mode &&(

                  <div className="px-4 py-3 text-center bg-gray-100 sm:px-6">

                    <Collapse isOpened={!allowPrint} high={"auto"}>
                    <div className="flex items-center justify-center col-span-2">
                      <input
                        id="accept_tos"
                        name="accept_tos"
                        type="checkbox"
                        defaultChecked={checked}
                        // onChange={() => setChecked(!checked)}
                        onChange={checkedEditData}
                        className="h-8 w-8 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded"
                      ></input>
                      <label className="ml-2 block text-sm font-medium text-gray-700">
                        I agree to the terms and conditions and the privacy
                        policy
                      </label>
                    </div>
                    <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  goBack()

                }}
              >
                <RewindIcon className="h-6 w-6" aria-hidden="true" />
                Back
              </button>

                    {/* <Link
                      to={"/" + props.match.params.org + "/CropImage"}
                      className="inline-flex justify-center px-4 py-2 text-white text-3xl font-medium bg-rose-600 hover:bg-rose-500 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-rose-500 focus:ring-offset-2 focus:ring-2"
                    >
                      Upload Photo
                    </Link> */}

                   <Collapse isOpened={allowBuild} high={"auto"}>
                    <button class ="disabled:opacity-50"
                    type="button"
                    disabled={!allowBuild}
                    onClick={() => buildCard()}
                    className="inline-flex justify-center px-4 py-2 text-white text-3xl font-medium bg-rose-600 hover:bg-rose-500 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-rose-500 focus:ring-offset-2 focus:ring-2">
                      {"Update data"}
                    </button>
                   </Collapse>
                    </Collapse>

                   <Collapse isOpened={allowPrint} high={"auto"}>
                   {/* <button
                    type="button"
                    onClick={() => togglePrint(true)}
                    className="inline-flex justify-center px-4 py-2 text-white text-3xl font-medium bg-rose-600 hover:bg-rose-500 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-rose-500 focus:ring-offset-2 focus:ring-2"
                    >
                    {print ? "Information" : "Print Card"}
                    </button> */}
                    <button
                    type="button"
                    onClick={() => sendPrint()}
                    className="inline-flex justify-center px-4 py-2 text-white text-3xl font-medium bg-rose-600 hover:bg-rose-500 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-rose-500 focus:ring-offset-2 focus:ring-2"
                    >
                     Request to print
                    </button>
                   </Collapse>



                  </div>
                  )
                  }
                </>

              )}
            </div>

          </div>
        </div>
      </div>
      <Transition.Root show={confirm} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setConfirm}
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Print Successful
                    </Dialog.Title>

                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Your photo will be printed.
                        </p>
                      </div>
                  </div>
                </div>
                  <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => {
                      setallowPrint(false);
                      setallowQrcode(true);
                      togglePrint(false);
                      setConfirm(false);
                    }}
                  >
                    Confirm
                  </button>
                </div>

              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={sendingtoprint} as={Fragment}>
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">

                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Sending to printer.
                    </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Your card sending to printer wait a moment...
                        </p>
                      </div>

                  </div>
                </div>

              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* <Transition.Root show={confirmLayout} as={Fragment}>
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
                      Select type card
                    </Dialog.Title>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your life % Your money.
                      </p>
                    </div>
                    <div >
                        {mappingList.map((images, index) => (
                        <img onClick={(e) => imageChosen(e.target.alt)} src={images.image_Font} key={index} alt={images.layout_name}
                        className="m-0.5 inline-flex justify-center rounded-md border border-transparent shadow-sm px-1 py-1 bg-green-100 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm w-5/12 float-left"
                        ></img>
                        ))}
                  </div>

                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => {
                      // setConfirmLayout(false);
                      confirmSelectLayout();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root> */}

      <Transition.Root show={waitting} as={Fragment}>
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CreditCardIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    {/* <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Select type card
                    </Dialog.Title> */}

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Image Building...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={printerror} as={Fragment}>
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <PrinterIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    {/* <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Select type card
                    </Dialog.Title> */}

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {statusprinter} please try print nex time.
                      </p>
                    </div>
                      <div className="mt-5 sm:mt-6">
                        <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        onClick={() => {
                        setPrinterror(false);
                        setStatus_view(false);
                        setPreview_mode(true);
                        }}
                        >
                          Close
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={dialoginfomation} as={Fragment}>
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
                    <IdentificationIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {preview_mode ? (
              "STEP 3: Your infomation"
            ):("This your card")}

                    </Dialog.Title>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">

                      {preview_mode ? (
                        "Please check and confirm your data."
            ):("Status: "+status_text2)}
                      </p>
                    </div>
                    {/* <div >
                        {mappingList.map((images, index) => (
                        <img onClick={(e) => imageChosen(e.target.alt)} src={images.image_Font} key={index} alt={images.layout_name}
                        className="m-0.5 inline-flex justify-center rounded-md border border-transparent shadow-sm px-1 py-1 bg-green-100 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm w-5/12 float-left"
                        ></img>
                        ))}
                    </div> */}

                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => {
                      setDialoginfomation(false);
                      dialogConfirminfomation();

                    }}
                  >

                    {preview_mode ? (
                    "Check & Confirm"
                    ):("Close")}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={dialogsuccess} as={Fragment}>
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
                    <QrcodeIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      QR Code
                    </Dialog.Title>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                      Please present this QRCode to {props.match.params.org} staff.
                      </p>
                    </div>
                    <div >
                    <QRCode value={qrcodeData+post.results[0].id}
                    className="inline-flex justify-center"
                        />
                    </div>

                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => {
                      setDialogsuccess(false);
                      //goHistory();
                    }}
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    href={"logout"}
                    className="inline-flex justify-center w-full mt-1.5 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => {
                      AuthService.logout();
                      props.history.push({pathname:"login"});
                      window.location.reload();
                    }}

                  >
                    Logout
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
