import {defaults} from 'request-promise-native'

import {TwitchAPI} from './twitch-responses'

const twitchClient = defaults({
  baseUrl: 'https://api.twitch.tv/helix/',
  json: true,
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'h9g2k6xfh4q7dun5ic9yufitv41thau',
  },
})

export async function GetUserIDFromName(userName: string): Promise<TwitchAPI.User['id']> {
  try {
    const userResponse = await twitchClient({url: `/users?login=${userName}`}) as TwitchAPI.ApiResponse<TwitchAPI.User>
    if (userResponse.data.length > 0) {
      return userResponse.data[0].id
    } else {
      throw(new Error('Could not find the matching user'))
    }
  } catch (e) {
    throw(e)
  }
}

export async function GetFollowsForUserID(userId: TwitchAPI.User['id']): Promise<TwitchAPI.Follow['to_name'][]> {
  try {
    const FollowResponse = await twitchClient({url: `/users/follows?from_id=${userId}`}) as TwitchAPI.ApiResponse<TwitchAPI.Follow>
    return FollowResponse.data.map(follow => follow.to_name)
  } catch (e) {
    throw(e)
  }
}

export async function GetStreamsFromUserNames(userNames: TwitchAPI.Stream['user_name'][]): Promise<TwitchAPI.Stream[]> {
  try {
    const StreamsResponse = await twitchClient({url: `/streams/?user_login=${userNames.join(',')}`})
    return StreamsResponse.data
  } catch (e) {
    throw(e)
  }
}
