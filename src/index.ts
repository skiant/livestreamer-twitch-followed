import {Command, flags} from '@oclif/command'
import {sync as ceSync} from 'command-exists'

import {getStreamToLaunch, getUserName} from './prompts'
import {GetFollowsForUserID, GetStreamsFromUserNames, GetUserIDFromName} from './twitch-requests'

class LivestreamerTwitchFollowed extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),

    // Username
    user: flags.string({
      char: 'u',
      description: 'Twitch user name that you wanna use to fetch followed streams',
      env: 'LSTF_USERNAME',
    }),

    // Quality
    quality: flags.string({
      char: 'q',
      description: 'Quality level, as "720p60" or "best"',
      env: 'LSTF_QUALITY',
    }),
  }

  async run() {
    let command = ceSync('streamlink') ? 'streamlink' : ceSync('livestreamer') ? 'livestreamer' : null

    if (!command) {
      throw(new Error('streamlink or livestreamer could not be found'))
    }

    const {flags} = this.parse(LivestreamerTwitchFollowed)
    let promptedUser = ''

    if (!flags.user) {
      promptedUser = await getUserName()
    }

    const userId = await GetUserIDFromName(flags.user || promptedUser)
    const follows = await GetFollowsForUserID(userId)
    const onlineStreams = await GetStreamsFromUserNames(follows)
    const stream = await getStreamToLaunch(onlineStreams)
    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(stream))
  }
}

export = LivestreamerTwitchFollowed
