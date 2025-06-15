import {LoginUserCard} from "@/Elements/Card/LoginUserCard.jsx";

export default function Login() {
    return (
        <>
            <div className="flex justify-center  items-center mt-20 lg:gap-10 xl:gap-20 relative">
                <div className="w-[500px] h-full lg:flex xl:flex items-center justify-center hidden"> {/* Added flex and center for better positioning if the parent allows */}
                    <img
                        src="/src/assets/sideimage.jpg"
                        alt="Side Image"
                        className="rounded-[4px] object-cover w-full h-full" // Changed to rounded-full and object-cover
                    />
                </div>
                <LoginUserCard className={"lg:-mr-10"} />
            </div>
        </>
    )
}