import {Command, flags} from '@oclif/command'

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
    }),
  }

  async run() {
    const {flags} = this.parse(LivestreamerTwitchFollowed)

  }
}

export = LivestreamerTwitchFollowed
