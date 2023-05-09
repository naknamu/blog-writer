import { useEffect, useState } from "react";
import SidebarLinks from "../components/SidebarLinks";
import config from "../config";
import styled from 'styled-components';

const HomeStyled = styled.div`
`;

const HomeWrapper = styled.div`
    position: relative;
    left: 15rem;
`;

const Home = () => {
    const [blogs, setBlogs] = useState(0);
    const [categories, setCategoris] = useState(0);
    const [tags, setTags] = useState(0);

    useEffect(() => {
        const fetchAllBlogs = async() => {
            const response = await fetch(config.apiUrl);
            const data = await response.json();
            setBlogs(data.blog_count);
            setCategoris(data.category_count);
            setTags(data.tag_count);

            console.log(data);
        }

        fetchAllBlogs();
    }, [])
    return ( 
        <HomeStyled>
            <SidebarLinks />
            <HomeWrapper>
                <h1>SoloDevHub Home</h1>
                <p>Welcome! This is where you will manage your blog!</p>

                <h2>SoloDevHub has the following record counts:</h2>
                <ul>
                    <li>{`Blog post count: ${blogs}`}</li>
                    <li>{`Category count: ${categories}`}</li>
                    <li>{`Tag count: ${tags}`}</li>
                </ul>
            </HomeWrapper>
        </HomeStyled>
    );
}
 
export default Home;