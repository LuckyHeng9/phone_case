import React from 'react';
import succes from '../assets/succes.png';
import { Link } from 'react-router-dom';

const SuccesPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-[#272B3B] mb-2">Thank you for your order!</h1>
        <p className="text-lg text-gray-700">Update information will be sent to: <strong>Loemhengsigle@gmail.com</strong></p>
        <p className="text-lg text-gray-700">The waiting period for the product will be 2 to 3 days.</p>
      </header>

      <main className="text-center mb-8">
        <div className="mb-4">
          <img src={succes} alt="Successful Payment" className="w-32 h-32 object-cover mx-auto" />
        </div>
        <p className="text-lg text-[#4BB543] font-semibold">Payment Successful!</p>
      </main>

      <footer className="text-center">
        <Link to="/store">
          <button className="px-6 py-2 text-white bg-[#272B3B] rounded-lg hover:bg-[#3e445e] transition duration-200">
            Continue Shopping
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default SuccesPage;
