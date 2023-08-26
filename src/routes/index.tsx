import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import Login from '../login';
import { UserInfo } from '../userInfo';
// hooks

// config
// components

// ----------------------------------------------------------------------



export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: (

                <Login />
            ),
        },
        {
            path: '/info',
            element: (
                <UserInfo />
            ),
          },


    ]);
}


// const Page403 = Loadable(lazy(() => import('../pages/Page403')));
// const Page404 = Loadable(lazy(() => import('../pages/Page404')));
