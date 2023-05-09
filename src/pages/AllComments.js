import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import config from "../config";
import styled from "styled-components";

const CommentsStyled = styled.div`
    display: grid;
    gap: 1rem;
`;

const AllComments = () => {
    const { postid } = useParams();

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchAllComments = async() => {
            const response = await fetch(`${config.apiUrl}/posts/${postid}/comments`);
            const data = await response.json();

            setComments(data);
        }

        fetchAllComments();
    }, [postid])

    return ( 
        <CommentsStyled>
            <h1>All comments</h1>
            {comments.map((comment) => (
                <li key={comment._id}><Link to={`/comments/${comment._id}`}>{comment.name}</Link></li>
            ))}
        </CommentsStyled>
     );
}
 
export default AllComments;