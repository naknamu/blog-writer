import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import styled from "styled-components";

const CategoriesStyled = styled.div`
    display: grid;
    gap: 1rem;
`;

const AllCategories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAllCategories = async() => {
            const response = await fetch(`${config.apiUrl}/categories`);
            const data = await response.json();
            
            setCategories(data);
        }

        fetchAllCategories();
    }, [])

    return ( 
        <CategoriesStyled>
            <h1>All categories</h1>
            {categories.map((category) => (
                <li key={category._id}><Link to={`/categories/${category._id}`}>{category.name}</Link></li>
            ))}
        </CategoriesStyled>
     );
}
 
export default AllCategories;