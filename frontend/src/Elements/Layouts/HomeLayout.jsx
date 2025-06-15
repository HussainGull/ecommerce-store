import Header from "@/Elements/Header/Header.jsx";
import Footer from "@/Elements/Footer/Footer.jsx";
import CategoryDropdown from "@/Elements/Dropdown/CategoryDropdown.jsx";

export default function HomeLayout({children}) {
    return (
        <>
            <Header/>
            <main className="px-4 sm:px-15 md:px-18 lg:px-24 xl:px-29 2xl:px-33">
                {children}
            </main>
            <Footer/>
        </>
    );
}