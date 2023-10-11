import { useState, lazy, Suspense } from "react"
import { classNames } from "../utils"
import DropdownLink from "./DropdownLink"
import Contact from "./Contact"
import DropdownUserInfo from './DropdownUserInfo'

export default function Sidebar({ show }) {

    const [showContact, setShowContact] = useState(false)
    const [isActiveDropdown, setIsActiveDropdown] = useState(null)

    return (
        <div className={classNames(['absolute bg-blue-500 text-white h-screen w-4/5 md:w-1/5 z-10 flex flex-col items-center p-4 inset-y-0 left-0 transform', show ? '' : '-translate-x-full', 'md:translate-x-0 transition-transform duration-300 ease-in-out'])}>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <nav className="mt-4 text-start w-full px-2">
                <DropdownUserInfo />
                <DropdownLink isDisplayed={isActiveDropdown === 0} onShow={() => setIsActiveDropdown(0)} onClose={() => setIsActiveDropdown(null)} menuItems={[{ title: "opción 1", link: "/1" }, { title: "opción 2", link: "/2" }]} icon={<svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>}>Preferencias</DropdownLink>
                <DropdownLink isDisplayed={isActiveDropdown === 1} onShow={() => setIsActiveDropdown(1)} onClose={() => setIsActiveDropdown(null)} menuItems={[{ title: "opción 1", link: "/1" }, { title: "opción 2", link: "/2" }]} icon={<svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline mr-2 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                }>Ayuda</DropdownLink>
                <form action="/api/logout" method="post">
                    <button className='transition-colors delay-75 border border-red-300 text-red-200 hover:text-white rounded px-2 py-1 w-full' type='submit' >Cerrar Sesión</button>
                </form>
            </nav>
            <div className="mt-auto">
                <button onClick={() => setShowContact(!showContact)} className="hover:text-red-100 transition-colors delay-75">¿Necesitas ayuda?</button>
                {showContact && <Contact />}
            </div>
        </div>
    )
}