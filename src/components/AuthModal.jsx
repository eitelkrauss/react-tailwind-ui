import { useContext, useEffect, useRef, useState } from "react"
import ID4Face from "./ID4Face"
import { classNames } from "../utils"
import { AuthContext } from "../App"

export default function AuthModal() {
    const [error, setError] = useState("")
    const [login, setLogin] = useState("")
    const [pending, setPending] = useState(false)
    const [authOption, setAuthOption] = useState("email")
    const [id4faceDisabled, setId4faceDisabled] = useState(false)
    const Auth = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setPending(true)
        const res = await fetch('/api/auth', {
            method: 'post',
            body: JSON.stringify({ login })
        })
        setPending(false)
        if (res.ok) {
            console.log(await res.text())
            Auth()
        } else {
            setError(await res.text())
        }
    }


    const validateWebcam = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        return devices.some(device => 'videoinput' === device.kind);
    }

    useEffect(() => {
        validateWebcam().then(hasWebcam => {
            if(!hasWebcam) {
                setId4faceDisabled(true)
            }
        })
        return () => setId4faceDisabled(false)
    }, [])


    return (
        <>
            <div></div>
            <main className="h-full grid place-items-center">
                <section className="text-center">
                    <label htmlFor="auth-select">Autenticación por </label>
                    <select className="p-1 ml-1 text-sm text-gray-600 w-min mx-auto rounded" name="auth-select" value={authOption} onChange={e => setAuthOption(e.target.value)} id="auth-select">
                        <option key="id4face" disabled={id4faceDisabled} className={classNames([id4faceDisabled ? 'text-gray-400' : 'text-gray-700', "text-xs  w-fit"])} value="id4face">id4face</option>
                        <option key="email" className="text-xs text-gray-700 w-fit" value="email">email</option>
                    </select>
                    {id4faceDisabled && <small className="block text-red-400 w-full mt-2 text-xs"><em>Conecte una cámara para habilitar opción id4face</em>.</small>}
                    {
                        authOption === 'email'
                            ? <form onSubmit={handleSubmit} className="flex flex-wrap items-center max-w-xs mt-10">
                                <label htmlFor="login" className="mb-2 block font-bolder text-lg w-full">Ingresa tu correo</label>
                                <input type="text" className="p-1 rounded text-gray-600" name="login" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="email" />
                                <button className="ml-2 px-2 py-1 flex-1 border border-white rounded" disabled={pending} type="submit">
                                    {
                                        pending
                                            ? <svg viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" fill="none" className="mx-auto animate-spin w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                            </svg>
                                            : 'entrar'
                                    }
                                </button>
                            </form>
                            : <ID4faceLogin />
                    }
                    {error !== "" && <small className="block text-red-400 w-full mt-2">{error}</small>}
                </section>
            </main>
        </>
    )
}


const ID4faceLogin = () => {
    const [id, setId] = useState("")
    const [dactilar, setDactilar] = useState("")
    const [id4faceReady, setId4faceReady] = useState(false)
    const [id4faceTrigger, setId4faceTrigger] = useState(false)
    const [authOption, setAuthOption] = useState("signup")

    return (
        <form className="flex flex-wrap items-center justify-between max-w-xs mt-10">
            <p className="w-full text-lg font-bolder text-center mb-4">Ingresa tus datos</p>
            <span>
                <label className="mr-2" htmlFor="cedula">Cédula</label>
                <input maxLength={10} className="p-1 rounded text-xs text-gray-600 max-w-[80px]" type="text" name="cedula" value={id} onChange={e => setId(e.target.value)} />
            </span>
            <span>
                <label className="mr-2" htmlFor="dactilar">Dactilar</label>
                <input maxLength={6} className="p-1 rounded text-xs text-gray-600 max-w-[80px]" type="text" name="dactilar" value={dactilar} onChange={e => setDactilar(e.target.value)} />
            </span>
            <span className="w-full mt-4">
                <select name="auth-option" id="auth-option" className="p-1 text-gray-700 text-xs rounded" value={authOption} onChange={e => setAuthOption(e.target.value)}>
                    <option className="text-xs text-black" value="login">log in</option>
                    <option className="text-xs text-black" value="signup">sign up</option>
                </select>
            </span>
            <button type="button" onClick={e => setId4faceTrigger(true)} disabled={!id4faceReady} className="px-2 py-1 border mx-auto mt-4 w-[120px] border-white rounded bg-blue-500">{authOption}</button>
            <ID4Face id={id} dactilar={dactilar} trigger={id4faceTrigger} onReady={e => setId4faceReady(true)} login={authOption === 'login'} />
        </form>
    )
}