import storage from 'node-persist';
import path from 'path';
import fs from 'fs';

function getUserHome() {
	return process.env.HOME || process.env.USERPROFILE;
}

const cacheFilePath = path.join(getUserHome(), '.twcli');

// Delete legacy format files
function deleteCacheFile(fileName) {
	const filePath = path.resolve(cacheFilePath, fileName);
	if (fs.statSync(filePath)) {
		fs.unlinkSync(filePath);
	}
}

deleteCacheFile('quality');
deleteCacheFile('username');

storage.initSync({ dir: cacheFilePath });

export default storage;
