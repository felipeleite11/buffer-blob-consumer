import { useState } from 'react'
import axios from 'axios'

import { Spinner } from './components/Spinner'

import './App.css'
import './styles/spinner.css'

import { downloadFileFromBlob } from './utils/file'

function App() {
	const [downloading, setDownloading] = useState(false)

	async function loadTexto() {
		try {
			setDownloading(true)

			const { data } = await axios.get('http://localhost:3333/text', {
				responseType: 'blob'
			})

			downloadFileFromBlob(data, 'file', 'txt')
		} catch(e) {
			console.log(e)
		}
	
		setDownloading(false)
	}

	async function loadTXT() {
		try {
			setDownloading(true)

			const { data } = await axios.get('http://localhost:3333/txt', {
				responseType: 'blob'
			})

			downloadFileFromBlob(data, 'file', 'txt')
		} catch (e) {
			console.log(e)
		}

		setDownloading(false)
	}

	async function loadPDF() {
		try {
			const { data } = await axios.post('http://localhost:3333/pdf', {}, {
				responseType: 'blob'
			})

			downloadFileFromBlob(data, 'file', 'pdf')
		} catch (e) {
			console.log(e)
		}
	}

	async function loadSheet() {
		try {
			const { data } = await axios.post('http://localhost:3333/sheet', {}, {
				responseType: 'blob'
			})

			downloadFileFromBlob(data, 'file', 'xlsx')
		} catch (e) {
			console.log(e)
		}
	}

	async function loadImageFromURL() {
		try {
			setDownloading(true)

			const { data } = await axios.get('https://picsum.photos/800/800', {
				responseType: 'blob'
			})

			downloadFileFromBlob(data, 'image', 'jpg')
		} catch(e) {
			console.log(e)
		}

		setDownloading(false)
	}

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl font-bold">
				Consuming Buffers e Blobs in React
			</h1>
			
			<div className="flex flex-col items-center gap-4">
				{downloading ? (
					<Spinner />
				) : (
					<>
						<button className="button" onClick={loadTexto}>Plain text generated in the API</button>
						
						<button className="button" onClick={loadTXT}>TXT file from the API</button>
						
						<button className="button" onClick={loadImageFromURL}>JPG image from an external URL</button>
						
						<button className="button" onClick={loadPDF}>PDF file from the API</button>
						
						<button className="button" onClick={loadSheet}>Sheet from the API</button>
					</>
				)}
			</div>
		</div>
	)
}

export default App
