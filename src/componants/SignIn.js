import React from 'react'
import {useFormik} from 'formik'
import * as yup  from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
 
    const navigate = useNavigate()
  const {values ,handleBlur, handleChange , handleSubmit  }= useFormik({
    initialValues : {email : "" , password : "" } , 
    validationSchema:yup.object().shape({email:yup.string().email().required() ,password:yup.string().min(6).required() })
  , onSubmit : (values)=>{axios.post('http://localhost:3005/login', {
    email: values.email,
    password: values.password
  })
  .then(response => {
  
    console.log(response.data);
   localStorage.setItem('token', response.data.token);
   localStorage.setItem('id', response.data.id);
   console.log(response.data.token);
    console.log(response.data.id)
    navigate('/home')
  })
  .catch(error => {
    console.log(error.response.data.error);
  });
  } }); 


return (
<div className='bg-green-900 pt-10 h-screen w-screen items-center flex flex-col'>
  <form onSubmit={handleSubmit}  className=' w-200 flex flex-col justify-center items-center'>
    <input onBlur={handleBlur} placeholder="email"   name="email" id="email"  className='w-200 pl-2 placeholder-gray-900  bg-gray-400 m-2' value={values.email} onChange={handleChange}/>
    <input  type="password" onBlur={handleBlur} placeholder="password"  name="password" id="password" className=' pl-2 placeholder-gray-900 w-200 bg-gray-400 m-2'  value={values.password} onChange={handleChange}/>
    <button className='text-xl font-semibold rounded-lg bg-black px-2 mt-2 py-1  text-white' type="submit" >Sign in</button>
  </form>
 
</div>
)
}

export default SignIn
