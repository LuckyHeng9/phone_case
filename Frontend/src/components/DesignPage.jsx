import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react"; // Import useEffect
import { Rnd } from "react-rnd";
import AspectRatio from "react-aspect-ratio";
import cn from "classnames";
import axios from "axios";
import { base_url } from "../base_url";
import { useNavigate } from "react-router-dom";
import {
  setImageUrl,
  setSelectedTemplate,
  setBackgroundColor,
  setRenderedDimension,
  setRenderedPosition,
  resetDesign,
} from "../redux/slice/casePhoneSlice";

const DesignPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    imageUrl,
    selectedTemplate,
    backgroundColor,
    renderedDimension,
    renderedPosition,
  } = useSelector((state) => state.casePhone);

  const colors = [
    "#f87171",
    "#60a5fa",
    "#34d399",
    "#fbbf24",
    "#a78bfa",
    "#e5e7eb",
  ];

  const templates = [
    { name: "iPhone 13 Pro Max", src: "src/assets/phone-template.png" },
    { name: "Samsung Galaxy S23", src: "src/assets/S23_temp.png" },
    { name: "Google Pixel 7", src: "src/assets/google_pixel-template.png" },
  ];

  const HandleComponent = () => (
    <div
      style={{
        width: "16px",
        height: "16px",
        backgroundColor: "#3490dc",
        borderRadius: "70%",
      }}
    />
  );

  // const [imageLoaded, setImageLoaded] = useState(false); // Track image load state
  // const [imageWidth, setImageWidth] = useState(150);
  // const [imageHeight, setImageHeight] = useState(200);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      const maxWidth = 200;
      const maxHeight = 200;

      let { width, height } = img;

      // Scale down if too large
      const widthRatio = maxWidth / width;
      const heightRatio = maxHeight / height;
      const ratio = Math.min(1, widthRatio, heightRatio);

      const scaledWidth = Math.round(width * ratio);
      const scaledHeight = Math.round(height * ratio);

      dispatch(
        setRenderedDimension({ width: scaledWidth, height: scaledHeight })
      );
      dispatch(setRenderedPosition({ x: 100, y: 150 }));
      dispatch(setImageUrl(file));
    };
    img.src = URL.createObjectURL(file);
  };

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const phoneCaseRef = useRef(null);
  const containerRef = useRef(null);

  const generatePreviewImageBlob = async () => {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current?.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerRef.current?.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = URL.createObjectURL(imageUrl);
      await new Promise((resolve) => {
        userImage.onload = resolve;
      });

      ctx.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height
      );
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/png");
      });
    } catch (error) {
      console.error("Error generating preview blob:", error);
      return null;
    }
  };

  const handleDesign = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in to save the design.");
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    if (!imageUrl) {
      setMessage("Please upload an image to continue.");
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    const previewBlob = await generatePreviewImageBlob();
    if (!previewBlob) {
      setMessage("Failed to generate preview image.");
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("selectedTemplate", selectedTemplate);
    formData.append("imageUrl", previewBlob, "preview.png");
    formData.append("imageDimensions[height]", renderedDimension.height);
    formData.append("imageDimensions[width]", renderedDimension.width);
    formData.append("backgroundColor", backgroundColor);

    try {
      const response = await axios.post(base_url + "/case/design", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Design saved successfully!");
      setMessageType("success");
      // dispatch(resetDesign());
      navigate(`/case-phone?_id=${response.data._id}`);
    } catch (error) {
      if (error.response) {
        setMessage(`Error saving design: ${error.response.data.message}`);
      } else {
        setMessage(`Error: ${error.message}`);
      }
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfiguration = async () => {
    const blob = await generatePreviewImageBlob();
    if (blob) {
      const previewUrl = URL.createObjectURL(blob);
      window.open(previewUrl);
    }
  };

  // const handleImageLoad = (e) => {
  //   const img = e.target;
  //   setImageWidth(img.naturalWidth / 2);
  //   setImageHeight(img.naturalHeight / 2);
  //   setImageLoaded(true);
  //   dispatch(
  //     setRenderedDimension({
  //       width: img.naturalWidth / 2,
  //       height: img.naturalHeight / 2,
  //     })
  //   );
  //   dispatch(setRenderedPosition({ x: 150, y: 205 }));
  // };
  // const rndDefault = imageLoaded
  //   ? {
  //       x: 150, // Adjust initial position as needed
  //       y: 205,
  //       width: imageWidth,
  //       height: imageHeight,
  //     }
  //   : { x: 150, y: 205, height: 200, width: 150 };

  return (
    <div className="relative mt-20 px-6 mb-20 pb-20 ">
      <div className="flex items-center justify-center gap-16 max-sm:flex-col">
        <div
          ref={containerRef}
          className="relative  h-[37.5rem] w-[35rem] border-2 border-dashed border-gray-300 rounded-lg p-6 flex justify-center items-center overflow-hidden"
        >
          <div
            ref={phoneCaseRef}
            className="relative w-60 bg-opacity-50 aspect-[890/1831] pointer-events-none"
          >
            <AspectRatio
              ref={phoneCaseRef}
              ratio={896 / 1831}
              className="pointer-events-none relative z-40 aspect-[896/1831] w-full"
            >
              <div className="relative w-full h-full">
                <img
                  src={
                    templates.find(
                      (template) => template.name === selectedTemplate
                    )?.src
                  }
                  alt="Phone template"
                  className="pointer-events-none z-40 select-none"
                />
              </div>
            </AspectRatio>

            <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
            <div
              className={cn(
                "absolute inset-0 left-[3px] top-px right-[3px] bottom-[5px] rounded-[32px]",
                "bg-gray-900"
              )}
              style={{ backgroundColor }}
            />
          </div>

          <Rnd
            size={{
              width: renderedDimension.width,
              height: renderedDimension.height,
            }}
            position={{ x: renderedPosition.x, y: renderedPosition.y }}
            onResizeStop={(_, __, ref) => {
              dispatch(
                setRenderedDimension({
                  height: parseInt(ref.style.height, 10),
                  width: parseInt(ref.style.width, 10),
                })
              );
            }}
            onDragStop={(_, data) => {
              dispatch(setRenderedPosition({ x: data.x, y: data.y }));
            }}
            className="absolute z-20 border-[3px] border-primary"
            lockAspectRatio
            resizeHandleComponent={{
              bottomRight: <HandleComponent />,
              bottomLeft: <HandleComponent />,
              topRight: <HandleComponent />,
              topLeft: <HandleComponent />,
            }}
          >
            {imageUrl && (
              <img
                src={URL.createObjectURL(imageUrl)}
                alt="Uploaded image"
                className="pointer-events-none w-full h-full object-cover"
              />
            )}
          </Rnd>
        </div>

        <div className="w-full max-w-xl mx-auto p-8 bg-white shadow-xl rounded-xl space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Design Your Phone Case
          </h1>

          {/* Upload Dropzone */}
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L4 7m3-3l3 3m4 1v6m0 0l-3-3m3 3l3-3"
                />
              </svg>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          {/* Background Color Picker */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Background Color
            </h2>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition"
                  style={{ backgroundColor: color }}
                  onClick={() => dispatch(setBackgroundColor(color))}
                />
              ))}
            </div>
          </div>

          {/* Template Selector */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Choose Model
            </h2>
            <select
              value={selectedTemplate}
              onChange={(e) => dispatch(setSelectedTemplate(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {templates.map((template) => (
                <option key={template.name} value={template.name}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          {/* Divider */}
          <hr className="border-t border-gray-300" />

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleDesign}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-md font-semibold disabled:opacity-50 transition"
            >
              {isLoading ? "Saving..." : "Save Design"}
            </button>

            {/* <button
              onClick={saveConfiguration}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-semibold transition"
            >
              Preview Cropped
            </button> */}
          </div>

          {/* Feedback Message */}
          {message && (
            <div
              className={`text-sm p-3 rounded-md text-center font-medium ${
                messageType === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
