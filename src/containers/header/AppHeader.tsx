import { Link, matchPath, useLocation } from "react-router-dom";
//import { useAppSelector } from '~/hooks/use-redux'

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import LoginDialog from "~/containers/auth/login-dialog/LoginDialog";
import { useModalContext } from "~/context/modal-context";
import Button from "~scss-components/button/Button";
import { styles } from "~/containers/header/AppHeader.styles";
import { useAppSelector } from "~/hooks/use-redux";
import { useDrawer } from "~/hooks/use-drawer";
import UserIcons from "~/containers/navigation-icons/user-icons/UserIcons";
import AppDrawer from "~/components/app-drawer/AppDrawer";
import Sidebar from "~/containers/sidebar/Sidebar";
import { RouteItem, UserRoleEnum } from "~/types";
import { authRoutes } from "~/router/constants/authRoutes";
import { userRoutes } from "~/router/constants/userRoutes";
import ListItem from "@mui/material/ListItem";
import HashLink from "~/components/hash-link/HashLink";
import { t } from "i18next";
import List from "@mui/material/List";

const Navbar = () => {
  const { userRole } = useAppSelector((state) => state.appMain);
  const { openModal } = useModalContext();
  const { openDrawer, closeDrawer, isOpen } = useDrawer();
  const { pathname } = useLocation();

  const navigationItems = useMemo(() => {
    if (userRole === UserRoleEnum.User) {
      return Object.values(userRoutes.navBar) as RouteItem[];
    } else if (userRole === UserRoleEnum.Admin) {
      return Object.values(userRoutes.navBar) as RouteItem[];
    } else {
      return [] as RouteItem[];
    }
  }, [userRole]);

  const accountItems = useMemo(() => {
    if (userRole === UserRoleEnum.User || userRole === UserRoleEnum.Admin)
      return Object.values(authRoutes.accountMenu[userRole]);
    return [];
  }, [userRole]);

  const openLoginDialog = useCallback(() => {
    openModal({ component: <LoginDialog /> });
  }, [openModal]);

  const handleOpenSidebar = () => {
    openDrawer();
  };
  const navigationList = navigationItems.map((item, idx, array) => {
    const isLast = array.length - 1 === idx;
    const isActive = Boolean(matchPath(item.path, pathname));

    return (
      <Fragment key={item.route}>
        (
        <ListItem>
          <Typography
            component={HashLink}
            sx={styles.navItemText(isActive)}
            to={item.path}
          >
            {t(`header.${item.route}`)}
          </Typography>
        </ListItem>
        ){!isLast && <Typography sx={styles.divider}>{"/"}</Typography>}
      </Fragment>
    );
  });
  return (
    <AppBar
position="static" sx={{ backgroundColor: "white" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          component={Link}
          sx={{
            color: "#4BBF8D",
            textDecoration: "none",
            fontWeight: "bold",
            "&:hover": { color: "#3AA977" },
          }}
          to={userRoutes.navBar.homePage.path}
          variant="h5"
        >
          HelpSpace
        </Typography>{" "}
        <List sx={styles.navList}>{navigationList}</List>
        {userRole ? (
          <>
            <UserIcons setSidebarOpen={handleOpenSidebar} />
            <AppDrawer
onClose={closeDrawer} open={isOpen}
            >
              <Sidebar
                accountItems={accountItems}
                navigationItems={navigationItems}
                onClose={closeDrawer}
              />
            </AppDrawer>
          </>
        ) : (
          <Button
            onClick={openLoginDialog}
            size="md"
            sx={styles.loginButton}
            variant={"tonal"}
          >
            Увійти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
