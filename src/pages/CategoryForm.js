import { useState } from "react";
import config from "../config";
import MarkdownEditor from "../components/MarkdownEditor";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
import { InputField, FormWrapper, SubmitBtn } from "../components/StyledComponents";

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
