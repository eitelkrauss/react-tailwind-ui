import { lazy, useState, Suspense } from "react"
import { classNames } from "../utils"

const UserDataCard = lazy(() => import('./UserDataCard'))


export default function DropdownLink({ menuItems, children, onShow, onClose, isDisplayed }) {
    const [showUserData, setShowUserData] = useState(false)

    return (
        <>
            <li onClick={() => setShowUserData(!showUserData)} className="relative my-2 py-2 px-4 list-none cursor-pointer border border-gray-300 rounded md:hover:text-blue-200 md:hover:border-gray-400 transition-colors delay-75 w-full text-lg text-start">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>Mi Cuenta
                <svg onClick={() => setShowUserData(!showUserData)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNames(['absolute bottom-1 right-1 w-4 h-4 inline transition-transform duration-300 ease-in-out', showUserData ? 'rotate-180' : ''])}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                </svg>
            </li>
            {showUserData && <Suspense fallback={<div className="min-h-[10vh]"><p>no data...</p></div>}><UserDataCard /></Suspense>}
        </>
    )
}