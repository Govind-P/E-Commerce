import React from 'react';
import LoginImage from '../assets/signin.gif';
import { Link ,useNavigate} from 'react-router-dom';
import { useState,useContext,useEffect } from 'react';
import backendApi from '../common/api.js';
import { toast } from 'react-toastify';
import context from '../context/index.js';


const Login = () => {
    const navigate = useNavigate();
    const [data,setData]=useState({
        email:"",
        password:"",
    });
    const [errors, setErrors] = useState({ 
        email: '' ,
        password:''
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const {fetchUserData} = useContext(context);


    const handleOnChange=(e)=>{
        const {name,value}=e.target;
        setData((preve)=>{
            return {
                ...preve,
                [name]:value
            }
        })
    };

    const handleOnSubmit=async(e)=>{
        e.preventDefault();
        const  responseData=await fetch(backendApi.login.url,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          }
        );
        const response=await responseData.json();
        console.log(response);
        if(response.success){
          toast.success("Welcome "+response.user.name);
          navigate('/dashboard');
          fetchUserData();
        }
        else{
          toast.error(response.message);
        }        
    }

    const validateEmail = (email) => {
        if (!email) {
          return 'Email is required';
        } 
        return '';
      };

      const validatePassword = (password) => {
        if (!password) {
          return 'Password is required';
        }
        return '';
      };
    
      const handleBlur = (e) => {
        const { name, value } = e.target;
        let error = '';
        if (name === 'email') {
          error = validateEmail(value);
        }
        else if (name==='password') {
            error = validatePassword(value);
        }
        setErrors((prev) => ({
          ...prev,
          [name]: error
        }));
      };

      useEffect(() => {
        if (data.email && data.password) {
          setIsButtonDisabled(false);
        } else {
          setIsButtonDisabled(true);
        }
      }, [data]);


  return (
    <section id='login'>
        <div className='mx-auto  p-12 bg-blue-100'>
            <div className='bg-white px-8 py-12 max-w-md mx-auto '>
                <div className='w-20 h-20 mx-auto overflow-hidden rounded-full' >
                    <img src={LoginImage} alt='Login Icon' />
                </div>
                <form onSubmit={handleOnSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
                        <div>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-400 focus:shadow-outline' 
                        id='email' 
                        type='text' 
                        onChange={handleOnChange}
                        name='email'
                        value={data.email}
                        required
                        onBlur={handleBlur}
                        placeholder='Email' />
                        {errors.email && (
                            <p className='text-red-500 text-xs italic'>{errors.email}</p>
                        )}
                        </div>  
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
                        <div >
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-400 focus:shadow-outline ' 
                            id='password' 
                            type='password' 
                            onChange={handleOnChange}
                            value={data.password}
                            onBlur={handleBlur}
                            name='password'
                            required 
                            placeholder='Password' />
                        </div>
                        {errors.password && (
                            <p className='text-red-500 text-xs italic'>{errors.password}</p>
                        )}
                        <Link to='/forgotpassword' className=' py-2 ml-auto block w-fit hover:underline hover:text-blue-400'>Forgot Password?</Link>                    
                    </div>
                    <button className={`w-full justify-center px-4 py-1 rounded-lg bg-blue-500 hover:scale-105 transition-all 
                    ${isButtonDisabled ? 'opacity-70 cursor-not-allowed' : ''}` } 
                    type='submit' disabled={isButtonDisabled}>Login</button>
                </form>
                <div className='py-5 flex justify-center'>
                <p className='text-gray-500 text-1xs block text-center'>
                    <span >
                    Don't have an account?
                    </span>
                    <span className='ml-1 font-bold'>
                    <Link to='/signup' className='hover:underline hover:text-blue-400'>
                        Sign Up
                    </Link>
                    </span>
                </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login;