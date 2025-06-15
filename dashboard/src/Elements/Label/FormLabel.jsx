import { Label } from "@/components/ui/label"

export default function FormLabel({htmlFor, children}) {
    return (
        <Label htmlFor={htmlFor} className="block text-sm font-medium text-dark-gray mb-1">
            {children}
        </Label>
    )

}
