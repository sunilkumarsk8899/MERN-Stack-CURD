// import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import NavBar from './component/NavBar';
import SignUp from './component/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/add-product' element={<h1>Add Product Page</h1>} />
          <Route path='/profile' element={<h1>Profile Page</h1>} />
          <Route path='/' element={<h1>Home Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
