import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import BloggerIndex from "./bloggers/index";
import BloggerShow from "./bloggers/show";
import ArticleIndex from "./articles/index"
import ArticleNew from "./articles/new"
import Navigation from "./layouts/Navigation";
import Footer from "./layouts/Footer";
import CategoriesIndex from "./categories/index";
import CategoriesShow from "./categories/show";
import ArticleEdit from "./articles/edit";
import ArticleShow from "./articles/show";
import SessionsNew from "./devise/sessions/new";
import RegistrationsNew from "./devise/registrations/new";
import RegistrationsEdit from "./devise/registrations/edit";



export default function App() {
  
  return (
    <>
    <BrowserRouter >
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/bloggers" element={<BloggerIndex />} />
        <Route exact path="/bloggers/show" element={<BloggerShow />} />
        <Route exact path="/articles" element={<ArticleIndex />} />
        <Route exact path="/articles/new" element={<ArticleNew />} />
        <Route exact path="/articles/edit" element={<ArticleEdit />} />
        <Route exact path="/articles/show" element={<ArticleShow />} />
        <Route exact path="/categories" element={<CategoriesIndex />} />
        <Route exact path="/categories/show" element={<CategoriesShow />} />
        <Route exact path="/bloggers/signin" element={<SessionsNew />} />
        <Route exact path="/bloggers/signup" element={<RegistrationsNew />} />
        <Route exact path="/bloggers/edit" element={<RegistrationsEdit />} />
      </Routes>
    </BrowserRouter>
    <Footer />
    </>
    
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);