import { useEffect, useState } from "react";
import config from "../config";
import styled from "styled-components";
import { useAuthContext } from "../hooks/useAuthContext";

const HomeStyled = styled.div``;

const HomeWrapper = styled.div``;

const Home = () => {
  const [blogs, setBlogs] = useState(0);
  const [categories, setCategoris] = useState(0);
  const [tags, setTags] = useState(0);
  const [comments, setComments] = useState(0);
  const [users, setUsers] = useState(0);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const response = await fetch(config.apiUrl, {
        headers: {'Authorization': `Bearer ${user.token}`}
      });
      const data = await response.json();
      
      setBlogs(data.blog_count);
      setCategoris(data.category_count);
      setTags(data.tag_count);
      setComments(data.comment_count);
      setUsers(data.user_count);
    };

    if (user) {
      fetchAllBlogs();
    }
  }, [user]);
  return (
    <HomeStyled>
      <HomeWrapper>
        <h1>SoloDevHub Home</h1>
        <p>Welcome! This is where you will manage your blog!</p>

        <h2>SoloDevHub has the following record counts:</h2>
        <ul>
          <li>{`Blog post count: ${blogs}`}</li>
          <li>{`Category count: ${categories}`}</li>
          <li>{`Tag count: ${tags}`}</li>
          <li>{`Comment count: ${comments}`}</li>
          <li>{`User count: ${users}`}</li>
        </ul>
      </HomeWrapper>
    </HomeStyled>
  );
};

export default Home;
