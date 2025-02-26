import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {router} from "~/router/router";
import {Provider} from "react-redux";
import {store} from "~/redux/store";
import '~/styles/index.css'
import '~scss/styles.scss'
import '~/plugins/i18n'
import {setupInterceptors} from "~/services/setup-interceptors";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>,
)
setupInterceptors()
