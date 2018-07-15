import App from './components/app.jsx';
import Dashboard from './components/dashboard/dashboard.jsx';
import DashboardChartTime from './components/dashboard/dashboard.chart.time.jsx';


const routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                component: Dashboard,
            },
            {
                path: '/admin',
                component: Dashboard,
            },
            {
                path: '/admin/user',
                component: DashboardChartTime,
            },
        ],
    },
];

export default routes;
