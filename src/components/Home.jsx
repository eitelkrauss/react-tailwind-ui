import { useState, useEffect, lazy, Suspense, useRef } from 'react'
import ID4Face from './ID4Face'
import Sidebar from './Sidebar'
import { classNames } from '../utils'
import DangerousHtml from './DangerousHtml'
import Chat from './Chat'

const OneLazyComponent = lazy(() => import('./OneLazyComponent'))

export default function Home({ onLogout }) {
    const [isSidebarVisible, setSidebarVisible] = useState(false)
    const [isLazyShown, setIsLazyShown] = useState(false)
    const [content, setContent] = useState(undefined)

    const reload = () => {
        console.log("reload")
        location.reload()
    }

    useEffect(() => {
        document.addEventListener('noauth', () => reload())
        return () => document.removeEventListener('noauth', () => reload())
    }, [])

    const getUsers = async () => {
        fetch('/api/users').then(res => res.text())
            .then(html => setContent(html))
            .catch(err => console.error("err /api/users: ", err))
    }  

    return (
        <>
            <header className='md:hidden h-fit flex justify-between'>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 m-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg onClick={() => setSidebarVisible(!isSidebarVisible)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer m-2 w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </header>
            <div className='hidden md:block'></div>
            <main className='flex md:relative p-4'>
                <Sidebar show={isSidebarVisible} />
                <section className='flex-1 text-center'>
                    {/* <button className="border-2 border-rose-300 text-rose-200 px-2 py-2 rounded mb-4" onClick={getUsers}>get users</button>
                    <DangerousHtml html={content} loaderColor="stroke-rose-300" /> */}
                    {/* <div>
                        {isLazyShown && (<Suspense fallback={<svg viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto mt-4 animate-spin w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>}>
                            <h2>tada!</h2>
                            <OneLazyComponent />
                        </Suspense>)}
                    </div> 
                    <button className={classNames(['mx-auto border border-white text-lg px-3 py-2 m-4 transform transition-transform', isLazyShown ? 'translate-y-full hidden' : 'block'])} onClick={() => setIsLazyShown(true)}>get lazy component</button>*/}
                    <Chat />
                </section>
            </main>
            <footer className='text-center md:bg-gray-700'>
                2023
            </footer>
        </>
    )
}