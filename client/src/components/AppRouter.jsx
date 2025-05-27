import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../Routes/Utils.js";
import {Context} from "../main.jsx";

import Admin from "../pages/Admin.jsx";
import Auth from "../pages/Auth.jsx";
import Shop from "../pages/Shop.jsx";
import Basket from "../pages/Basket.jsx";
import DevicePage from "../pages/DevicePage.jsx";


const AppRouter = () => {
    const {user} = useContext(Context);
    const authRoutes = [
        {
            path: ADMIN_ROUTE,
            component: <Admin/>,
        },
        {
            path: BASKET_ROUTE,
            component: <Basket/>,
        }
    ]

    const publicRoutes = [
        {
            path: SHOP_ROUTE,
            component: <Shop/>,
        },
        {
            path: LOGIN_ROUTE,
            component: <Auth/>,
        },
        {
            path: REGISTRATION_ROUTE,
            component: <Auth/>,
        },
        {
            path: DEVICE_ROUTE + '/:id',
            component: <DevicePage/>,
        }
    ]

    return (
      <Routes>
          {user.isAuth && authRoutes.map(({path, component}) => (
              <Route path={path} key={path} element={component} exact/>
          ))}

          {publicRoutes.map(({path, component}) => (
              <Route path={path} key={path} element={component} exact/>
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    );
};

export default AppRouter;