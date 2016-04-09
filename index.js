import _ from 'lodash';
import childProcess from 'child_process';

import { getFollowedChannels, filterOfflineChannels } from './src/twitchRequests';
import { usernamePrompt, channelPrompt, qualityPrompt } from './src/prompts';
import cache from './src/cache';

let onlineChannels;
let pickedChannel;
let pickedQuality;

usernamePrompt(cache.getItem('username'))
.then((username) => {
	cache.setItem('username', username);
	return username;
})
.then(getFollowedChannels)
.then(filterOfflineChannels)
.then((channels) => {
	onlineChannels = channels;
	return onlineChannels;
})
.then(channelPrompt)
.then((channel) => {
	pickedChannel = _.find(onlineChannels, { name: channel });
})
.then(() => cache.getItem('quality'))
.then(qualityPrompt)
.then((quality) => {
	cache.setItem('quality', quality);
	pickedQuality = quality;
})
.then(() => {
	childProcess.spawn('livestreamer', [pickedChannel.url, pickedQuality], { stdio: 'inherit' });
});
