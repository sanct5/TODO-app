import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AccountCircle, Dashboard, Assignment } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NavOptions = () => {
  return (
    <React.Fragment>
      <ListItemButton component={Link} to="/app/task">
        <ListItemIcon>
          <Assignment />
        </ListItemIcon>
        <ListItemText primary="Tareas" />
      </ListItemButton>
      <ListItemButton component={Link} to="/app/dashboard">
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={Link} to="/app/profile">
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItemButton>
    </React.Fragment>
  )
}

export default NavOptions;