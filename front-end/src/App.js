// import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import NavBar from './component/NavBar';
import SignUp from './component/SignUp';
import Profile from './component/Profile';
import Home from './component/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from './component/AddProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/add-product' element={<AddProduct/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
