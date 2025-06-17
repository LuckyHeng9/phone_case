// import React, { useState } from "react";
// import { Rnd } from "react-rnd";
// import AspectRatio from "react-aspect-ratio";

// const Design = () => {
//   // const [backgroundColor, setBackgroundColor] = useState("");
//   // const [selectedModel, setSelectedModel] = useState("");
//   // const [uploadedImage, setUploadedImage] = useState(null);
//   // const [imageSize, setImageSize] = useState({ width: 150, height: 200, x: 0, y: 0 });

//   // Handle image upload
//   // const handleImageUpload = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     if (file.size < 5 * 1024 * 1024) {
//   //       setUploadedImage(URL.createObjectURL(file));
//   //     } else {
//   //       alert("Please upload an image less than 5 MB.");
//   //     }
//   //   }
//   // };

//   // Define paths for phone case images
//   const modelPhone = {
//     samsung: "path/to/samsung_case.png",
//     pixel: "path/to/pixel_case.png",
//     iphone: "src/assets/phone-template.png",
//   };

//   // Handle resizing
//   const handleResize = (e, direction, ref, delta, position) => {
//     setImageSize((prevSize) => ({
//       ...prevSize,
//       width: ref.offsetWidth,
//       height: ref.offsetHeight,
//       x: position.x,
//       y: position.y,
//     }));
//   };

//   return (
//     <div className="flex justify-center gap-10">
//       {/* Phone Case Preview */}
//       <div className="flex items-center justify-center border-dashed border-2 border-gray-400 p-4 rounded-lg">
//         <div
//           className="relative w-[12rem] h-[25rem] bg-transparent bg-center bg-cover bg-no-repeat rounded-lg"
//           style={{
//             backgroundImage: selectedModel ? `url(${modelPhone[selectedModel]})` : "none",
//           }}
//         >
//           {/* Background Color Overlay */}
//           {backgroundColor && (
//             <div
//               className="absolute top-5 left-4 w-[7.9rem] h-[16rem] rounded-[1.5rem]"
//               style={{ backgroundColor: backgroundColor }}
//             ></div>
//           )}

//           {/* Aspect Ratio Wrapper for Phone Template */}
//           <AspectRatio
//             ratio={896 / 1831}  // You can adjust the ratio as needed
//             className="relative w-full h-full"
//           >
//             {/* Uploaded Image */}
//             {uploadedImage && (
//               <Rnd
//                 size={{ width: imageSize.width, height: imageSize.height }}
//                 position={{ x: imageSize.x, y: imageSize.y }}
//                 minWidth={50}
//                 minHeight={70}
//                 maxWidth={300}
//                 maxHeight={400}
//                 className="absolute top-0 left-0 rounded-lg"
//                 bounds="parent"
//                 onResizeStop={handleResize}
//                 onDragStop={(e, data) => {
//                   setImageSize((prevSize) => ({
//                     ...prevSize,
//                     x: data.x,
//                     y: data.y,
//                   }));
//                 }}
//               >
//                 <img
//                   src={uploadedImage}
//                   alt="Uploaded"
//                   className="w-full h-full object-cover rounded-lg"
//                 />
//               </Rnd>
//             )}
//           </AspectRatio>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between">
//         <div>
//           <h1 className="text-2xl font-bold mb-6 text-center">Customize your Case</h1>

//           {/* Background Color Picker */}
//           <div className="mb-4">
//             <p className="mb-2 font-semibold">Background color</p>
//             <div className="flex gap-2">
//               {["#f59e0b", "#3b82f6", "#000000", "#6b7280", "#22c55e"].map(
//                 (color, index) => (
//                   <button
//                     key={index}
//                     aria-label={`Choose color ${color}`}
//                     className="w-8 h-8 rounded-full border-2 border-gray-200 hover:opacity-75"
//                     style={{ backgroundColor: color }}
//                     onClick={() => setBackgroundColor(color)}
//                   ></button>
//                 )
//               )}
//             </div>
//           </div>

//           {/* Model Selector */}
//           <div className="w-[9rem] mb-4">
//             <p className="mb-2 font-semibold">Model</p>
//             <select
//               value={selectedModel}
//               onChange={(e) => setSelectedModel(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//             >
//               <option value="">Choose model</option>
//               <option value="samsung">Samsung</option>
//               <option value="pixel">Google Pixel</option>
//               <option value="iphone">iPhone</option>
//             </select>
//           </div>

//           {/* Image Upload */}
//           <div className="w-[12.5rem] mb-6">
//             <label className="block mb-2 font-semibold">Upload image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="w-full text-gray-500"
//             />
//           </div>
//           <hr className="border border-gray-400" />
//         </div>

//         {/* Continue Button */}
//         <div className="flex items-center justify-center mt-6">
//           <button
//             disabled={!selectedModel || !uploadedImage}
//             className={`w-40 py-2 ${
//               !selectedModel || !uploadedImage
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gray-700 hover:bg-gray-800 text-white"
//             } font-semibold rounded-lg`}
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Design;
