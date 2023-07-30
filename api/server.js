const express = require('express')
const { readFileSync } = require('fs')
const cors = require('cors')

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

	// res.setHeader('Content-Type', 'application/pdf')

	return res.send(buffer)
})

app.post('/sheet', (req, res) => {
	const buffer = readFileSync('./SHEET.xlsx')

	// res.setHeader('Content-Type', 'application/pdf')

	return res.send(buffer)
})

app.listen(3333, () => {
	console.log('Executando em http://localhost:3333...')
})

