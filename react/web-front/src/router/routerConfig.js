import HomePage from '../views/home';
import ProductPage from '../views/product';
import LoginPage from '../views/login';
import ErrorPage from '../views/error';

export const routerConfig = [
    {
        path: '/',
        component: HomePage,
        auth: true,
    },
    {
        path: '/home',
        component: HomePage,
        auth: true,
    },
    {
        path: '/list',
        component: ProductPage,
        auth: true,
    },
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path: '/404',
        component: ErrorPage
    }
];