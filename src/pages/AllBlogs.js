import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import styled from "styled-components";

const BlogsStyled = styled.div`
    display: grid;
    gap: 1rem;
`;

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchAllBlogs = async() => {
            const response = await fetch(`${config.apiUrl}/posts`);
            const data = await response.json();

            console.log(data);
            setBlogs(data);
        }

        fetchAllBlogs();
    }, [])

    return ( 
        <BlogsStyled>
            <h1>All blogs</h1>
            {blogs.map((blog) => (
                <li key={blog._id}><Link to={`/posts/${blog._id}`}>{blog.title}</Link>: ({blog.published.toString()})</li>
            ))}
        </BlogsStyled>
     );
}
 
export default AllBlogs;