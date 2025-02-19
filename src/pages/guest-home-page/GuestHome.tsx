import {useSearchParams} from "react-router-dom";
import LoginDialog from "~/containers/login-dialog/LoginDialog";
import { useModalContext } from '~/context/modal-context'

const GuestHomePage = () => {
    const { openModal } = useModalContext()

    const [searchParams, setSearchParams] = useSearchParams()


    searchParams.get('login') !== null &&
    openModal({ component: <LoginDialog /> })

    return (
        <div>
            <h1>Guest Home Page</h1>
        </div>
    )
}
export default GuestHomePage
