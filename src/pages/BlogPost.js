import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MarkdownPreview from "../components/MarkdownPreview";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
import { DeleteBtn, UpdateBtn, ButtonWrapper } from "../components/StyledComponents";

const { DateTime } = require("luxon");

const PublishBtn = styled.button`
  width: fit-content;
  padding: 12px 16px;
  background: ${(props) =>
    props.isPublished ? "hsl(120, 50%, 30%)" : "hsla(344, 53%, 62%, 1)"};
  color: white;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 1;
  }
`;

const StatusWrapper = styled.div`
  display: flex;
  margin-block: 2rem;
  gap: 1rem;
  align-items: center;
`;

const BlogPost = () => {
  const { postid } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const fetchBlogPost = async () => {
    const response = await fetch(`${config.apiUrl}/posts/${postid}`);
    const data = await response.json();

    setBlogPost(data);
    setIsPublished(data.published);
  };

  useEffect(() => {
    fetchBlogPost();
    // eslint-disable-next-line
  }, [postid]);

  if (!blogPost) {
    return <div>Loading....</div>;
  }

  const handlePublish = async () => {
    let publishedStatus = isPublished;

    if (publishedStatus) {
      publishedStatus = false;
    } else {
      publishedStatus = true;
    }

    setIsPublished(publishedStatus);

    console.log(blogPost);

    const updateBlogPost = {
      title: blogPost.title,
      content: blogPost.content,
      category: blogPost.category,
      tags: blogPost.tags,
      published: publishedStatus,
      image_url: blogPost.image_url,
    };

    const response = await fetch(`${config.apiUrl}/post/${postid}/update`, {
      method: "POST",
      body: JSON.stringify(updateBlogPost),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      // Fetch updated blog post
      fetchBlogPost();
    } else {
      console.error(data.error);
    }
  };

  const handleDelete = async (postid) => {
    const response = await fetch(`${config.apiUrl}/post/${postid}/delete`, {
      method: "POST",
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const data = await response.json();
    if (response.ok) {
      navigate("/posts");
    } else {
      console.error(data.error);
    }
  };

  return (
    <div className="blog-post">
      <img src={blogPost.image_url} alt="banner" width={250} />
      <h1>Title: {blogPost.title}</h1>
      <p>
        <b>Published Date: </b>
        {DateTime.fromJSDate(new Date(blogPost.publishedDate)).toLocaleString(
          DateTime.DATETIME_MED
        )}
      </p>
      <p>
        <b>Category: </b>
        <Link
          to={`/categories/${blogPost.category._id}/What-is-${blogPost.category.name}`}
        >
          {blogPost.category.name}
        </Link>
      </p>
      <b>Tags: </b>
      {blogPost.tags.map((tag) => (
        <div key={tag._id} style={{ display: "inline-block" }}>
          <Link to={`/tags/${tag._id}/What-is-${tag.name}`}>{tag.name}</Link> ,
        </div>
      ))}
      <div>
        <h3>Content: </h3>
        <MarkdownPreview markdown={blogPost.content} />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Link to={`/posts/${postid}/comments/`}>See All Comments</Link>
      </div>

      <StatusWrapper>
        <b>Status:</b>
        <PublishBtn
          isPublished={blogPost.published}
          onClick={() => handlePublish()}
        >
          {blogPost.published ? "Published" : "Not Published"}
        </PublishBtn>
      </StatusWrapper>

      <ButtonWrapper>
        <DeleteBtn onClick={() => handleDelete(blogPost._id)}>
          <Link to="/categories">Delete</Link>
        </DeleteBtn>

        <UpdateBtn>
          <Link to={`/posts/${blogPost._id}/update`}>Update</Link>
        </UpdateBtn>
      </ButtonWrapper>
    </div>
  );
};

export default BlogPost;
