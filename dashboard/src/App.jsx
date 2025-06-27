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
import ProductForm from "@/Elements/Form/Product/ProductForm.jsx";
import CreateCategory from "@/Page/CreateCategory/CreateCategory.jsx";
import CreateBrand from "@/Page/CreateBrand/CreateBrand.jsx";
import EditEntityForm from "@/Elements/Form/Entity/EditEntityForm.jsx";

// Layout wrapper helper
const wrapWithLayout = (Component, Layout, routeProps = {}) => (
    <Layout>
        <Component {...routeProps} />
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
        {path: "/edit-product/:id", component: ProductForm},
        {path: "/create-category", component: CreateCategory},
        {path: "/create-brand", component: CreateBrand},
        {path: "/edit-category/:id", component: EditEntityForm},
        {path: "/edit-brand/:id", component: EditEntityForm},

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
                    <Route
                        key={idx}
                        path={path}
                        element={wrapWithLayout(
                            Component,
                            HomeLayout,
                            path.includes('/edit-product/') ? {mode: 'edit'} : {} // ✅ Auto-pass mode for edit route
                        )}
                    />
                ))}
            </Routes>
        </>

    );
}
