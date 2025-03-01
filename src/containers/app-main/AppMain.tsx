import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Box from "@mui/material/Box";

import { useAppDispatch, useAppSelector } from "~/hooks/use-redux";
//import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'
import AppBreadCrumbs from "~/containers/app-breadcrumbs/AppBreadCrumbs";

//import ScrollToTopButton from '~/components/scroll-to-top-button/ScrollToTopButton'
import Loader from "~/components/loader/Loader";
import { checkAuth } from "~/redux/reducer";

import { styles } from "~/containers/app-content/AppContent.styles";

const AppMain = () => {
  const mainFooter = useRef(null);
  const authCheckRef = useRef(false);
  const { loading } = useAppSelector((state) => state.appMain);
  const { state } = useNavigation();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    !authCheckRef.current && void dispatch(checkAuth());

    return () => {
      authCheckRef.current = true;
    };
  }, [dispatch]);

  if (loading || state === "loading") {
    return <Loader pageLoad />;
  }

  return (
    <Box ref={mainFooter} sx={styles.content}>
      <Suspense fallback={<Loader pageLoad />}>
        <AppBreadCrumbs />
        {/*<ScrollToTop element={mainWithFooter} />*/}
        <Outlet context={{ pageRef: mainFooter }} />
        {/*<ScrollToTopButton element={mainWithFooter} />*/}
      </Suspense>
    </Box>
  );
};

export default AppMain;
