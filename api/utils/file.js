const { readFileSync } = require('fs')
const pdfMake = require('pdfmake/build/pdfmake')
const pdfFonts = require('pdfmake/build/vfs_fonts')

pdfMake.vfs = pdfFonts.pdfMake.vfs

function loadBase64FromLocalFile(path) {
    const buffer = readFileSync(path)
    return `data:image/jpeg;base64,${buffer.toString('base64')}`
}

async function generatePdf(definitions, format = 'buffer') {
    const pdfDoc = pdfMake.createPdf(definitions)

    return new Promise((resolve, reject) => {
        try {
            switch(format) {
                case 'buffer':
                    pdfDoc.getBuffer(resolve)
                    break
                case 'blob':
                    pdfDoc.getBlob(resolve)
                    break
            }
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
	loadBase64FromLocalFile,
	generatePdf
}