import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

//render the cart items brother

function CartList() {
  const { cartArr, totalPrice } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  return (
    <div className="max-w-5xl mx-auto max-md:max-w-xl py-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        My Cart List
      </h1>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2 space-y-4">
          {cartArr && cartArr.length > 0 ? (
            cartArr.map((item) => (
              <div
                key={item.id}
                className="border-b border-black last:border-b-0 pb-4"
              >
                <CartItem singleItem={item} />
              </div>
            ))
          ) : (
            <h1 className="font-bold">
              No items in the Cart, unless you'll add some 🤣
            </h1>
          )}
        </div>
        <div className="bg-gray-100 rounded-sm h-max p-4">
          <h3 className="text-xl font-extrabold text-black border-b border-gray-200 pb-2">
            Order Summary
          </h3>
          <ul className="text-gray-700 mt-4 space-y-2">
            <p className="flex flex-wrap gap-4 text-sm font-bold">
              Total <span>{totalPrice}</span>
            </p>
          </ul>
          <div className="mt-5">
            <button
              disabled={cartArr.length === 0}
              className="disabled:opacity-65 text-sm px-4 py-3 bg-black text-white font-extrabold mx-1"
            >
              Check Out
            </button>
            <button
              className="text-sm px-4 py-3 bg-black text-white font-extrabold"
              onClick={() => navigate("/product-list")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartList;
