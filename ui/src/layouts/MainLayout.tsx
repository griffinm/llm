import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Menu } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LLM
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="flex flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
};