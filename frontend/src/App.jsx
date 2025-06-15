import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import HomeLayout from "@/Elements/Layouts/HomeLayout.jsx";
import AccountLayout from "@/Pages/Account/AccountLayout.jsx";

// Public Pages
import HomePage from "@/Pages/HomePage/HomePage.jsx";
import AboutUs from "@/Pages/AboutUs/AboutUs.jsx";
import ContactUs from "@/Pages/ContactUs/ContactUs.jsx";
import Register from "@/Pages/Register/Register.jsx";
import Login from "@/Pages/Login/Login.jsx";
import WishList from "@/Pages/WishList/WishList.jsx";
import Cart from "@/Sections/Cart/Cart.jsx";
import CheckoutPage from "@/Sections/CheckoutPage/Checkout.jsx";
import ProductDetail from "@/Pages/ProductDetails/ProductDetails.jsx";
import NotFound from "@/Pages/NotFound/NotFound.jsx";

// Account Pages
import Profile from "@/Pages/Account/Profile/Profile.jsx";
import AddressBook from "@/Pages/Account/AddressBook/AddressBook.jsx";
import PaymentOptions from "@/Pages/Account/PaymentOptions/PaymentOptions.jsx";
import Returns from "@/Pages/Account/Returns/Returns.jsx";
import Cancellations from "@/Pages/Account/Cancellations/Cancellations.jsx";

// Helper for wrapping with HomeLayout
const wrapWithLayout = (Component, Layout) => (
    <Layout>
        <Component />
    </Layout>
);

export default function App() {
    const publicRoutes = [
        { path: "/", component: HomePage },
        { path: "/home", component: HomePage },
        { path: "/about", component: AboutUs },
        { path: "/contact", component: ContactUs },
        { path: "/sign-up", component: Register },
        { path: "/login", component: Login },
        { path: "/wishlist", component: WishList },
        { path: "/cart", component: Cart },
        { path: "/checkout", component: CheckoutPage },
        { path: "/product-details", component: ProductDetail },
        { path: "*", component: NotFound },
    ];

    const accountRoutes = [
        { path: "", element: <Profile /> },
        { path: "profile", element: <Profile /> },
        { path: "address-book", element: <AddressBook /> },
        { path: "payment-options", element: <PaymentOptions /> },
        { path: "returns", element: <Returns /> },
        { path: "cancellations", element: <Cancellations /> },
    ];

    return (
        <Routes>
            {/* Public Routes with HomeLayout */}
            {publicRoutes.map(({ path, component: Component }, idx) => (
                <Route
                    key={idx}
                    path={path}
                    element={wrapWithLayout(Component, HomeLayout)}
                />
            ))}

            {/* Nested Account Routes with HomeLayout + AccountLayout */}
            <Route path="/account" element={<HomeLayout><AccountLayout /></HomeLayout>}>
                {accountRoutes.map(({ path, element }, idx) => (
                    <Route key={idx} path={path} element={element} />
                ))}
            </Route>
        </Routes>
    );
}
