import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import styled from "styled-components";

const TagsStyled = styled.div`
  display: grid;
  gap: 1rem;
`;

const AllTags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchAllTags = async () => {
      const response = await fetch(`${config.apiUrl}/tags`);
      const data = await response.json();

      setTags(data);
    };

    fetchAllTags();
  }, []);

  return (
    <TagsStyled>
      <h1>All tags</h1>
      {tags.map((tag) => (
        <li key={tag._id}>
          <Link to={`/tags/${tag.slug}`}>{tag.name}</Link>
        </li>
      ))}
    </TagsStyled>
  );
};

export default AllTags;
