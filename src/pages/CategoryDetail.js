import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";
import MarkdownPreview from "../components/MarkdownPreview";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router";
import { DeleteBtn, UpdateBtn, ButtonWrapper } from "../components/StyledComponents";

const CategoryDetail = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [blogPosts, setBlogPosts] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(`${config.apiUrl}/categories/${slug}`);
      const data = await response.json();

      setCategory(data.category);
      setBlogPosts(data.blogPosts);
    };
    fetchCategory();
  }, [slug]);

  if (!category && !blogPosts) {
    return <div>Loading....</div>;
  }

  const handleDelete = async (categoryid) => {
    const response = await fetch(
      `${config.apiUrl}/category/${categoryid}/delete`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      navigate("/categories");
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
          <Link to={`/posts/${blog.slug}`}>{blog.title}</Link>
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
