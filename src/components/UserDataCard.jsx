import { useState, useEffect } from "react"

export default function UserDataCard() {
    const [data, setData] = useState({})
    const [pending, setPending] = useState(true)
    useEffect(() => {
        const controller = new AbortController()
        fetch('/api/users/me', { signal: controller.signal })
            .then(res => {
                if(!res.ok){
                    if(res.status == 401) return document.dispatchEvent(new CustomEvent('noauth', { bubbles: true, detail: 'logged out' }))
                    return res.text()
                } else {
                    return res.json()
                }
            })
            .then(data => {
                setData(data)
                setPending(false)
            })
        return () => controller.abort()
    }, [])

    return (
        <div className="p-2 min-h-[10vh]">
            {pending
                ? <p>espera un momento ...</p>
                : <ul>
                    {Object.entries(data).map(([key, value], i) => key == 'bio' ? <BioEditForm onEdit={value => setData({ ...data, bio: value })} key="user-bio" current={value} /> : <li key={key + i}>{key}: {value}</li>)}
                </ul>}
        </div>
    )
}

const BioEditForm = ({ current, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [inputText, setInputText] = useState("")
    const [pending, setPending] = useState(false)

    const handleSubmit = async event => {
        event.preventDefault()
        setPending(true)
        const res = await fetch('/api/users/me', {
            method: 'put',
            body: JSON.stringify({ bio: inputText })
        })
        setPending(false)
        if (res.ok) {
            alert('bio actualizada!')
            setIsEditing(false)
            onEdit(inputText)
        } else {
            alert(`ooops ${await res.json()}`)
        }
    }

    return (
        isEditing
            ? <form onSubmit={handleSubmit} className="w-full">
                <input className="text-gray-600 w-full inline" value={inputText} type="text" name="bio" placeholder={current} onChange={e => setInputText(e.target.value)} />
                <button className="px-1 text-sm border border-white rounded-xl mt-2 mr-2 inline" type="submit">submit</button>
                <button onClick={() => setIsEditing(false)} className="px-1 text-sm border border-red-300 text-red-200 rounded-xl mt-2 mr-2 inline" type="submit">cancelar</button>
                {pending && <small>actualizando bio ....</small>}
            </form>
            : <li className="inline">bio: {current} <button type="button" onClick={() => setIsEditing(!isEditing)} className="px-1 text-sm border border-white rounded-xl inline">editar</button></li>
    )
}