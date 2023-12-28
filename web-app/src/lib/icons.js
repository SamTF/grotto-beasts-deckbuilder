// SVG code for icons used

const icons = {
    'bookmark': { box: 24, svg: '<path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />' },
    'upload': { box: 24, solid: false, svg: '<path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />' },
    'remix': { box: 24, solid: false, svg: '<path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />' },
    'trash': { box: 24, solid: true, svg: '<path d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" />'},
    'edit': { box: 24, solid: true, svg: '<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" /> <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />' },
    'plus': { box: 24, solid: false, svg: '<path d="M12 4.5v15m7.5-7.5h-15" />' },
    'plus-circle': { box: 24, solid: true, svg: '<path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"/>' },
    'export': { box: 24, solid: false, svg: '<path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />' },
    'export-file': { box: 24, solid: false, svg: '<path d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm5.845 17.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V12a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" /><path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z"/>' },
    'download': { box: 24, solid: false, svg: '<path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />' },
    'close': { box: 24, solid: true, svg: '<path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" />' },
    'alert': { box: 24, solid: true, svg: '<path d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" />' },
    'sparkles': { box: 24, solid: true, svg: '<path d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" />' },
    'user': { box: 24, solid: true, svg: '<path d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>' },
    'home': { box: 24, solid: true, svg : '<path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" /><path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />'},
    '?': { box: 24, solid: false, svg: '<path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />'},
    'import': { box: 24, solid: true, svg: '<path d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.97a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V18a.75.75 0 001.5 0v-4.19l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" /><path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />'},
    'copy': { box: 24, solid: false, svg: '<path d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />'},
    'check-circle': { box: 24, solid: true, svg: '<path d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" />'},
    'link' : { box: 20, solid: true, svg: '<path d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" />' },
    'chevron-down' : { box: 24, solid: false, svg: '<path  d="M19.5 8.25l-7.5 7.5-7.5-7.5" />' },
    'chevron-up' : { box: 24, solid: false, svg: '<path  d="M4.5 15.75l7.5-7.5 7.5 7.5" />' },
    'minus' : { box: 24, solid: false, svg: '<path  d="M19.5 12h-15" />' },
    'money' : { box: 24, solid: true, svg: '<path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" /><path fill-rule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" />' },
    'card' : { box: 100, solid: true, svg: '<path d="M73.704-.538H26.826c-4.496 0-8.393 2.594-10.264 6.377-.29.579-.528 1.189-.724 1.83-.166.589-.3 1.199-.372 1.83-.062.465-.093.94-.093 1.416v77.639c0 6.326 5.138 11.453 11.453 11.453h46.878a12.42 12.42 0 0 0 1.405-.083c.631-.083 1.25-.207 1.84-.383.642-.186 1.241-.434 1.829-.712 3.773-1.872 6.378-5.769 6.378-10.275V10.916c0-6.327-5.127-11.454-11.452-11.454zm9.086 86.467c0 4.196-2.42 7.825-5.943 9.572a11.05 11.05 0 0 1-1.706.662c-.548.164-1.127.278-1.716.361a10.88 10.88 0 0 1-1.313.072H28.418A10.68 10.68 0 0 1 17.74 85.928V13.541c0-.444.031-.878.083-1.313.072-.59.196-1.158.352-1.716a10.51 10.51 0 0 1 .672-1.695c1.747-3.524 5.375-5.943 9.571-5.943h43.694A10.67 10.67 0 0 1 82.79 13.541v72.388zM69.54 8.4H30.99c-3.7 0-6.9 2.13-8.44 5.24-.24.48-.43.98-.59 1.5a9.4 9.4 0 0 0-.31 1.51 8.92 8.92 0 0 0-.07 1.16v63.85a9.41 9.41 0 0 0 9.41 9.41h38.55A9.1 9.1 0 0 0 70.7 91a9.4 9.4 0 0 0 1.51-.31 8.76 8.76 0 0 0 1.5-.591c3.11-1.54 5.24-4.739 5.24-8.439V17.81a9.41 9.41 0 0 0-9.41-9.41zm3.6 46.2c-.35.03-2.02-.479-2.38-.54-.49-.079-1.01-.26-1.45.391l.87.359c.16.061 2.29.431 2.45.49.44.17.76.521.561.96-.11.24-.58.431-.881.431-.51 0-2.949-.54-3.46-.631-.58-.1-5 8.46-16.68 9-11.69.53-18.83-6.88-19.54-7.59-.41-.399-.83-.68-1.44-.35l-2.07 1.14s-.59.21-.81-.01.19-.68.19-.68 1.47-1.37 1.62-1.62c.18-.29.42-.53.64-.78-.36-.1-2.95.91-2.95.91s-.86.29-1.12-.11c-.26-.39.38-.71.38-.71s1.98-1.3 2.21-1.56c.28-.32.4-.51.14-.94-.71-1.22-1.38-2.47-1.99-3.74-.43-.88-.12-1.46.72-1.97.88-.53 1.48-1.19 1.54-2.39.11-1.93-.48-3.66-.97-5.45-.39-1.43-.51-2.94-.86-4.38-.52-2.15-.2-4.31-.27-6.47-.03-1.34.41-2.61 1.09-3.75a1.29 1.29 0 0 1 .98-.52c.77.06 1.67.08 2.27.48 2.23 1.5 4.2 3.33 5.81 5.49.54.73.99 1.47 1.78 1.93.41-1.09.74-2.14 1.22-3.11.25-.51.74-.92 1.18-1.3.52-.44 1.38-.37 1.98.12.51.42.81.36 1.01-.29.12-.36.26-.74.46-1.07.79-1.3 1.72-1.73 3.17-1.34.48.13.89.58 1.29.93.76.67 1.24.68 1.99-.01 1.66-1.53 3.1-1.14 3.85 1.04.05.16.08.33.14.57.171-.1.37-.14.431-.26.649-1.22 1.779-.93 2.75-.75.939.16 1.13 1.14 1.399 1.91.19.55.221 1.15.37 1.72.061.24.19.53.38.63.11.07.44-.14.601-.3l4.41-4.37c.93-.87 1.96-1.6 3.39-1.48 1.27.1 1.94.68 2.16 1.97.479 2.76.3 5.54.27 8.31-.02 1.02-.41 2.04-.66 3.06-.22.9-.5 1.79-.699 2.7-.261 1.15-.771 2.23-.721 3.49.04 1.36.63 2.28 1.641 3.02.83.61.91.88.45 1.84l-1.69 3.57c.63.16 2.56.601 3.13.84.22.101.561.53.48.771s-.502.389-.762.399z"/>' },
}
export default icons