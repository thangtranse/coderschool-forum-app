// React
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
// MUI
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

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
        <Tooltip title="Trang cá nhân">
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
        </Tooltip>
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
