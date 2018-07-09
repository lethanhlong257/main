import App from './components/App/App';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard';

const routes = [
    {
        component: App,
        routes: [
            {
                path: '/admin',
                exact: true,
                component: Login,
            },
            {
                path: '/admin/dashboard',
                component: Dashboard,
            },
        ],
    },
];

export default routes;
