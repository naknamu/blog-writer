import { useState } from "react";
import styled from "styled-components";
import config from "../config";
import MarkdownEditor from "../components/MarkdownEditor";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";

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
    font-weight: 700;
  }

  input {
    padding: 1rem;
    border-radius: 8px;
    font-size: 16px;
    font-family: inherit;
    border: 1px solid #fff;
  }

  input:focus {
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

  :active {
    opacity: 1;
  }
`;

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
      name,
      detail,
    };

    const response = await fetch(`${config.apiUrl}/category/create`, {
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      navigate("/categories");
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
        <MarkdownEditor markdown={detail} handleChange={setDetail} />
      </InputField>

      <SubmitBtn type="submit">Submit</SubmitBtn>
    </FormWrapper>
  );
};

export default CategoryForm;
