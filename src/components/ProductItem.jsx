import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../Context";
import { useContext, useEffect } from "react";

function ProductItem({ productDetails }) {
  const { handleAddtoCart, cartArr } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  function handleNavigation(id) {
    navigate(`/product-details/${id}`);
  }

  return (
    <div className="relative group border border-cyan-700 p-6 cursor-pointer">
      <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img
          src={productDetails.thumbnail}
          alt={productDetails.title}
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
        />
      </div>
      <div className="flex items-start justify-between mt-4 space-x-4">
        <div className="font-bold text-gray-900 sm:text-sm text-xs md:text-base">
          <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
            {productDetails.title}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]">
            ${productDetails.price}
          </p>
        </div>
      </div>

      <button
        onClick={() => handleNavigation(productDetails.id)}
        className="px-5 mt-5 w-full py-2 bg-black text-white font-bold text-lg rounded-md"
      >
        View Details
      </button>
      <button
        className="disabled:opacity-65 px-5 mt-5 w-full py-2 bg-black text-white font-bold text-lg rounded-md"
        onClick={() => handleAddtoCart(productDetails)}
        disabled={
          cartArr.findIndex((item) => item.id === productDetails.id) > -1
        }
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ProductItem;
