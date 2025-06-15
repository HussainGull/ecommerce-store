import React from 'react';
import {Phone, Mail} from 'lucide-react';
import RoutePathDisplay from "@/Elements/RoutePathDisplay/RouthPathDisplay.jsx";
import Border from "@/Elements/Border/Border.jsx";
import {Input} from "@/Elements/Input/Input.jsx";
import RedColorButton from "@/Elements/Buttons/RedColorButton.jsx";
import {Description} from "@/Elements/Description/Description.jsx"; // Import icons from lucide-react

export default function ContactUs() {
    // State for form fields
    const formData = [
        {name: 'Your Name'},
        {name: 'Your Email'},
        {name: 'Your Phone'},
        {name: 'Your Message'},
    ]

    const contactUsDescription = {
        CallToUs: [
            {
                description: 'We are available 24/7, 7 days a week. If you have any questions or need assistance, feel free to reach out to us at any time.'
            },
            {
                description: 'Phone: +8801611112222'
            }
        ],
        WriteToUse:[
            {
                description: 'For any inquiries or support, you can write to us at the following email addresses:'
            },
            {
                description: 'Emails:hussain@gmail.com'
            },
        ]
    };

    return (
        <div className="font-poppins">
            {/* Top Breadcrumbs */}
            <div className="py-8 mt-20">
                <RoutePathDisplay/>
            </div>

            {/* Main Content Area */}
            <div
                className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

                {/* Left Section: Call To Us / Write To Us */}
                <div
                    className="lg:col-span-1 bg-white shadow-md rounded-md p-6 border border-gray-200 h-fit"> {/* Changed h-full to h-fit */}

                    {/* Call To Us */}
                    <div className="pb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-error rounded-full flex items-center justify-center">
                                <Phone size={20} className="text-white"/>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Call To Us</h3>
                        </div>
                        {contactUsDescription.CallToUs.map((item, index) => (
                            <Description
                                key={index.toString()}
                                text={item.description}
                            />
                        ))
                        }
                        <Border/> {/* Assuming Border is a component that renders a visual separator */}
                    </div>


                    {/* Write To Us */}
                    <div>
                        <div className="flex items-center gap-4 mb-4 mt-8">
                            <div className="w-10 h-10 bg-error rounded-full flex items-center justify-center">
                                <Mail size={20} className="text-white"/>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Write To Us</h3>
                        </div>
                        {contactUsDescription.WriteToUse.map((item, index) => (
                            <Description
                                key={index.toString()}
                                text={item.description}
                            />
                        ))
                        }
                    </div>
                </div>

                {/* Right Section: Contact Form */}
                <div className="lg:col-span-2 bg-white shadow-sm rounded-md p-6 border border-gray-200">

                    <form className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
                        {
                            formData.map((field, index) => (
                                <Input
                                    key={index.toString()}
                                    placeholder={field.name}
                                />
                            ))
                        }

                        {/* Your Message */}
                        <div className="md:col-span-3"> {/* Spans full width */}
                            <textarea
                                name="message"
                                value={formData.message}
                                rows="8" // Adjust rows for desired height
                                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500 resize-y"
                                placeholder="Your Message"
                                required
                            ></textarea>
                        </div>

                        {/* Send Message Button */}
                        <div className="md:col-span-3 flex justify-end">
                            <RedColorButton
                                text={'Send Message'}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
