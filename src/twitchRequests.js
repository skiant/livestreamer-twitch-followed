import https from 'https';
import _ from 'lodash';

import debug from './debug';

const requestOptions = {
	protocol: 'https:',
	host: 'api.twitch.tv',
	headers: {
		Accept: 'application/vnd.twitchtv.v3+json',
	},
};

function parseBody(res) {
	return new Promise((resolve) => {
		let body = '';

		res.on('data', (chunk) => {
			body += chunk;
		});

		res.on('end', () => {
			debug('body parsed');
			resolve(JSON.parse(body));
		});
	});
}

export function getFollowedChannels(username) {
	debug(`Grabbing followed channels for ${username}`);

	return new Promise((resolve, reject) => {
		const options = _.extend(
			{ path: `/kraken/users/${username}/follows/channels?limit=100&sortby=last_broadcast` },
			requestOptions
		);
		https.get(options, (res) => {
			parseBody(res).then((body) => {
				const followedChannels = _.map(body.follows, 'channel.name');
				debug(followedChannels);
				resolve(followedChannels);
			});
		}).on('error', (e) => {
			reject(e);
		});
	});
}

export function filterOfflineChannels(channels) {
	debug(`Filtering channel list ${channels}`);

	return new Promise((resolve) => {
		const options = _.extend(
			{ path: `/kraken/streams/?channel=${channels.join(',')}` },
			requestOptions
		);
		https.get(options, (res) => {
			parseBody(res).then((body) => {
				const liveStreams = _.chain(body.streams)
				.map((stream) => ({
					name: stream.channel.name,
					url: stream.channel.url,
				}))
				.value();
				debug(JSON.stringify(liveStreams));
				resolve(liveStreams);
			});
		});
	});
}
