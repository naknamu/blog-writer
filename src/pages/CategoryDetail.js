import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CategoryDelete = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: hsla(344, 53%, 62%, 1);
  font-size: inherit;
  font-weight: 700;
  border-radius: 8px;
  margin-top: 2rem;

  :hover {
    opacity: 0.8;
  }

  a {
    color: white;
  }
`;

const CategoryDetail = () => {
  const { categoryid } = useParams();
  const [category, setCategory] = useState(null);
  const [blogPosts, setBlogPosts] = useState(null);

  // Create a new DOMParser
  const parser = new DOMParser();

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
      }
    );

    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="category">
      <h1>Category: {category.name}</h1>
      <div>
        <b>Detail:</b>
        <div style={{ whiteSpace: "pre-line" }}>
          {
            parser.parseFromString(category.detail, "text/html").documentElement
              .textContent
          }
        </div>
      </div>
      <h2>Blog posts under this category:</h2>
      {blogPosts.map((blog) => (
        <li key={blog._id}>
          <Link to={`/posts/${blog._id}`}>{blog.title}</Link>
        </li>
      ))}

      <CategoryDelete onClick={() => handleDelete(category._id)}><Link to="/categories">Delete category</Link></CategoryDelete>
    </div>
  );
};

export default CategoryDetail;
