import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    c_name: "",
    c_phone: "",
    courier: "",
    address: "",
    cod_amount: "",
    delivery_charge: "80",
    s_product_qty: "1",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          "https://admin.refabry.com/api/all/product/get"
        );
        const matchedProduct = res.data.data.data.find(
          (item) => item.unique_id === id
        );
        setProduct(matchedProduct);
        setFormData((prevData) => ({
          ...prevData,
          cod_amount: matchedProduct.price.toString(),
        }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const { c_name, c_phone, courier, address, s_product_qty } = formData;
    if (c_name && c_phone && courier && address && s_product_qty) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      let updatedValue = value;
      if (name === "s_product_qty" && value !== "") {
        updatedValue = value;
        const updatedPrice = product.price * value;
        setFormData((prev) => ({
          ...prev,
          cod_amount: updatedPrice.toString(),
        }));
      }
      return { ...prev, [name]: updatedValue };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        product_ids: product?.id?.toString(),
        s_product_qty: formData.s_product_qty,
        c_phone: formData.c_phone,
        c_name: formData.c_name,
        courier: formData.courier,
        address: formData.address,
        advance: null,
        cod_amount: formData.cod_amount,
        discount_amount: null,
        delivery_charge: formData.delivery_charge,
      };

      const response = await axios.post(
        "https://admin.refabry.com/api/public/order/create",
        orderData
      );
      console.log("Order placed successfully", response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData((prevData) => ({
      ...prevData,
      s_product_qty: "1",
      cod_amount: product.price.toString(),
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <p>
          <FaSpinner className="lg:text-5xl md:text-3xl text-2xl mt-10" />
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <p className="text-center mt-10 text-xl font-medium text-red-500">
        Product not found
      </p>
    );
  }

  const Toast = () => {
    toast("Your Order is Confirmed!");
  };

  return (
    <div className="w-full">
      <div className="lg:max-w-5xl md:h-[500px] mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-1/2">
            <img
              className="rounded-sm md:h-[500px] md:w-[500px] h-[350px] w-full mx-auto"
              src={`https://admin.refabry.com/storage/product/${product.image}`}
              alt={product.name}
            />
          </div>

          <div className="w-full lg:w-1/2 space-y-5">
            <h2 className="lg:text-3xl text-xl font-semibold">
              {product.name}
            </h2>
            <p className="text-gray-600 text-sm lg:text-[16px]">
              {product.short_desc}
            </p>
            <hr />
            <div className="flex justify-between">
              <p className="lg:text-xl font-bold text-green-600">
                Price: {product.price} BDT
              </p>
              <p className="lg:text-xl font-bold text-green-600">
                Discount: {product.discount_amount} BDT
              </p>
            </div>
            <div className="flex justify-between">
              <p>
                <span className="lg:text-xl lg:font-medium opacity-60">
                  Created_at:
                </span>{" "}
                {product.created_at?.substring(0, 10)}
              </p>
              <p>
                <span className="lg:text-xl lg:font-medium opacity-60">
                  Updated_at:
                </span>{" "}
                {product.updated_at?.substring(0, 10)}
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 hover:bg-green-800 text-white lg:px-4 lg:py-2 md:py-1 md:px-3 px-2 py-1 rounded-sm"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Place Your Order</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {" "}
              <input
                type="text"
                name="c_name"
                placeholder="Customer Name"
                onChange={handleInputChange}
                className="w-full px-3 lg:py-2 py-1 border rounded"
                required
              />
              <input
                type="text"
                name="c_phone"
                placeholder="Phone Number"
                onChange={handleInputChange}
                className="w-full px-3 lg:py-2 py-1 border rounded"
                required
              />
              <input
                type="text"
                name="courier"
                placeholder="Courier (e.g., steadfast)"
                onChange={handleInputChange}
                className="w-full px-3 lg:py-2 py-1 border rounded"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Delivery Address"
                onChange={handleInputChange}
                className="w-full px-3 lg:py-2 py-1 border rounded"
                required
              />
              <input
                type="number"
                name="s_product_qty"
                value={formData.s_product_qty}
                onChange={handleInputChange}
                className="w-full px-3 lg:py-2 py-1 border rounded"
                min="1"
                required
              />
              <input
                type="text"
                name="cod_amount"
                placeholder={`${formData.cod_amount} BDT`}
                onChange={handleInputChange}
                className="w-full px-3 lg:py-2 py-1 border rounded bg-gray-200"
                disabled
              />
              <input
                type="text"
                name="delivery_charge"
                placeholder={`Delivery Charge ${formData.delivery_charge} BDT`}
                onChange={handleInputChange}
                className="w-full px-3 lg:py-2 py-1 border rounded bg-gray-200"
                disabled
              />
              <div className="flex justify-end mt-4 gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="ml-4 text-red-500 hover:underline font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={Toast}
                  type="submit"
                  disabled={!isFormValid}
                  className={`lg:px-4 px-2 lg:py-2 py-1 rounded-sm text-white ${
                    isFormValid
                      ? "bg-green-600 hover:bg-green-800"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Confirm Order
                </button>
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
