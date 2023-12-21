import GoogleIcon from '@mui/icons-material/Google';
import { Button, Stack, TextField } from "@mui/material";
import { Link } from 'react-router-dom';


const Login = () => {
    return (
        <div className="w-full min-h-[100vh] flex justify-center items-center px-6 md:px-0">
            <Stack direction={'column'} spacing={2} sx={{ minWidth: "30%", border: "2px solid", borderRadius: "8px", borderColor: "#1d383f", padding: '25px' }}>
                <form className='flex flex-col gap-4'>
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
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        color='success'
                        autoComplete="current-password"
                    />
                    <Button sx={{backgroundColor:"#1d383f", "&:hover": { backgroundColor:"#1d383f", color:"#74f74c"} }} type="submit" variant="contained" size="large">Login</Button>
                </form>
                <div className='space-y-4 mt-4'>
                    <p className='text-xl text-center text-[black]'>New here? <Link className=' font-bold text-[#1d383f] hover:underline' to='/register'> create account </Link></p>
                    <p className='text-center'>Or login with google</p>
                    <div className='flex justify-center'>
                        <Button variant='contained' sx={{borderRadius:"50px", borderBottom:"6px solid #74f74c", backgroundColor:"#1d383f", '&:hover': { backgroundColor:"#1d383f", color:"#74f74c" }}}  endIcon={<GoogleIcon />}>Google</Button>
                    </div>
                </div>
            </Stack>

        </div>
    );
};

export default Login;