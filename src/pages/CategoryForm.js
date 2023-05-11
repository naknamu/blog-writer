import { useState } from "react";
import styled from "styled-components";
import config from "../config";
import Markdown from "../components/Markdown";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    padding-block: 1rem;
  }

  input,
  textarea {
    padding: 1rem;
    border-radius: 8px;
    font-size: 16px;
    font-family: inherit;
    border: 1px solid #fff;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border: 1px solid hsl(175, 98%, 24%);
  }
`;

const SubmitBtn = styled.button`
  align-self: flex-start;
  padding: 1rem 2rem;
  border: none;
  background: hsl(175, 98%, 24%);
  color: white;
  font-size: inherit;
  font-weight: 700;
  border-radius: 8px;
  margin-top: 1rem;

  :hover {
    opacity: 0.8;
  }
`;


const CategoryForm = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitted");

    const newCategory = {
      name,
      detail,
    };

    const response = await fetch(`${config.apiUrl}/category/create`, {
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      setName("");
      setDetail("");
    } else {
      console.error(data.error);
    }
  };

  return (
    <FormWrapper onSubmit={(e) => handleSubmit(e)}>
      <h1>Create a Category</h1>

      <InputField>
        <label htmlFor="name">Category Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputField>

      <InputField>
        <label htmlFor="detail">Category Detail:</label>
        <textarea
          name="detail"
          id="detail"
          cols="30"
          rows="10"
          value={decodeURIComponent(detail)}
          onChange={(e) => setDetail(e.target.value)}
        ></textarea>
      </InputField>

      <h2>Rendered Markdown</h2>
      <Markdown markdown={detail} />

      <SubmitBtn type="submit">Submit</SubmitBtn>
    </FormWrapper>
  );
};

export default CategoryForm;
