import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './Components/UI/NavigationBar';
import Home from './Pages/Home';
import { useState } from 'react';
import CustomerRegister from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Dashboard from './Pages/Dashboard';
import ShipmentForm from './Components/Shipments/ShipmentForm';
import ShipmentList from './Components/Shipments/ShipmentList';
import PrivateRoute from './Components/Auth/PrivateRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='min-h-screen w-full bg-gray-500 flex flex-col'>
      <NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div className="flex-grow flex justify-center items-center bg-[#94c2a7]">
        <div className="w-full max-w-7xl p-4">
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/aboutus' element={<Aboutus />} /> */}
            {/* <Route path='/contactus' element={<Contactus />} /> */}
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
            <Route path='/register' element={<CustomerRegister setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/dashboard' element={<PrivateRoute isLoggedIn={isLoggedIn}><Dashboard isLoggedIn={isLoggedIn} /></PrivateRoute>} />
            <Route path='/add-new-shipment-form' element={<ShipmentForm />} />
            <Route path='/shipment-list' element={<ShipmentList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
