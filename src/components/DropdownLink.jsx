import { classNames } from "../utils"

export default function DropdownLink({ menuItems, icon, children, onShow, onClose, isDisplayed }) {

    return (
        <>
            <li onClick={onShow} className="relative my-2 py-2 px-4 list-none cursor-pointer border border-gray-300 rounded md:hover:text-blue-200 md:hover:border-gray-400 transition-colors delay-75 w-full text-lg text-start">
                {icon}{children}
                {!isDisplayed && <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute bottom-1 right-1 w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                </svg>}
            </li>
            {isDisplayed && <ul className="w-full translate-x-4 bg-blue-400 z-10 h-fit rounded pl-6 ease-in-out">
                {menuItems.map((item) => <li className="cursor-pointer px-4 py-2 text-white" key={item.link}>{item.title}</li>)}
                <button className="absolute bottom-0 right-0 m-1" onClick={onClose}><svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                </svg></button>
            </ul>}
        </>
    )
}
