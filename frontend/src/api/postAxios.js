import axios from "./setCredentials";

export const getPostReq = () => axios.get("/get");

export const getPostByIdReq = (id) => axios.get(`/user/${id}/posts`);

export const createPostReq = (post) => axios.post("/create", post);

export const updatePostReq = (id, post) => axios.put(`/update/${id}`, post);

export const deletePostReq = (id) => axios.delete(`/delete/${id}`);