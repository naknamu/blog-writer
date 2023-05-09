import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";

const { DateTime } = require("luxon");

const BlogPost = () => {
    const {postid} = useParams();
    const [blogPost, setBlogPost] = useState(null);

    useEffect(() => {
        const fetchBlogPost = async() => {
            const response = await fetch(`${config.apiUrl}/posts/${postid}`);
            const data = await response.json();

            console.log(data);
            setBlogPost(data);
        }

        fetchBlogPost();
    }, [postid])

    if (!blogPost) {
        return <div>Loading....</div>;
    }

    return ( 
        <div className="blog-post">
            <img src={blogPost.image_url} alt="banner" width={250} />
            <h1>Title: {blogPost.title}</h1>
            <p><b>Published Date: </b>{DateTime.fromJSDate(new Date(blogPost.publishedDate)).toLocaleString(DateTime.DATETIME_MED)}</p>
            <p><b>Category: </b>{blogPost.category.name}</p>
            <b>Tags: </b>
            {blogPost.tags.map(tag => (
               <div key={tag._id} style={{display:"inline-block"}}>{tag.name},</div> 
            ))}
            <p><b>Content: </b>{blogPost.content}</p>

            <Link to={`/posts/${postid}/comments/`}>See All Comments</Link>
        </div>
     );
}
 
export default BlogPost;