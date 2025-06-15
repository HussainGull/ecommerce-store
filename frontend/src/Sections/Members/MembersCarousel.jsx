import React, { useState, useEffect, useRef } from 'react';
import { Twitter, Instagram, Linkedin } from 'lucide-react'; // Importing icons from Lucide React

// The main Carousel component
export default function MembersCarousel() {
    // State to keep track of the currently displayed slide index
    const [currentSlide, setCurrentSlide] = useState(0);
    // Ref to store the interval ID for auto-play
    const intervalRef = useRef(null);

    // Sample data for team members
    const teamMembers = [
        {
            img: "/src/assets/tomcruise.png", // Placeholder image
            name: "Alice Johnson",
            position: "Lead Designer",
        },
        {
            img: "/src/assets/emmawatson.png", // Placeholder image
            name: "Bob Williams",
            position: "Software Engineer",
        },
        {
            img: "/src/assets/willsmith.png", // Placeholder image
            name: "Charlie Brown",
            position: "Marketing Specialist",
        },
        {
            img: "/src/assets/willsmith.png", // Placeholder image
            name: "Diana Prince",
            position: "Project Manager",
        },
        {
            img: "/src/assets/willsmith.png", // Placeholder image
            name: "Eve Adams",
            position: "UX Researcher",
        },
    ];

    // Define the fixed width of each card and the gap between them
    const cardWidth = 370; // px
    const gapWidth = 32;   // px
    const totalSlideShift = cardWidth + gapWidth; // Total pixels to shift for one card + its right margin/gap

    // Function to update the current slide based on the clicked dot
    const goToSlide = (index) => {
        setCurrentSlide(index);
        // Reset auto-play timer when a dot is clicked
        resetAutoPlay();
    };

    // Function to start the auto-play timer
    const startAutoPlay = () => {
        // Clear any existing interval to prevent multiple intervals running
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        // Set a new interval for auto-play
        intervalRef.current = setInterval(() => {
            setCurrentSlide(prevSlide => {
                // Calculate the next slide index, looping back to 0 if at the end
                return (prevSlide + 1) % teamMembers.length;
            });
        }, 3000); // Change slide every 3 seconds (3000ms)
    };

    // Function to stop the auto-play timer
    const stopAutoPlay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    // Function to reset the auto-play timer (stop and then start)
    const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
    };

    // Effect for auto-play: starts on mount and cleans up on unmount
    useEffect(() => {
        startAutoPlay(); // Start auto-play when component mounts

        // Cleanup function: stop auto-play when component unmounts
        return () => stopAutoPlay();
    }, []); // Empty dependency array ensures this effect runs only once on mount and cleanup on unmount

    return (
        // Overall container for the page, centered vertically and horizontally
        // Added onMouseEnter and onMouseLeave to pause/resume auto-play on hover
        <div
            className="flex flex-col items-center justify-center font-poppins"
            onMouseEnter={stopAutoPlay}
            onMouseLeave={startAutoPlay}
        >
            {/* Main content wrapper, max-w, auto margins for centering */}
            <div className="max-w-7xl mx-auto py-16 w-full">
                {/* Carousel container: hides overflow and sets up for horizontal scrolling */}
                <div className="relative overflow-hidden w-full">
                    {/* Inner container that holds all the slides (team member cards) */}
                    {/* This element will be transformed horizontally to show different slides */}
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            // TranslateX moves the entire row of cards left or right
                            // It shifts by the calculated width of one card plus its gap
                            transform: `translateX(-${currentSlide * totalSlideShift}px)`
                        }}
                    >
                        {/* Map over teamMembers data to render each card as a slide */}
                        {teamMembers.map((member, index) => (
                            // Each card item: flex-shrink-0 prevents it from shrinking
                            // Fixed width and right margin to control the exact size and spacing for translateX
                            <div
                                key={index}
                                className="flex-shrink-0"
                                style={{
                                    width: `${cardWidth}px`,
                                    marginRight: `${index === teamMembers.length - 1 ? 0 : gapWidth}px` // No margin after the last item
                                }}
                            >
                                {/* The actual team member card structure */}
                                <div className="w-full h-[560px] flex flex-col items-start bg-white rounded-lg shadow-md overflow-hidden">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-[70%] object-cover rounded-t-lg" // Image takes 70% of card height, rounded top
                                    />
                                    {/* Content area for name, position, and social links */}
                                    <div className="flex flex-col gap-2 mt-6 p-4 w-full h-[30%]"> {/* Padded content area, takes remaining height */}
                                        <h3 className="text-3xl font-normal text-gray-900">{member.name}</h3>
                                        <p className="text-base text-gray-700 mb-3">{member.position}</p>
                                        <div className="flex gap-4">
                                            {/* Social media links with Lucide icons */}
                                            <a href="#" aria-label="Twitter"
                                               className="text-gray-500 hover:text-blue-500 transition-colors">
                                                <Twitter size={20} />
                                            </a>
                                            <a href="#" aria-label="Instagram"
                                               className="text-gray-500 hover:text-pink-500 transition-colors">
                                                <Instagram size={20} />
                                            </a>
                                            <a href="#" aria-label="LinkedIn"
                                               className="text-gray-500 hover:text-blue-700 transition-colors">
                                                <Linkedin size={20} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Dots Container */}
                <div className="flex justify-center mt-8 space-x-3"> {/* Increased space-x for better visual separation */}
                    {teamMembers.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            // Conditional styling for the active dot
                            className={`w-4 h-4 rounded-full bg-gray-400 cursor-pointer
                          transition-all duration-300 ease-in-out
                          ${currentSlide === index ? 'border-2 border-gray-700 bg-transparent' : 'border-2 border-transparent hover:bg-gray-500'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
}
