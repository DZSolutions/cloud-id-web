import { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { generateDownload } from "./utils/cropImage";
export function ImageCropper() {
  const inputRef = useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const onDownload = () => {
    generateDownload(image, croppedArea);
  };
  return (
    <div className="bg-gray-700 px-4 py-5 rounded-md">
      <div className="bg-black px-4 py-64 rounded-md relative">
        {image ? (
          <>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </>
        ) : null}
      </div>
      {image ? (
        <div className="flex justify-center pt-5">
          <input
            type="range"
            min="1"
            step="0.1"
            max="3"
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          ></input>
        </div>
      ) : null}

      <div className="container-buttons flex justify-center space-x-4 pt-5">
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
        <button
          type="button"
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
}
