
export default function InfoCard({icon: Icon, title, details, buttonLabel, buttonIcon: ButtonIcon}) {

    return (
        <div className="border-light border border-light-gray rounded-xl p-5 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-dark rounded-md flex items-center justify-center">
                    <Icon size={20} className="text-light"/>
                </div>
                <span className="text-base font-poppins font-semibold text-dark">{title}</span>
            </div>
            <div className="flex flex-col text-sm text-dark leading-relaxed">
                {details.map((item, index) => (
                    <span
                        key={index}
                        className={`font-poppins ${item.bold ? "font-semibold" : ""} text-dark`}
                    >
          {item.label}
        </span>
                ))}
            </div>
            <button
                className="w-full px-4 py-2 mt-2 bg-blue text-light text-sm font-medium rounded-md hover:bg-blue-700">
                {buttonLabel}
                {ButtonIcon && <ButtonIcon size={16} className="inline-block ml-2"/>}
            </button>
        </div>
    )

}
