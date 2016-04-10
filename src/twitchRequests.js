import https from 'https';
import _ from 'lodash';

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
			resolve(JSON.parse(body));
		});
	});
}

export function getFollowedChannels(username) {
	return new Promise((resolve, reject) => {
		const options = _.extend(
			{ path: `/kraken/users/${username}/follows/channels?limit=100&sortby=last_broadcast` },
			requestOptions
		);
		https.get(options, (res) => {
			parseBody(res).then((body) => {
				const followedChannels = _.map(body.follows, 'channel.name');
				resolve(followedChannels);
			});
		}).on('error', (e) => {
			reject(e);
		});
	});
}

export function filterOfflineChannels(channels) {
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
					status: stream.channel.status,
					game: stream.channel.game,
				}))
				.value();
				resolve(liveStreams);
			});
		});
	});
}
