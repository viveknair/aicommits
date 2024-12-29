import { execa } from 'execa';
import { black, dim, green, red, bgCyan } from 'kolorist';
import {
	intro,
	outro,
	spinner,
	select,
	confirm,
	text,
	isCancel,
} from '@clack/prompts';
import {
	assertGitRepo,
	getStagedDiff,
	getDetectedMessage,
} from '../utils/git.js';
import { getConfig } from '../utils/config.js';
import { generateCommitMessage } from '../utils/openai.js';
import { KnownError, handleCliError } from '../utils/error.js';

export default async (
	generate: number | undefined,
	excludeFiles: string[],
	stageAll: boolean,
	commitType: string | undefined,
	rawArgv: string[]
) =>
	(async () => {
		intro(bgCyan(black(' aicommits ')));
		await assertGitRepo();

		const detectingFiles = spinner();

		if (stageAll) {
			// This should be equivalent behavior to `git commit --all`
			await execa('git', ['add', '--update']);
		}

		detectingFiles.start('Detecting staged files');
		const staged = await getStagedDiff(excludeFiles);

		if (!staged) {
			detectingFiles.stop('Detecting staged files');
			throw new KnownError(
				'No staged changes found. Stage your changes manually, or automatically stage all changes with the `--all` flag.'
			);
		}

		detectingFiles.stop(
			`${getDetectedMessage(staged.files)}:\n${staged.files
				.map((file) => `     ${file}`)
				.join('\n')}`
		);

		const { env } = process;
		const config = await getConfig({
			OPENAI_KEY: env.OPENAI_KEY || env.OPENAI_API_KEY,
			proxy:
				env.https_proxy || env.HTTPS_PROXY || env.http_proxy || env.HTTP_PROXY,
			generate: generate?.toString(),
			type: commitType?.toString(),
		});

		const s = spinner();
		s.start('The AI is analyzing your changes');

		let currentMessage: string;
		let messages: string[];
		try {
			messages = await generateCommitMessage(
				config.OPENAI_KEY,
				config.model,
				config.locale,
				staged.diff,
				config.generate,
				config['max-length'],
				config.type,
				config.timeout,
				config.proxy
			);
			currentMessage = messages[0];
		} finally {
			s.stop('Changes analyzed');
		}

		// New interactive refinement loop
		while (true) {
			const response = await text({
				message: `Is this message good?\n→ ${currentMessage}\n(Type feedback or 'yes' to accept)`,
			});

			if (isCancel(response)) {
				outro('Commit cancelled');
				process.exit(0);
			}

			if (response.toLowerCase() === 'yes') {
				break;
			}

			// Generate refined message based on feedback
			s.start('Refining commit message');
			try {
				messages = await generateCommitMessage(
					config.OPENAI_KEY,
					config.model,
					config.locale,
					staged.diff,
					1,
					config['max-length'],
					config.type,
					config.timeout,
					config.proxy,
					response // Pass feedback as additional context
				);
				currentMessage = messages[0];
			} finally {
				s.stop('Message refined');
			}
		}

		// Existing commit creation code
		try {
			await execa('git', ['commit', '-m', currentMessage, ...rawArgv]);
			outro(`${green('✔')} Commit created successfully`);
		} catch (error) {
			throw new KnownError('Failed to create commit', { cause: error });
		}
	})().catch((error) => {
		outro(`${red('✖')} ${error.message}`);
		handleCliError(error);
		process.exit(1);
	});
