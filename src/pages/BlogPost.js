import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MarkdownPreview from "../components/MarkdownPreview";
import { useNavigate } from "react-router";

const { DateTime } = require("luxon");

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
  const navigate = useNavigate()

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
    const response = await fetch(
      `${config.apiUrl}/post/${postid}/delete`,
      {
        method: "POST",
      }
    );

    const data = await response.json();
    if (response.ok) {
      navigate("/posts")
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
        <Link to={`/categories/${blogPost.category._id}/What-is-${blogPost.category.name}`}>
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

      <div style={{marginTop: "2rem"}}>
        <Link to={`/posts/${postid}/comments/`}>See All Comments</Link>
      </div>

      <PublishBtn
        isPublished={blogPost.published}
        onClick={() => handlePublish()}
      >
        {blogPost.published ? "Published" : "Not Published"}
      </PublishBtn>

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
