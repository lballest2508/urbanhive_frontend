import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <Link to="/gestion_usuarios" style={{ color: '#1976D2', textDecoration: 'none', display: 'flex' }}>
                <ListItemIcon>
                    <PeopleIcon style={{ color: '#1976D2' }} />
                </ListItemIcon>
                <ListItemText primary="Gestión Usuarios" />
            </Link>
        </ListItemButton>
        <ListItemButton>
            <Link to="/gestion_genericas" style={{ color: '#1976D2', textDecoration: 'none', display: 'flex' }}>
                <ListItemIcon>
                    <ProductionQuantityLimitsIcon style={{ color: '#1976D2' }} />
                </ListItemIcon>
                <ListItemText primary="Gestión Productos" />
            </Link>
        </ListItemButton>
    </React.Fragment >
);
