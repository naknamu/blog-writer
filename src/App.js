import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// pages
import Home from "./pages/Home";
import AllBlogs from "./pages/AllBlogs";
import AllCategories from "./pages/AllCategories";

// components
import SidebarLinks from "./components/SidebarLinks";
import AllTags from "./pages/AllTags";
import AllComments from "./pages/AllComments";
import AllUsers from "./pages/AllUsers";


const AppWrapper = styled.div`
  display: flex;
  gap: 5rem;
`;

const PagesWrapper = styled.div`
  padding-inline: 2rem;
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
              <Route path="/comments" element={<AllComments />} />
              <Route path="/users" element={<AllUsers />} />
            </Routes>
          </PagesWrapper>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
