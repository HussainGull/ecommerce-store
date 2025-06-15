import {Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline/index.js";
import {ChevronDownIcon} from "@heroicons/react/20/solid/index.js";
import {Link} from 'react-router-dom';


export default function MobileMenu({
                                       mobileMenuOpen,
                                       setMobileMenuOpen,
                                       products,
                                       callsToAction,
                                       headerItems
                                   }) {

    return (
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-10"/>
            <DialogPanel
                className="fixed inset-y-0 right-0 z-10 w-full bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            className="h-8 w-auto"
                            src="/src/assets/hsports.png"
                            alt="H Sports"
                        />
                    </Link>
                    <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="size-6" aria-hidden="true"/>
                    </button>
                </div>

                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                        <div className="space-y-2 py-6">
                            <Disclosure as="div" className="-mx-3">
                                <DisclosureButton
                                    className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                                    Home
                                    <ChevronDownIcon
                                        className="size-5 group-data-open:rotate-180"
                                        aria-hidden="true"
                                    />
                                </DisclosureButton>
                                <DisclosurePanel className="mt-2 space-y-2 overflow-y-auto">
                                    {[...products, ...callsToAction].map((item) => (<DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </DisclosureButton>))}
                                </DisclosurePanel>
                            </Disclosure>

                            {headerItems.map((item) => (<Link
                                key={item.name}
                                to={item.path}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-light text-gray-900 hover:bg-gray-50"
                            >
                                {item.name}
                            </Link>))}

                        </div>
                        <div className="py-6">
                            <Link
                                to="/login"
                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                            >
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    )

}