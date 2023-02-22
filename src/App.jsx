import { BrowserRouter as R, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateItem from "./pages/CreateItem";
import UpdateItem from "./pages/UpdateItem";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Cart from "./pages/Cart";
import Successful from "./pages/Successful";
import Nav from "./components/Nav";

function App() {
  return (
    <R>
      <Nav />
      <Routes>
        <Route path="/rexshop-frontend" exact element={<Home />} />
        <Route path="/rexshop-frontend/createitem" element={<CreateItem />} />
        <Route path="/rexshop-frontend/updateitem/:id" element={<UpdateItem />} />
        <Route path="/rexshop-frontend/signup" element={<Signup />} />
        <Route path="/rexshop-frontend/signin" element={<Signin />} />
        <Route path="/rexshop-frontend/cart" element={<Cart />} />
        <Route path="/rexshop-frontend/success" element={<Successful />} />
      </Routes>
    </R>
  );
}

export default App;
