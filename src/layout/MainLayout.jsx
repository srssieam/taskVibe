import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { Container } from "@mui/material";


const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Container maxWidth="lg">
                <Outlet></Outlet>
            </Container>

        </div>
    );
};

export default MainLayout;