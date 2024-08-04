import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from'react';
import backendApi from './common/api';
import {toast} from 'react-toastify';
import Context from './context/index.js';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice.js';



function App() {
  
  const dispatch = useDispatch();
  const fetchUserData=async()=>{
    try {
      const response = await fetch(backendApi.current_user.url, {
        method:backendApi.current_user.method,
        credentials: 'include',
      });
      const data = await response.json();
      if(data.error){
        toast.error(data.message);
      }
      if(data.success){
        dispatch(setUserDetails(data.data));
      }
    } catch (error) {
      toast.error('Failed to fetch user data');
    }
  }

  useEffect(()=>{
    fetchUserData();
  },[]);

  return (
    <>
    <Context.Provider value={{
      fetchUserData
      }}>
      <ToastContainer />
      <Header></Header>
      <main className='min-h-[calc(100vh-400px)]'>
      <Outlet/>
      </main>
      <Footer></Footer>
    </Context.Provider>
    </>
  );
}

export default App;
