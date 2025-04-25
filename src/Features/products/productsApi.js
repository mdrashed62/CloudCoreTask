import axios from 'axios';

export const getProducts = async () => {
  const response = await axios.get("https://admin.refabry.com/api/all/product/get");
  return response.data.data.data;
};

