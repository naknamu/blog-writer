import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { useNavigate } from "react-router-dom";
import MarkdownEditor from "../components/MarkdownEditor";
import { useAuthContext } from "../hooks/useAuthContext";
import { InputField, FormWrapper, SubmitBtn } from "../components/StyledComponents";

const TagUpdateForm = () => {
  const { tagid } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const { user } = useAuthContext();

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
        Authorization: `Bearer ${user.token}`,
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
