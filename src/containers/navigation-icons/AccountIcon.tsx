import { useMemo, useCallback, FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "~/hooks/use-redux";
import { AxiosResponse } from "axios";

import Tooltip from "@mui/material/Tooltip";
import UserAvatar from "~/design-system/components/user-avatar/UserAvatar";

// import { userService } from '~/services/user-service'
// import useAxios from '~/hooks/use-axios'
// import { defaultResponses } from '~/constants'

import { styles } from "~/containers/navigation-icons/NavigationIcons.styles";

//import { UpdatedPhoto, UserResponse, UserRole } from '~/types'
import { createUrlPath } from "~/utils/helper-functions";
//import { isUpdatedPhoto } from '~/utils/is-updated-photo'

import avatar from "~/assets/img/user-profile-page/avatar.png";
interface AccountIconProps {
  openMenu: (event: MouseEvent) => void;
}

const AccountIcon: FC<AccountIconProps> = ({ openMenu }) => {
  const { t } = useTranslation();
  const { userId, userRole } = useAppSelector((state) => state.appMain);

  // const getUserData: () => Promise<AxiosResponse<UserResponse>> = useCallback(
  //   () => userService.getUserById(userId, userRole as UserRole),
  //   [userId, userRole]
  // )

  // const {
  //   loading,
  //   response: { photo, firstName, lastName }
  // } = useAxios<UserResponse>({
  //   service: getUserData,
  //   fetchOnMount: true,
  //   defaultResponse: defaultResponses.object as UserResponse
  // })

  // const { photo: statePhoto } = useAppSelector((state) => state.editProfile)
  //
  // const avatarSrc = useMemo(() => {
  //   if (isUpdatedPhoto(statePhoto)) {
  //     return (statePhoto as UpdatedPhoto).src
  //   }
  //
  //   if (typeof statePhoto === 'string') {
  //     return createUrlPath(
  //       import.meta.env.VITE_APP_IMG_USER_URL || '',
  //       statePhoto
  //     )
  //   }
  //
  //   if (photo) {
  //     return createUrlPath(import.meta.env.VITE_APP_IMG_USER_URL || '', photo)
  //   }
  // }, [photo, statePhoto])
  //
  // if (loading) {
  //   return (
  //     <UserAvatar firstName='' lastName='' src='' sx={styles.accountIcon} />
  //   )
  // }

  return (
    <Tooltip
arrow title={t("iconsTooltip.account")}>
      <UserAvatar
        firstName="Pavlo"
        lastName="Butynets"
        onClick={openMenu}
        src={avatar}
        sx={styles.accountIcon}
        variant="photo"
      >
        {/*{!loading && firstName && lastName && `${firstName[0]}${lastName[0]}`}*/}
      </UserAvatar>
    </Tooltip>
  );
};

export default AccountIcon;
