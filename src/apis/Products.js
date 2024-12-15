// import { makeApiRequest } from "./ApiLayout";


// export const listProducts = (token) => {
//   return makeApiRequest("/products/", "GET", null, {
//     Authorization: `Bearer ${token}`,
//   });
// };
// export const createProduct = (productData, token) => {
//   return makeApiRequest("/products/", "POST", productData, {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   });
// };
// export const retrieveProduct = (productId, token) => {
//   return makeApiRequest(`/products/${productId}/`, "GET", null, {
//     Authorization: `Bearer ${token}`,
//   });
// };
// export const updateProduct = (productId, productData, token) => {
//   return makeApiRequest(`/products/${productId}/`, "PUT", productData, {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   });
// };
// export const deleteProduct = (productId, token) => {
//   return makeApiRequest(`/products/${productId}/`, "DELETE", null, {
//     Authorization: `Bearer ${token}`,
//   });
// };
// export const filterProducts = (filters, token) => {
//   const query = new URLSearchParams(filters).toString();
//   return makeApiRequest(`/products/filtered?${query}`, "GET", null, {
//     Authorization: `Bearer ${token}`,
//   });
// };
// export const uploadProductCsv = (csvFile, token) => {
//   const formData = new FormData();
//   formData.append("file", csvFile);

//   return makeApiRequest("/products/upload/", "POST", formData, {
//     "Content-Type": "multipart/form-data",
//     Authorization: `Bearer ${token}`,
//   });
// };
// export const getProductRecommendations = (productId, token) => {
//   return makeApiRequest("/products/recommendation/", "POST", { product_id: productId }, {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   });
// };
// export const getProductKeywords = (data, token) => {
//   return makeApiRequest("/products/keywords/", "POST", data, {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   });
// };


 