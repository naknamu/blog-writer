import { useState } from "react";
import config from "../config";
import { useNavigate } from "react-router";
import MarkdownEditor from "../components/MarkdownEditor";
import { useAuthContext } from "../hooks/useAuthContext";
import { InputField, FormWrapper, SubmitBtn } from "../components/StyledComponents";

const TagForm = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTag = {
      name,
      detail,
    };

    const response = await fetch(`${config.apiUrl}/tag/create`, {
      method: "POST",
      body: JSON.stringify(newTag),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      setName("");
      setDetail("");
      // Redirect to list of tags
      navigate("/tags");
    } else {
      console.error(data.error);
    }
  };

  return (
    <FormWrapper onSubmit={(e) => handleSubmit(e)}>
      <h1>Create a Tag</h1>

      <InputField>
        <label htmlFor="name">Tag Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputField>

      <InputField>
        <label htmlFor="detail">Tag Detail:</label>
        <MarkdownEditor markdown={detail} handleChange={setDetail} />
      </InputField>

      <SubmitBtn type="submit">Submit</SubmitBtn>
    </FormWrapper>
  );
};

export default TagForm;
