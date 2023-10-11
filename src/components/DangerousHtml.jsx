export default function DangerousHtml({ html, loaderColor }) {
    return html
        ? <div className="text-blue-300 font-extrabold text-3xl" dangerouslySetInnerHTML={{ __html: html }}></div>
        : <svg viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" fill="none" className={`mx-auto animate-spin w-6 h-6 ${loaderColor}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
}