import React from 'react'
import {useFormik} from 'formik'
import * as yup  from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';






const SignUp = () => {
  const navigate = useNavigate()
    
    const {values ,handleBlur, handleChange , handleSubmit  }= useFormik({
        initialValues : {email : "" , password : "" , confirmPassword : "" ,role:"" } , 
        validationSchema:yup.object().shape({email:yup.string().email().required() ,password:yup.string().min(6).required() ,confirmPassword: yup.string().oneOf([yup.ref("password"), null]), role: yup.string()
        .required()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(4, 'Must be exactly 5 digits')
        .max(4, 'Must be exactly 5 digits')})
      , onSubmit : (values)=>{
        axios.post('https://socialbenefitssamir.onrender.com/signup', {
        email: values.email,
        password: values.password ,
        role : values.role
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/home')
      })
      .catch(error => {
        console.error(error.response.data);
      });
      } }); 


  return (
    <div className='bg-red-900 h-screen pt-10 w-screen items-center flex flex-col '>
      <form onSubmit={handleSubmit}  className=' w-200 flex flex-col justify-center items-center'>
        <input onBlur={handleBlur}  placeholder="email"  name="email" id="email"  className='w-200 pl-2 placeholder-gray-900  bg-gray-400 m-2' value={values.email} onChange={handleChange}/>
        <input type="password" onBlur={handleBlur}  placeholder="password"  name="password" id="password" className='w-200 pl-2 placeholder-gray-900 bg-gray-400 m-2'  value={values.password} onChange={handleChange}/>
        <input type="password" onBlur={handleBlur}  placeholder="confirm password"  name="confirmPassword" id="confirmPassword" className='w-200 pl-2 placeholder-gray-900 bg-gray-400 m-2'  value={values.confirmPassword} onChange={handleChange}/>
        <input onBlur={handleBlur}  placeholder="role"  name="role" id="role" className='w-200 pl-2 placeholder-gray-900 bg-gray-400 m-2'  value={values.role} onChange={handleChange}/>
        <button className='text-xl font-semibold rounded-lg bg-black px-2 mt-2 py-1  text-white' type="submit" >Sign up</button>
      </form>
     
    </div>
  )
}

export default SignUp
