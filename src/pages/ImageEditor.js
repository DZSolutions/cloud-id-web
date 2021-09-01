import { useRef, useState } from "react";
import FilerobotImageEditor from "filerobot-image-editor";
export function ImageEditor() {
  const inputRef = useRef();
  const [image, setImage] = useState(null);
  const triggerFileSelectPopup = () => inputRef.current.click();

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
        toggle(true);
      });
    }
  };
  //   const src = "https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg";
  const [show, toggle] = useState(false);
  return (
    <div>
      {image ? (
        <FilerobotImageEditor
          show={show}
          src={image}
          onClose={() => {
            toggle(false);
            inputRef.current.value = null; //Reset Input
          }}
        />
      ) : null}

      <input
        className="hidden"
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onSelectFile}
      ></input>
      <button
        type="button"
        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={triggerFileSelectPopup}
      >
        Choose
      </button>
    </div>
    // <div className="bg-gray-700 px-4 py-5 rounded-md">
    //   <div className="bg-black px-4 py-64 rounded-md relative"></div>
    //   <div className="container-buttons flex justify-center space-x-4 pt-5">
    //     <input
    //       className="hidden"
    //       type="file"
    //       accept="image/*"
    //       ref={inputRef}
    //       onChange={onSelectFile}
    //     ></input>
    //     <button
    //       type="button"
    //       className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //       onClick={triggerFileSelectPopup}
    //     >
    //       Choose
    //     </button>
    //     <button
    //       type="button"
    //       className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //       //   onClick={onDownload}
    //     >
    //       Download
    //     </button>
    //   </div>
    // </div>
  );
}
