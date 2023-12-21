import { Button, Stack, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const Register = () => {
    const [error, setError] = useState('')
    const [photo, setPhoto] = useState('')
    const { createUser, updateUserProfile, googleLogin } = useAuth();

    const handlePhotoChange = async e =>{
        e.preventDefault()
        console.log(e.target.files[0])
        const imageFile = { image: e.target.files[0]}
        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        const UploadedPhotoUrl = res.data.data.display_url
        // console.log(UploadedPhotoUrl)
        setPhoto(UploadedPhotoUrl)
    }
    
    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value
        const email = form.email.value;
        const password = form.password.value;

        
        if (password.length < 6) {
            setError('password must be at least 6 characters')
            return;
        }

        createUser(email, password)
            .then(res => {
                const loggedUser = res.user;
                console.log(loggedUser)
                updateUserProfile(name, photo)
                Swal.fire({
                    title: "Registration Successful!",
                    text: `welcome to TaskVibe`,
                    icon: "success"
                });
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage)
            })

        // console.log(name, email, password, photo )

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
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    

    return (
        <div>
            <div className="w-full min-h-[100vh] flex justify-center items-center px-6 md:px-0">
                <Stack direction={'column'} spacing={2} sx={{ minWidth: "30%", border: "2px solid", borderRadius: "8px", borderColor: "#1d383f", padding: '25px' }}>
                    <form onSubmit={handleRegister} className='flex flex-col gap-4'>
                        <h3 className="text-2xl font-semibold">Create account</h3>
                        <TextField
                            required
                            name="name"
                            label="Your Name"
                            type="text"
                            color="success"
                        />
                        <div>
                            <h1 className="text-green-700">Your photo</h1>
                            <input
                                className="mt-2 py-2 px-4 border rounded-lg bg-[#74f74c] cursor-pointer"
                                required
                                type="file"
                                src="" alt=""
                                onChange={(e)=>handlePhotoChange(e)}
                            />
                        </div>
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
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            color='success'
                            autoComplete="current-password"
                        />
                        <p className="text-red-700 font-semibold">{error}</p>
                        <Button sx={{ backgroundColor: "#1d383f", "&:hover": { backgroundColor: "#1d383f", color: "#74f74c" } }} type="submit" variant="contained" size="large">Register</Button>
                    </form>
                    <div className='space-y-4 mt-4'>
                        <p className='text-xl text-center text-[black]'>Already have account? <Link className=' font-bold text-[#1d383f] hover:underline' to='/login'> Login </Link>now</p>
                        <p className='text-center'>Or login with google</p>
                        <div className='flex justify-center'>
                            <Button onClick={handleGoogleLogin} variant='contained' sx={{ borderRadius: "50px", borderBottom: "6px solid #74f74c", backgroundColor: "#1d383f", '&:hover': { backgroundColor: "#1d383f", color: "#74f74c" } }} endIcon={<GoogleIcon />}>Google</Button>
                        </div>
                    </div>
                </Stack>

            </div>
        </div>
    );
};

export default Register;