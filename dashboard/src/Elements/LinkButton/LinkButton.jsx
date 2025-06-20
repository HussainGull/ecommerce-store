// components/ui/login-link.tsx
import {Link} from "react-router-dom"

export function LinkButton({title, to}) {
    return (
        <Link
            to={to}
            className="text-sm font-medium text-blue hover:text-blue-800 underline underline-offset-4 transition-colors duration-200 font-poppins"
        >
            {title}
        </Link>
    )
}
