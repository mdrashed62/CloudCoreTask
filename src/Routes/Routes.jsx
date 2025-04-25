import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Components/Home/Home";
import ProductDetails from "../Pages/ProductDetails";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/productDetails/:id",
      element: <ProductDetails />
    },
  ]);