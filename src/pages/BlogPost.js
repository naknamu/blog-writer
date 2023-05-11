import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";
import styled from "styled-components";

const { DateTime } = require("luxon");

const PublishBtn = styled.button`
  margin-top: 2rem;
  padding: 1rem;
  background: ${(props) =>
    props.isPublished ? " hsl(175, 98%, 24%)" : "hsla(344, 53%, 62%, 1)"};
  color: white;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 8px;

  :hover {
    opacity: 0.8;
  }
`;

const BlogPost = () => {
  const { postid } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [isPublished, setIsPublished] = useState(false);

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
        <Link to={`/categories/${blogPost.category._id}`}>
          {blogPost.category.name}
        </Link>
      </p>
      <b>Tags: </b>
      {blogPost.tags.map((tag) => (
        <div key={tag._id} style={{ display: "inline-block" }}>
          <Link to={`/tags/${tag._id}`}>{tag.name}</Link> ,
        </div>
      ))}
      <p>
        <b>Content: </b>
        {blogPost.content}
      </p>

      <div>
        <Link to={`/posts/${postid}/comments/`}>See All Comments</Link>
      </div>

      <PublishBtn
        isPublished={blogPost.published}
        onClick={() => handlePublish()}
      >
        {blogPost.published ? "Published" : "Not Published"}
      </PublishBtn>
    </div>
  );
};

export default BlogPost;
