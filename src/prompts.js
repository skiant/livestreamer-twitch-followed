import inquirer from 'inquirer';
import _ from 'lodash';
import chalk from 'chalk';

export function usernamePrompt(defaultValue) {
	return inquirer.prompt([{
		type: 'input',
		name: 'twitchUsername',
		message: 'What\'s your twitch username?',
		default: defaultValue || null,
	}])
	.then(answers => answers.twitchUsername);
}

export function channelPrompt(onlineChannels) {
	const choices = _.sortBy(
		_.map(
			onlineChannels,
			channel => ({
				name: `${chalk.inverse(channel.name)} - ${chalk.gray(channel.status)} [${channel.game}]`,
				value: `${channel.name}`,
			}),
		),
		['value'],
	);

	return inquirer.prompt([{
		type: 'list',
		name: 'channel',
		message: 'Which channel do you want to watch?',
		choices,
	}])
	.then(answers => answers.channel);
}

export function qualityPrompt(quality) {
	return inquirer.prompt([{
		type: 'input',
		name: 'quality',
		message: 'Which quality do you want?',
		default: quality || 'best',
	}])
	.then(answers => answers.quality);
}
