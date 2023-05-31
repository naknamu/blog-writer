import { useState } from "react";
import config from "../config";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";
import styled from "styled-components";

const Center = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const LoginForm = styled.form`
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background: rgb(13, 17, 23);
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  input {
    padding: 16px;
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid #24292f;
    border-radius: 4px;
    box-sizing: border-box;
    background: #24292f;
    font-size: 16px;
    font-family: inherit;
  }

  button {
    background: #484f58;
    border: 0;
    color: #fff;
    padding: 10px;
    font-family: inherit;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 1rem;
  }

  button:hover {
    opacity: 0.8;
  }

  button:active {
    opacity: 1;
  }

  .error {
    padding: 10px;
    background: #ffefef;
    border: 1px solid #e7195a;
    color: #e7195a;
    border-radius: 4px;
    margin: 20px 0;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const response = await fetch(`${config.userUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsLoading(false);

      // Store user to local storage
      localStorage.setItem("user", JSON.stringify(data));

      // Update auth context
      dispatch({ type: "LOGIN", payload: data });

      // Navigate to dashboard/home
      navigate("/");
    } else {
      setError(data.error);
      setIsLoading(false);
    }
  };

  return (
    <Center>
      <LoginForm onSubmit={(e) => handleSubmit(e)}>
        <div className="input-field">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          Log in
        </button>
        <p className={error ? "error" : ""}>{error}</p>
      </LoginForm>
    </Center>
  );
};

export default Login;
