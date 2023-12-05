import { createCommentReq, deleteCommentReq, getCommentsReq } from "../api/commentsAxios";
import { createContext, useContext, useState } from "react";

const CommentsContext = createContext();

export const useComments = () => {
    const context = useContext(CommentsContext);
    if (!context) throw new Error("Error en el contexto de las tareas");
    return context;
};

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);

    const createComment = async (postId, commentData) => {
        try {
            const res = await createCommentReq(postId, commentData);
            // Actualizar el estado con el nuevo comentario creado si es necesario
        } catch (error) {
            console.log(error);
        }
    };

    const getAllComments = async (postId) => {
        
        try {
            const res = await getCommentsReq(postId);
            setComments(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            const res = await deleteCommentReq(commentId);
            if (res.status === 200) {
                setComments(comments.filter((comment) => comment._id !== commentId));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CommentsContext.Provider
            value={{
                createComment,
                getAllComments,
                deleteComment,
                comments
            }}
        >
            {children}
        </CommentsContext.Provider>
    );
};
