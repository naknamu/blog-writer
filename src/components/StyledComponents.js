import styled from "styled-components";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  label {
    font-weight: 700;
  }
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    padding: 1rem;
    font-family: inherit;
    border: 1px solid #fff;
    border-radius: 8px;
    font-size: 1rem;
  }

  input:focus {
    border: 1px solid hsl(175, 98%, 24%);
    outline: none;
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
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 1;
  }
`;

const DeleteBtn = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: hsla(344, 53%, 52%, 1);
  font-size: inherit;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 1;
  }

  a {
    color: white;
  }
`;

const UpdateBtn = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: hsl(175, 98%, 24%);
  font-size: inherit;
  font-weight: 700;
  border-radius: 8px;
  color: white;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 1;
  }

  a {
    color: white;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
`;

export { 
    FormWrapper,
    InputField, 
    SubmitBtn,
    DeleteBtn,
    UpdateBtn,
    ButtonWrapper
};