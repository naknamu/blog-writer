import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarLink = styled.div`
  display: grid;
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
    return (
      <SidebarLink>
        <SidebarWrapper>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/posts">All Blogs</Link></li>
          <li><Link to="/categories">All Categories</Link></li>
          <li><Link to="/tags">All Tags</Link></li>
        </SidebarWrapper>
        <SidebarWrapper>
          <li><Link to="/">Create new blog post</Link></li>
          <li><Link to="/">Create new category</Link></li>
          <li><Link to="/">Create new tag</Link></li>
        </SidebarWrapper>
      </SidebarLink>
      );
  };
  
  export default SidebarLinks;