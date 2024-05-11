import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

const allowedCrispPath = ['/'];

const Crisp = () => {

    const location = useLocation();
    const pathname = location.pathname;


    useEffect(() => {
        if (!window) {
            return;
        }

        if (!allowedCrispPath.includes(pathname)) {
            window.$crisp = [];
            window.CRISP_WEBSITE_ID = null;
        } else {
            window.$crisp = [];
            window.CRISP_WEBSITE_ID = '70f45169-2196-4b64-b552-2f7823f78aca';
            const script = document.createElement('script');
            script.src = 'https://client.crisp.chat/l.js';
            script.async = true;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [pathname]);

    return null; 
};

export default Crisp;