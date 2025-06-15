"use client"

import {TrendingUp} from "lucide-react"
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import Boundary from "@/Elements/Boundary/Boundary.jsx";

export const description = "A multiple bar chart"

const chartData = [
    {month: "January", desktop: 186, mobile: 80},
    {month: "February", desktop: 305, mobile: 200},
    {month: "March", desktop: 237, mobile: 120},
    {month: "April", desktop: 73, mobile: 190},
    {month: "May", desktop: 209, mobile: 130},
    {month: "June", desktop: 214, mobile: 140},
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
}

const chartTimeData = [
    {timeFrame: 'Weekly'},
    {timeFrame: 'Monthly'},
    {timeFrame: 'Yearly'}
];

export function SalesGraph() {
    return (
        <Card>
            <CardHeader>
                <div className={"flex justify-between"}>
                    <CardTitle className="text-2xl">Sales Graph</CardTitle>
                    <div className={"flex flex-wrap justify-center items-center gap-3"}>
                        {chartTimeData.map((timeFrame, index) => (
                            <div
                                key={index}
                                className="h-[32px] flex items-center justify-center
                                border border-[var(--text-dark)] rounded-md
                                px-4 py-2 cursor-pointer
                                hover-bg-blue hover-text-light transition-transform duration-200 transform hover:scale-110">
                                <span
                                    className="font-poppins text-sm text-dark-gray hover-text-light">{timeFrame.timeFrame}</span>
                            </div>
                        ))
                        }
                    </div>
                </div>
                <Boundary/>
            </CardHeader>

            <CardContent > {/* Set height here (adjustable) */}
                <ChartContainer config={chartConfig}>
                        <BarChart data={chartData}>
                            <CartesianGrid vertical={false}/>
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)} // Jan, Feb, etc.
                            />

                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dashed"/>}
                            />

                            <Bar dataKey="desktop" fill="var(--color-primary-blue)" radius={4}/>
                            <Bar dataKey="mobile" fill="var(--color-primary-accent)" radius={4}/>
                        </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

    )
}
