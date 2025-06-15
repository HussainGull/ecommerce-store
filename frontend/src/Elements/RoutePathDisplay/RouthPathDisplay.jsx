import {useLocation} from 'react-router-dom';

export default function RoutePathDisplay() {
    const location = useLocation(); // gets current path like "/home/about"

    // Convert path string into an array and remove any empty items
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <div className="text-sm text-gray-500">
            Home
            {pathSegments.map((segment, index) => (
                <span key={index} className={'text-dark'}> / {capitalize(segment)}</span>
            ))}
        </div>
    );
};
