import { useParams } from "react-router";

const BlogUpdateForm = () => {
    const { postid } = useParams();
    return ( 
        <div>
            Update blog: {postid}
        </div>
    );
}
 
export default BlogUpdateForm;