
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const navItems = [
    {
        route: "Home",
        pathname: "/"
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
    }
]


const settings = ['Profile'];


const Navbar = () => {
    const { user, logOut } = useAuth()
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Logged Out!",
                    text: "You have been logged out successfully.",
                    icon: "success"
                });
            })
    }
    return (
        <AppBar position="static" sx={{ backgroundColor: "#1d383f", height: { xs: '60px', sm: '70px' }, }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <h3 className='text-2xl font-bold text-[#48ffd7] hidden lg:block mr-8'>Task<span className='text-[#74f74c]'>Vibe</span></h3>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {navItems.map((navmenu, idx) => (
                                <NavLink to={navmenu.pathname} key={idx} >
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{navmenu.route}</Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                        </Menu>
                    </Box>
                    <h3 className='text-2xl font-bold text-[#48ffd7] text-center lg:hidden mr-8'>Task<span className='text-[#74f74c]'>Vibe</span></h3>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {navItems.map((navmenu, idx) => (
                            <NavLink className="navLink" to={navmenu.pathname} key={idx}>
                                {({ isActive }) => (
                                    <button
                                        className={isActive ? " border-b-[4px] rounded-[50px] p-[6px] border-[#74f74c] text-[#48ffd7] my-2 mx-4" : " my-2 mx-4 p-2 text-white"}
                                        onClick={handleCloseNavMenu}

                                    >
                                        {navmenu.route}
                                    </button>
                                )}
                            </NavLink>
                        ))}
                    </Box>

                    {
                        user ? <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={user.photoURL} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                                <MenuItem onClick={() => {
                                    logOut();
                                    handleCloseUserMenu();
                                }}>
                                    <Typography onClick={handleLogOut} textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box> :
                            <Link to='/login'><Button sx={{ color: "white", fontWeight: "500", border: "1px solid #74f74c" }}>Login</Button></Link>
                    }



                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;