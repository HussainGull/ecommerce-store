import {useLocation} from 'react-router-dom';

export default function RoutePathDisplay() {
    const location = useLocation(); // e.g., "/dashboard/settings"

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const isDashboardOnly = pathSegments.length === 1 && pathSegments[0].toLowerCase() === 'dashboard';

    return (
        <div className="text-dark-gray text-base mt-0">
            Dashboard
            {!isDashboardOnly &&
                pathSegments.map((segment, index) => {
                    // console.log(pathSegments); // ✅ correct usage
                    return (
                        <span key={index} className="text-gray-700 text-base">
                            / {capitalize(segment)}
                        </span>
                    );
                })
            }
        </div>
    );
}
