import storage from 'node-persist';
import path from 'path';

function getUserHome() {
	return process.env.HOME || process.env.USERPROFILE;
}

const cacheFilePath = path.join(getUserHome(), '.twcli');

storage.initSync({ dir: cacheFilePath });

export default storage;
