import { useDispatch, useSelector } from "react-redux";
import SingleProducts from "./SingleProducts";
import { useEffect } from "react";
import { fetchProducts } from "../../Features/products/productsSlice";
import { FaSpinner } from "react-icons/fa";

const Products = () => {
  const { products, isLoading, isError } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="flex justify-center">
        <p>
          <FaSpinner className="lg:text-5xl md:text-3xl text-2xl mt-10" />
        </p>
      </div>
    );
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Something went wrong!</p>
    );
  return (
    <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4 gap-5 mt-3">
      {products?.map((product) => (
        <SingleProducts key={product.unique_id} product={product} />
      ))}
    </div>
  );
};

export default Products;
