import React from 'react'
import {useFormik} from 'formik'
import * as yup  from 'yup'
import axios from 'axios';
import { useLocation } from 'react-router-dom';






const ResetPassword = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const email = searchParams.get('email') ;
    console.log(token)
    console.log(email)
    const {values ,handleBlur, handleChange , handleSubmit  }= useFormik({
        initialValues : { password : "" , confirmPassword : ""  } , 
        validationSchema:yup.object().shape({password:yup.string().min(6).required() ,confirmPassword: yup.string().oneOf([yup.ref("password"), null]), 
       })
      , onSubmit : (values)=>{
       //put here axios
       axios.post('https://socialbenefitssamir.onrender.com/updatePassword', {
    email: email,
    token:token ,
    password: values.password
  })
  .then(response => {
  console.log(response.data);

  })
  .catch(error => {
    console.log(error.response.data.error);
  });

      } }); 


  return (
    <div className='   h-screen pt-10 w-screen items-center flex flex-col bg-pink-800 '>
      <form onSubmit={handleSubmit}  className=' w-200 flex flex-col justify-center items-center'>
        <input type="password" onBlur={handleBlur}  placeholder="password"  name="password" id="password" className='w-200 pl-2 placeholder-gray-900 bg-gray-400 m-2'  value={values.password} onChange={handleChange}/>
        <input type="password" onBlur={handleBlur}  placeholder="confirm password"  name="confirmPassword" id="confirmPassword" className='w-200 pl-2 placeholder-gray-900 bg-gray-400 m-2'  value={values.confirmPassword} onChange={handleChange}/>
        <button className='text-xl font-semibold rounded-lg bg-black px-2 mt-2 py-1  text-white' type="submit" >Reset </button>
      </form>
     
    </div>
  )
}

export default ResetPassword
