import yargs from 'yargs';
const argv = yargs.argv;
import chalk from 'chalk';

export default function debug(message) {
	if (argv.dev || argv.debug) {
		console.log(chalk.yellow(`[DEBUG]: ${message}`));
	}
}
