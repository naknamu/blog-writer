import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarLink = styled.div`
  position: fixed;
`;

const SidebarWrapper = styled.ul`
  li a {
    text-decoration: none;
  }
`;


const SidebarLinks = () => {
    return (
      <SidebarLink>
        <SidebarWrapper>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">All Blogs</Link></li>
          <li><Link to="/">All Comments</Link></li>
          <li><Link to="/">All Categories</Link></li>
          <li><Link to="/">All Tags</Link></li>
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