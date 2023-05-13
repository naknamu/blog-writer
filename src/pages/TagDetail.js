import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router";
import MarkdownPreview from "../components/MarkdownPreview";

const DeleteBtn = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: hsla(344, 53%, 62%, 1);
  font-size: inherit;
  font-weight: 700;
  border-radius: 8px;

  :hover {
    opacity: 0.8;
  }

  a {
    color: white;
  }
`;

const UpdateBtn = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: hsl(175, 98%, 24%);
  font-size: inherit;
  font-weight: 700;
  border-radius: 8px;
  color: white;

  :hover {
    opacity: 0.8;
  }

  a {
    color: white;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const TagDetail = () => {
  const { tagid } = useParams();
  const [tag, setTag] = useState(null);
  const [blogPosts, setBlogPosts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTag = async () => {
      const response = await fetch(`${config.apiUrl}/tags/${tagid}`);
      const data = await response.json();

      setTag(data.tag);
      setBlogPosts(data.blogPosts);
    };
    fetchTag();
  }, [tagid]);

  if (!tag && !blogPosts) {
    return <div>Loading....</div>;
  }

  const handleDelete = async (tagid) => {
    const response = await fetch(`${config.apiUrl}/tag/${tagid}/delete`, {
      method: "POST",
    });

    const data = await response.json();
    if (response.ok) {
      // Redirect to list of tags
      navigate("/tags");
    } else {
      console.error(data.error);
    }
  };

  return (
    <div className="tag-detail">
      <h1>Tag: {tag.name}</h1>
      <div>
        <b>Detail:</b>
        <MarkdownPreview markdown={tag.detail} />
      </div>
      <h2>Blog posts under this tag: </h2>
      {blogPosts.map((blog) => (
        <li key={blog._id}>
          <Link to={`/posts/${blog._id}`}>{blog.title}</Link>
        </li>
      ))}

      <ButtonWrapper>
        <DeleteBtn onClick={() => handleDelete(tag._id)}>
          <Link to="/tags">Delete</Link>
        </DeleteBtn>

        <UpdateBtn>
          <Link to={`/tag/${tag._id}/update`}>Update</Link>
        </UpdateBtn>
      </ButtonWrapper>
    </div>
  );
};

export default TagDetail;
