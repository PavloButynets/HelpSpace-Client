import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import HashLink from "~/components/hash-link/HashLink";

import { useModalContext } from "~/context/modal-context";
import { guestRoutes } from "~/router/constants/guestRoutes";
import LoginDialog from "~/containers/auth/login-dialog/LoginDialog";
//import GoogleButton from '~/containers/guest-home/google-button/GoogleButton'

import { styles } from "~/containers/auth/google-login/GoogleLogin.styles";
import Button from "~scss-components/button/Button";
import SignupDialog from "~/containers/auth/signup-dialog/SignupDialog";

interface GoogleLoginProps {
  type: "signup" | "login";
  buttonWidth: string;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ type, buttonWidth }) => {
  const { t, i18n } = useTranslation();
  const { openModal, closeModal } = useModalContext();

  const openLoginDialog = () => {
    closeModal();
    openModal({ component: <LoginDialog /> });
  };

  const openDialog = () => {
    openModal({ component: <SignupDialog /> });
  };

  const currentLanguage = i18n.language;

  return (
    <Box sx={styles.googleForm}>
      <Box sx={styles.linesBox}>
        <Typography
sx={styles.continue} variant="body2">
          або продовжити
        </Typography>
      </Box>

      {/*<GoogleButton*/}
      {/*  buttonWidth={buttonWidth}*/}
      {/*  role={role}*/}
      {/*  route={whatCanYouDo.path}*/}
      {/*  type={type}*/}
      {/*/>*/}
      <Button> Google auth</Button>
      <Box
        sx={{
          ...styles.haveAccount,
          ...(currentLanguage === "uk" && type !== "signup"
            ? styles.haveAccountUa
            : {}),
        }}
      >
        <Typography
sx={{ pr: 1 }} variant="body2">
          {t(`${type}.haveAccount`)}
        </Typography>

        {type === "signup" ? (
          <Typography
            onClick={openLoginDialog}
            sx={styles.underlineText}
            variant="body2"
          >
            Увійти!
          </Typography>
        ) : (
          <Typography
            onClick={openDialog}
            sx={{
              ...styles.underlineText,
              ...(currentLanguage === "uk" ? styles.underlineTextUa : {}),
            }}
            variant="body2"
          >
            Приєднуйтесь до нас безкоштовно
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default GoogleLogin;
