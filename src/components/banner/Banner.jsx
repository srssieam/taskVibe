import { Box, Button, Stack } from "@mui/material";
import bannerImg from "../../assets/bannerimg.png"
import "./bannerStyle.css"
const Banner = () => {
    return (
        <div className="py-10 md:py-0">
            <Stack height="70vh" direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={3} alignItems="center">
                <Box flex={1} className="space-y-4">
                    <h1 className="textDesign text-center md:text-left text-2xl md:text-3xl lg:text-5xl font-bold text-[#1d383f]">Elevate Your Efficiency,<br /> One Task at a Time!</h1>
                    <p className="lg:text-2xl text-center md:text-left font-semibold text-[#1d383f]">Unlock Your Potential with TaskVibe: Where Productivity Meets Harmony!</p>
                    <div className="flex justify-center md:justify-normal">
                        <button className="text-2xl text-[#1d383f] transition-transform hover:scale-110 font-semibold rounded-[50px] border-b-[6px] border-b-[#1d383f] py-2 px-5 bg-gradient-to-r from-[#48ffd7] to-[#74f74c] hover:bg-gradient-to-l ">Let's Explore</button>
                    </div>
                </Box>
                <Box flex={1}>
                    <img src={bannerImg} alt="" />
                </Box>


            </Stack>

        </div>
    );
};

export default Banner;