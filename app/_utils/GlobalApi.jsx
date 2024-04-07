const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
});

const getCategories = () => axiosClient.get("/categories?populate=*");

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((res) => res.data.data);

const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((res) => res.data.data);

const getProducts = () =>
  axiosClient.get("/products?populate=*").then((res) => res.data.data);

export default {
  getCategories,
  getSliders,
  getCategoryList,
  getProducts,
};
