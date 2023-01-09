import 'virtual:svg-icons-register';
import './style.less';
import 'animate.css';
import {
    setupYunzai,
    Vpp,
    StartupService, setupYunzaiActGuard
} from 'velon';
import { languages } from './locales';
import { loginForm } from '../account';
import { BlankRoutes, LayoutRoutes } from './routes/routes';

const bootstrap = async () => {
    const app = createApp(Vpp);
    setupYunzai({
        app: app,
        config: {
            base: {
                systemCode: import.meta.env.VITE_SYSTEM_CODE,
                publicPath: import.meta.env.VITE_PUBLIC_PATH,
                url: import.meta.env.VITE_BASE_URL,
                loginForm: loginForm()
            },
            cache: { mode: 'none' },
            auth: {
                token_send_key: 'Authorization',
                token_send_template: 'Bearer ${token}'
            },
            http: {
                withCredentials: true,
                ignore_prefix: [/api/]
            },
            routes: {
                history: import.meta.env.VITE_ROUTE_TYPE,
                ignore: [/401/, /404/, /500/, /register/],
                home: {
                    name: import.meta.env.VITE_ROUTE_HOME_NAME,
                    path: import.meta.env.VITE_ROUTE_HOME_PATH,
                    redirect: import.meta.env.VITE_ROUTE_HOME_REDIRECT
                },
                layout: LayoutRoutes,
                blank: BlankRoutes
            },
            i18n: {
                languages: [
                    { label: '中文', value: 'zhCN', icon: 'openmoji:flag-china' },
                    { label: 'English', value: 'enUS', icon: 'openmoji:flag-us-outlying-islands' }
                ],
                options: { locale: 'zhCN', fallbackLocale: 'enUS', messages: languages }
            },
            tab: {
                cache: true,
                disable: true
            }
        }
    });
    await new StartupService().load().then(() => {
        setupYunzaiActGuard();
        app.mount('#app');
    });
};


await bootstrap();
