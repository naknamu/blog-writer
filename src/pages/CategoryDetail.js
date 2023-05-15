import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MarkdownPreview from "../components/MarkdownPreview";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router";

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

const CategoryDetail = () => {
  const { categoryid } = useParams();
  const [category, setCategory] = useState(null);
  const [blogPosts, setBlogPosts] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(`${config.apiUrl}/categories/${categoryid}`);
      const data = await response.json();

      setCategory(data.category);
      setBlogPosts(data.blogPosts);
    };
    fetchCategory();
  }, [categoryid]);

  if (!category && !blogPosts) {
    return <div>Loading....</div>;
  }

  const handleDelete = async (categoryid) => {
    const response = await fetch(
      `${config.apiUrl}/category/${categoryid}/delete`,
      {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
      }
    );
    const data = await response.json();
    
    if (response.ok) {
      navigate("/categories")
    } else {
      console.error(data.error);
    }
  };

  return (
    <div className="category">
      <h1>Category: {category.name}</h1>
      <div>
        <b>Detail:</b>
        <MarkdownPreview markdown={category.detail} />
      </div>
      <h2>Blog posts under this category:</h2>
      {blogPosts.map((blog) => (
        <li key={blog._id}>
          <Link to={`/posts/${blog._id}`}>{blog.title}</Link>
        </li>
      ))}

      <ButtonWrapper>
        <DeleteBtn onClick={() => handleDelete(category._id)}>
          <Link to="/categories">Delete</Link>
        </DeleteBtn>

        <UpdateBtn>
          <Link to={`/category/${category._id}/update`}>Update</Link>
        </UpdateBtn>
      </ButtonWrapper>
    </div>
  );
};

export default CategoryDetail;
