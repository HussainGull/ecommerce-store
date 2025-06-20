// components/Elements/TextArea/TextArea.jsx
import { Textarea } from "@/components/ui/textarea";

export default function TextArea(props) {
    return (
        <Textarea
            {...props} // ✅ Forward all props from react-hook-form
            className={`w-full h-24 p-3 text-sm text-dark border-black border-[0.5px] placeholder-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none ${props.className ?? ''}`}
            placeholder="Description"
        />
    );
}
