import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext";

const SidebarLink = styled.div`
  display: grid;
  position: fixed;
  gap: 1rem;
  margin-top: 1rem;
`;

const SidebarWrapper = styled.ul`
  margin: 0;

  li {
    list-style-type: none;
    padding-block: 10px;
  }

  li a {
    text-decoration: none;
  }
`;

const SidebarLinks = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleClick = (e) => {
    e.preventDefault();

    // Remove user in local storage
    localStorage.removeItem('user');

    // Update auth context state
    dispatch({type: 'LOGOUT', payload: null})

    navigate("/login");
  }

  return (
    <SidebarLink>
      <SidebarWrapper>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">All Blogs</Link>
        </li>
        <li>
          <Link to="/categories">All Categories</Link>
        </li>
        <li>
          <Link to="/tags">All Tags</Link>
        </li>
      </SidebarWrapper>
      <SidebarWrapper>
        <li>
          <Link to="/post/create">Create new blog post</Link>
        </li>
        <li>
          <Link to="/category/create">Create new category</Link>
        </li>
        <li>
          <Link to="/tag/create">Create new tag</Link>
        </li>
      </SidebarWrapper>
      <SidebarWrapper>
          <button onClick={(e) => handleClick(e)}>Log out</button>
      </SidebarWrapper>
    </SidebarLink>
  );
};

export default SidebarLinks;
