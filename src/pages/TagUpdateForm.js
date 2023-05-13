import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MarkdownEditor from "../components/MarkdownEditor";

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
`;

const TagUpdateForm = () => {
  const { tagid } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    const fetchTag = async () => {
      const response = await fetch(`${config.apiUrl}/tag/${tagid}/update`);
      const data = await response.json();

      console.log(data);
      setName(data.name);
      setDetail(data.detail);
    };

    fetchTag();
  }, [tagid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateTag = {
      name,
      detail,
    };

    const response = await fetch(`${config.apiUrl}/tag/${tagid}/update`, {
      method: "POST",
      body: JSON.stringify(updateTag),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      navigate(`/tags/${tagid}/What-is-${name}`);
    } else {
      console.error(data.error);
    }
  };

  return (
    <FormWrapper onSubmit={(e) => handleSubmit(e)}>
      <h1>Update a Tag</h1>

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

export default TagUpdateForm;
