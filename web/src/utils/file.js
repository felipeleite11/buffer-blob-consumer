export function forceDownloadFileFromURL(url, { name = 'file', extension = 'pdf', open = false }) {
    const link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    link.style.display = 'none'

    if(!open) {
        link.setAttribute('download', `${name}.${extension}`)
    }

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)
}

export function downloadFileFromBlob(arrayBuffer, options) {
    const tempURL = URL.createObjectURL(arrayBuffer)
    
    forceDownloadFileFromURL(tempURL, options)
}