import React from 'react';
import {Routes, Route} from 'react-router-dom';

// Pages
import SignUpPage from "@/Page/SignUp/SignUpPage.jsx";
import LoginPage from "@/Page/LogIn/LoginPage.jsx";
import Dashboard from "@/Page/Dashboard/Dashboard.jsx";
import AllProducts from "@/Page/AllProducts/AllProducts.jsx";
import OrderList from "@/Page/OrderList/OrderList.jsx";
import OrderDetails from "@/Page/OrderDetails/OrderDetails.jsx";
import ProductDetails from "@/Page/ProductDetails/ProductDetails.jsx";
import AddNewProducts from "@/Page/AddNewProducts/AddNewProducts.jsx";

// Layout
import HomeLayout from "@/Layout/HomeLayout/HomeLayout.jsx";
import {Toaster} from "sonner";

// Layout wrapper helper
const wrapWithLayout = (Component, Layout) => (
    <Layout>
        <Component/>
    </Layout>
);

export default function App() {// ✅ Routes that should NOT use HomeLayout
    const authRoutes = [
        {path: "/login", component: LoginPage},
        {path: "/sign-up", component: SignUpPage},
    ];

    // ✅ Routes that SHOULD use HomeLayout
    const mainRoutes = [
        {path: "/", component: Dashboard},
        {path: "/dashboard", component: Dashboard},
        {path: "/products", component: AllProducts},
        {path: "/order-list", component: OrderList},
        {path: "/order-details", component: OrderDetails},
        {path: "/product-details", component: ProductDetails},
        {path: "/add-new-product", component: AddNewProducts},
    ];

    return (
        <>
            <Routes>
                {/* Auth Pages (no layout) */}
                {authRoutes.map(({path, component: Component}, idx) => (
                    <Route key={idx} path={path} element={<Component/>}/>
                ))}

                {/* App Pages (with layout) */}
                {mainRoutes.map(({path, component: Component}, idx) => (
                    <Route key={idx} path={path} element={wrapWithLayout(Component, HomeLayout)}/>
                ))}
            </Routes>
        </>

    );
}
