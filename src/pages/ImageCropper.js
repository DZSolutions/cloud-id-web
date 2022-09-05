import { useRef, useState, Fragment, useEffect } from "react";
import React, { Component } from 'react';
import Cropper from "react-easy-crop";
import Jimp from 'jimp';
import getCroppedImg, { generateDownload } from "../utils/cropImage";
import Resizer from "react-image-file-resizer";
// import mycard from "../images/my-business-card1-removebg.png";
// import mycard from "../images/my-business-card (5).png";

import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon,PhotographIcon,XIcon,CameraIcon,RewindIcon } from "@heroicons/react/outline";
import { API_BASE_URL,API_GENCARD_IMG_URL,API_GET_IMG_SIZE_URL,API_REMOVE_BG } from "../constrants/apiConstrants";
import axios from "axios";
import AuthService from "../services/auth.service";
import usestateref from 'react-usestateref';
import { data } from "autoprefixer";
import {Collapse} from 'react-collapse';

const CROP_AREA_ASPECT = 3 / 2;



export function ImageCropper(props) {
  const [post, setPost] = useState(null);
  const inputRef = useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  // const [image, setImage] = useState(null);
  const [image, setImage,refImage] = usestateref(null);


  const [imageOri, setImageOri] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedAreaPreview, setCroppedAreaPreview] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [cropwidth, setCropwidth] = useState(0);
  const [cropheight, setCropheight] = useState(0);
  const [allowRemoveBG, setAllowRemoveBG] = useState(false);
  const [textRemovestatus, setTextRemovestatus] = useState("Please Confirm Upload");

  const [mycardlogo, setmycardlogo] = useState(null);

  const ref = useRef(null)
  const [ChosenPhoto, setChosenPhoto] = useState(false);
  const [Removingbg ,setRemoving] = useState(false);
  const [Removingbgstatus ,setRemovingRemovingbgstatus] = useState(false);

  const [AutoGetImage, setAutoGetImage] = useState(false);

  const [uploaded, setUploaded] = useState([]);
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [isUploading, setIsUpLoading] = useState(false);
  const [istakephoto, setIstakephoto] = useState(false);
  const [ischoosephoto, setIschoosephoto] = useState(false);
  const [isretake, setIsRetake] = useState(false);
  const [isretakephoto, setIsRetakePhoto] = useState(false);
  const [istriggeruploadFile, setIstriggeruploadFile] = useState(false);
  const [isshowGrid, setIsshowGrid] = useState(false);
  const [codeR, setCodeR] = useState(0);
  const [codeG, setCodeG] = useState(0);
  const [codeB, setCodeB] = useState(0);


  const [showPreviewTake, setShowPreviewTake] = useState(false);

  //const [video, setvideo] = useState(null);
  const canvasRef = useRef(null);

  const [postmapping, setPostMapping,refpostmapping] = usestateref(null);
  const [mappingList, setMappingList,refmappingList] = usestateref(null);
  const [autozoom, setAutozoom] = useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const layoutName = props.history.location.state?.id.split("~")[0];
  if(props.history.location.state?.id.split("~")[1] ==="show")
  {
  }

  const Output = ({ croppedArea }) => {
    const scale = 100 / croppedArea.width;
    const transform = {
      x: `${-croppedArea.x * scale}%`,
      y: `${-croppedArea.y * scale}%`,
      scale,
      width: "calc(100% + 0.5px)",
      height: "auto"
    };

    const imageStyle = {
      transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
      width: transform.width,
      height: transform.height
    };

    return (
      <div
        className="relative w-80 z-20 overflow-hidden shadow-gray-900 rounded-lg"
        // className="output"
        style={{ paddingBottom: `${100 / CROP_AREA_ASPECT}%` }}
      >
        <img className="absolute top-0 left-0 origin-top-left" src={image} alt="" style={imageStyle} />
      </div>
    );
  };

  const onSelectFile = async(event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
      onChangeCheckSizeImg(event.target.files[0],reader.result);
      });
    }
  };
  const onChangeCheckSizeImg = async (path,render) => {
    try {
      const file = path;
      const imgWH = await createImage(render);
      //const image = await resizeFile(file,imgWH);

      let wsize = imgWH.width;
      let hsize = imgWH.height;
      let wresult =imgWH.width;

      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      let w = canvasRef.width;
      console.log("w:",w);

      if (width < imgWH.width) {
          setRemoving(true);
          setRemovingRemovingbgstatus('Processing photo...');

            for (let index = 99; index != 0; index--) {
               wresult = (wsize*index)/100;
              if(wresult < width-10)
              {
                hsize = (hsize*index)/100;
                break;
              }
            }
            const image = await Jimp.read(render);
            await image.resize(wresult, hsize);
            const image_resize= await image.getBase64Async(Jimp.MIME_JPEG);
            if(allowRemoveBG === true)
              {
                RemoveBackground(image_resize);
              }
              else
              {
                setImage(image_resize);
                setImageOri(render);
              }
              setRemoving(false);
      }
      else
      {
        if(allowRemoveBG === true)
        {
          RemoveBackground(render);
        }
        else
        {
          setImage(render);
          setImageOri(render);
        }
      }

    } catch (err) {
      console.log(err);
    }

  };

  const resizeFile = (file,imgWH) =>
  new Promise((resolve) => {

    let wsize = imgWH.width;
    let hsize = imgWH.height;
    let wresult =imgWH.width;

    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < imgWH.width) {
        // while (true) {
        //   imgWH.width = imgWH.width / 2;
        //   imgWH.height = imgWH.height / 2;
        //   if (window.innerWidth > imgWH.width) {
        //     break;
        //   }
        // }
          for (let index = 99; index != 0; index--) {
             wresult = (wsize*index)/100;
            if(wresult < width-10)
            {
              hsize = (hsize*index)/100;
              break;
            }
          }
    }
    Resizer.imageFileResizer(
      file,
      wresult,
      hsize,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

  const RemoveBackground = async(data) =>{
    setRemoving(true);
    let config = {
        headers: {
          "X-Client-Secret": "DZSolution_Secret_Client",
          "Content-Type": "application/json",
        },
      };

      var payload = JSON.stringify({
        image: data.split(";base64,")[1],
        fill_color: { red: codeR, green: codeG, blue: codeB },
      });
      await axios
          .post(API_REMOVE_BG,
            payload,
            config
          )
          .then((response) => {
            setImage("data:image/jpeg;base64,"+response.data.image);
            setRemoving(false);
          })
          .catch((error) => {
            setRemovingRemovingbgstatus('error ' + error);
        });

  }

  const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

  const onDownload = () => {
    generateDownload(image, croppedArea);
  };

  const handleClose = (e, redirect) => {

    if (redirect === 'backdropClick') {
        return false
    }
    else if(redirect ==='closedialog'){
      return true
    }
  };

  const onUpload = async () => {

    setIsUpLoading(true);
    // if(allowRemoveBG === true)
    // {
    //   const canvas = await getCroppedImg(image, croppedArea);
    //   const base64Canvas = canvas.toDataURL("image/jpeg").split(";base64,")[1];
    //   let config = {
    //     headers: {
    //       "X-Client-Secret": "DZSolution_Secret_Client",
    //       "Content-Type": "application/json",
    //     },
    //   };

    //   var payload = JSON.stringify({
    //     image: base64Canvas,
    //     fill_color: { red: codeR, green: codeG, blue: codeB },
    //   });

    //   const response = await axios.post(
    //     "https://api.dzcardsolutions.com/api/v1/image/background/remove",
    //     payload,
    //     config
    //   );
    //   setUploaded(response.data);
    //   setTextRemovestatus("Remove Background Successful");
    // }
    // else if(allowRemoveBG === false)
    {
      const canvas = await getCroppedImg(image, croppedArea,rotation);
      const base64Canvas = await canvas.toDataURL("image/jpeg").split(";base64,")[1];
      let objImg={};
      objImg["image"]=base64Canvas;
      setUploaded(objImg);
    }
    setOpen(true);
    setIsUpLoading(false);
  };

  const getCheckconfigvalue = ()=>{
    if(postmapping.results != null)
    {
      for(var key in postmapping.results)
          {
            if(postmapping.results[key].layout_name === layoutName)
            {
              setAllowRemoveBG(postmapping.results[key].removeBG);
              if(postmapping.results[key].removeBG)
              {
                setCodeR(postmapping.results[key].r);
                setCodeG(postmapping.results[key].g);
                setCodeB(postmapping.results[key].b);
              }
              if(postmapping.results[key].cover_layout != null)
              {
                setmycardlogo(postmapping.results[key].cover_layout);
              }
              break;
              // setCropwidth(postmapping.results[key].crop_width);
              // setCropheight(postmapping.results[key].crop_height);

              // let box = document.getElementById('box');
              // let width = box.offsetWidth;
              // if(width <= postmapping.results[key].crop_width)
              // {
              //     let zoom =((width-10)/postmapping.results[key].crop_width);
              //     setAutozoom(zoom);
              // }
              // else if(width > postmapping.results[key].crop_width)
              // {
              //   let zoom = postmapping.results[key].crop_width;
              //   setAutozoom(zoom);
              //   console.log(zoom);
              //   console.log("width > postmapping");
              //   console.log(autozoom);
              // }
              // if(postmapping.results[key].cropImgcard === true)
              // {
              //   setCropwidth(1016);crop_width
              //   setCropheight(642);
              // }
              // else if (postmapping.results[key].cropHuman === true)
              // {
              //   setCropwidth(395);
              //   setCropheight(395);
              // }
            }
          }
    }
  }
  const getCoverimg = (postss)=>{
    if(postss.results != null)
    {
      for(var key in postss.results)
          {
            if(postss.results[key].layout_name === layoutName)
            {
              if(postss.results[key].cover_layout != null)
              {
                setmycardlogo(postss.results[key].cover_layout);
              }
              break;
            }
          }
    }
  }

  AuthService.getAccessToken();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(async() => {
    await axios
      .get(API_BASE_URL + "/v1/mappinglist", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPostMapping(response.data);
        setMappingList(response.data.results);

        getCoverimg(response.data);
      });

      await axios
      .post(API_GET_IMG_SIZE_URL, {
        layout_name: layoutName,
      })
      .then((response) => {
         var img_crop_size = JSON.parse(JSON.stringify(response.data.output.front[0]));
         var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if(width <= img_crop_size['width'])
        {
          let wsize = img_crop_size['width'];
          let hsize = img_crop_size['height'];


          for (let index = 99; index != 0; index--) {
            let wresult = (wsize*index)/100;
            if(wresult < width-10)
            {
              hsize = (hsize*index)/100;
              setCropwidth(wresult);
              setCropheight(hsize);

              break;
            }
          }
        }
        else if (width > img_crop_size['width'])
        {
          setCropwidth(img_crop_size['width']);
          setCropheight(img_crop_size['height']);
        }
      });

      await axios
      .get(API_BASE_URL + "/v1/userlist", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPost(response.data);
        if(props.history.location.state?.id.split("~")[1] ==="show")
        {
          setAutoGetImage(true);
          setImage(response.data.results[0].photo_Original);
          //setImageOri(getBase64FromUrl(response.data.results[0].photo_Original));
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setChosenPhoto(true);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
  }, []);

  // let payload = {
  //   image: uploaded.image,
  // };

  const onUploadToServer = async () => {
    setIsUpLoading(true);
    let serverHeader = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    let dataToUpload = `data:image/jpeg;base64,${uploaded.image}`;
    const file = dataURLtoFile(dataToUpload);
    const data = new FormData();
    data.append("photo", file, post.results[0].id + ".jpg");
    if(imageOri != null)
    {
      const file_2 = dataURLtoFile(imageOri);
      data.append("photo_Original", file_2, post.results[0].id + ".jpg");
    }
    // put file into form data
    axios.patch(
      API_BASE_URL + "/v1/userlist/" + post.results[0].id + "/",
      data,
      serverHeader
    );

    await AutobuildCard();

    if(istakephoto == true)
    {
      stopCam();
    }

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

  async function nextPage(){
    setIsUpLoading(true);
    await AutobuildCard();
    setIsUpLoading(false);
    props.history.push({pathname:"upload",state:{id:layoutName}});
    window.location.reload();

  }
  var tempimg;
  async function AutobuildCard() {
    let resultmap = await genResultmapping();
    if(post!=null){
      let dataToUpload = `data:image/jpeg;base64,${uploaded.image}`;
      const resultCombine =await combineDataAndImg(resultmap,dataToUpload);
      await requestCardimg(resultCombine);
      await onUploadToServer2();
    }
  }
  async function MockupCard() {
    let resultmap = await genResultmapping();
    if(post!=null){
      tempimg = null;
      let imgagemock ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABIAAAAKICAYAAAAIK4ENAAAAAXNSR0IArs4c6QAAIABJREFUeF7t2EERAAAIAkHpX9oeN2sDFl/sHAECBAgQIECAAAECBAgQIECAQFpg6XTCESBAgAABAgQIECBAgAABAgQInAHIExAgQIAAAQIECBAgQIAAAQIE4gIGoHjB4hEgQIAAAQIECBAgQIAAAQIEDEB+gAABAgQIECBAgAABAgQIECAQFzAAxQsWjwABAgQIECBAgAABAgQIECBgAPIDBAgQIECAAAECBAgQIECAAIG4gAEoXrB4BAgQIECAAAECBAgQIECAAAEDkB8gQIAAAQIECBAgQIAAAQIECMQFDEDxgsUjQIAAAQIECBAgQIAAAQIECBiA/AABAgQIECBAgAABAgQIECBAIC5gAIoXLB4BAgQIECBAgAABAgQIECBAwADkBwgQIECAAAECBAgQIECAAAECcQEDULxg8QgQIECAAAECBAgQIECAAAECBiA/QIAAAQIECBAgQIAAAQIECBCICxiA4gWLR4AAAQIECBAgQIAAAQIECBAwAPkBAgQIECBAgAABAgQIECBAgEBcwAAUL1g8AgQIECBAgAABAgQIECBAgIAByA8QIECAAAECBAgQIECAAAECBOICBqB4weIRIECAAAECBAgQIECAAAECBAxAfoAAAQIECBAgQIAAAQIECBAgEBcwAMULFo8AAQIECBAgQIAAAQIECBAgYADyAwQIECBAgAABAgQIECBAgACBuIABKF6weAQIECBAgAABAgQIECBAgAABA5AfIECAAAECBAgQIECAAAECBAjEBQxA8YLFI0CAAAECBAgQIECAAAECBAgYgPwAAQIECBAgQIAAAQIECBAgQCAuYACKFyweAQIECBAgQIAAAQIECBAgQMAA5AcIECBAgAABAgQIECBAgAABAnEBA1C8YPEIECBAgAABAgQIECBAgAABAgYgP0CAAAECBAgQIECAAAECBAgQiAsYgOIFi0eAAAECBAgQIECAAAECBAgQMAD5AQIECBAgQIAAAQIECBAgQIBAXMAAFC9YPAIECBAgQIAAAQIECBAgQICAAcgPECBAgAABAgQIECBAgAABAgTiAgageMHiESBAgAABAgQIECBAgAABAgQMQH6AAAECBAgQIECAAAECBAgQIBAXMADFCxaPAAECBAgQIECAAAECBAgQIGAA8gMECBAgQIAAAQIECBAgQIAAgbiAAShesHgECBAgQIAAAQIECBAgQIAAAQOQHyBAgAABAgQIECBAgAABAgQIxAUMQPGCxSNAgAABAgQIECBAgAABAgQIGID8AAECBAgQIECAAAECBAgQIEAgLmAAihcsHgECBAgQIECAAAECBAgQIEDAAOQHCBAgQIAAAQIECBAgQIAAAQJxAQNQvGDxCBAgQIAAAQIECBAgQIAAAQIGID9AgAABAgQIECBAgAABAgQIEIgLGIDiBYtHgAABAgQIECBAgAABAgQIEDAA+QECBAgQIECAAAECBAgQIECAQFzAABQvWDwCBAgQIECAAAECBAgQIECAgAHIDxAgQIAAAQIECBAgQIAAAQIE4gIGoHjB4hEgQIAAAQIECBAgQIAAAQIEDEB+gAABAgQIECBAgAABAgQIECAQFzAAxQsWjwABAgQIECBAgAABAgQIECBgAPIDBAgQIECAAAECBAgQIECAAIG4gAEoXrB4BAgQIECAAAECBAgQIECAAAEDkB8gQIAAAQIECBAgQIAAAQIECMQFDEDxgsUjQIAAAQIECBAgQIAAAQIECBiA/AABAgQIECBAgAABAgQIECBAIC5gAIoXLB4BAgQIECBAgAABAgQIECBAwADkBwgQIECAAAECBAgQIECAAAECcQEDULxg8QgQIECAAAECBAgQIECAAAECBiA/QIAAAQIECBAgQIAAAQIECBCICxiA4gWLR4AAAQIECBAgQIAAAQIECBAwAPkBAgQIECBAgAABAgQIECBAgEBcwAAUL1g8AgQIECBAgAABAgQIECBAgIAByA8QIECAAAECBAgQIECAAAECBOICBqB4weIRIECAAAECBAgQIECAAAECBAxAfoAAAQIECBAgQIAAAQIECBAgEBcwAMULFo8AAQIECBAgQIAAAQIECBAgYADyAwQIECBAgAABAgQIECBAgACBuIABKF6weAQIECBAgAABAgQIECBAgAABA5AfIECAAAECBAgQIECAAAECBAjEBQxA8YLFI0CAAAECBAgQIECAAAECBAgYgPwAAQIECBAgQIAAAQIECBAgQCAuYACKFyweAQIECBAgQIAAAQIECBAgQMAA5AcIECBAgAABAgQIECBAgAABAnEBA1C8YPEIECBAgAABAgQIECBAgAABAgYgP0CAAAECBAgQIECAAAECBAgQiAsYgOIFi0eAAAECBAgQIECAAAECBAgQMAD5AQIECBAgQIAAAQIECBAgQIBAXMAAFC9YPAIECBAgQIAAAQIECBAgQICAAcgPECBAgAABAgQIECBAgAABAgTiAgageMHiESBAgAABAgQIECBAgAABAgQMQH6AAAECBAgQIECAAAECBAgQIBAXMADFCxaPAAECBAgQIECAAAECBAgQIGAA8gMECBAgQIAAAQIECBAgQIAAgbiAAShesHgECBAgQIAAAQIECBAgQIAAAQOQHyBAgAABAgQIECBAgAABAgQIxAUMQPGCxSNAgAABAgQIECBAgAABAgQIGID8AAECBAgQIECAAAECBAgQIEAgLmAAihcsHgECBAgQIECAAAECBAgQIEDAAOQHCBAgQIAAAQIECBAgQIAAAQJxAQNQvGDxCBAgQIAAAQIECBAgQIAAAQIGID9AgAABAgQIECBAgAABAgQIEIgLGIDiBYtHgAABAgQIECBAgAABAgQIEDAA+QECBAgQIECAAAECBAgQIECAQFzAABQvWDwCBAgQIECAAAECBAgQIECAgAHIDxAgQIAAAQIECBAgQIAAAQIE4gIGoHjB4hEgQIAAAQIECBAgQIAAAQIEDEB+gAABAgQIECBAgAABAgQIECAQFzAAxQsWjwABAgQIECBAgAABAgQIECBgAPIDBAgQIECAAAECBAgQIECAAIG4gAEoXrB4BAgQIECAAAECBAgQIECAAAEDkB8gQIAAAQIECBAgQIAAAQIECMQFDEDxgsUjQIAAAQIECBAgQIAAAQIECBiA/AABAgQIECBAgAABAgQIECBAIC5gAIoXLB4BAgQIECBAgAABAgQIECBAwADkBwgQIECAAAECBAgQIECAAAECcQEDULxg8QgQIECAAAECBAgQIECAAAECBiA/QIAAAQIECBAgQIAAAQIECBCICxiA4gWLR4AAAQIECBAgQIAAAQIECBAwAPkBAgQIECBAgAABAgQIECBAgEBcwAAUL1g8AgQIECBAgAABAgQIECBAgIAByA8QIECAAAECBAgQIECAAAECBOICBqB4weIRIECAAAECBAgQIECAAAECBAxAfoAAAQIECBAgQIAAAQIECBAgEBcwAMULFo8AAQIECBAgQIAAAQIECBAgYADyAwQIECBAgAABAgQIECBAgACBuIABKF6weAQIECBAgAABAgQIECBAgAABA5AfIECAAAECBAgQIECAAAECBAjEBQxA8YLFI0CAAAECBAgQIECAAAECBAgYgPwAAQIECBAgQIAAAQIECBAgQCAuYACKFyweAQIECBAgQIAAAQIECBAgQMAA5AcIECBAgAABAgQIECBAgAABAnEBA1C8YPEIECBAgAABAgQIECBAgAABAgYgP0CAAAECBAgQIECAAAECBAgQiAsYgOIFi0eAAAECBAgQIECAAAECBAgQMAD5AQIECBAgQIAAAQIECBAgQIBAXMAAFC9YPAIECBAgQIAAAQIECBAgQICAAcgPECBAgAABAgQIECBAgAABAgTiAgageMHiESBAgAABAgQIECBAgAABAgQMQH6AAAECBAgQIECAAAECBAgQIBAXMADFCxaPAAECBAgQIECAAAECBAgQIGAA8gMECBAgQIAAAQIECBAgQIAAgbiAAShesHgECBAgQIAAAQIECBAgQIAAAQOQHyBAgAABAgQIECBAgAABAgQIxAUMQPGCxSNAgAABAgQIECBAgAABAgQIGID8AAECBAgQIECAAAECBAgQIEAgLmAAihcsHgECBAgQIECAAAECBAgQIEDAAOQHCBAgQIAAAQIECBAgQIAAAQJxAQNQvGDxCBAgQIAAAQIECBAgQIAAAQIGID9AgAABAgQIECBAgAABAgQIEIgLGIDiBYtHgAABAgQIECBAgAABAgQIEDAA+QECBAgQIECAAAECBAgQIECAQFzAABQvWDwCBAgQIECAAAECBAgQIECAgAHIDxAgQIAAAQIECBAgQIAAAQIE4gIGoHjB4hEgQIAAAQIECBAgQIAAAQIEDEB+gAABAgQIECBAgAABAgQIECAQFzAAxQsWjwABAgQIECBAgAABAgQIECBgAPIDBAgQIECAAAECBAgQIECAAIG4gAEoXrB4BAgQIECAAAECBAgQIECAAAEDkB8gQIAAAQIECBAgQIAAAQIECMQFDEDxgsUjQIAAAQIECBAgQIAAAQIECBiA/AABAgQIECBAgAABAgQIECBAIC5gAIoXLB4BAgQIECBAgAABAgQIECBAwADkBwgQIECAAAECBAgQIECAAAECcQEDULxg8QgQIECAAAECBAgQIECAAAECBiA/QIAAAQIECBAgQIAAAQIECBCICxiA4gWLR4AAAQIECBAgQIAAAQIECBAwAPkBAgQIECBAgAABAgQIECBAgEBcwAAUL1g8AgQIECBAgAABAgQIECBAgIAByA8QIECAAAECBAgQIECAAAECBOICBqB4weIRIECAAAECBAgQIECAAAECBAxAfoAAAQIECBAgQIAAAQIECBAgEBcwAMULFo8AAQIECBAgQIAAAQIECBAgYADyAwQIECBAgAABAgQIECBAgACBuIABKF6weAQIECBAgAABAgQIECBAgAABA5AfIECAAAECBAgQIECAAAECBAjEBQxA8YLFI0CAAAECBAgQIECAAAECBAgYgPwAAQIECBAgQIAAAQIECBAgQCAuYACKFyweAQIECBAgQIAAAQIECBAgQMAA5AcIECBAgAABAgQIECBAgAABAnEBA1C8YPEIECBAgAABAgQIECBAgAABAgYgP0CAAAECBAgQIECAAAECBAgQiAsYgOIFi0eAAAECBAgQIECAAAECBAgQMAD5AQIECBAgQIAAAQIECBAgQIBAXMAAFC9YPAIECBAgQIAAAQIECBAgQICAAcgPECBAgAABAgQIECBAgAABAgTiAgageMHiESBAgAABAgQIECBAgAABAgQMQH6AAAECBAgQIECAAAECBAgQIBAXMADFCxaPAAECBAgQIECAAAECBAgQIGAA8gMECBAgQIAAAQIECBAgQIAAgbiAAShesHgECBAgQIAAAQIECBAgQIAAAQOQHyBAgAABAgQIECBAgAABAgQIxAUMQPGCxSNAgAABAgQIECBAgAABAgQIGID8AAECBAgQIECAAAECBAgQIEAgLmAAihcsHgECBAgQIECAAAECBAgQIEDAAOQHCBAgQIAAAQIECBAgQIAAAQJxAQNQvGDxCBAgQIAAAQIECBAgQIAAAQIGID9AgAABAgQIECBAgAABAgQIEIgLGIDiBYtHgAABAgQIECBAgAABAgQIEDAA+QECBAgQIECAAAECBAgQIECAQFzAABQvWDwCBAgQIECAAAECBAgQIECAgAHIDxAgQIAAAQIECBAgQIAAAQIE4gIGoHjB4hEgQIAAAQIECBAgQIAAAQIEDEB+gAABAgQIECBAgAABAgQIECAQFzAAxQsWjwABAgQIECBAgAABAgQIECBgAPIDBAgQIECAAAECBAgQIECAAIG4gAEoXrB4BAgQIECAAAECBAgQIECAAAEDkB8gQIAAAQIECBAgQIAAAQIECMQFDEDxgsUjQIAAAQIECBAgQIAAAQIECBiA/AABAgQIECBAgAABAgQIECBAIC5gAIoXLB4BAgQIECBAgAABAgQIECBAwADkBwgQIECAAAECBAgQIECAAAECcQEDULxg8QgQIECAAAECBAgQIECAAAECBiA/QIAAAQIECBAgQIAAAQIECBCICxiA4gWLR4AAAQIECBAgQIAAAQIECBAwAPkBAgQIECBAgAABAgQIECBAgEBcwAAUL1g8AgQIECBAgAABAgQIECBAgIAByA8QIECAAAECBAgQIECAAAECBOICBqB4weIRIECAAAECBAgQIECAAAECBAxAfoAAAQIECBAgQIAAAQIECBAgEBcwAMULFo8AAQIECBAgQIAAAQIECBAgYADyAwQIECBAgAABAgQIECBAgACBuIABKF6weAQIECBAgAABAgQIECBAgAABA5AfIECAAAECBAgQIECAAAECBAjEBQxA8YLFI0CAAAECBAgQIECAAAECBAgYgPwAAQIECBAgQIAAAQIECBAgQCAuYACKFyweAQIECBAgQIAAAQIECBAgQMAA5AcIECBAgAABAgQIECBAgAABAnEBA1C8YPEIECBAgAABAgQIECBAgAABAgYgP0CAAAECBAgQIECAAAECBAgQiAsYgOIFi0eAAAECBAgQIECAAAECBAgQMAD5AQIECBAgQIAAAQIECBAgQIBAXMAAFC9YPAIECBAgQIAAAQIECBAgQICAAcgPECBAgAABAgQIECBAgAABAgTiAgageMHiESBAgAABAgQIECBAgAABAgQMQH6AAAECBAgQIECAAAECBAgQIBAXMADFCxaPAAECBAgQIECAAAECBAgQIGAA8gMECBAgQIAAAQIECBAgQIAAgbiAAShesHgECBAgQIAAAQIECBAgQIAAAQOQHyBAgAABAgQIECBAgAABAgQIxAUMQPGCxSNAgAABAgQIECBAgAABAgQIGID8AAECBAgQIECAAAECBAgQIEAgLmAAihcsHgECBAgQIECAAAECBAgQIEDAAOQHCBAgQIAAAQIECBAgQIAAAQJxAQNQvGDxCBAgQIAAAQIECBAgQIAAAQIGID9AgAABAgQIECBAgAABAgQIEIgLGIDiBYtHgAABAgQIECBAgAABAgQIEDAA+QECBAgQIECAAAECBAgQIECAQFzAABQvWDwCBAgQIECAAAECBAgQIECAgAHIDxAgQIAAAQIECBAgQIAAAQIE4gIGoHjB4hEgQIAAAQIECBAgQIAAAQIEDEB+gAABAgQIECBAgAABAgQIECAQFzAAxQsWjwABAgQIECBAgAABAgQIECBgAPIDBAgQIECAAAECBAgQIECAAIG4gAEoXrB4BAgQIECAAAECBAgQIECAAAEDkB8gQIAAAQIECBAgQIAAAQIECMQFDEDxgsUjQIAAAQIECBAgQIAAAQIECBiA/AABAgQIECBAgAABAgQIECBAIC5gAIoXLB4BAgQIECBAgAABAgQIECBAwADkBwgQIECAAAECBAgQIECAAAECcQEDULxg8QgQIECAAAECBAgQIECAAAECBiA/QIAAAQIECBAgQIAAAQIECBCICxiA4gWLR4AAAQIECBAgQIAAAQIECBAwAPkBAgQIECBAgAABAgQIECBAgEBcwAAUL1g8AgQIECBAgAABAgQIECBAgIAByA8QIECAAAECBAgQIECAAAECBOICBqB4weIRIECAAAECBAgQIECAAAECBAxAfoAAAQIECBAgQIAAAQIECBAgEBcwAMULFo8AAQIECBAgQIAAAQIECBAgYADyAwQIECBAgAABAgQIECBAgACBuIABKF6weAQIECBAgAABAgQIECBAgAABA5AfIECAAAECBAgQIECAAAECBAjEBQxA8YLFI0CAAAECBAgQIECAAAECBAgYgPwAAQIECBAgQIAAAQIECBAgQCAuYACKFyweAQIECBAgQIAAAQIECBAgQMAA5AcIECBAgAABAgQIECBAgAABAnEBA1C8YPEIECBAgAABAgQIECBAgAABAgYgP0CAAAECBAgQIECAAAECBAgQiAsYgOIFi0eAAAECBAgQIECAAAECBAgQMAD5AQIECBAgQIAAAQIECBAgQIBAXMAAFC9YPAIECBAgQIAAAQIECBAgQICAAcgPECBAgAABAgQIECBAgAABAgTiAgageMHiESBAgAABAgQIECBAgAABAgQMQH6AAAECBAgQIECAAAECBAgQIBAXMADFCxaPAAECBAgQIECAAAECBAgQIGAA8gMECBAgQIAAAQIECBAgQIAAgbiAAShesHgECBAgQIAAAQIECBAgQIAAAQOQHyBAgAABAgQIECBAgAABAgQIxAUMQPGCxSNAgAABAgQIECBAgAABAgQIGID8AAECBAgQIECAAAECBAgQIEAgLmAAihcsHgECBAgQIECAAAECBAgQIEDAAOQHCBAgQIAAAQIECBAgQIAAAQJxAQNQvGDxCBAgQIAAAQIECBAgQIAAAQIGID9AgAABAgQIECBAgAABAgQIEIgLGIDiBYtHgAABAgQIECBAgAABAgQIEDAA+QECBAgQIECAAAECBAgQIECAQFzAABQvWDwCBAgQIECAAAECBAgQIECAgAHIDxAgQIAAAQIECBAgQIAAAQIE4gIGoHjB4hEgQIAAAQIECBAgQIAAAQIEDEB+gAABAgQIECBAgAABAgQIECAQFzAAxQsWjwABAgQIECBAgAABAgQIECBgAPIDBAgQIECAAAECBAgQIECAAIG4gAEoXrB4BAgQIECAAAECBAgQIECAAAEDkB8gQIAAAQIECBAgQIAAAQIECMQFDEDxgsUjQIAAAQIECBAgQIAAAQIECBiA/AABAgQIECBAgAABAgQIECBAIC5gAIoXLB4BAgQIECBAgAABAgQIECBAwADkBwgQIECAAAECBAgQIECAAAECcQEDULxg8QgQIECAAAECBAgQIECAAAECBiA/QIAAAQIECBAgQIAAAQIECBCICxiA4gWLR4AAAQIECBAgQIAAAQIECBAwAPkBAgQIECBAgAABAgQIECBAgEBcwAAUL1g8AgQIECBAgAABAgQIECBAgIAByA8QIECAAAECBAgQIECAAAECBOICBqB4weIRIECAAAECBAgQIECAAAECBAxAfoAAAQIECBAgQIAAAQIECBAgEBcwAMULFo8AAQIECBAgQIAAAQIECBAgYADyAwQIECBAgAABAgQIECBAgACBuIABKF6weAQIECBAgAABAgQIECBAgAABA5AfIECAAAECBAgQIECAAAECBAjEBQxA8YLFI0CAAAECBAgQIECAAAECBAgYgPwAAQIECBAgQIAAAQIECBAgQCAuYACKFyweAQIECBAgQIAAAQIECBAgQMAA5AcIECBAgAABAgQIECBAgAABAnEBA1C8YPEIECBAgAABAgQIECBAgAABAgYgP0CAAAECBAgQIECAAAECBAgQiAsYgOIFi0eAAAECBAgQIECAAAECBAgQMAD5AQIECBAgQIAAAQIECBAgQIBAXMAAFC9YPAIECBAgQIAAAQIECBAgQICAAcgPECBAgAABAgQIECBAgAABAgTiAgageMHiESBAgAABAgQIECBAgAABAgQMQH6AAAECBAgQIECAAAECBAgQIBAXMADFCxaPAAECBAgQIECAAAECBAgQIGAA8gMECBAgQIAAAQIECBAgQIAAgbiAAShesHgECBAgQIAAAQIECBAgQIAAAQOQHyBAgAABAgQIECBAgAABAgQIxAUMQPGCxSNAgAABAgQIECBAgAABAgQIGID8AAECBAgQIECAAAECBAgQIEAgLmAAihcsHgECBAgQIECAAAECBAgQIEDAAOQHCBAgQIAAAQIECBAgQIAAAQJxAQNQvGDxCBAgQIAAAQIECBAgQIAAAQIGID9AgAABAgQIECBAgAABAgQIEIgLGIDiBYtHgAABAgQIECBAgAABAgQIEDAA+QECBAgQIECAAAECBAgQIECAQFzAABQvWDwCBAgQIECAAAECBAgQIECAgAHIDxAgQIAAAQIECBAgQIAAAQIE4gIGoHjB4hEgQIAAAQIECBAgQIAAAQIEDEB+gAABAgQIECBAgAABAgQIECAQFzAAxQsWjwABAgQIECBAgAABAgQIECBgAPIDBAgQIECAAAECBAgQIECAAIG4gAEoXrB4BAgQIECAAAECBAgQIECAAAEDkB8gQIAAAQIECBAgQIAAAQIECMQFDEDxgsUjQIAAAQIECBAgQIAAAQIECBiA/AABAgQIECBAgAABAgQIECBAIC5gAIoXLB4BAgQIECBAgAABAgQIECBAwADkBwgQIECAAAECBAgQIECAAAECcQEDULxg8QgQIECAAAECBAgQIECAAAECBiA/QIAAAQIECBAgQIAAAQIECBCICxiA4gWLR4AAAQIECBAgQIAAAQIECBAwAPkBAgQIECBAgAABAgQIECBAgEBcwAAUL1g8AgQIECBAgAABAgQIECBAgIAByA8QIECAAAECBAgQIECAAAECBOICBqB4weIRIECAAAECBAgQIECAAAECBAxAfoAAAQIECBAgQIAAAQIECBAgEBcwAMULFo8AAQIECBAgQIAAAQIECBAgYADyAwQIECBAgAABAgQIECBAgACBuIABKF6weAQIECBAgAABAgQIECBAgAABA5AfIECAAAECBAgQIECAAAECBAjEBQxA8YLFI0CAAAECBAgQIECAAAECBAgYgPwAAQIECBAgQIAAAQIECBAgQCAuYACKFyweAQIECBAgQIAAAQIECBAgQMAA5AcIECBAgAABAgQIECBAgAABAnEBA1C8YPEIECBAgAABAgQIECBAgAABAgYgP0CAAAECBAgQIECAAAECBAgQiAsYgOIFi0eAAAECBAgQIECAAAECBAgQMAD5AQIECBBUx0j7AAAYQklEQVQgQIAAAQIECBAgQIBAXMAAFC9YPAIECBAgQIAAAQIECBAgQICAAcgPECBAgAABAgQIECBAgAABAgTiAgageMHiESBAgAABAgQIECBAgAABAgQMQH6AAAECBAgQIECAAAECBAgQIBAXMADFCxaPAAECBAgQIECAAAECBAgQIGAA8gMECBAgQIAAAQIECBAgQIAAgbiAAShesHgECBAgQIAAAQIECBAgQIAAAQOQHyBAgAABAgQIECBAgAABAgQIxAUMQPGCxSNAgAABAgQIECBAgAABAgQIGID8AAECBAgQIECAAAECBAgQIEAgLmAAihcsHgECBAgQIECAAAECBAgQIEDAAOQHCBAgQIAAAQIECBAgQIAAAQJxAQNQvGDxCBAgQIAAAQIECBAgQIAAAQIGID9AgAABAgQIECBAgAABAgQIEIgLGIDiBYtHgAABAgQIECBAgAABAgQIEDAA+QECBAgQIECAAAECBAgQIECAQFzAABQvWDwCBAgQIECAAAECBAgQIECAgAHIDxAgQIAAAQIECBAgQIAAAQIE4gIGoHjB4hEgQIAAAQIECBAgQIAAAQIEDEB+gAABAgQIECBAgAABAgQIECAQFzAAxQsWjwABAgQIECBAgAABAgQIECBgAPIDBAgQIECAAAECBAgQIECAAIG4gAEoXrB4BAgQIECAAAECBAgQIECAAAEDkB8gQIAAAQIECBAgQIAAAQIECMQFDEDxgsUjQIAAAQIECBAgQIAAAQIECBiA/AABAgQIECBAgAABAgQIECBAIC5gAIoXLB4BAgQIECBAgAABAgQIECBAwADkBwgQIECAAAECBAgQIECAAAECcQEDULxg8QgQIECAAAECBAgQIECAAAECBiA/QIAAAQIECBAgQIAAAQIECBCICxiA4gWLR4AAAQIECBAgQIAAAQIECBAwAPkBAgQIECBAgAABAgQIECBAgEBcwAAUL1g8AgQIECBAgAABAgQIECBAgIAByA8QIECAAAECBAgQIECAAAECBOICBqB4weIRIECAAAECBAgQIECAAAECBAxAfoAAAQIECBAgQIAAAQIECBAgEBcwAMULFo8AAQIECBAgQIAAAQIECBAgYADyAwQIECBAgAABAgQIECBAgACBuIABKF6weAQIECBAgAABAgQIECBAgAABA5AfIECAAAECBAgQIECAAAECBAjEBQxA8YLFI0CAAAECBAgQIECAAAECBAgYgPwAAQIECBAgQIAAAQIECBAgQCAuYACKFyweAQIECBAgQIAAAQIECBAgQMAA5AcIECBAgAABAgQIECBAgAABAnEBA1C8YPEIECBAgAABAgQIECBAgAABAgYgP0CAAAECBAgQIECAAAECBAgQiAsYgOIFi0eAAAECBAgQIECAAAECBAgQMAD5AQIECBAgQIAAAQIECBAgQIBAXMAAFC9YPAIECBAgQIAAAQIECBAgQICAAcgPECBAgAABAgQIECBAgAABAgTiAgageMHiESBAgAABAgQIECBAgAABAgQMQH6AAAECBAgQIECAAAECBAgQIBAXMADFCxaPAAECBAgQIECAAAECBAgQIGAA8gMECBAgQIAAAQIECBAgQIAAgbiAAShesHgECBAgQIAAAQIECBAgQIAAAQOQHyBAgAABAgQIECBAgAABAgQIxAUMQPGCxSNAgAABAgQIECBAgAABAgQIGID8AAECBAgQIECAAAECBAgQIEAgLmAAihcsHgECBAgQIECAAAECBAgQIEDAAOQHCBAgQIAAAQIECBAgQIAAAQJxAQNQvGDxCBAgQIAAAQIECBAgQIAAAQIGID9AgAABAgQIECBAgAABAgQIEIgLGIDiBYtHgAABAgQIECBAgAABAgQIEDAA+QECBAgQIECAAAECBAgQIECAQFzAABQvWDwCBAgQIECAAAECBAgQIECAgAHIDxAgQIAAAQIECBAgQIAAAQIE4gIGoHjB4hEgQIAAAQIECBAgQIAAAQIEDEB+gAABAgQIECBAgAABAgQIECAQFzAAxQsWjwABAgQIECBAgAABAgQIECBgAPIDBAgQIECAAAECBAgQIECAAIG4gAEoXrB4BAgQIECAAAECBAgQIECAAAEDkB8gQIAAAQIECBAgQIAAAQIECMQFDEDxgsUjQIAAAQIECBAgQIAAAQIECBiA/AABAgQIECBAgAABAgQIECBAIC5gAIoXLB4BAgQIECBAgAABAgQIECBAwADkBwgQIECAAAECBAgQIECAAAECcQEDULxg8QgQIECAAAECBAgQIECAAAECBiA/QIAAAQIECBAgQIAAAQIECBCICxiA4gWLR4AAAQIECBAgQIAAAQIECBAwAPkBAgQIECBAgAABAgQIECBAgEBcwAAUL1g8AgQIECBAgAABAgQIECBAgIAByA8QIECAAAECBAgQIECAAAECBOICBqB4weIRIECAAAECBAgQIECAAAECBAxAfoAAAQIECBAgQIAAAQIECBAgEBcwAMULFo8AAQIECBAgQIAAAQIECBAgYADyAwQIECBAgAABAgQIECBAgACBuIABKF6weAQIECBAgAABAgQIECBAgAABA5AfIECAAAECBAgQIECAAAECBAjEBQxA8YLFI0CAAAECBAgQIECAAAECBAgYgPwAAQIECBAgQIAAAQIECBAgQCAuYACKFyweAQIECBAgQIAAAQIECBAgQMAA5AcIECBAgAABAgQIECBAgAABAnEBA1C8YPEIECBAgAABAgQIECBAgAABAgYgP0CAAAECBAgQIECAAAECBAgQiAsYgOIFi0eAAAECBAgQIECAAAECBAgQMAD5AQIECBAgQIAAAQIECBAgQIBAXMAAFC9YPAIECBAgQIAAAQIECBAgQICAAcgPECBAgAABAgQIECBAgAABAgTiAgageMHiESBAgAABAgQIECBAgAABAgQMQH6AAAECBAgQIECAAAECBAgQIBAXMADFCxaPAAECBAgQIECAAAECBAgQIGAA8gMECBAgQIAAAQIECBAgQIAAgbiAAShesHgECBAgQIAAAQIECBAgQIAAAQOQHyBAgAABAgQIECBAgAABAgQIxAUMQPGCxSNAgAABAgQIECBAgAABAgQIGID8AAECBAgQIECAAAECBAgQIEAgLmAAihcsHgECBAgQIECAAAECBAgQIEDAAOQHCBAgQIAAAQIECBAgQIAAAQJxAQNQvGDxCBAgQIAAAQIECBAgQIAAAQIGID9AgAABAgQIECBAgAABAgQIEIgLGIDiBYtHgAABAgQIECBAgAABAgQIEDAA+QECBAgQIECAAAECBAgQIECAQFzAABQvWDwCBAgQIECAAAECBAgQIECAgAHIDxAgQIAAAQIECBAgQIAAAQIE4gIGoHjB4hEgQIAAAQIECBAgQIAAAQIEDEB+gAABAgQIECBAgAABAgQIECAQFzAAxQsWjwABAgQIECBAgAABAgQIECBgAPIDBAgQIECAAAECBAgQIECAAIG4gAEoXrB4BAgQIECAAAECBAgQIECAAAEDkB8gQIAAAQIECBAgQIAAAQIECMQFDEDxgsUjQIAAAQIECBAgQIAAAQIECBiA/AABAgQIECBAgAABAgQIECBAIC5gAIoXLB4BAgQIECBAgAABAgQIECBAwADkBwgQIECAAAECBAgQIECAAAECcQEDULxg8QgQIECAAAECBAgQIECAAAECBiA/QIAAAQIECBAgQIAAAQIECBCICxiA4gWLR4AAAQIECBAgQIAAAQIECBAwAPkBAgQIECBAgAABAgQIECBAgEBcwAAUL1g8AgQIECBAgAABAgQIECBAgIAByA8QIECAAAECBAgQIECAAAECBOICBqB4weIRIECAAAECBAgQIECAAAECBAxAfoAAAQIECBAgQIAAAQIECBAgEBcwAMULFo8AAQIECBAgQIAAAQIECBAgYADyAwQIECBAgAABAgQIECBAgACBuIABKF6weAQIECBAgAABAgQIECBAgAABA5AfIECAAAECBAgQIECAAAECBAjEBQxA8YLFI0CAAAECBAgQIECAAAECBAgYgPwAAQIECBAgQIAAAQIECBAgQCAuYACKFyweAQIECBAgQIAAAQIECBAgQMAA5AcIECBAgAABAgQIECBAgAABAnEBA1C8YPEIECBAgAABAgQIECBAgAABAgYgP0CAAAECBAgQIECAAAECBAgQiAsYgOIFi0eAAAECBAgQIECAAAECBAgQMAD5AQIECBAgQIAAAQIECBAgQIBAXMAAFC9YPAIECBAgQIAAAQIECBAgQICAAcgPECBAgAABAgQIECBAgAABAgTiAgageMHiESBAgAABAgQIECBAgAABAgQMQH6AAAECBAgQIECAAAECBAgQIBAXMADFCxaPAAECBAgQIECAAAECBAgQIGAA8gMECBAgQIAAAQIECBAgQIAAgbiAAShesHgECBAgQIAAAQIECBAgQIAAAQOQHyBAgAABAgQIECBAgAABAgQIxAUMQPGCxSNAgAABAgQIECBAgAABAgQIGID8AAECBAgQIECAAAECBAgQIEAgLmAAihcsHgECBAgQIECAAAECBAgQIEDAAOQHCBAgQIAAAQIECBAgQIAAAQJxAQNQvGDxCBAgQIAAAQIECBAgQIAAAQIGID9AgAABAgQIECBAgAABAgQIEIgLGIDiBYtHgAABAgQIECBAgAABAgQIEDAA+QECBAgQIECAAAECBAgQIECAQFzAABQvWDwCBAgQIECAAAECBAgQIECAgAHIDxAgQIAAAQIECBAgQIAAAQIE4gIGoHjB4hEgQIAAAQIECBAgQIAAAQIEDEB+gAABAgQIECBAgAABAgQIECAQFzAAxQsWjwABAgQIECBAgAABAgQIECBgAPIDBAgQIECAAAECBAgQIECAAIG4gAEoXrB4BAgQIECAAAECBAgQIECAAAEDkB8gQIAAAQIECBAgQIAAAQIECMQFDEDxgsUjQIAAAQIECBAgQIAAAQIECBiA/AABAgQIECBAgAABAgQIECBAIC5gAIoXLB4BAgQIECBAgAABAgQIECBAwADkBwgQIECAAAECBAgQIECAAAECcQEDULxg8QgQIECAAAECBAgQIECAAAECBiA/QIAAAQIECBAgQIAAAQIECBCICxiA4gWLR4AAAQIECBAgQIAAAQIECBAwAPkBAgQIECBAgAABAgQIECBAgEBcwAAUL1g8AgQIECBAgAABAgQIECBAgIAByA8QIECAAAECBAgQIECAAAECBOICBqB4weIRIECAAAECBAgQIECAAAECBAxAfoAAAQIECBAgQIAAAQIECBAgEBcwAMULFo8AAQIECBAgQIAAAQIECBAgYADyAwQIECBAgAABAgQIECBAgACBuIABKF6weAQIECBAgAABAgQIECBAgAABA5AfIECAAAECBAgQIECAAAECBAjEBQxA8YLFI0CAAAECBAgQIECAAAECBAgYgPwAAQIECBAgQIAAAQIECBAgQCAuYACKFyweAQIECBAgQIAAAQIECBAgQMAA5AcIECBAgAABAgQIECBAgAABAnEBA1C8YPEIECBAgAABAgQIECBAgAABAgYgP0CAAAECBAgQIECAAAECBAgQiAsYgOIFi0eAAAECBAgQIECAAAECBAgQMAD5AQIECBAgQIAAAQIECBAgQIBAXMAAFC9YPAIECBAgQIAAAQIECBAgQICAAcgPECBAgAABAgQIECBAgAABAgTiAgageMHiESBAgAABAgQIECBAgAABAgQMQH6AAAECBAgQIECAAAECBAgQIBAXMADFCxaPAAECBAgQIECAAAECBAgQIGAA8gMECBAgQIAAAQIECBAgQIAAgbiAAShesHgECBAgQIAAAQIECBAgQIAAAQOQHyBAgAABAgQIECBAgAABAgQIxAUMQPGCxSNAgAABAgQIECBAgAABAgQIGID8AAECBAgQIECAAAECBAgQIEAgLmAAihcsHgECBAgQIECAAAECBAgQIEDAAOQHCBAgQIAAAQIECBAgQIAAAQJxAQNQvGDxCBAgQIAAAQIECBAgQIAAAQIGID9AgAABAgQIECBAgAABAgQIEIgLGIDiBYtHgAABAgQIECBAgAABAgQIEDAA+QECBAgQIECAAAECBAgQIECAQFzAABQvWDwCBAgQIECAAAECBAgQIECAgAHIDxAgQIAAAQIECBAgQIAAAQIE4gIGoHjB4hEgQIAAAQIECBAgQIAAAQIEDEB+gAABAgQIECBAgAABAgQIECAQFzAAxQsWjwABAgQIECBAgAABAgQIECBgAPIDBAgQIECAAAECBAgQIECAAIG4gAEoXrB4BAgQIECAAAECBAgQIECAAAEDkB8gQIAAAQIECBAgQIAAAQIECMQFDEDxgsUjQIAAAQIECBAgQIAAAQIECBiA/AABAgQIECBAgAABAgQIECBAIC5gAIoXLB4BAgQIECBAgAABAgQIECBAwADkBwgQIECAAAECBAgQIECAAAECcQEDULxg8QgQIECAAAECBAgQIECAAAECBiA/QIAAAQIECBAgQIAAAQIECBCICxiA4gWLR4AAAQIECBAgQIAAAQIECBAwAPkBAgQIECBAgAABAgQIECBAgEBcwAAUL1g8AgQIECBAgAABAgQIECBAgIAByA8QIECAAAECBAgQIECAAAECBOICBqB4weIRIECAAAECBAgQIECAAAECBAxAfoAAAQIECBAgQIAAAQIECBAgEBcwAMULFo8AAQIECBAgQIAAAQIECBAgYADyAwQIECBAgAABAgQIECBAgACBuIABKF6weAQIECBAgAABAgQIECBAgAABA5AfIECAAAECBAgQIECAAAECBAjEBQxA8YLFI0CAAAECBAgQIECAAAECBAgYgPwAAQIECBAgQIAAAQIECBAgQCAuYACKFyweAQIECBAgQIAAAQIECBAgQMAA5AcIECBAgAABAgQIECBAgAABAnEBA1C8YPEIECBAgAABAgQIECBAgAABAgYgP0CAAAECBAgQIECAAAECBAgQiAsYgOIFi0eAAAECBAgQIECAAAECBAgQMAD5AQIECBAgQIAAAQIECBAgQIBAXMAAFC9YPAIECBAgQIAAAQIECBAgQICAAcgPECBAgAABAgQIECBAgAABAgTiAgageMHiESBAgAABAgQIECBAgAABAgQMQH6AAAECBAgQIECAAAECBAgQIBAXMADFCxaPAAECBAgQIECAAAECBAgQIGAA8gMECBAgQIAAAQIECBAgQIAAgbiAAShesHgECBAgQIAAAQIECBAgQIAAAQOQHyBAgAABAgQIECBAgAABAgQIxAUMQPGCxSNAgAABAgQIECBAgAABAgQIGID8AAECBAgQIECAAAECBAgQIEAgLmAAihcsHgECBAgQIECAAAECBAgQIEDAAOQHCBAgQIAAAQIECBAgQIAAAQJxAQNQvGDxCBAgQIAAAQIECBAgQIAAAQIGID9AgAABAgQIECBAgAABAgQIEIgLGIDiBYtHgAABAgQIECBAgAABAgQIEDAA+QECBAgQIECAAAECBAgQIECAQFzAABQvWDwCBAgQIECAAAECBAgQIECAgAHIDxAgQIAAAQIECBAgQIAAAQIE4gIGoHjB4hEgQIAAAQIECBAgQIAAAQIEDEB+gAABAgQIECBAgAABAgQIECAQFzAAxQsWjwABAgQIECBAgAABAgQIECBgAPIDBAgQIECAAAECBAgQIECAAIG4gAEoXrB4BAgQIECAAAECBAgQIECAAAEDkB8gQIAAAQIECBAgQIAAAQIECMQFDEDxgsUjQIAAAQIECBAgQIAAAQIECBiA/AABAgQIECBAgAABAgQIECBAIC5gAIoXLB4BAgQIECBAgAABAgQIECBAwADkBwgQIECAAAECBAgQIECAAAECcQEDULxg8QgQIECAAAECBAgQIECAAAECBiA/QIAAAQIECBAgQIAAAQIECBCICxiA4gWLR4AAAQIECBAgQIAAAQIECBAwAPkBAgQIECBAgAABAgQIECBAgEBcwAAUL1g8AgQIECBAgAABAgQIECBAgIAByA8QIECAAAECBAgQIECAAAECBOICBqB4weIRIECAAAECBAgQIECAAAECBAxAfoAAAQIECBAgQIAAAQIECBAgEBcwAMULFo8AAQIECBAgQIAAAQIECBAgYADyAwQIECBAgAABAgQIECBAgACBuIABKF6weAQIECBAgAABAgQIECBAgACBBzVHAoktlNiGAAAAAElFTkSuQmCC"
      let dataToUpload = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=";
      const resultCombine = await combineDataAndImg(resultmap,dataToUpload);
      await requestCardimg(resultCombine);
      setmycardlogo(tempimg['front']);
    }
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
  function combineDataAndImg(DataAr,imgsBase64) {
    return new Promise(resolve => {
      DataAr["PHOTO64_1"]=imgsBase64;
      resolve(DataAr);
    });
  }

  async function requestCardimg(dataInput) {
    var date = new Date();
    var dateandtime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let imgfs={};
    await axios
      .post(API_GENCARD_IMG_URL, {
        with_background:true,
        layout_name: layoutName,
        tag: dateandtime,
        input:[dataInput]
      })
      .then((response) => {
         tempimg = JSON.parse(JSON.stringify(response.data.output[0]));
      });
  }
  const currentUser = AuthService.getCurrentUser();

  const onUploadToServer2 = async () => {
    let serverHeader = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const filef = await dataURLtoFile(tempimg['front']);
    const fileb = await dataURLtoFile(tempimg['back']);
    const data = new FormData();

    data.append("ref_id", props.match.params.org+post.results[0].id+currentUser+"_");
    data.append("layout_name", layoutName);
    data.append("img_card_front", filef,  props.match.params.org+post.results[0].id+currentUser+data + "_F.jpg");
    data.append("img_card_back", fileb,  props.match.params.org+post.results[0].id+currentUser+data + "_B.jpg");
    // put file into form data
    axios.patch(
      API_BASE_URL + "/v1/userlist/" + post.results[0].id + "/",
      data,
      serverHeader
    ).then(
      (response) => {
          setIsUpLoading(false);
          setOpen(false);
          setConfirm(true);
      });

  };

  function onGetUserMediaButtonClick() {
    getMedia();
  }




  const switchCamera = async () => {
    const listOfVideoInputs = await this.getListOfVideoInputs();

    // The device has more than one camera
    if (listOfVideoInputs.length > 1) {
      if (this.player.srcObject) {
        this.player.srcObject.getVideoTracks().forEach((track) => {
          track.stop();
        });
      }

      // switch to second camera
      if (this.cameraNumber === 0) {
        this.cameraNumber = 1;
      }
      // switch to first camera
      else if (this.cameraNumber === 1) {
        this.cameraNumber = 0;
      }

      // Restart based on camera input
      this.initializeMedia();
    } else if (listOfVideoInputs.length === 1) {
      alert("The device has only one camera");
    } else {
      alert("The device does not have a camera");
    }
  };

  const getListOfVideoInputs = async () => {
    // Get the details of audio and video output of the device
    const enumerateDevices = await navigator.mediaDevices.enumerateDevices();

    //Filter video outputs (for devices with multiple cameras)
    return enumerateDevices.filter((device) => device.kind === "videoinput");
  };

  async function getMedia() {
    const constraints = { audio: false, video: { facingMode: "user" } }; // use front camera
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const video = document.getElementById('video');
    video.srcObject = stream;
    video.onloadedmetadata = function() {
      video.play();
    };
  }

  const stopCam = () => {
    var videoEl = document.getElementById('video');
    if (videoEl != null) {
      const stream = videoEl.srcObject;
      if (stream != null) {
        const tracks = stream.getTracks();
        tracks.forEach(function(track) {
        track.stop();
        });
        videoEl.srcObject = null;
      }
    }
  }

  async function takepicture() {
    if(istriggeruploadFile === true && isretake === true)
    {
      const canvas = document.getElementById('img');
      const ctx = canvas.getContext('2d');
      const video = document.getElementById('video');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Canvas = await canvas.toDataURL("image/jpeg").split(";base64,")[1];
      let objImg={};

      objImg["image"]=base64Canvas;
      setImage(await canvas.toDataURL("image/jpeg"));
      stopCam();
      setIstriggeruploadFile(false);
      setIsRetakePhoto(true);
    }
    else if (istriggeruploadFile === true && isretake ===false)
    {
      await getMedia();
      setImage(null);
      setIsRetake(true);
      setIsRetakePhoto(false);
    }
    else if (istriggeruploadFile === false && isretake ===true && isretakephoto === true)
    {
      await getMedia();
      setImage(null);
      setIsRetake(true);
      setIsRetakePhoto(false);
    }
    else if(istriggeruploadFile === false && isretake ===false && isretakephoto === true)
    {
      await getMedia();
      setImage(null);
      setIsRetake(true);
      setIsRetakePhoto(false);
    }
    else
     {
     const canvas = document.getElementById('img');
     const ctx = canvas.getContext('2d');
     const video = document.getElementById('video');
     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
     const base64Canvas = await canvas.toDataURL("image/jpeg").split(";base64,")[1];
     let objImg={};

     objImg["image"]=base64Canvas;
     setImage(await canvas.toDataURL("image/jpeg"));
     stopCam();
     setIsRetakePhoto(true);
     }
  }

  return (
    <>
      <div className="bg-gray-700 md:w-auto h-auto rounded-md relative">
        <div ref={ref} id="box" className="bg-black md:w-auto h-auto rounded-md relative" style={{minHeight : (cropheight + 20)+'px' , zoom : autozoom}}>
          {istakephoto &&(
            <>
            <div className="justify-center" style={{textAlign : 'center'}}>
              <video id="video" style={{display: 'inline-block'}}></video>
                <Collapse isOpened={showPreviewTake} high={"auto"}>
                  <canvas id="img"></canvas>
                </Collapse>
            </div>
            </>
          )}
           <canvas  ref={canvasRef} style={{height : '0px'}} />
           <div className="flex justify-center">
          {image ? (
            <>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                restrictPosition={false}
                cropSize={{width: cropwidth, height: cropheight}}
                rotation={rotation}
                style={{containerStyle:{ position: "absolute"},
                mediaStyle: { height: "100%", display: "block" },
                cropAreaStyle: {position: "absolute",opacity:0.5,borderRadius:"40px" }}}
                onRotationChange={setRotation}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                // onCropAreaChange={(croppedAreaPreview) => {
                //   setCroppedAreaPreview(croppedAreaPreview);
                // }}

                />
                {/* {mycardlogo ?(
                  <img id="cover" style={{height:"50%",width: "1014px",margin:"15px"}} className="rounded-lg z-10 pointer-events-none" src={mycardlogo} alt=""/>
                ):null} */}
            </>
          ) : null}
          {/* {mycardlogo ? (
            <div className="absolute bottom-3 right-3 ring-2 ring-gray-900 ring-offset-2 rounded-lg">
              {croppedAreaPreview && <Output croppedArea={croppedAreaPreview} />}
              <img className="absolute bottom-0 right-0 rounded-lg z-40" src={mycardlogo} alt=""/>
            </div>
          ):null} */}

          {mycardlogo ? (
            <img id="cover" style={{margin:"0",position: "absolute",top:"50%",left:"50%",display:"block",transform:"translate(-50%,-50%)",width:cropwidth,height:cropheight}} className="rounded-lg z-10 pointer-events-none" src={mycardlogo} alt=""/>
          ):null}
            </div>
        </div>
        {image ? (
          <div className="flex justify-center pt-5">

            <p className="inline-flex items-center px-3 py-1.5">Zoom x{zoom}</p>
            <input
              type="range"
              min="0"
              step="0.1"
              max="3"
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
            ></input>
            <input
            className="hidden"
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onSelectFile}
          ></input>

            {ischoosephoto && (
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                        triggerFileSelectPopup();
                        getCheckconfigvalue();
                        setIstriggeruploadFile(true);
                        setIsRetake(false);
                        stopCam();
                      }}
            >
              <PhotographIcon className="h-6 w-6" aria-hidden="true" />
            </button>

          )}

            {/* <p>Rotation</p>
            <input
              type="range"
              min="0"
              step="1"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(e.target.value)}
            ></input> */}

          </div>
        ) :
          <div className="flex justify-center pt-5">
            <input
            className="hidden"
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onSelectFile}
          ></input>
            {istakephoto && (
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={takepicture}
            >
              {isretakephoto ? (
                      <div>
                        <span className="relative z-0 inline-flex shadow-sm rounded-md">
                        <CameraIcon className="h-6 w-6" aria-hidden="true" />
                        <p className="self-center">Retake</p>
                        </span>
                      </div>
                    ) : (
                      <CameraIcon className="h-6 w-6" aria-hidden="true" />
                    )}

            </button>
            )
          }
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                        triggerFileSelectPopup();
                        getCheckconfigvalue();
                        setIstriggeruploadFile(true);
                        setIsRetake(false);
                        stopCam();
                      }}
            >
              <PhotographIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        }


        <div className="container-buttons flex justify-center space-x-4 pt-5 pb-2">
             <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  props.history.push({pathname:"Layout",state:{id:layoutName}});
                  window.location.reload();
                }}
              >
                <RewindIcon className="h-6 w-6" aria-hidden="true" />
                Back
              </button>
        {image ? (
            <>
            <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={onDownload}
              >
                Download
              </button>

              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={onUpload}
                disabled={isUploading}
              >
                {isUploading ? (
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
                ) : null}
                Upload
              </button>
            </>
          ) : null}

        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          // initialFocus={cancelButtonRef}
          onClose={(event, reason) => {
            handleClose(event, reason);
        }}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 z-20">
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
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
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
                      {textRemovestatus}
                    </Dialog.Title>
                    <div className="mt-2 relative flex justify-center">
                      <img
                        className="mx-auto w-auto rounded-lg z-10 pointer-events-none"
                        style={{margin:"0",
                        transform:"translate(50%,0%)",
                      }}
                        src={`data:image/jpeg;base64,${uploaded.image}`}
                        alt="org_image"
                      />
                      {mycardlogo ? (
                        <img id="cover"
                        style={{margin:"0",
                        //position: "absolute",
                        // top:"50%",
                        // left:"50%",
                        // display:"block",
                        transform:"translate(-50%,0%)",
                        // width:cropwidth,
                        // height:cropheight
                      }}
                        className="mx-auto w-auto rounded-lg z-10 pointer-events-none" src={mycardlogo} alt=""/>
                      ):null}
                    </div>
                      <p className="text-sm pt-2 text-gray-500">
                        Do you want to upload this picture?
                      </p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    onClick={onUploadToServer}
                    disabled={isUploading}
                  > {isUploading ? (
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
                  ) : null}
                    Upload
                  </button>
                  <button
                    type="button"
                    disabled={isUploading}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={confirm} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setConfirm}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 z-30">
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
                      Upload Successful
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your photo will be reviewed and printed.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => {
                      props.history.push({pathname:"upload",state:{id:layoutName}});
                      //props.history.goBack();
                      window.location.reload();
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
      <Transition.Root show={ChosenPhoto} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={(event, reason) => {
            handleClose(event, reason);
        }}
        >
          <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center Z-10">
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
              <div className="self-center	inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                <button className="absolute right-5 ml-auto bg-gray-100 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-white float-right"
                onClick={() => {
                  setChosenPhoto(false);
                  props.history.push({pathname:"layout",state:{id:layoutName}});
                  window.location.reload();
                }}>
                    <span className="sr-only">View notifications</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <PhotographIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {AutoGetImage ? ("Check your Photo")

                            :"STEP 2: Upload Your Photo"}

                    </Dialog.Title>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">

                      {AutoGetImage ? ("move or resize for your photo.")

                            :"Either Take a Photo or Choose a Photo​."}
                      </p>
                    </div>

                    {AutoGetImage ? (
                      <div className="container-buttons flex justify-center space-x-4 pt-5">
                      <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      onClick={() => {
                        setIschoosephoto(true);
                        setChosenPhoto(false);
                        getCheckconfigvalue();
                      }}>
                         <p className="self-center">
                         OK
                        </p>
                    </button>
                    </div>

                    ):
                    <div className="container-buttons flex justify-center space-x-4 pt-5">
                    {/* <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => {
                      setIstakephoto(true);
                      setChosenPhoto(false);
                      setIschoosephoto(true);
                      getCheckconfigvalue();
                      onGetUserMediaButtonClick();
                    }}>
                       <p className="self-center">
                       Take photo
                      </p>
                  </button> */}
                  <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => {
                    setIschoosephoto(true);
                    setChosenPhoto(false);
                    getCheckconfigvalue();
                    // setmycardlogo(mycard);
                    // MockupCard();
                    triggerFileSelectPopup();

                  }}>
                    {/* <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <PhotographIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                      />
                    </div> */}

                    <p className="self-center">
                      Choose photo
                    </p>
                  </button> </div>}



                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={Removingbg} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={(event, reason) => {
            handleClose(event, reason);
        }}
        >
          <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center Z-10">
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
              <div className="self-center	inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>

                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <PhotographIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                    <div className="inline-flex justify-center">

                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Loading Photo...
                      </div>
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{Removingbgstatus}</p>
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
