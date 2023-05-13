import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// pages
import Home from "./pages/Home";
import AllBlogs from "./pages/AllBlogs";
import AllCategories from "./pages/AllCategories";
import AllTags from "./pages/AllTags";
import BlogPost from "./pages/BlogPost";
import AllComments from "./pages/AllComments";
import CategoryDetail from "./pages/CategoryDetail";
import TagDetail from "./pages/TagDetail";

// components
import SidebarLinks from "./components/SidebarLinks";
import CategoryForm from "./pages/CategoryForm";
import CategoryUpdateForm from "./pages/CategoryUpdateForm";
import TagForm from "./pages/TagForm";
import TagUpdateForm from "./pages/TagUpdateForm";
import BlogForm from "./pages/BlogForm";
import BlogUpdateForm from "./pages/BlogUpdateForm";

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
            <Route path="/post/create" element={<BlogForm />} />
            <Route path="/posts/:postid/update" element={<BlogUpdateForm />} />

            <Route path="/tags/:tagid/:title" element={<TagDetail />} />
            <Route path="/tag/create" element={<TagForm />} />
            <Route
              path="/tag/:tagid/update"
              element={<TagUpdateForm />}
            />

            <Route
              path="/categories/:categoryid/:title"
              element={<CategoryDetail />}
            />
            <Route path="/category/create" element={<CategoryForm />} />
            <Route
              path="/category/:categoryid/update"
              element={<CategoryUpdateForm />}
            />
          </Routes>
        </PagesWrapper>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
