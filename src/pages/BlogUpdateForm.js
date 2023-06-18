import { useParams } from "react-router";
import { useEffect, useState } from "react";
import config from "../config";
import { useNavigate } from "react-router";
import styled from "styled-components";
import MarkdownEditor from "../components/MarkdownEditor";
import { useAuthContext } from "../hooks/useAuthContext";
import { InputField, FormWrapper, SubmitBtn } from "../components/StyledComponents";

const SelectField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  select {
    font-family: inherit;
    padding: 0.5rem 2rem;
    font-size: 1rem;
    align-self: flex-start;
  }

  select:focus {
    border: 1px solid hsl(175, 98%, 24%);
    outline: none;
  }
`;

const TagsField = styled.div`
  display: flex;
  gap: 1rem;

  div > * {
    padding-inline: 5px;
  }

  input {
    transform: scale(1.2);
  }
`;

const PublishField = styled.div`
  input {
    transform: scale(1.2);
  }
`;

const BlogUpdateForm = () => {
  const { postid } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [bannerUrl, setBannerUrl] = useState("");
  const [publishedStatus, setPublishedStatus] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [checkedTags, setCheckedTags] = useState([]);

  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      content,
      category: selectedCategory,
      tags: checkedTags,
      published: publishedStatus,
      image_url: bannerUrl,
    };

    const response = await fetch(`${config.apiUrl}/post/${postid}/update`, {
      method: "POST",
      body: JSON.stringify(newBlog),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Redirect updated blog post
      navigate(`/posts`);
    } else {
      console.error(data.error);
    }
  };

  const handleCheckbox = (e) => {
    let isChecked = e.target.checked;

    // if checked, adds tag to the array
    // else, removed tag to the array
    if (isChecked) {
      setCheckedTags((tag) => [...tag, e.target.value]);
    } else {
      let _tempArray = checkedTags;
      let _filteredArray = _tempArray.filter((tag) => tag !== e.target.value);
      setCheckedTags(_filteredArray);
    }
  };

  // For Publish Checkbox
  const handlePublish = (e) => {
    let isChecked = e.target.checked;

    if (isChecked) {
      setPublishedStatus(true);
    } else {
      setPublishedStatus(false);
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`${config.apiUrl}/post/${postid}/update`);
      const data = await response.json();

      setTitle(data.title);
      setContent(data.content);
      setSelectedCategory(data.category);
      setCheckedTags(data.tags);
      setBannerUrl(data.image_url);
      setPublishedStatus(data.published);

      console.log(data);
    };

    const fetchCategoriesAndTags = async () => {
      const [categories, tags] = await Promise.all([
        (await fetch(`${config.apiUrl}/categories`)).json(),
        (await fetch(`${config.apiUrl}/tags`)).json(),
      ]);

      setCategories(categories);
      setTags(tags);
    };

    fetchPost();

    fetchCategoriesAndTags();
  }, [postid]);

  return (
    <div>
      <h1>Update blog</h1>
      <FormWrapper onSubmit={(e) => handleSubmit(e)}>
        <InputField>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </InputField>

        <SelectField>
          <label htmlFor="category">Category: </label>
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select the category
            </option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </SelectField>

        <label>Tags: </label>
        <TagsField>
          {tags?.map((tag) => (
            <div key={tag._id}>
              <input
                type="checkbox"
                name="tags"
                id={tags._id}
                value={tag._id}
                onChange={(e) => handleCheckbox(e)}
                checked={checkedTags.includes(tag._id)}
              />
              <label htmlFor="tags">{tag.name}</label>
            </div>
          ))}
        </TagsField>

        <InputField>
          <label htmlFor="bannerUrl">Banner URL: </label>
          <input
            type="text"
            name="bannerUrl"
            id="bannerUrl"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
            required
          />
        </InputField>

        <PublishField>
          <label htmlFor="publishedStatus">Published: </label>
          <input
            type="checkbox"
            name="published"
            id="publishedStatus"
            checked={publishedStatus}
            onChange={(e) => handlePublish(e)}
          />
        </PublishField>

        <InputField>
          <label htmlFor="content">Content:</label>
          <MarkdownEditor markdown={content} handleChange={setContent} />
        </InputField>

        <SubmitBtn type="submit">Submit</SubmitBtn>
      </FormWrapper>
    </div>
  );
};

export default BlogUpdateForm;
