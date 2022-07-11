import { useState, useEffect } from "react";
import templateDZ from "../images/templateDZ.jpg";
import templateDZ_Back from "../images/templateDZ_Back.jpg";
import axios from "axios";
import { API_BASE_URL } from "../constrants/apiConstrants";

export function Landing_cret(props) {
  const [image, setImage] = useState(templateDZ);
  const [imageB, setImageBack] = useState(templateDZ_Back);
  const [isFront, setIsFront] = useState(true);

  const queryParams = new URLSearchParams(window.location.search);
  const [token, setToken] = useState(queryParams.get('token'));


  useEffect(async() => {
    defaultImg();

    axios
    .get(API_BASE_URL + "/v1/userlist", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        setImage(response.data.results[0].img_card_front);
        setImageBack(response.data.results[0].img_card_back);
      })
      .catch((error) => {
          console.log('error ' + error);
      });

  }, []);

  const defaultImg = ()=>{

    let im ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    setImage(im);
    setImageBack(im);
  }

  var daatajson ="";

  return (
    <>
      <div className="relative mt-12 sm:mt-4 lg:mt-12">
        <div className="lg:grid lg:grid-flow-row-dense lg:gap-8 lg:items-center">
          <div className="m-5 relative lg:mt-0 lg:col-start-1">
              {
                isFront ? (
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
                  Front
                </button>
                <button
                  type="button"
                  onClick={() => setIsFront(false)}
                  className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Back
                </button>
              </span>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
