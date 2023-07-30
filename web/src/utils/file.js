export function forceDownloadFileFromURL(url, fileName = 'Download', extension = 'pdf') {
    const link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    link.style.display = 'none'
    link.setAttribute('download', `${fileName}.${extension}`)

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    return { url, link }
}

export function downloadFileFromBlob(arrayBuffer, fileName, extension = 'pdf') {
    const tempURL = URL.createObjectURL(arrayBuffer)
    
    forceDownloadFileFromURL(tempURL, fileName, extension)
}