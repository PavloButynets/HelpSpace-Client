import { useSearchParams } from "react-router-dom";
import LoginDialog from "~/containers/auth/login-dialog/LoginDialog";
import { useModalContext } from "~/context/modal-context";
import {useEffect} from "react";
import EmailConfirmModal from "~/containers/auth/email-confirm-modal/EmailConfirmModal";

const GuestHomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { openModal } = useModalContext()

    useEffect(() => {
        const confirmToken = searchParams.get('confirmToken')
        const resetToken = searchParams.get('resetToken')
        confirmToken &&
        openModal({
            component: (
                <EmailConfirmModal
                    confirmToken={confirmToken}
                    openModal={openModal}
                />
            )
        })
        searchParams.get('login') !== null &&
        openModal({ component: <LoginDialog /> })

        setSearchParams([])
    }, [searchParams, setSearchParams, openModal])
  return (
    <div>
      <h1 style={{ top: "100px" }}>Guest Home Page</h1>
    </div>
  );
};
export default GuestHomePage;
