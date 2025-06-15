import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from "react";
import {Link} from "react-router-dom";
import Border from "@/Elements/Border/Border.jsx";
import {cn} from "@/lib/utils.js";

export function RegisterUserCard({className}) {

    const inputFieldsData = [
        {
            id: 1,
            placeholder: "Name",
            type: "text",
        },
        {
            id: 2,
            placeholder: "Email",
            type: "email",
        },
        {
            id: 3,
            placeholder: "Password",
            type: "password",
        },
    ]

    return (
        <Card className={cn("w-full max-w-sm border-none shadow-none", className)}>
            <CardHeader>
                <CardTitle className={"font-poppins max-[330px]:text-xl font-normal text-2xl whitespace-nowrap"}>Create
                    Your
                    Account</CardTitle>
                <CardDescription className={"font-poppins font-light mt-1"}>
                    Enter your details below </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">

                        {
                            inputFieldsData.map((field, index) => (
                                <div className="gap-2">
                                    <input id={index.toString()}
                                           type={field.type}
                                           placeholder={field.placeholder}
                                           required
                                           className={"outline-none border-none shadow-none p-0 font-poppins"}

                                    />
                                    <Border
                                        className={'mt-1'}
                                    />
                                </div>
                            ))
                        }

                    </div>
                </form>

            </CardContent>

            <CardFooter className="flex-col gap-4">
                <Button type="submit"
                        className="w-full h-[56px] font-poppins bg-error text-base font-normal text-white
                        hover:scale-105 hover:shadow-lg
                        transition-all duration-300 ease-in-out
                        focus:outline-none
                        ">
                    Create Account
                </Button>
                <Button
                    className="w-full h-[56px] font-poppins  font-light flex bg-white border-[0.5px]
                         border-[bg-muted] text-dark text-base
                         hover:scale-105 hover:shadow-lg
                        transition-all duration-300 ease-in-out
                        focus:outline-none"
                >
                    <img src={'/src/assets/google.svg'} alt={'Google Icon'}/>
                    Sign up with Google
                </Button>
                <div className="flex flex-col items-center min-[321px]:flex-row"> {/* Changed to flex-col by default, then flex-row from 321px up */}
                    <span className={"whitespace-nowrap"}>Already Have An Account ?</span>
                    <Link
                        to={'/login'}
                        className="min-[321px]:ml-2 max-[321px]:text-base inline-block whitespace-nowrap text-sm text-error underline underline-offset-2 hover:underline"
                    >
                        Login Here
                    </Link>
                </div>
                <div className="flex items-center">
                    <Link
                        to={"#"}
                        className="ml-auto max-[321px]:text-base inline-block text-sm underline-offset-4 hover:underline"
                    >
                        Forgot your password?
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
