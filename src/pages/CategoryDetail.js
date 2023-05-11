import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";

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
    </div>
  );
};

export default CategoryDetail;
