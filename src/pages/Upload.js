import {
    Link,
  } from "react-router-dom";
  import {useState, useEffect} from "react";
import templateDZ from "../images/templateDZ.jpg";
import AuthService from "../services/auth.service";
import axios from "axios";
// import mergeImages from 'merge-images';
export function Upload() {
  const currentUser = AuthService.getCurrentUser();
  const accessToken = localStorage.getItem('accessToken');
  const [post, setPost] = useState(null);
  // const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/userlist/?profile_id="+currentUser,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }).then((response) => {
      setPost(response.data);
    })
  }, []);
    
    if (!post) return "No post!"
    // setImage(post.results[0].photo)

    // mergeImages([templateDZ,{src:templateDZ, x:41, y:123 }])
    // .then(b64 => setImage(b64))


    

    return (
      // <div classNameName="px-4 py-6 sm:px-0">
      //   <div classNameName="border-4 border-dashed border-gray-200 rounded-lg h-96" />
      // </div>
      <div className="relative mt-12 sm:mt-4 lg:mt-12">
        <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
            <img className="absolute mx-auto" src={templateDZ} alt="" />
            <img className="relative mx-auto" src={post.results[0].photo} alt="" />
          </div>
          <div className="lg:col-start-2 md:mt-4 lg:mt-0">
            <div className="shadow overflow-hidden sm:rounded-md">
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
                    {console.log(post.results[0])}
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
                  <div className="col-span-6"></div>
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
                    I agree to the terms and conditions and the privacy policy
                  </label>
                </div>
                <Link
                  to="/CropImage"
                  className="inline-flex justify-center px-4 py-2 text-white text-3xl font-medium bg-rose-600 hover:bg-rose-500 border border-transparent rounded-full focus:outline-none shadow-sm focus:ring-rose-500 focus:ring-offset-2 focus:ring-2"
                >
                  Upload Photo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }