import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import MarkdownEditor from "../components/MarkdownEditor";
import { InputField, FormWrapper, SubmitBtn } from "../components/StyledComponents";

const CategoryUpdateForm = () => {
  const { categoryid } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(
        `${config.apiUrl}/category/${categoryid}/update`
      );
      const data = await response.json();

      console.log(data);
      setName(data.name);
      setDetail(data.detail);
    };

    fetchCategory();
  }, [categoryid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateCategory = {
      name,
      detail,
    };

    const response = await fetch(
      `${config.apiUrl}/category/${categoryid}/update`,
      {
        method: "POST",
        body: JSON.stringify(updateCategory),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      navigate(`/categories/${categoryid}/What-is-${categoryid}`);
    } else {
      console.error(data.error);
    }
  };

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
        <MarkdownEditor markdown={detail} handleChange={setDetail} />
      </InputField>

      <SubmitBtn type="submit">Submit</SubmitBtn>
    </FormWrapper>
  );
};

export default CategoryUpdateForm;
