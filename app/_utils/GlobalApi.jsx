import { create } from "domain";

const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "https://grocery-admin.medevs.tech/",
});

const getCategories = () => axiosClient.get("/categories?populate=*");

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((res) => res.data.data);

const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((res) => res.data.data);

const getProducts = () =>
  axiosClient.get("/products?populate=*").then((res) => res.data.data);

const getProductByCategory = (categoryName) =>
  axiosClient
    .get(`/products?filters[categories][name][$in]=${categoryName}&populate=*`)
    .then((res) => res.data.data);

const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username,
    email,
    password,
  });

const SignIn = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password,
  });
const addProductToCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const getCartItems = (userId, jwt) =>
  axiosClient
    .get(
      `/user-carts?filters[userId][$eq]=${userId}&[populate][products][populate][images][populate][0]=url`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((res) => {
      const data = res.data.data;
      const cartItemList = data.map((item, index) => ({
        name: item.attributes.products?.data[0].attributes.name,
        quantity: item.attributes.quantity,
        amount: item.attributes.amount,
        image:
          item.attributes.products?.data[0].attributes.images.data[0].attributes
            .url,
        actualPrice: item.attributes.products?.data[0].attributes.mrp,
        id: item.id,
        product: item.attributes.products?.data[0].id,
      }));
      return cartItemList;
    });

const deleteCartItem = (cartItemId, jwt) =>
  axiosClient.delete(`/user-carts/${cartItemId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const createOrder = (order, jwt) =>
  axiosClient.post("/orders", order, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const getMyOrders = (userId, jwt) =>
  axiosClient
    .get(
      `/orders?filters[userId][$eq]=${userId}&populate[orderItemList][populate][product][populate][images]=url`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((res) => {
      const data = res.data.data;
      const orderList = data.map((item, index) => ({
        id: item.id,
        totalOrderAmount: item.attributes.totalOrderAmount,
        payementId: item.attributes.paymentId,
        orderItemList: item.attributes.orderItemList,
        createdAt: item.attributes.createdAt,
        status: item.attributes.status,
      }));
      return orderList;
    });

export default {
  getCategories,
  getSliders,
  getCategoryList,
  getProducts,
  getProductByCategory,
  registerUser,
  SignIn,
  addProductToCart,
  getCartItems,
  deleteCartItem,
  createOrder,
  getMyOrders,
};
