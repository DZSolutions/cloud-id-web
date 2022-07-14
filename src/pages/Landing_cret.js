import { useState, useEffect } from "react";
import templateDZ from "../images/templateDZ.jpg";
import templateDZ_Back from "../images/templateDZ_Back.jpg";
import axios from "axios";
import { API_BASE_URL } from "../constrants/apiConstrants";

export function Landing_cret(props) {
  const [image, setImage] = useState(null);
  const [imageB, setImageBack] = useState(null);
  const [isFront, setIsFront] = useState(true);

  const queryParams = new URLSearchParams(window.location.search);
  //const [token, setToken] = useState(queryParams.get('token'));

  //const [profileID, setProfileID] = useState("22");profile-id
  const [profileID, setProfileID] = useState(queryParams.get('profile-id'));
  const [verify, setVerify] = useState(queryParams.get('verify'));
  const [statusverify, setStatusVerify] = useState("Fail");

  const [token, setToken] = useState("4788576735c2d6999eee711840d73df0d73c906a"); //local admin dz
  // const [token, setToken] = useState("9e993989ceda329fc93aad40a93aaca79379cabf"); //photodev admin dz

  useEffect(async() => {
    //defaultImg();

    // axios
    // .get(API_BASE_URL + "/v1/userlist", {
    //   headers: {
    //     Authorization: `Token ${token}`,
    //   },
    // })
    //   .then(response => {
    //     setImage(response.data.results[0].img_card_front);
    //     setImageBack(response.data.results[0].img_card_back);
    //   })
    //   .catch((error) => {
    //       console.log('error ' + error);
    //   });

      axios
      .get(API_BASE_URL + "/v1/userlist/"+profileID, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then(response => {
          setImage(response.data.img_card_front);
          setImageBack(response.data.img_card_back);
          if(verify ==="true")
          {
            setStatusVerify("Pass");
          }
          else if (verify ==="false")
          {
            setStatusVerify("Fail");
          }
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
      <div className="relative mt-5 sm:mt-4 lg:mt-5">
        <div className="lg:grid lg:grid-flow-row-dense lg:gap-8 lg:items-center">
            {image ?(
            <div className="m-2 relative lg:mt-0 lg:col-start-1">
                {
                  isFront ? (
                    <img className="mx-auto" src={image} alt="" />
                  ) : (
                    <img className="mx-auto" src={imageB} alt="" />
                )}

              <div className="relative text-center">
                <p >Verify: {statusverify}</p>
              </div>

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
            ): (
              <div className="m-5 relative text-center">
                <p >No data</p>

              </div>
            )}
        </div>
      </div>
    </>
  );
}
