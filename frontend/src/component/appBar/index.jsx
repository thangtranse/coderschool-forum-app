// React
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
// MUI
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";

const drawerWidth = 240;

function AppBarComponent({ children, ...props }) {
  const { window } = props;

  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleDirectMyFeeds = () => {
    navigate("/news/my-feeds");
  };

  const handleLogout = () => {
    navigate("/news/my-feeds");
  };

  const handleDirectNews = () => {
    navigate("/news");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{ my: 2, cursor: "pointer" }}
        onClick={() => handleDirectNews()}
      >
        CoderSchool Forum
      </Typography>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => handleDirectMyFeeds()}
            >
              <AccountCircle />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Trang cá nhân" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => handleLogout()}
            >
              <LogoutIcon />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </ListItemButton>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  console.log("re-render AppBarComponent");
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                cursor: "pointer",
              }}
              onClick={() => handleDirectNews()}
            >
              CoderSchool Forum
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Tooltip title="Trang cá nhân">
                <IconButton
                  size="large"
                  aria-label="current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => handleDirectMyFeeds()}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Tooltip title="Đăng xuất">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => handleLogout()}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}

export default memo(AppBarComponent);
