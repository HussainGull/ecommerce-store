import AddProductButton from "@/Elements/Buttons/AddProductButton.jsx";
import ProductSummaryCard from "@/Elements/Card/Products/ProductSummaryCard.jsx";
import Heading from "@/Elements/Heading/Heading.jsx";
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";

export default function AllProducts() {
    const nikeArticles = [
        {
            id: 1,
            title: "Nike Air Force 1",
            summary: "Classic streetwear icon",
            description: "The Nike Air Force 1 is a timeless sneaker, celebrated for its clean lines, comfortable cushioning, and iconic silhouette. It remains a staple in fashion and sneaker culture worldwide.",
            price: 100.00,
            sales: 1450,
            remaining: 300,
        },
        {
            id: 2,
            title: "Nike Air Max 90",
            summary: "Retro style with modern comfort",
            description: "Originally designed for running, the Air Max 90 became a streetwear icon. Its visible Air cushioning and bold aesthetic deliver both comfort and distinctive style.",
            price: 130.00,
            sales: 1120,
            remaining: 220,
        },
        {
            id: 3,
            title: "Nike Air Zoom Pegasus 40",
            summary: "Daily running companion",
            description: "The Pegasus 40 offers a balanced and cushioned ride, making it a reliable choice for everyday training. Its responsive Zoom Air units provide an energetic feel mile after mile.",
            price: 120.00,
            sales: 980,
            remaining: 150,
        },
        {
            id: 4,
            title: "Nike Dunk Low",
            summary: "Basketball-inspired street style",
            description: "From basketball courts to skate parks and fashion runways, the Nike Dunk Low has cemented its status as a cultural icon, known for its versatility and classic color-blocking.",
            price: 115.00,
            sales: 1575,
            remaining: 210,
        },
        {
            id: 5,
            title: "Nike Blazer Mid '77",
            summary: "Vintage court-inspired design",
            description: "The Blazer Mid '77 captures vintage basketball style with its clean design and comfortable feel. It's a versatile shoe that adds a retro touch to any outfit.",
            price: 105.00,
            sales: 860,
            remaining: 180,
        },
        {
            id: 6,
            title: "Nike React Infinity Run 3",
            summary: "Built for stability and long runs",
            description: "Engineered to reduce injury, the React Infinity Run 3 features plush React foam cushioning that provides a soft, yet supportive, feel for long-distance running.",
            price: 160.00,
            sales: 670,
            remaining: 135,
        },
        {
            id: 7,
            title: "Nike Metcon 9",
            summary: "Strength training and HIIT support",
            description: "The Metcon 9 is designed for stability and durability in high-intensity workouts, offering a secure fit and robust platform for lifting, jumping, and dynamic movements.",
            price: 150.00,
            sales: 450,
            remaining: 80,
        },
        {
            id: 8,
            title: "Nike Air Jordan 1 Retro",
            summary: "Iconic performance meets culture",
            description: "More than a basketball shoe, the Air Jordan 1 Retro revolutionized footwear. Its legendary design and rich history make it a cornerstone of sneaker culture and fashion.",
            price: 180.00,
            sales: 2100,
            remaining: 95,
        },
        {
            id: 9,
            title: "Nike Free RN 5.0",
            summary: "Flexible and lightweight for sprints",
            description: "Designed for a barefoot-like feel, the Nike Free RN 5.0 provides exceptional flexibility and a lightweight construction, ideal for shorter runs and natural movement.",
            price: 95.00,
            sales: 720,
            remaining: 205,
        },
        {
            id: 10,
            title: "Nike Vaporfly NEXT% 3",
            summary: "Elite racing shoe for marathoners",
            description: "Built for speed, the Vaporfly NEXT% 3 features a full-length carbon fiber plate and responsive ZoomX foam, delivering propulsive energy for breaking personal bests in long-distance races.",
            price: 250.00,
            sales: 530,
            remaining: 60,
        },
    ];
    return (
        <div className="h-min-screen flex flex-col space-y-4">

            <div className={'w-full flex justify-between items-center'}>
                <div className={'w-fit flex flex-col'}>
                    <Heading
                        heading={'All Products'}
                        // paragraph={'Manage your products efficiently with our comprehensive product list.'}
                    />
                    <RoutePathDisplay/>
                </div>

                {/* Add your product management components here */}
                <AddProductButton
                    text={'Add New Product'}
                    className={'w-[220px] h-[50px]'}
                />
            </div>

            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-4"
            >
                {nikeArticles.map((article) => (
                    <ProductSummaryCard key={article.id} article={article}/>
                ))}
            </div>
        </div>
    )
}