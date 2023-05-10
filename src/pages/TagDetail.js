import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";

const TagDetail = () => {
    const { tagid } = useParams();
    const [tag, setTag] = useState(null);
    const [blogPosts, setBlogPosts] = useState(null);

    useEffect(() => {
        const fetchTag = async() => {
            const response = await fetch(`${config.apiUrl}/tags/${tagid}`);
            const data = await response.json();

            setTag(data.tag);
            setBlogPosts(data.blogPosts);
        }
        fetchTag();
    }, [tagid])

    if (!tag && !blogPosts) {
        return <div>Loading....</div>;
    }

    return ( 
        <div className="tag-detail">
            <h1>Tag: {tag.name}</h1>
            <p><b>Detail: </b>{tag.detail}</p>
            <h2>Blog posts under this tag: </h2>
            {blogPosts.map((blog) => (
                <li key={blog._id}>
                    <Link to={`/posts/${blog._id}`}>{blog.title}</Link>
                </li>
            ))}
        </div>
     );
}
 
export default TagDetail;