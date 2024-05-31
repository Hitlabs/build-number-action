import core from '@actions/core'
import github from '@actions/github'
import { writeFileSync } from 'fs'

const filePath = core.getInput('file-path')

try {
	console.log('*************** PRECHECK ******************')
	if (!filePath) {
		const params = JSON.stringify({ filePath })
		throw new Error(`Invalid parameters provided: ${params}`)
	}
	const { pull_request } = github.context.payload
	if (!pull_request) {
		throw new Error('Invalid PR State: Pull request does not exist')
	}
	console.log('All good')
	console.log('*************** STARTING ******************')
	const build_number = pull_request.number
	const jsonStr = JSON.stringify({ build_number })
	writeFileSync(filePath, jsonStr)
	console.log(`wrote "${jsonStr}" to path: ${filePath}`)
	console.log('***************** DONE ********************')
} catch (e) {
	console.error(e)
	console.log('Variables', JSON.stringify({ filePath }))
	console.log(
		'The event payload:',
		JSON.stringify(github.context.payload, null, 2)
	)
}
