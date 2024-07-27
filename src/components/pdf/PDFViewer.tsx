import React from 'react'

type Promps = {
    path: string,
    document: string | null
}

function PDFViewer({ path, document }: Promps) {
    console.log(path, document)

    try {
        return (
            <iframe src={`https://firebasestorage.googleapis.com/v0/b/chatify-eb088.appspot.com/o/${path}%2F${document}.pdf?alt=media&token=5f0da5a9-a5bb-4c27-b024-3149d67baa5c`} className='w-full h-[85vh]' style={{ border: 'none' }}></iframe>
        )
    } catch (error) {
        console.log(error)
    }
}

export default PDFViewer
