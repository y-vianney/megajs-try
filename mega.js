const mega = require('megajs');
const folder = mega.File.fromURL('https://mega.nz/folder/Ay1EDZJB#X8gyHm4y6qk07RRZJx4KxQ');

const getVideos = async (req, res) => {
    await folder.loadAttributes((error, superFolder) => {
        if (error) throw error;

        let directories = [];

        superFolder.children.forEach((folder) => {
            if (folder.directory) {
                let videos = folder.children.map((file) => {
                    return new Promise((resolve, reject) => {
                        file.link((error, url) => {
                            if (error) reject(error);
                            resolve({
                                name: file.name,
                                fileLink: url
                            });
                        });
                    });
                });

                Promise.all(videos).then((completedVideos) => {
                    directories.push({
                        name: folder.name,
                        num_videos: completedVideos.length,
                        videos: completedVideos
                    });

                    if (superFolder.children.indexOf(folder) === superFolder.children.length - 1) {
                        res.send(directories);
                    }
                }).catch((error) => {
                    throw error;
                });
            }
        });
    });
};

module.exports = getVideos