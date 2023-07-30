const express = require('express')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const cors = require('cors')
const { loadBase64FromLocalFile, generatePdf } = require('./utils/file')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/text', (req, res) => {
	const buffer = Buffer.from('Texto puro gerado na API.')

	// console.log('toString', buffer.toString())

	return res.send(buffer)
})

app.get('/txt', (req, res) => {
	const buffer = readFileSync('./TEXTO.txt', { encoding: 'utf8' })

	// res.setHeader('Content-Type', 'text/plain')

	return res.json(buffer)
})

app.post('/pdf', (req, res) => {
	const buffer = readFileSync('./PDF.pdf')

	console.log(buffer)

	// res.setHeader('Content-Type', 'application/pdf')

	return res.send(buffer)
})

app.post('/generated_pdf', async (req, res) => {
	const logo = loadBase64FromLocalFile(resolve(__dirname, 'assets', 'logo.png'))

	const docDefinition = {
		header() {
			return [
				{
					text: 'FILE GENERATED WITH PDFMAKE',
					margin: [30, 20, 30, 0]
				}
			]
		},

		content: [
			{
				columns: [
					{
						text: 'Content here',
						style: 'section_title',
						margin: [0, 20, 0, 0]
					}
				]
			},
			{
				columns: [
					{
						text: 'Content here',
						style: 'section_title'
					}
				]
			},
			{
				columns: [
					{
						text: 'Content here',
						style: 'section_title'
					}
				]
			}
		],

		footer(currentPage, pageCount) {
			return [
				{
					style: 'footer',
					columns: [
						'',
						{
							text: 'System Name',
							color: '#646464'
						},
						{
							text: `${currentPage}/${pageCount}`,
							alignment: 'right',
							marginRight: 30
						}
					]
				}
			]
		},

		styles: {
			section_title: {
				fontSize: 8,
				bold: true,
				marginBottom: 8
			},
			footer: {
				alignment: 'center',
				fontSize: 7,
				color: '#424242',
				margin: [
					15,
					14,
					15,
					0
				]
			}
		},
		
		images: {
			logo
		},

		info: {
			title: 'Relatório',
			author: 'Felipe Leite'
		},
		pageSize: 'A4',
		pageOrientation: 'portrait'
	}

	const buffer = await generatePdf(docDefinition)

	res.setHeader('Content-type', 'application/pdf')

	return res.end(buffer)
})

app.post('/sheet', (req, res) => {
	const buffer = readFileSync('./SHEET.xlsx')

	// res.setHeader('Content-Type', 'application/pdf')

	return res.send(buffer)
})

app.listen(3333, () => {
	console.log('Executando em http://localhost:3333...')
})

