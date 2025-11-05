
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Feed from "./pages/Feed";

const App = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-base-200">
        <Navbar/>
        <main className="flex-grow flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/feed" element={<Feed/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </>
  );
};

export default App;
