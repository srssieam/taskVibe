import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const MainLayout = () => {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>

                <Navbar></Navbar>
                <div className="min-h-[90vh]">
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </DndProvider>
        </div>
    );
};

export default MainLayout;