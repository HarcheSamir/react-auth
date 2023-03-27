// Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect ,useState  } from 'react';
import axios from 'axios';
const Home = () => {
   const navigate = useNavigate();
   const [admin,setAdmin] = useState(false)
   useEffect(() => {
    const token = localStorage.getItem('token');

    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get('http://localhost:3005/verify', { headers, withCredentials: true })
      .then((response) => {
        console.log(response.data.email)
        if(response.data.email==="admin@com") setAdmin(true)
      })
      .catch((error) => {
        console.error(error.response.data);
       navigate('/signIn')
      });

      /*axios
      .post('http://localhost:3005/token', { token : localStorage.getItem('token')})
      .then((response) => {
        console.log(response.data.email +'other method')
        if(response.data.email==="admin@com") setAdmin(true)
      })
      .catch((error) => {
        console.error(error.response.data);
       //navigate('/signIn')
      });*/

  }, [navigate]);

  

  return (
    <div className='h-full w-screen bg-blue-900  flex flex-col pt-10 items-center'>
      {admin ? <h1 className='text-2xl text-white font-bold'>Welcome admin</h1> : <h1 className='text-2xl text-white font-bold'>Welcome to the home page</h1> }
      
      <button className='text-xl font-semibold rounded-lg bg-black px-2 mt-2 py-1  text-white' onClick={()=>{localStorage.removeItem('token');navigate('/signIn');} }>
        Logout</button>
    </div>
  );
};

export default Home;
