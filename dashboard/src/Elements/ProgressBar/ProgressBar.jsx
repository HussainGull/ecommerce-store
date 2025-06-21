"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"

export default function ProgressBar({ value }) {
    const [progress, setProgress] = React.useState(0)
    const MAX = 200

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setProgress(value)
        }, 100)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <Progress
            value={(progress / MAX) * 100} // ✅ Convert to percentage
            className="w-full h-full [&>div]:bg-amber-500 transition-all duration-300"
        />
    )
}
