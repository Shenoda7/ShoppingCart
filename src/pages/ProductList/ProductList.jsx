import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import ProductItem from "../../components/ProductItem";

function ProductList() {
  const getContextValue = useContext(ShoppingCartContext);
  const { loading, ListProducts } = getContextValue;

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
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3l font-extrabold text-gray-950 sm:text-4xl">
            Our featured products
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
          {ListProducts && ListProducts.length > 0 ? (
            ListProducts.map((product) => (
              <ProductItem productDetails={product} />
            ))
          ) : (
            <h3>No product found</h3>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
