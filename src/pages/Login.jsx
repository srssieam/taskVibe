import GoogleIcon from '@mui/icons-material/Google';
import { Button, Stack, TextField } from "@mui/material";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { useState } from 'react';


const Login = () => {
    const [error, setError] = useState('')
    const { logIn, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    let toGo = location.state?.from?.pathname || "/"

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        logIn(email, password)
            .then(res => {
                const loggedUser = res.user;
                console.log(loggedUser)
                Swal.fire({
                    title: "Login successful!",
                    text: `Welcome back`,
                    icon: "success"
                });
                navigate(toGo, {replace:true});
            })
            .catch(error => {
                const errorMassage = error.message;
                console.log(errorMassage);
                setError(errorMassage)
            })

        console.log(email, password)

    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                const loggedUser = res.user;
                console.log(loggedUser);
                Swal.fire({
                    title: "Login successful!",
                    text: `Welcome back`,
                    icon: "success"
                });
                navigate(toGo, {replace:true});
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    return (
        <div className="w-full min-h-[100vh] flex justify-center items-center px-6 md:px-0">
            <Stack direction={'column'} spacing={2} sx={{ minWidth: "40%", border: "2px solid", borderRadius: "8px", borderColor: "#1d383f", padding: '25px' }}>
                <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                    <h3 className="text-2xl font-semibold">Login</h3>
                    <TextField
                        required
                        name="email"
                        label="Email"
                        type="email"
                        color="success"
                    />
                    <TextField
                        required
                        name="password"
                        label="Password"
                        type="password"
                        color='success'
                        autoComplete="current-password"
                    />
                    <p className="text-red-700 font-semibold">{error}</p>
                    <Button sx={{ backgroundColor: "#1d383f", "&:hover": { backgroundColor: "#1d383f", color: "#74f74c" } }} type="submit" variant="contained" size="large">Login</Button>
                </form>
                <div className='space-y-4 mt-4'>
                    <p className='text-xl text-center text-[black]'>New here? <Link className=' font-bold text-[#1d383f] hover:underline' to='/register'> Create account </Link></p>
                    <p className='text-center'>Or login with google</p>
                    <div className='flex justify-center'>
                        <Button onClick={handleGoogleLogin} variant='contained' sx={{ borderRadius: "50px", borderBottom: "6px solid #74f74c", backgroundColor: "#1d383f", '&:hover': { backgroundColor: "#1d383f", color: "#74f74c" } }} endIcon={<GoogleIcon />}>Google</Button>
                    </div>
                </div>
            </Stack>

        </div>
    );
};

export default Login;