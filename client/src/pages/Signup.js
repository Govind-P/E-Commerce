import React, { useState,useEffect } from 'react';
import LoginImage from '../assest/signin.gif';
import { Link } from 'react-router-dom';
import ImageToBase64 from '../helper/ImageToBase64';

const Signup = () => {
  const [data,setData]=useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    phone:'',
    profileImage:'',
  });
  const [errors,setErrors]=useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    phone:'',
  });
  const [isButtonDisabled,setIsButtonDisabled]=useState(true);


  const handleOnChange=(e)=>{
    const {name,value}=e.target;
    setData((prev)=>{
      return (
        {
          ...prev,
          [name]:value
        }
      )
    });
  };

  const handleUploadPic=async (e)=>{
    const file=e.target.files[0];
    const base64=await ImageToBase64(file);
    console.log(base64);
    if(base64){
      setData((prev)=>{
        return (
          {
           ...prev,
            profileImage:base64
          }
        )
      });
    }
  }

  const handleOnSubmit=(e)=>{
    e.preventDefault();
    if(data.password!==data.confirmPassword){
      setErrors((prev)=>({
        ...prev,
        confirmPassword: 'Password not matching'
      }))
    }
    else{
      console.log(data);
    }
    
  }

  const validateEmail=(email)=>{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email){
      return 'Required email'
    }
    else if (!emailPattern.test(email)) {
      return 'Invalid email format';
    }
    return  '';
  }

  const validateName=(name)=>{
    if(!name){
      return 'Required name'
    }
    return  '';
  }

  const validatePassword=(password)=>{
    if(!password){
      return 'Required password'
    }
    return  '';
  }

  const validateConfirmPasssword=(confirmPassword)=>{
    if(!confirmPassword){
      return 'Required password'
    }
    return  '';
  }
  const validatePhone=(phone)=>{
    const phonePattern=/^[1-9]\d{9}$/;
    if(!phone){
      return 'Required Phone No.'
    }
    else if (!phonePattern.test(phone)) {
      return 'Invalid Phone No';
    }
    return  '';
  }


  const handleBlur=(e)=>{
    const {name,value}=e.target;
    let error='';
    switch (name){
      case 'email' : error=validateEmail(value);
                      break;
      case 'name' : error=validateName(value);
                      break;
      case 'phone' : error=validatePhone(value);
                      break;
      case 'password' : error=validatePassword(value);
                      break;
      case 'confirmPassword' : error=validateConfirmPasssword(value);
                      break;                      
    };
    setErrors((prev)=>(
      {
        ...prev,
        [name]:error
      }
    ));
  }
   
  
  useEffect(()=>{
    if(!errors.name && !errors.email && !errors.phone && !errors.password && !errors.confirmPassword && data.name && data.phone && data.password && data.confirmPassword && data.email){
      setIsButtonDisabled(false);
    }
    else{
      setIsButtonDisabled(true);
    }
  },[data,errors]);


  return (
    <section id="signup">
      <div className="mx-auto p-4 bg-blue-100">
        <div className=' bg-white mx-auto max-w-md px-8 py-5'>
          <div className='w-20 h-20 mx-auto overflow-hidden rounded-full relative'>
            <div>
              <img src={data.profileImage || LoginImage} alt='login icons'/>
            </div>
            <form>
              <label>
                <div className='text-xs font-thin bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic}/>
              </label>
            </form>           
          </div>
          <form onSubmit={handleOnSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name</label>
              <div>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-400 focus:shadow-outline' 
                  id='name' 
                  type='text' 
                  onChange={handleOnChange}
                  name='name'
                  maxLength={50}
                  value={data.name}
                  required
                  onBlur={handleBlur}
                  placeholder='Name' />
                  {errors.name && (
                    <p className='text-red-500 text-xs italic'>{errors.name}</p>
                  )}
              </div>  
            </div> 
            <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
              <div>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-400 focus:shadow-outline' 
                  id='email' 
                  type='text' 
                  onChange={handleOnChange}
                  name='email'
                  value={data.email}
                  maxLength={50}
                  required
                  onBlur={handleBlur}
                  placeholder='Email' />
                  {errors.email && (
                    <p className='text-red-500 text-xs italic'>{errors.email}</p>
                  )}
              </div>  
            </div>
            <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>Phone No.</label>
              <div>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-400 focus:shadow-outline' 
                  id='phone' 
                  type='text' 
                  onChange={handleOnChange}
                  name='phone'
                  minLength={10}
                  maxLength={10}
                  value={data.phone}
                  required
                  onBlur={handleBlur}                  
                  placeholder='Phone' />
                  {errors.phone && (
                    <p className='text-red-500 text-xs italic'>{errors.phone}</p>
                  )}
              </div>  
            </div>
            <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
              <div>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-400 focus:shadow-outline' 
                  id='password' 
                  type='password' 
                  onChange={handleOnChange}
                  name='password'
                  value={data.password}
                  minLength={10}
                  maxLength={50}
                  required
                  onBlur={handleBlur}
                  pattern='^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$'
                  title='Password must contain minimum 10 characters with at least one capital letter, one special character, and one number'
                  placeholder='Password' />
                  {errors.password && (
                    <p className='text-red-500 text-xs italic'>{errors.password}</p>
                  )}
              </div>  
            </div>
            <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='confirmPassword'>Confirm Password</label>
              <div>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-400 focus:shadow-outline' 
                  id='confirmPassword' 
                  type='password' 
                  onChange={handleOnChange}
                  name='confirmPassword'
                  value={data.confirmPassword}
                  required
                  pattern='^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$'
                  title='Password must contain at least one capital letter, one special character, and one number'
                  onBlur={handleBlur}
                  placeholder='Confirm Password' />
                  {errors.confirmPassword && (
                    <p className='text-red-500 text-xs italic'>{errors.confirmPassword}</p>
                  )}
              </div>  
            </div>
            <button className={`w-full justify-center px-4 py-1 rounded-lg bg-blue-500 hover:scale-105 transition-all 
            ${isButtonDisabled ? 'opacity-70 cursor-not-allowed' : ''}` } 
            type='submit' disabled={isButtonDisabled}>Signup</button>        
          </form>
            <div className='py-5 flex justify-center'>
              <p className='text-gray-500 text-1xs block text-center'>
                <span >
                  Already have an account?
                </span>
                <span className='ml-1 font-bold'>
                <Link to='/login' className='hover:underline hover:text-blue-400'>
                  Login
                </Link>
                </span>
              </p>
            </div>
        </div>
      </div>
    </section>
  )
}


export default Signup;