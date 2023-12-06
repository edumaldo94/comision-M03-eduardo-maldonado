//frontend/api/commentsAxios.js

import axios from "./setCredentials";

export const createCommentReq = (postId, commentData) => axios.post(`/posts/${postId}/comments`, commentData);
export const deleteCommentReq = (commentId) => axios.delete(`/deleteComment/${commentId}`);
export const getCommentsReq = (postId) => axios.get(`/posts/${postId}/comments`);
export const getAllCommentsReq = () => axios.get(`/comment`);