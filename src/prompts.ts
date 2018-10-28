import chalk from 'chalk'
import {prompt} from 'inquirer'

import {TwitchAPI} from './@types/twitch-api'

export async function getUserName() {
  const results = await prompt<{twitchUser: string}>([{
    type: 'input',
    name: 'twitchUser',
    message: 'What\'s your twitch username?',
    default: null,
  }])

  return results.twitchUser
}

export async function getStreamToLaunch(onlineStreams: TwitchAPI.Stream[]) {
  const results = await prompt<{channel: string}>([{
    type: 'list',
    name: 'channel',
    message: 'Which channel do you want to watch?',
    choices: onlineStreams.map(stream => `${chalk.inverse(stream.user_name)} - ${chalk.gray(stream.title)}`)
  }])

  return results.channel
}
