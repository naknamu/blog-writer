import { useState } from "react";
import config from "../config";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";

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
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })

        const data = await response.json();

        if (response.ok) {
            setIsLoading(false);

            // Store user to local storage
            localStorage.setItem("user", JSON.stringify(data));

            // Update auth context
            dispatch({type: 'LOGIN', payload: data})

            // Navigate to dashboard/home
            navigate("/");
        } else {
            setError(data.error);
            setIsLoading(false);
        }
    }

    return ( 
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-field">
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="input-field">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit" disabled={isLoading}>Log in</button>
                <p className="error">{error}</p>
            </form>
        </div>
    );
}
 
export default Login;