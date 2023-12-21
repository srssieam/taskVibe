import { Box, Stack } from "@mui/material";
import menwithlaptop from "../assets/menwithlaptop.png"
import { Link } from "react-router-dom";

const Why = () => {
    return (
        <div className="px-4 lg:px-0">
            <h1 className="text-4xl font-semibold text-[#1d383f] text-center mt-9">Why TaskVibe ?</h1>
            <Stack maxWidth="lg" marginX="auto" direction={{ xs: 'column', sm: 'row' }} paddingY={5} justifyContent="space-between" spacing={{xs:"20px", sm:"60px"}} alignItems="center">
                <Box  sx={{display:"flex", justifyContent:"center", border:"2px solid #1d383f", padding:"25px", alignItems:"center"}}>
                    <img className="md:max-w-[300px] border-2 border-[#1d383f]" src={menwithlaptop} alt="" />
                </Box>
                <Box  className="space-y-6">
                    <p className="text-lg font-semibold text-[#1d383f]">TaskVibe simplifies your workflow, ensuring seamless task management and enhanced productivity. Experience the ease of organizing, collaborating, and accomplishing goals effortlessly.</p>
                    <ul className="list-disc ml-4">
                        <li><strong>Free & Accessible: </strong>TaskVibe is free to use, making it accessible for everyone to boost their productivity without any cost barriers.</li>
                        <li><strong>Cross-Platform Compatibility: </strong>Access TaskVibe on various devices - desktop, mobile, or tablet - ensuring productivity on the go.</li>
                        <li><strong>Data Security: </strong>TaskVibe prioritizes data security, ensuring your information remains safe and confidential.</li>
                    </ul>
                    <div className="flex justify-center md:justify-normal">
                        <Link to='/dashboard'>
                            <button className="text-2xl text-[#1d383f] transition-transform hover:scale-110 font-semibold rounded-[50px] border-b-[6px] border-b-[#1d383f] py-2 px-5 bg-gradient-to-r from-[#48ffd7] to-[#74f74c] hover:bg-gradient-to-l ">Let's Explore</button>
                        </Link>
                    </div>
                </Box>



            </Stack>
        </div>
    );
};

export default Why;