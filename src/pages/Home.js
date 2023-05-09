import { useEffect, useState } from "react";
import Table from "../components/Table";
import config from "../config";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategoris] = useState([]);
    const [tags, setTags] = useState([]);

    const blogHeader = 'Title';
    const categoryHeader= 'Category';
    const tagHeader = 'Tag'

    useEffect(() => {
        const fetchAllBlogs = async() => {
            const response = await fetch(config.apiUrl);
            const data = await response.json();
            setBlogs(data.blogPosts);
            setCategoris(data.categories);
            setTags(data.tags);
        }

        fetchAllBlogs();
    }, [])
    return ( 
        <div className="home">
            {blogs && <Table data={blogs} header={blogHeader}/>}
            {categories && <Table data={categories} header={categoryHeader}/>}
            {tags && <Table data={tags} header={tagHeader}/>}
        </div>
    );
}
 
export default Home;