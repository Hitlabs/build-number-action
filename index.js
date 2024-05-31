import core from '@actions/core'
import github from '@actions/github'
import { writeFileSync } from 'fs'

const filePath = core.getInput('file-path')

try {
	console.log('*************** PRECHECK ******************')
	if (!branches.length) {
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
	const resolvedPath = new URL(filePath, import.meta.url)
	console.log(`writing "${jsonStr}" to: ${resolvedPath}`)
	writeFileSync(resolvedPath, jsonStr)
	console.log('***************** DONE ********************')
} catch (e) {
	console.error(e)
	console.log(
		'Variables',
		JSON.stringify({
			chatId,
			maxCommits,
			messagePrefix,
			prontoApiToken,
			githubApiToken,
		})
	)
	console.log(
		'The event payload:',
		JSON.stringify(github.context.payload, null, 2)
	)
}
