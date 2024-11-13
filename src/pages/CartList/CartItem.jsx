import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";

function CartItem({ singleItem }) {
  const { handleDeleteorDecreaseItem, handleAddtoCart } =
    useContext(ShoppingCartContext);
  return (
    <div className="grid grid-cols-3 items-start gap-5">
      <div className="col-span-2 flex items-start gap-4">
        <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
          <img
            src={singleItem.thumbnail}
            className="w-full h-full object-contain"
            alt=""
          />
        </div>
        <div className="text-base font-bold text-gray-900">
          <h3>{singleItem.title}</h3>
          <button
            onClick={() => handleDeleteorDecreaseItem(singleItem, true)}
            className="text-sm px-4 py-3 bg-black text-white font-extrabold mx-1"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="ml-auto">
        <h3 className="font-extrabold">{singleItem.totalPrice.toFixed(2)}</h3>
        <p className="mt-2 mb-3 font-bold text-[15px]">
          Quantity: {singleItem.quantity}
        </p>
        <div>
          <button
            className="disabled:opacity-65 border border-[#000] "
            onClick={() => handleDeleteorDecreaseItem(singleItem)}
            disabled={singleItem.quantity === 1}
          >
            -
          </button>

          <button onClick={() => handleAddtoCart(singleItem)} className="mr-2">
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
