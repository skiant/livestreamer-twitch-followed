import {Command, flags} from '@oclif/command'

import {GetFollowsForUserID, GetUserIDFromName} from './twitch-requests'

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
    const {flags} = this.parse(LivestreamerTwitchFollowed)
    let promptedUser = ''

    if (!flags.user) {
      const prompt =

      promptedUser = prompt.twitchUser
    }

    const userId = await GetUserIDFromName(flags.user || promptedUser)
    const follows = await GetFollowsForUserID(userId)
    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(follows))
  }
}

export = LivestreamerTwitchFollowed
