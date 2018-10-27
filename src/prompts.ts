import {gray, inverse} from 'chalk'
import {prompt} from 'inquirer'

import {TwitchAPI} from './twitch-responses'

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
    choices: onlineStreams.map(stream => `${inverse(stream.user_name)} - ${gray(stream.title)}`)
  }])

  return results.channel
}
