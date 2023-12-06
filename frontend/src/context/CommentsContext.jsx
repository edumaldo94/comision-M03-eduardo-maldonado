
import { createContext, useContext, useState } from "react";
import { createCommentReq, deleteCommentReq, getCommentsReq, getAllCommentsReq } from "../api/commentsAxios";
const CommentsContext = createContext();

export const useComments = () => {
    const contextb = useContext(CommentsContext);
    if (!contextb) throw new Error("Error en el contexto(coments) de las tareas");
    return contextb;
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

    const getAllByIdPostComments = async (postId) => {
        
        try {
            const res = await getCommentsReq(postId);
            setComments(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllcomments = async () => {
        const res = await getAllCommentsReq();
        // console.log(res);
        try {
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
                getAllByIdPostComments,
                deleteComment,
                getAllcomments,
                comments
            }}
        >
            {children}
        </CommentsContext.Provider>
    );
};
