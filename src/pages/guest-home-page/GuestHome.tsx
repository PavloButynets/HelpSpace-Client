import {useSearchParams} from "react-router-dom";
import LoginDialog from "~/containers/auth/login-dialog/LoginDialog";
import { useModalContext } from '~/context/modal-context'

const GuestHomePage = () => {
    return (
        <div>
            <h1 style={{ top: '100px' }}>Guest Home Page</h1>
        </div>
    )
}
export default GuestHomePage
