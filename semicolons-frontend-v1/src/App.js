import logo from './logo.svg';
import './App.css';
import {Login} from './Components/Login/Login';
import {Dashboard} from './Components/Dashboard/Dashboard'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TablePaginationActions } from './Components/Recruit/TablePaginationActions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={
            <Login />
        }></Route>
        <Route path='/dashboard' element={
          <Dashboard />
      }></Route>
      <Route path='/allocation' element={
          <TablePaginationActions />
      }></Route>
      
      
        </Routes>
      
      </BrowserRouter>

  );
}

export default App;
