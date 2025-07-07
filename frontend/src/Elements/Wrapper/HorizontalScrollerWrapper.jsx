import React from "react";
import PropTypes from "prop-types";

const HorizontalScrollerWrapper = React.forwardRef(
    ({ children, gap = "gap-8", paddingX = "px-4 md:px-8 lg:px-16", marginTop = "mt-10" }, ref) => {
        return (
            <div
                ref={ref}
                className={`relative -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 overflow-x-auto scroll-smooth pb-4 max-[450px]:mt-0 ${marginTop} no-scrollbar`}
            >
                <div className={`flex ${gap} ${paddingX}`}>
                    {children}
                </div>
            </div>
        );
    }
);

HorizontalScrollerWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    gap: PropTypes.string,
    paddingX: PropTypes.string,
    marginTop: PropTypes.string,
};

export default HorizontalScrollerWrapper;
