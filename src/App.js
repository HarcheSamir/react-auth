import { BrowserRouter as Router, Routes, Route, Link   } from 'react-router-dom';
import SignIn from './componants/SignIn';
import SignUp from './componants/SignUp';
import Home from './componants/Home';
import axios  from 'axios';
import { useEffect  } from 'react';



function App() {

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get('http://localhost:3005/verify', { headers, withCredentials: true })
      .then((response) => {
        console.log(response.data.email)
        if (window.location.pathname === '/' ||window.location.pathname === '/signIn')
        window.location.replace('/home');
      })
      .catch((error) => {
        console.error(error.response.data);
       
      });
  }, []);


  return (
    <div className="App h-screen bg-neutral-400">
      <Router>
        <div className='p-3 flex flex-row items-center w-full justify-center mx-5'>
          <Link className='text-lg mx-5 font-bold'  to='/signUp'>SignUp</Link>
          <Link className='text-lg mx-5 font-bold' to='/signIn'>SignIn</Link>
        </div>
        <Routes>
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
