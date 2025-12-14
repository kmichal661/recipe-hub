import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Views/Home/Home";
import Contact from "./Views/Contact/Contact";
import About from "./Views/About/About";
import Recipes from "./Views/Recipies/Recipes";
import Recipe from "./Views/Recipe/Recipe";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Stack } from "@chakra-ui/react";

function App() {
  return (
    <Stack>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      <Footer />
    </Stack>
  );
}

export default App;
