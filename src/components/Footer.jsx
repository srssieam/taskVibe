import { Button, Container, IconButton } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Instagram } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
    const navItems = [
        {
            route: "Home",
            pathname: "/",
        },
        {
            route: "Tasks",
            pathname: "/tasks"
        },
        {
            route: "Dashboard",
            pathname: "/dashboard"
        },
        {
            route: "Calender",
            pathname: "/calender"
        },
    ];
    return (
        <div className="bg-[#1d383f] py-16">
            <Container maxWidth="lg">
                <div className="grid md:grid-cols-3">
                    <div className="lg:space-y-4">
                        <h3 className='text-5xl font-bold text-[#48ffd7]'>Task<span className='text-[#74f74c]'>Vibe</span></h3>
                        <h3 className="text-gray-400"><strong>Email: </strong>taskvibe@gmail.com</h3>
                        <h3 className="text-gray-400"><strong>tel: </strong>++05659564656</h3>
                        <IconButton sx={{ color: 'white' }}>
                            <FacebookIcon></FacebookIcon>
                        </IconButton>
                        <IconButton sx={{ color: 'white' }}>
                            <TwitterIcon></TwitterIcon>
                        </IconButton>
                        <IconButton sx={{ color: 'white' }}>
                            <YouTubeIcon></YouTubeIcon>
                        </IconButton>
                        <IconButton sx={{ color: 'white' }}>
                            <LinkedInIcon></LinkedInIcon>
                        </IconButton>
                        <IconButton sx={{ color: 'white' }}>
                            <Instagram></Instagram>
                        </IconButton>
                    </div>
                    <div className="text-start ">
                        <h1 className="text-xl text-gray-200 underline mb-5">Pages</h1>
                        {navItems.map((item) => (
                            <Link className="text-gray-200 font-semibold text-md hover:text-[#74f74c]" key={item} href={item.pathname}>
                                {item.route}<br />
                            </Link>
                        ))}
                    </div>
                    <div>
                        <h1 className="text-xl text-gray-200 underline mb-5">Subscribe</h1>
                        <div className=" border-2 border-[#74f74c] rounded-[50px] overflow-hidden w-[280px] md:w-full flex justify-between">
                            <input type="text" placeholder="Type your email" className="px-3 py-3 bg-[#153036] md:w-[130px] flex-1 rounded-r-[50px]  text-white outline-none " />
                            <button className="lg:text-2xl text-[#1d383f] font-semibold rounded-[50px] p-3 md:py-2 md:px-5 bg-gradient-to-r from-[#48ffd7] to-[#74f74c] hover:bg-gradient-to-l ">Send</button>
                        </div>
                    </div>
                </div>
            </Container>

        </div>
    );
};

export default Footer;