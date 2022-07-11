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
  const token = queryParams.get('token');

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

    let im ="data:image/png;base64,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";
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
