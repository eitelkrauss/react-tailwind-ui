import { useRef, useState, useEffect } from "react";

export default function Chat() {
    const wsRef = useRef(null)
    const textInput = useRef(null)
    const [messages, setMessages] = useState([])
    const [newMsg, setNewMsg] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [username, setUsername] = useState("")

    const connectToChat = async () => {
        console.log("conecting..")
        wsRef.current = await connectToWsChat()

        wsRef.current.onmessage = e => {
            // a message was received
            console.log("msg received: ", e)
            setMessages(messages => [...messages, e.data])
        };

        wsRef.current.onerror = e => {
            // an error occurred
            console.log("error: ", e.message);
            setWsError(e.message)
        };

        wsRef.current.onclose = e => {
            // connection closed
            console.log("closed: ", e.code, e.reason);
        };
    }

    const sendMessage = (user, message) => {
        console.log(user, message)
        wsRef.current.send(`${user}: ${message}`)
        setNewMsg(msg => "")
    }

    const onEnter = (event) => {
        if (event.key !== 'Enter') return
        sendMessage(username, event.target.value)
    }

    useEffect(() => {
        const controller = new AbortController()
        fetch('/api/users/me', { signal: controller.signal })
            .then(res => {
                if (!res.ok) {
                    if (res.status == 401) return document.dispatchEvent(new CustomEvent('noauth', { bubbles: true, detail: 'logged out' }))
                    return res.text()
                } else {
                    return res.json()
                }
            })
            .then(data => {
                setUsername(data.email)
                textInput.current.addEventListener('keypress', onEnter)
            })
        return () => controller.abort()
    }, [])

    return (
        <>
            {messages.length == 0 && <button className='border border-white p-2 rounded' onClick={connectToChat}>Connect to Chat</button>}
            <MessageBox messages={messages} />
            <input ref={textInput} className='inline rounded text-black' value={newMsg} onChange={e => setNewMsg(e.target.value)}></input><button onClick={() => sendMessage(username, newMsg)} className='inline border border-white p-2 ml-2 rounded'>send</button>
        </>
    )
}


const MessageBox = ({ messages }) => {
    return (
        <div className="text-white p-4 bg-blue-800 overflow-y-scroll h-[40vh] rounded-xl text-start max-w-lg mx-auto my-4">
            {messages.map((m, i) => <p style={{ color: 'white' }} key={i}>{m}</p>)}
        </div>
    )
}

const connectToWsChat = () => new Promise((resolve, reject) => {
    const ws = new WebSocket('ws://192.168.116.64:3001');
    ws.onopen = () => {
        ws.send('react')
        resolve(ws)
    }
})