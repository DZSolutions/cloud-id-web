import { Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import templateDZ from "../images/templateDZ.jpg";
import templateDZ_Back from "../images/templateDZ_Back.jpg";
import AuthService from "../services/auth.service";
import axios from "axios";
import mergeImages from "merge-images";
import { API_BASE_URL } from "../constrants/apiConstrants";
import Select, { components } from "react-select";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";

export function Upload(props) {
  const [post, setPost] = useState(null);
  const [image, setImage] = useState(templateDZ);
  const [start, setStart] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [print, setPrint] = useState(false);

  const [consoleList, setConsoleList] = useState(null);
  const [printerList, setPrinterList] = useState(null);

  const [selectedOrgUnit, setSelectOrgUnit] = useState(null);
  const [selectedLocation, setSelectLocation] = useState(null);
  const [selectedConsole, setSelectConsole] = useState(null);
  const [selectedPrinter, setSelectPrinter] = useState(null);

  const [confirm, setConfirm] = useState(false);

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

  function togglePrint() {
    setPrint((wasOpened) => !wasOpened);
  }

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

    axios
      .get("http://122.248.202.159/api/consoles/", {
        // crossdomain: true,
        // withCredentials: false,
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        // },
      })
      .then((response) => {
        setConsoleList(response.data);
      });

    axios
      .get("http://122.248.202.159/api/printers/", {
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

  if (post.results[0].photo != null && start === 0) {
    mixImage();
    setStart(1);
  }

  const sendPrint = () => {
    axios
      .post("http://122.248.202.159/api/jobs/", {
        console: selectedConsole.id,
        printer: selectedPrinter.id,
        front_card: image,
        back_card:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAdwB3AAD/4QDARXhpZgAATU0AKgAAAAgABgEaAAUAAAABAAAAVgEbAAUAAAABAAAAXgEoAAMAAAABAAIAAAExAAIAAAARAAAAZgEyAAIAAAAUAAAAeIdpAAQAAAABAAAAjAAAAAAAAAB3AAAAAQAAAHcAAAABcGFpbnQubmV0IDQuMi4xNgAAMjAyMTowMToyNSAxMTo0NTo0OQAAA6ABAAMAAAAB//8AAKACAAQAAAABAAAC5qADAAQAAAABAAACLAAAAAAAAP/hCahodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+DQo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+DQogIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+DQogICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0wMS0yNVQxMTo0MzowMiswNzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wMS0yNVQxMTo0NTo0OSswNzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDEtMjVUMTE6NDU6NDkrMDc6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNkZDRTRFM0M2NUVFQjExQjQ4REQ4NURBOThBNzM1RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBM0ZDRTRFM0M2NUVFQjExQjQ4REQ4NURBOThBNzM1RiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkEzRkNFNEUzQzY1RUVCMTFCNDhERDg1REE5OEE3MzVGIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4NCiAgICAgIDx4bXBNTTpIaXN0b3J5Pg0KICAgICAgICA8cmRmOlNlcT4NCiAgICAgICAgICA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpBM0ZDRTRFM0M2NUVFQjExQjQ4REQ4NURBOThBNzM1RiIgc3RFdnQ6d2hlbj0iMjAyMS0wMS0yNVQxMTo0MzowMiswNzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIC8+DQogICAgICAgICAgPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0RkNFNEUzQzY1RUVCMTFCNDhERDg1REE5OEE3MzVGIiBzdEV2dDp3aGVuPSIyMDIxLTAxLTI1VDExOjQ1OjM0KzA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIgLz4NCiAgICAgICAgICA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6QTVGQ0U0RTNDNjVFRUIxMUI0OEREODVEQTk4QTczNUYiIHN0RXZ0OndoZW49IjIwMjEtMDEtMjVUMTE6NDU6NDkrMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIiAvPg0KICAgICAgICAgIDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9qcGVnIiAvPg0KICAgICAgICAgIDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciIC8+DQogICAgICAgICAgPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOkE2RkNFNEUzQzY1RUVCMTFCNDhERDg1REE5OEE3MzVGIiBzdEV2dDp3aGVuPSIyMDIxLTAxLTI1VDExOjQ1OjQ5KzA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIgLz4NCiAgICAgICAgPC9yZGY6U2VxPg0KICAgICAgPC94bXBNTTpIaXN0b3J5Pg0KICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTVGQ0U0RTNDNjVFRUIxMUI0OEREODVEQTk4QTczNUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTNGQ0U0RTNDNjVFRUIxMUI0OEREODVEQTk4QTczNUYiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBM0ZDRTRFM0M2NUVFQjExQjQ4REQ4NURBOThBNzM1RiIgLz4NCiAgICA8L3JkZjpEZXNjcmlwdGlvbj4NCiAgPC9yZGY6UkRGPg0KPC94OnhtcG1ldGE+DQo8P3hwYWNrZXQgZW5kPSJyIj8+/9sAQwACAQEBAQECAQEBAgICAgIEAwICAgIFBAQDBAYFBgYGBQYGBgcJCAYHCQcGBggLCAkKCgoKCgYICwwLCgwJCgoK/9sAQwECAgICAgIFAwMFCgcGBwoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoK/8AAEQgCFgFUAwEhAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/fZSBw33qyfEHijT9CXZK3mTMuY4UHt1z254/l3oirkx1OR1PxnrupP8t0YEzlVg+XH49f6e1ZTu8jtJIxZmOWZjyT61ppHRFCUcYxii14spd7f1cPxb9KPxb9Kn5h8g/Fv0o/Fv0o+YfIPxb9KPxb9KPmHyD8W/Sj8W/Sj5h8g/Fv0o/Fv0o+YfIPxb9KPxb9KPmHyD8W/Sj8W/Sj5h8g/Fv0o/Fv0o+YfIPxb9KPxb9KPmHyD8W/Sj8W/Sj5h8g/Fv0o/Fv0o+YfIPxb9KPxb9KPmHyD8W/Sj8W/Sj5h8g/Fv0o/Fv0o+YfIPxb9KPxb9KPmHyD8W/Sj8W/Sj5h8gx/L0q1Zavq2m4Syv5o9pJCBjtz7g8fpUcsn8Wo4yjHSW50Hh/4jOWW21yBVGB+/jz1x/EB+PT8sV10M0dxEs8UisrLlWVsgg9MGlHWVhSVtSxRVEmD4m8SR+H7XIQvPL/AKlW6fU/Tr754rz+eea5ma4uJGeR2yzMeSa0UeVByyitRtFABS54rSHLZ37fqils9bf8OhKKz90nXuFFHuh8woo90PmFFHuh8woo90PmFFHuh8woo90PmFFHuh8woo90PmFFHuh8woo90PmFFHuh8woo90PmFFHuh8woo90PmFFHuhr3Cil7wWUd9QODnIHT0re8G+KX0u6TTbuUfZZWO1m48lvXvxn1+vrmJR10Khs7nf29xb3cK3FrOkkbfdkjYMp/EUUEnmnizV21jWpZVl3RRt5cO0jG0d+PXrWbWr3KlpKwUUiQooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooA7zwLqFsfDkMO+XdE7q20HGdxb+RFFccpWk9TVRk1ojg6K7DJtvVhRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAWrDXNV06NrexvGjTfnauOTgc0VHJGWrNPaSjovyKtFWZhRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAIrqxYA/dOG/KigBaKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooARVVSxA+8ct+VFAC0UAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQBHD/rJv+un/ALKKKSGySimIKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigCOH/WTf9dP/ZRRSQ2SUUxBRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUARw/wCsm/66f+yiikhskopiCigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAjh/1k3/XT/wBlFFJDZJRTEFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQBHD/rJv8Arp/7KKKSGySimIKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigCOH/AFk3/XT/ANlFFJDZJRTEFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQBHD/rJv+un/soopIbJKKYgooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKAI4f9ZN/wBdP/ZRRSQ2SUUxBRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFADpLfyUjkz/rl3/Tkr/SikipbjaKZIUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFAE1z/qbf8A64n/ANDaikipb/d+RDRTJCigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAmuf9Tb/9cT/6G1FJFS3+4hopkhRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUATXP+pt/+uJ/9DaikipbkNFMkKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigCa5/1Nv/1xP/obUUkVLchopkhRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUATXP+pt/+uJ/9DaikipbkNFMkKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigCa5/1Nv8A9cT/AOhtRSRUtyGimSFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQBNc/6m3/AOuJ/wDQ2opIqW5DRTJCigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAmuf9Tb/wDXE/8AobUUkVLchopkhRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUATXP8Aqbf/AK4n/wBDaikipbkNFMkKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigCa5/wBTb/8AXE/+htRSRUtyGimSFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQBNc/6m3/64n/0NqKSKluQ0UyQooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKAJrn/U2//XE/+htRSRUtyGimSFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQBNc/6m3/64n/0NqKSKluQ0UyQooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKAJrn/U2/wD1xP8A6G1FJFS3IaKZIUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFAE1z/qbf8A64n/ANDaikipbkNFMkKKACigAooAKKACigAooAKKAML4m/EzwF8Gfh9rHxW+KPii10Tw74f0+S91nVr1iIrS3QZeRsAnAHoCa8y/Zw/4KN/sL/td+KLjwP8As2/tR+EfF2t2tqbmXRtN1IC7MIIDSLDIFd0UkbmUELuGcZGQD2qigDgh+0h8Nj+1A37Igmvf+EwXwEPGBj+y/wCj/wBmm9NlnzM/6zzgflx05z2rvaAPDfj7/wAFLf2DP2XPiCPhT8e/2pPCvhzxItulxcaNdXjST2kLgFJLhYlb7MjBlIaXYCGBHBFezeHfEfh/xfoFj4r8Ja7Z6ppepWkd1pupaddJPb3cEihkljkQlXRlIYMpIIIIOKALlFAHCfAz9ov4b/tDt4yX4cT3kn/CC+O9Q8I699stfK26lZiMzKnJ3oPNTDcZ544ru6ACigAooAKKACigAooAKKACigCa5/1Nv/1xP/obUUkVLchopkhRQAUUAFFABRQAUUAFFABRQB8y/wDBZz/lFP8AH3/smepf+iq+Vb/xd+0jo37X/wCxj8c/21fgL4b8G+DdJuJvCfgXXPAXiptaurvXta0j7LaQai01vavbWskaSsFiSUecE3sF6gGb+3Z+3B8S/wBnq58efHv4Nft4fGLxxrng34kLZN4e0H4Lo3w50i1GqRQS6Df6gNPdTdRQymF7n7cJDOU+SIkRr9EeMdb/AGjf2yv2/vir+zR4B/aq8U/CPwj8F/Cvh13bwPYabJqGuaxq0VzdLPPJf2twBawxQIghRV8xmky/G1QD5Y/4KE/tcfGT9gj/AIKmeEdTm13TNe8Za9+yPpXg+++JOtaO9l4f0bVLrxVHC3iHU4oPN+x2Kyh28sFlEk0MO8KxcfqX8EPAviz4afCbQfA3jv4sap461rT7BU1XxfrNvBDcarcElnmMcCrHEpZiFRR8iBVLMQWIB8mf8EHNH0Hxd+w5qfxr8V2Vre+PviN8SPFV98VL6eNZLi41FNZvLZbeYnJ2R20cKpGflVG4ADGpP25fE+ieB/ijpPwK+Gv7YHxa8BSab4Gt5/D3wj/Zz+EMOsXln/pFxEmqXxTT7vyrAkRQpAfsse6CQ+Y+790AeMWn7a/7dH7TH7D/AOxr4n+F/wC0Da+C/HPxq8eXvh3xf4sXwrbzxywQ2WrRyXQs3GxZv9EFwkYKIJggI2ApXqmtaV+1N4y/bC0X/gmz4b/bo8d6HpPgX4Q/8Jr4l+I1rpulP4k8S3d5rNzbWVrI81m9ukFvHAd7RQKZTtVsZOEBe/4IaeHPHXhD4c/tC+Gvid42j8SeIbP9q/xims+IIrBbVdRuMWRe4EKfLDvJ3eWuVTO0EgA19vUwCigAooAKKACigAooAKKACigCa5/1Nv8A9cT/AOhtRSRUtyGimSFFABRQAUUAFFABRQAUUAFFAHC/tNfs/wDg39qv9n7xh+zf8Q9R1Kz0PxpoNxpOqXWjzRx3UMMq7WaJpEdA46gsjD1Brxf4b/8ABK74deGvHPgrxx8X/wBpb4ufFj/hW99Hf+BdF+IniCyfTdHvYoTDFdpb2FlarLPGjMEebzNm4lcHmgDl/H3/AARS+B/j3wz42+Fg/aP+LujfDzx14ouvEupfDnQ9dsINMh1a4uVupbhXNk1zInnIsgt5ZpIVYZ2HCBPRPjz/AME6/B/xe+O8/wC0t8O/2gfiV8KfGWqeHodC8Uat8N9Ws4Br2nxOzwpcxXdrcR+bFvcR3CKkqKxXcQFAALFz/wAE2/2ctc8c/wDCZePo9a8WQSfA+D4V6ho3ivUBfQahosdz9o864kkQ3Et2z43TGXkgNgON1ehfsy/ATT/2YPghoPwH0T4ieJ/FGm+G7drXSdS8YX0VzfR2gcmG3aWOKPzEhjKxIWUvsRdzMRmgDxHxT/wSg+H/APwtzxV8V/gT+1N8ZvhEvjzVH1Pxx4b+G/iy3t9N1XUJDmW9EV1azm1uJf8AlpLbtGWxng81Z1v/AIJW/DOL4gaT8TPhN+0V8WvAOsWvgWz8H69qHhvxPBPdeIdJtpHkiS6udQtrmdZw7t/pMEkUuGIDAhCoBp/DT/gmH8BPhT8Ofgn8LvDHirxY2mfAfxbe+IPB7XeoQSTXU9yl8jRXbmD97Gov5cbNj/ImWb5t2x+0l+wX4Q/aA+MGi/tD+GPjZ4++GXj7R/D83h9vFfw81K0huNQ0eWZZ2sLhLy2uIpI1lBkRgivHI24N2oA1/wBjL9ij4T/sL+BPEXw8+D+t+JL+x8TeMrzxNqE3inWDf3X265igSY+eyiSQMYA5aQu5d3Jc5AHr9ABRQAUUAFFABRQAUUAFFABRQBNc/wCpt/8Arif/AENqKSKluQ0UyQooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKAJrn/AFNv/wBcT/6G1FJFS3IaKZIUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFAE1z/qbf/rif/Q2opIqW5DRTJCigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAmuf9Tb/9cT/6G1FJFS3IaKZIUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFAE1z/qbf/rif/Q2opIqW5DRTJCigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAmuf9Tb/APXE/wDobUUkVLchopkhRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUATXP+pt/wDrif8A0NqKSKluQ0UyQooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKAJrn/U2/8A1xP/AKG1FJFS3IaKZIUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFAE1z/AKm3/wCuJ/8AQ2opIqW5DRTJCigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAmuf8AU2//AFxP/obUUkVLchopkhRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUATXP+pt/+uJ/9DaikipbkNFMkKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigCa6/1Fv/1xP/obUUkVLf7iNJQEw9sud2MnPPX3/pS+YP8An2j/AO+j/jWDo1paqpJXe1o//Im0p04WXIn/AOBf5i+Yn/PvH/30f8aaZFIx9nQfif8AGhU5f8/ZfdH/AORJ9pS/kX/k3+Y2iugxCigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKADe7fK3ReF+nX+ZNFBUgHeioju/66ky6f12CirAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAHeioju/66h2/rsFFWAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAIqqpYgfeOW/KigBR3oqI7v+uodv67BRVgFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFAEcP+sm/wCun/soopIbJB3oqY7v+uou39dgoqwCigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigCOH/WTf9dP/ZRRSQ2SDvRUx3f9dRdv67BRVgFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFAEcP+sm/66f+yiikhskHeipju/66i7f12CirAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKAI4f9ZN/10/8AZRRSQ2SDvRUx3f8AXUXb+uwUVYBRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQBHD/rJv+un/ALKKKSGyQd6KmO7/AK6i7f12CirAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKAI4f8AWTf9dP8A2UUUkNkg70VMd3/XUXb+uwUVYBRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQBHD/AKyb/rp/7KKKSGyQd6KmO7/rqLt/XYKKsAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAjh/1k3/AF0/9lFFJDZIO9FTHd/11F2/rsFFWAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUARw/6yb/AK6f+yiikhskHeipju/66i7f12CirAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKAI4f9ZN/10/9lFFJDZIO9FTHd/11F2/rsFFWAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUARw/6yb/rp/7KKKSGyQd6KmO7/rqLt/XYKKsAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAjh/1k3/XT/wBlFFJDZIO9FTHd/wBdRdv67BRVgFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFAEcP+sm/66f8AsooqYfCipfESDvRSju/66k9v67BRVgFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFAEcP+sm/66f+yiipp/CipfESbeyj/PNFEevzCXQKKokKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKAI4s75M/wDPT+goqY/CipfEWLqGO0v5bIybvLkZSduMjkfrj/Co6Uf0CW/zCirJCigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigDU8P+F4tatJL1dSWL98Rt8vdngHPUev6UVhzuOiOn2an7zTL3xG0iWz1ddWTcY7hfmP8AdYDGOnHGMdzhq52rp9jCXwL8QorQkKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKUKXdYo1Znk4VVXLN2+v5d6mUre6VT3uem+H9IGmaPb2LDc0afM27+I8nHtkmiuR0+Z3K5rD9T0+DV7OSyuwdki4bbwfUH6g4x7155rmgX2h3PlXEZ8tn/dyD7rj/2VvryPpyd46NW6Dp2s0+pSUbu9JWxkFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAKocvsjXczHC+vt/nnn8a7HwV4SfT9ur6ou2bGIof7gPc+5/QdfbGcrs0j7sLnW7l9aKozFIzwarX9laXcP2e+hWWNsfI6gjjvQCdtTmNU+GcJDSaTqBjLElY5l3LnPr2AHqCeOtcxq+l3GkXn2O5eNmCg/ISVx+OKzjLmduptrKN3siuSp7UmB71v7xnzBge9GB70e8HMGB70YHvR7wcwYHvRge9HvBzBge9GB70e8HMGB70YHvR7wcwYHvRge9HvBzBge9GB70e8HMGB70YHvR7wcwYHvRge9HvBzBge9GB70e8HMGB70YHvR7wcwYHvRge9HvBzBge9GB70e8HMGB70YHvR7wcwYHvRge9HvBzBge9GB70e8HMGf8AP41vaJ4F1HVrWK+e+hjjkjyGVSWGPbj+dRUlb4tSor3Wzo9B8LaTohW6gRpJGwfNmxkZOOMdMnPPXHHNbo+VOKmO1yZdh1FUSf/Z",
        name: "test",
        status_message: "",
        status: 0,
        status_name: "",
        submitted_by: currentUser,
        card_layout: "",
      })
      .then((response) => {
        setConfirm(true);
      });
  };

  return (
    <>
      <div className="relative mt-12 sm:mt-4 lg:mt-12">
        <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
            {isFront ? (
              <img className="mx-auto" src={image} alt="" />
            ) : (
              <img className="mx-auto" src={templateDZ_Back} alt="" />
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
              <button
                type="button"
                onClick={() => togglePrint(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {print ? "Information" : "Print Card"}
              </button>
            </div>
          </div>
          <div className="lg:col-start-2 md:mt-4 lg:mt-0">
            <div className="shadow overflow-hidden sm:rounded-md">
              {print ? (
                <>
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid gap-6 grid-cols-6">
                      {/* <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium pb-2">
                          Organization Unit
                        </p>
                        <Select
                          menuPortalTarget={document.querySelector("body")}
                          defaultValue={selectedOrgUnit}
                          onChange={setSelectOrgUnit}
                          options={orgUnits}
                          components={{ Input }}
                        />
                      </div>
                      <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium pb-2">
                          Locations
                        </p>
                        <Select
                          menuPortalTarget={document.querySelector("body")}
                          defaultValue={selectedLocation}
                          onChange={setSelectLocation}
                          options={
                            selectedOrgUnit ? selectedOrgUnit.locations : []
                          }
                          components={{ Input }}
                        />
                      </div>
                      <div className="col-span-6">
                        <p className="block text-gray-700 text-sm font-medium pb-2">
                          Consoles
                        </p>
                        <Select
                          menuPortalTarget={document.querySelector("body")}
                          defaultValue={selectedConsole}
                          onChange={setSelectConsole}
                          options={
                            selectedLocation ? selectedLocation.consoles : []
                          }
                          components={{ Input }}
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
                          options={
                            selectedConsole ? selectedConsole.printers : []
                          }
                          components={{ Input }}
                        />
                      </div> */}
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
                  <div className="px-4 py-3 text-center bg-gray-100 sm:px-6">
                    <button
                      type="button"
                      onClick={() => sendPrint()}
                      className="inline-flex justify-center px-4 py-2 text-white text-3xl font-medium bg-blue-600 hover:bg-blue-500 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-blue-500 focus:ring-offset-2 focus:ring-2"
                    >
                      Print Card
                    </button>
                  </div>
                </>
              ) : (
                <>
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
                          value={post.results[0].user.email}
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
                        I agree to the terms and conditions and the privacy
                        policy
                      </label>
                    </div>
                    <Link
                      to={"/" + props.match.params.org + "/CropImage"}
                      className="inline-flex justify-center px-4 py-2 text-white text-3xl font-medium bg-rose-600 hover:bg-rose-500 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-rose-500 focus:ring-offset-2 focus:ring-2"
                    >
                      Upload Photo
                    </Link>
                  </div>
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
    </>
  );
}
