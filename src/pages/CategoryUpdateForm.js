import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import Markdown from "../components/Markdown";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';

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

const CategoryUpdateForm = () => {

    const { categoryid } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");

    // Create a new DOMParser
    const parser = new DOMParser();

    useEffect(() => {
        const fetchCategory = async() => {
            const response = await fetch(`${config.apiUrl}/category/${categoryid}/update`);
            const data = await response.json();

            console.log(data);
            setName(data.name);
            setDetail(data.detail);
        }

        fetchCategory();

    }, [categoryid])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateCategory = {
            name,
            detail,
        };

        const response = await fetch(`${config.apiUrl}/category/${categoryid}/update`, {
            method: "POST",
            body: JSON.stringify(updateCategory),
            headers: {
              "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        console.log(data);

        if (response.ok) {
            navigate(`/categories/${categoryid}`)
        } else {
            console.error(data.error);
        }

    }

    return ( 
    <FormWrapper onSubmit={(e) => handleSubmit(e)}>
      <h1>Update a Category</h1>

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
          rows="20"
          value={
                parser.parseFromString(detail, "text/html").documentElement
                .textContent
            }
          onChange={(e) => setDetail(e.target.value)}
        ></textarea>
      </InputField>

      <h2>Rendered Markdown</h2>
      <Markdown markdown={detail} />

      <SubmitBtn type="submit">Submit</SubmitBtn>
    </FormWrapper>
    );
}
 
export default CategoryUpdateForm;