import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Link } from 'react-router-dom';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavBar } from "../hooks/NavBar";
import { mainListItems } from "../hooks/mainListItems";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Urban Hive
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const cardStyles = {
    backgroundColor: "#f2f2f2",
    borderRadius: "8px",
    boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
    padding: "16px",
    transition: "transform 0.2s", // Agrega una transición al efecto

    img: {
        maxWidth: "100%",
        maxHeight: "100px",
        display: "block",
        margin: "0 auto",
    },
};

const cardFooterStyles = {
    backgroundColor: "#1976D2", // Color azul para la barra
    height: "6px",
    borderBottomLeftRadius: "8px", // Añade bordes redondeados en la esquina inferior izquierda
    borderBottomRightRadius: "8px", // Añade bordes redondeados en la esquina inferior derecha
};

const handleMouseEnter = (event) => {
    event.currentTarget.style.transform = "scale(1.05)"; // Escala la tarjeta al pasar el mouse
};

const handleMouseLeave = (event) => {
    event.currentTarget.style.transform = "scale(1)"; // Restaura el tamaño original al quitar el mouse
};

const linkStyle = {
    color: "white", // Cambia el color del texto del enlace a blanco
    textDecoration: "none", // Quita la subraya predeterminada del enlace
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const HomePage = () => {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <NavBar open={open} toggleDrawer={toggleDrawer} />
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer} style={{color: 'primary'}}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">{mainListItems}</List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Grid container spacing={0} justifyContent='center' sx={{ marginTop: '140px', gap: '3rem' }}>
                        <Link to="/gestion_usuarios" style={linkStyle}>
                            <Grid item md={12}>
                                <Card
                                    style={cardStyles}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <CardContent className="card-content">
                                        <img
                                            src="src/imagenes/gestion_usuarios.png"
                                            alt="Finanzas"
                                            style={cardStyles.img}
                                        />
                                        <Typography variant="h5" component="h2">
                                            Gestión de usuarios
                                        </Typography>
                                    </CardContent>
                                    <div style={cardFooterStyles} className="card-footer"></div>
                                </Card>
                            </Grid>
                        </Link>
                        <Link to="/gestion_genericas" style={linkStyle}>
                            <Grid item md={12}>
                                <Card
                                    style={cardStyles}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <CardContent className="card-content">
                                        <img
                                            src="src/imagenes/gestion_productos.png"
                                            alt="Finanzas"
                                            style={cardStyles.img}
                                        />
                                        <Typography variant="h5" component="h2">
                                            Gestión de productos
                                        </Typography>
                                    </CardContent>
                                    <div style={cardFooterStyles} className="card-footer"></div>
                                </Card>
                            </Grid>
                        </Link>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
};
