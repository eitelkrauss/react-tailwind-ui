import { useContext, useRef, useEffect } from "react"
import { AuthContext } from "../App"

export default function ID4Face({ id, dactilar, trigger, onReady, login }) {

    const debounceRef = useRef(undefined)
    const id4faceRef = useRef(null)
    const Auth = useContext(AuthContext)

    const handleResult = (e) => {
        alert(`status:  ${e.detail.status}`)
        if(e.detail.status === 'VERIFIED') setTimeout(() => Auth(), 3000)
    }

    useEffect(() => {
        const load = async () => {
            id4faceRef.current.token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlY2xpcHNvZnQiLCJhdXRoIjoiUk9MRV9BRE1JTixST0xFX1VTRVIiLCJleHAiOjE2OTQ4MDgyMDd9.CA6C1CbWu_N_Qukpam7KhoaME_PrOXG88gMosZtYMH64q34QkDKp_fh8zbe8CSXi1koaS7mrEd0g7Pwk5u7toA"
            onReady()
        }

        id4faceRef.current.addEventListener('ready', load)
        id4faceRef.current.addEventListener('result', handleResult)
        return () => {
            if(!id4faceRef.current) return
            id4faceRef.current.removeEventListener('ready', load)
            id4faceRef.current.removeEventListener('result', handleResult)
        }
    }, [])

    useEffect(() => {
        if(!trigger) return
        clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(async () => {
            try {
                await id4faceRef.current.load({
                    minMatch: "98",
                    blink: true,
                    env: "dev",
                    callbackUrl: login ? "/api/id4face?login=1" : "/api/id4face",
                    checkId: {
                        id: id,
                        dactilar: dactilar
                    }
                })
                id4faceRef.current.start()
            } catch (error) {
                console.error("start/load err: ", error)
            }
        }, 1000)
        return () => clearTimeout(debounceRef.current)
    }, [trigger])

    return <eclipsoft-id4face ref={id4faceRef}></eclipsoft-id4face>
}