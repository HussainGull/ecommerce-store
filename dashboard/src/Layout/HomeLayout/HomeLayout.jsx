import Sidebar from "@/Elements/SideBar/Sidebar.jsx";
import Header from "@/Elements/Header/Header.jsx";

export default function HomeLayout({children}) {

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar/>
            <div className="flex-1 flex flex-col overflow-y-auto">
                <Header/>
                <main className="bg-brown pr-12 pl-6 py-6 flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}

