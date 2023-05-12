import Markdown from "../components/Markdown";
import styled from "styled-components";
import { useState } from "react";
import config from "../config";
import { useNavigate } from "react-router";

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

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

const TagForm = () => {
    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");
    const navigate = useNavigate();

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
        <SimpleMDE value={detail} onChange={setDetail} />
      </InputField>

      <h2>Rendered Markdown</h2>
      <Markdown markdown={detail} />

      <SubmitBtn type="submit">Submit</SubmitBtn>
    </FormWrapper>
     );
}
 
export default TagForm;