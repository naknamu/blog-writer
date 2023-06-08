import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";

const AppWrapper = styled.div``;

const PagesWrapper = styled.div`
  padding-inline: 15rem;
  margin-bottom: 5rem;
  max-width: 1200px;
`;

function App() {
  const { user } = useAuthContext();

  return (
    <AppWrapper>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {user && <SidebarLinks />}
        <PagesWrapper>
          <Routes>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/posts" element={<AllBlogs />} />
            <Route path="/categories" element={<AllCategories />} />
            <Route path="/tags" element={<AllTags />} />

            <Route path="/posts/:slug" element={<BlogPost />} />
            <Route path="/posts/:postid/comments" element={<AllComments />} />
            <Route path="/post/create" element={<BlogForm />} />
            <Route path="/posts/:postid/update" element={<BlogUpdateForm />} />

            <Route path="/tags/:tagid/:title" element={<TagDetail />} />
            <Route path="/tag/create" element={<TagForm />} />
            <Route path="/tag/:tagid/update" element={<TagUpdateForm />} />

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
