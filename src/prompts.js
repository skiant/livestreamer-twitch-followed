import inquirer from 'inquirer';
import _ from 'lodash';

import debug from './debug';

export function usernamePrompt(defaultValue) {
	return new Promise((resolve) => {
		inquirer.prompt([{
			type: 'input',
			name: 'twitchUsername',
			message: 'What\'s your twitch username?',
			default: defaultValue || null,
		}],
		(answers) => {
			resolve(answers.twitchUsername);
		});
	});
}

export function channelPrompt(onlineChannels) {
	const choices = _.map(onlineChannels, 'name');
	debug(`Channel Prompt ${JSON.stringify(choices)}`);

	return new Promise((resolve) => {
		inquirer.prompt([{
			type: 'list',
			name: 'channel',
			message: 'Which channel do you want to watch?',
			choices,
		}],
		(answers) => {
			resolve(answers.channel);
		});
	});
}

export function qualityPrompt() {
	return new Promise((resolve) => {
		inquirer.prompt([{
			type: 'input',
			name: 'quality',
			message: 'Which quality do you want?',
			default: 'best',
		}],
		(answers) => {
			resolve(answers.quality);
		});
	});
}
