import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../Context";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const {
    productDetails,
    setProductDetails,
    loading,
    setLoading,
    handleAddtoCart,
    cartArr,
  } = useContext(ShoppingCartContext);
  const [mainImg, setMainImg] = useState(null);
  const navigate = useNavigate(`/cart`);
  const isItemThere = productDetails
    ? cartArr.findIndex((item) => item.id === productDetails.id) > -1
    : null; //if item is already in the cart

  function handleNavigation() {
    navigate(`/cart`);
  }

  async function fetchDetails() {
    try {
      setLoading(true);
      const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
      if (!apiResponse.ok) {
        throw new Error("Error occured while fetching");
      }
      const result = await apiResponse.json();
      if (result) {
        setProductDetails(result);
        setMainImg(result.thumbnail);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
        <h1 className="ml-4 text-xl font-semibold text-gray-800">
          Loading Data, please wait...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-2 items-start gap-6 shadow-lg p-6">
        <div className="text-center">
          <div className="px-4 py-10 rounded-xl shadow-lg relative">
            <img
              className="w-full max-w-xs lg:max-w-md rounded object-cover"
              src={mainImg}
              alt={productDetails.title}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mx-auto mt-4">
            {productDetails?.images?.length
              ? productDetails.images.map((item) => (
                  <div
                    key={item}
                    className="ease-in-out hover:scale-110 rounded-xl p-4 shadow-md"
                  >
                    <img
                      src={item}
                      className="w-24 cursor-pointer"
                      alt="thumbnail"
                      onClick={() => setMainImg(item)}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>

        <div className="flex flex-col justify-center items-start lg:pl-8">
          <h2 className="text-2xl font-extrabold text-gray-800">
            {productDetails.title}
          </h2>
          <div className="flex flex-wrap mt-4">
            <p className="text-xl font-bold">{productDetails.description}</p>
          </div>
          <div className="flex flex-wrap mt-4">
            <p className="text-xl font-bold">${productDetails.price}</p>
          </div>
          <div className="mt-4">
            <button
              className="disabled:opacity-65 mx-1"
              onClick={() => handleAddtoCart(productDetails)}
              disabled={isItemThere}
            >
              Add to Cart
            </button>
            <button onClick={handleNavigation}>Check out your Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
