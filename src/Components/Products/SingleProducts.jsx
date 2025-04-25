import React from "react";
import { useNavigate } from "react-router-dom";

const SingleProducts = ({ product }) => {
  const { name, short_desc, price, image } = product;

  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/productDetails/${product.unique_id}`);
  };

  return (
    <div className="mx-auto lg:w-full lg:h-full space-y-3 border-t-1 rounded-md">
      <div className="relative">
        <img
          className="rounded-sm h-[350px] w-full"
          src={`https://admin.refabry.com/storage/product/${image}`}
          alt=""
        />
        <p className="absolute top-2 right-2 md:top-4 md:right-4  bg-green-600 text-white text-sm px-1 py-[2px] md:px-2 md:py-1 lg:px-3 lg:py-2 rounded-sm">
          Price: {price}
        </p>
      </div>
      <h1 className="text-xl lg:text-2xl font-medium">{name}</h1>
      <p className="text-[12px] md:text-[16px]">{short_desc}</p>
      <button
        onClick={handleDetails}
        className="bg-green-700 hover:bg-green-800 px-1 py-1 md:px-2 md:py-1 lg:px-4 lg:py-2 rounded-sm w-full text-white px-"
      >
        Details
      </button>
    </div>
  );
};

export default SingleProducts;
