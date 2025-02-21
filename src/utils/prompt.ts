import type { CommitType } from './config.js';

const commitTypeFormats: Record<CommitType, string> = {
	'': '<commit message>',
	conventional: '<type>(<optional scope>): <commit message>',
};
const specifyCommitFormat = (type: CommitType) =>
	`The output response must be in format:\n${commitTypeFormats[type]}`;

const commitTypes: Record<CommitType, string> = {
	'': '',

	/**
	 * References:
	 * Commitlint:
	 * https://github.com/conventional-changelog/commitlint/blob/18fbed7ea86ac0ec9d5449b4979b762ec4305a92/%40commitlint/config-conventional/index.js#L40-L100
	 *
	 * Conventional Changelog:
	 * https://github.com/conventional-changelog/conventional-changelog/blob/d0e5d5926c8addba74bc962553dd8bcfba90e228/packages/conventional-changelog-conventionalcommits/writer-opts.js#L182-L193
	 */
	conventional: `Choose exactly one type from the type-to-description JSON below that best describes the git diff. You must use one of these three types - no other types are allowed:\n${JSON.stringify(
		{
			chore: "Other changes that don't modify src or test files",
			feat: 'A new feature',
			fix: 'A bug fix',
		},
		null,
		2
	)}`,
};

export const generatePrompt = (
	locale: string,
	maxLength: number,
	type: CommitType,
	feedback?: string
) => {
	const basePrompt = [
		'Generate a concise git commit message written in present tense for the following code diff with the given specifications below:',
		`Message language: ${locale}`,
		`Commit message must be a maximum of ${maxLength} characters.`,
		'Exclude anything unnecessary such as translation. Your entire response will be passed directly into git commit.',
		commitTypes[type],
		specifyCommitFormat(type),
	];

	if (feedback) {
		basePrompt.push(
			'',
			'IMPORTANT INSTRUCTION - YOU MUST FOLLOW THIS:',
			feedback,
			'The above instruction takes precedence over all other requirements except format.'
		);
	}

	return basePrompt.filter(Boolean).join('\n');
};
