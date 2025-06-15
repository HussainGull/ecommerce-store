import {ChevronDown, ChevronUp, CircleX} from "lucide-react";
import React from "react";

export function CartTable({products, handleRemoveProduct, setProducts, handleQuantityChange }) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-[900px] w-full bg-white border-separate border-spacing-y-4">
                <thead>
                <tr className="w-full h-[70px] text-left text-muted font-medium text-base shadow-sm gap-10">
                    <th className="py-2 pl-4 w-[40%] font-poppins font-normal text-base text-dark">Product</th>
                    <th className="py-2 w-[20%] font-poppins font-normal text-base text-dark">Price</th>
                    <th className="py-2 w-[20%] font-poppins font-normal text-base text-dark">Quantity</th>
                    <th className="py-2 pr-4 w-[20%] font-poppins font-normal text-base text-right text-dark">Subtotal</th>
                </tr>
                </thead>

                <tbody>
                {products.map((product) => (
                    <tr
                        key={product.id}
                        className="w-full h-[100px] items-center bg-white rounded-md shadow-sm"
                    >
                        <td className="py-5 pl-4 flex items-center gap-4">
                            <button
                                onClick={() => handleRemoveProduct(product.id)}
                                className="text-danger hover:text-error transition-colors duration-200"
                                aria-label="Remove product"
                            >
                                <CircleX size={20}/>
                            </button>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-16 h-16 object-contain"
                            />
                            <span className="text-gray-900 font-medium">{product.name}</span>
                        </td>
                        <td className="py-2 text-gray-800 text-lg">${product.price}</td>

                        <td className="py-2">
                            <div
                                className="w-[70px] h-[45px] relative flex items-start border-[0.5px] border-bg-muted rounded overflow-hidden">
                                <input
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) => {
                                        const newQuantity = parseInt(e.target.value, 10);
                                        setProducts((prev) =>
                                            prev.map((p) =>
                                                p.id === product.id
                                                    ? {
                                                        ...p,
                                                        quantity: Math.max(
                                                            1,
                                                            isNaN(newQuantity) ? 1 : newQuantity
                                                        ),
                                                    }
                                                    : p
                                            )
                                        );
                                    }}
                                    className="w-full h-full text-center text-gray-800 focus:outline-none focus:ring-0 appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                />
                                <div className="flex flex-col justify-between h-full">
                                    <button
                                        onClick={() => handleQuantityChange(product.id, 1)}
                                        className="h-1/2 w-6 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                                        aria-label="Increase quantity"
                                    >
                                        <ChevronUp size={12}/>
                                    </button>
                                    <button
                                        onClick={() => handleQuantityChange(product.id, -1)}
                                        className="h-1/2 w-6 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-transform duration-500 ease-in-out hover:scale-105"
                                        aria-label="Decrease quantity"
                                    >
                                        <ChevronDown size={12}/>
                                    </button>
                                </div>
                            </div>
                        </td>

                        <td className="py-2 pr-4 text-gray-800 text-lg font-medium text-right">
                            ${product.price * product.quantity}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}