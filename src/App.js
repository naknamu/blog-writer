import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// pages
import Home from "./pages/Home";
import AllBlogs from "./pages/AllBlogs";
import AllCategories from "./pages/AllCategories";
import AllTags from "./pages/AllTags";
import BlogPost from "./pages/BlogPost";
import AllComments from "./pages/AllComments";

// components
import SidebarLinks from "./components/SidebarLinks";

const AppWrapper = styled.div``;

const PagesWrapper = styled.div`
  padding-inline: 15rem;
  margin-bottom: 5rem;
`;

function App() {
  return (
    <AppWrapper>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <SidebarLinks />
        <PagesWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<AllBlogs />} />
            <Route path="/categories" element={<AllCategories />} />
            <Route path="/tags" element={<AllTags />} />

            <Route path="/posts/:postid" element={<BlogPost />} />
            <Route path="/posts/:postid/comments" element={<AllComments />} />
          </Routes>
        </PagesWrapper>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
