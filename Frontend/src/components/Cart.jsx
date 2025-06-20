// import React, { useEffect } from "react";
// import { MdOutlineCancel } from "react-icons/md";
// import { MdOutlineDeleteOutline } from "react-icons/md"; // Import delete icon
// import { useDispatch, useSelector } from "react-redux";
// import {
//   updateCartItemQuantity,
//   calculateTotalPrice,
//   getTotalPrice,
// } from "../redux/slice/cartSlice";

// const Cart = ({ addCartItem, handleRomoveCart, closeCart }) => {
//   const dispatch = useDispatch();
//   const totalPrice = useSelector(getTotalPrice); // Get total price from the store

//   // Function to increase the quantity
//   const increaseQuantity = (_id) => {
//     dispatch(updateCartItemQuantity({ _id, quantity: 1 }));
//     dispatch(calculateTotalPrice()); // Recalculate total price
//   };

//   // Function to decrease the quantity
//   const decreaseQuantity = (_id) => {
//     dispatch(updateCartItemQuantity({ _id, quantity: -1 }));
//     dispatch(calculateTotalPrice()); // Recalculate total price
//   };

//   // Recalculate total price when the cart changes
//   useEffect(() => {
//     dispatch(calculateTotalPrice());
//   }, [addCartItem, dispatch]);

//   return (
//     <div className="absolute -top-5 -right-[8rem] w-[30rem] h-screen overflow-scroll bg-white shadow-lg rounded-md p-4">
//       <div className="flex items-center justify-between">
//         <h3 className="text-xl font-bold mb-3 text-gray-800">Cart</h3>
//         <button
//           onClick={closeCart} // Close cart dropdown when clicked
//           className="text-3xl hover:text-gray-400"
//         >
//           <MdOutlineCancel />
//         </button>
//       </div>

//       {addCartItem.length > 0 ? (
//         <>
//           <ul className="space-y-3">
//             {addCartItem.map((product) => (
//               <li key={product._id} className="flex items-center gap-3">
//                 <img
//                   src={product.image_path || "https://via.placeholder.com/150"}
//                   alt={product.title || "Product"}
//                   className="w-[5rem] object-cover rounded"
//                 />
//                 <div className="flex flex-col gap-1">
//                   <p className="text-gray-700 text-lg">
//                     {product.title || "Unnamed Product"}
//                   </p>
//                   <p className="text-gray-500 text-md">
//                     ${product.price || "0.00"}
//                   </p>
//                 </div>

//                 {/* Quantity Adjustments */}
//                 <div className="ml-auto flex items-center gap-2">
//                   <button
//                     onClick={() => decreaseQuantity(product._id)}
//                     className="text-xl text-gray-700 hover:text-gray-500"
//                   >
//                     -
//                   </button>
//                   <span className="text-gray-700">{product.quantity}</span>
//                   <button
//                     onClick={() => increaseQuantity(product._id)}
//                     className="text-xl text-gray-700 hover:text-gray-500"
//                   >
//                     +
//                   </button>
//                 </div>

//                 {/* Remove Item */}
//                 <div>
//                   <button
//                     onClick={() => {
//                       handleRomoveCart(product._id);
//                       dispatch(calculateTotalPrice()); // Recalculate total price
//                     }}
//                     className="text-2xl text-red-600 hover:text-red-800"
//                   >
//                     <MdOutlineDeleteOutline />
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//           {/* Display Total Price */}
//           <div className="mt-5 border-t pt-4">
//             <h4 className="text-lg font-semibold text-gray-700">
//               Total Price: ${totalPrice.toFixed(2)}
//             </h4>
//           </div>
//         </>
//       ) : (
//         <p className="text-gray-500 text-center mt-5">Your cart is empty.</p>
//       )}
//     </div>
//   );
// };

// export default Cart;
