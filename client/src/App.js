import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <>
    <Header></Header>
    <main className='min-h-[calc(100vh-400px)]'>
    <Outlet/>
    </main>
    <Footer></Footer>
    </>
  );
}

export default App;
