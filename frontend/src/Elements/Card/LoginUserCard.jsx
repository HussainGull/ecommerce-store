import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import React from "react";
import RedColorButton from "@/Elements/Buttons/RedColorButton.jsx";
import {Link} from "react-router-dom";
import Border from "@/Elements/Border/Border.jsx";

export function LoginUserCard() {

    const LoginUserCardData = [
        {
            id: 1,
            placeholder: "Email or Phone",
            type: "text",
        },
        {
            id: 2,
            placeholder: "Password",
            type: "password",
        },
    ]

    return (
        <Card className="w-full max-w-sm border-none shadow-none">

            <CardHeader>
                <CardTitle className={"font-poppins font-normal text-2xl whitespace-nowrap"}>Login to H
                    Sports</CardTitle>
                <CardDescription className={"font-poppins font-light mt-1"}>
                    Enter your details below </CardDescription>
            </CardHeader>

            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        {
                            LoginUserCardData.map((field, index) => (
                                <div className="gap-1">
                                    <input id={index.toString()}
                                           type={field.type}
                                           placeholder={field.placeholder}
                                           required
                                           className={"outline-none border-none shadow-none p-0 font-poppins"}
                                    />
                                    <Border className={"mt-1"}/>
                                </div>
                            ))
                        }
                    </div>
                </form>
            </CardContent>

            <CardFooter className="max-[350px]:flex-col flex gap-4 justify-between">
                <RedColorButton text={'Login'} className={"w-[143px]"}/>
                <div className="flex items-center">
                    <Link
                        to={"#"}
                        className="whitespace-nowrap ml-auto text-error inline-block underline-offset-4 hover:underline text-base"
                    >
                        Forget Password?
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
