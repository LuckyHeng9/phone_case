import { MdOutlineDeleteOutline, MdOutlineCancel } from "react-icons/md"; // Updated import

const WishList = ({ wishListItems, handleRemoveWishList, closeWishList }) => {
  return (
    <div className="absolute -top-5 -right-[8rem] w-[30rem] h-screen overflow-scroll bg-white shadow-lg rounded-md p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold mb-3 text-gray-800">Wish List</h3> {/* Updated title */}
        <button 
          onClick={closeWishList} // Close wish list dropdown when clicked
          className="text-3xl hover:text-gray-400"
        >
          <MdOutlineCancel />
        </button>
      </div>

      {wishListItems.length > 0 ? (
        <ul className="space-y-3">
          {wishListItems.map((product) => (
            <li key={product.id} className="flex items-center gap-3">
              <img
                src={product.img }
                className="w-[5rem] object-cover rounded"
              />
              <div className="flex items-center flex-col gap-1">
                <p className="text-gray-700 text-lg">{product.title}</p>
                <p className="text-gray-500 text-md">{product.price}</p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => handleRemoveWishList(product.id)} // Corrected here
                  className="text-2xl text-red-600 hover:text-red-800"
                >
                  <MdOutlineDeleteOutline />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No items in your wish list.</p> 
      )}
    </div>
  );
};

export default WishList;
