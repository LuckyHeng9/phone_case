import React from "react";
import { Link } from "react-router-dom";
import { reviews } from "../constance";
import Footer from "./Footer";
import { MdOutlineVerified } from "react-icons/md";
import Design from "./Design";

const Hero = () => {
  return (
    <div className="w-full h-auto overflow-x-hidden">
      {/* Apply overflow-x-hidden to prevent horizontal scroll */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8 space-y-8 md:space-x-8 text-white md:space-y-0 max-sm:flex-col-reverse">
        <div className="w-72 h-72 lg:w-96 lg:h-96 flex items-center bg-[#2C3041] rounded-full max-sm:hidden">
          <img src="src/assets/cube.png" className="h-64 md:h-80" alt="cube" />
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 text-center md:text-left ">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
            Create Your Unique <span className="ml-1 md:ml-2">Style!</span>
          </h1>
          <p className="text-base md:text-lg ml-2 md:ml-12">
            Customize phone cases and necklaces with your favorite images and designs.
          </p>
          <Link
            to="/design"
            className="flex px-4 py-2 md:px-6 md:py-2 rounded-lg bg-[#6ABDDB] text-white hover:bg-[#55a7c5] transition-colors"
          >
            Get started
          </Link>
        </div>

        <div className="flex bg-[#2C3041] rounded-[30px] md:rounded-[60px] p-1">
          <img src="src/assets/phone.png" className="h-64 md:h-96" alt="phone" />
        </div>
      </div>
      {/* ----------------------End of content--------------------------- */}
      <div className="mt-16 w-full h-auto lg:px-12 text-white ">
        <div className="p-4 px-3 lg:px-32 font-bold">
          <h1 className="lg:text-3xl">What about customer say?</h1>
        </div>

        <div className="flex space-x-3 lg:-mr-64 lg:ml-44">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 flex flex-col">
              <div className="flex mb-2">
                {[...Array(4)].map((_, index) => (
                  <img
                    key={index}
                    src={
                      index < review.rating
                        ? review.starImage
                        : "src/assets/star_empty.png"
                    }
                    className="w-4"
                    alt="star"
                  />
                ))}
              </div>
              <div className="flex-1 lg:w-1/2 text-sm mb-2 lg:text-lg">
                <p>{review.text}</p>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <img src={review.user} alt="User" className="h-11" />
                <h4 className="font-bold">{review.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*-------------------------------- End of reviews------------------------- */}
      <div className="p-3 lg:px-28 py-5">
        <h1 className="text-white lg:text-3xl font-bold">Our Products</h1>
        <div>
          <img src="src/assets/img7.png" className="py-4" alt="product" />
          <a href="/store">
            <button className="w-[140px] h-8 lg:w-[200px] lg:h-10 rounded-lg mt-4 bg-[#272B3B] text-white hover:bg-slate-400 transition-all">
              Buy Now
            </button>
          </a>
        </div>
      </div>

      <div className="flex flex-col text-white">
        <h1 className="font-bold px-7 py-14 lg:text-3xl lg:px-28">
          Upload your photo and get
          <span className="bg-blue-300">
            <br />
            Your own case
          </span>{" "}
          now
        </h1>
        <div className="flex p-3 gap-3 lg:gap-12 justify-center">
          <div>
            <img src="src/assets/img5.png" alt="design 1" className="lg:w-[367px]" />
          </div>
          <div className="mt-28 lg:mt-64">
            <img src="src/assets/arrow.png" alt="arrow" className="lg:w-[137px]" />
          </div>
          <div>
            <img src="src/assets/img6.png" alt="design 2" className="lg:h-[600px]" />
          </div>
        </div>

        <div className="flex flex-col items-center mb-5 gap-4">
          <div className="text-center">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MdOutlineVerified className="text-white" />
                <span>Upload your photo and get on it</span>
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineVerified className="text-white" />
                <span>Design by your own</span>
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineVerified className="text-white" />
                <span>Get it to use</span>
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineVerified className="text-white" />
                <span>High quality</span>
              </li>
            </ul>
          </div>
          <Link
            to="/design"
            className="bg-[#6ABDDB] w-[200px] h-[40px] rounded-md text-white font-medium flex items-center justify-center hover:bg-[#5aacc9] transition-all"
            aria-label="Create your custom case"
          >
            Create your case now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
