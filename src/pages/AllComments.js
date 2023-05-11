import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import styled from "styled-components";

const { DateTime } = require("luxon");

const CommentsStyled = styled.div`
  display: grid;
  gap: 1rem;
`;

const CommentCard = styled.div`
  border: 1px solid #000;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const DeleteWrapper = styled.div`
  align-self: flex-end;
  transform: scale(1.5);
`;

const DeleteBtn = styled.span`
  cursor: pointer;

  :hover {
    color: red;
  }
`;

const CommentWrapper = styled.div`
  transform: translateY(-1rem);
`;

const AllComments = () => {
  const { postid } = useParams();

  const [comments, setComments] = useState([]);

  const fetchAllComments = async () => {
    const response = await fetch(`${config.apiUrl}/posts/${postid}/comments`);
    const data = await response.json();

    setComments(data);
  };

  useEffect(() => {
    fetchAllComments();
    // eslint-disable-next-line
  }, [postid]);

  const handleDelete = async (commentid) => {
    const response = await fetch(
      `${config.apiUrl}/posts/${postid}/comment/${commentid}/delete`,
      {
        method: "POST",
      }
    );

    const data = await response.json();
    console.log(data);

    // fetch again all comments
    fetchAllComments();
  };

  return (
    <CommentsStyled>
      <h1>All comments</h1>
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          onClick={() => handleDelete(comment._id)}
        >
          <DeleteWrapper>
            <DeleteBtn className="material-symbols-outlined">delete</DeleteBtn>
          </DeleteWrapper>
          <CommentWrapper>
            <div>
              <b>{comment.name}</b>
            </div>
            <p>{comment.message}</p>
            <div>
              {DateTime.fromJSDate(new Date(comment.createdAt)).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </div>
          </CommentWrapper>
        </CommentCard>
      ))}
    </CommentsStyled>
  );
};

export default AllComments;
