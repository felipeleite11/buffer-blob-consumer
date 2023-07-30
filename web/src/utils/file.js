export function downloadFileFromBlob(arrayBuffer, { name = 'file', extension = 'pdf', open = false }) {
    const url = URL.createObjectURL(arrayBuffer)
    
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