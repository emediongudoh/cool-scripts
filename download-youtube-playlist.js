const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Specify the absolute path for the download directory
const downloadDir = path.join('C:', 'Users', 'Elite', 'Videos', 'Syntax');

// Ensure the download directory exists
if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
}

// Function to get existing files in the directory
function getExistingFiles() {
    return fs
        .readdirSync(downloadDir)
        .map(file => path.basename(file, path.extname(file)));
}

// Function to download a playlist
function downloadYoutubePlaylist(playlistUrl) {
    // Get list of existing files (without extensions)
    const existingFiles = getExistingFiles();

    // Construct the yt-dlp command to download the playlist with options to skip existing files
    const command = `yt-dlp --progress --no-post-overwrites --ignore-errors -o "${downloadDir}/%(title)s.%(ext)s" ${playlistUrl}`;

    // Run the yt-dlp command and show the download progress
    const process = exec(command);

    // Output the progress in real-time
    process.stdout.on('data', data => {
        console.log(data.toString());

        // Extract title from the output to check if it's a new file
        const match = data.toString().match(/[\w\s-]+(?=\.mp4|\.mkv)/i);
        if (match) {
            const newFile = match[0].trim();
            if (existingFiles.includes(newFile)) {
                console.log(`Skipping ${newFile}, already exists.`);
                // process.kill(); // Uncomment to stop the download
            }
        }
    });

    // Handle errors
    process.stderr.on('data', data => {
        console.error(`Error -> ${data}`);
    });

    process.on('exit', code => {
        console.log(`Process exited with code ${code}`);
    });
}

// The URL of the YouTube playlist you want to download
const playlistUrl =
    'https://www.youtube.com/playlist?list=PLa2xyjHSwcZ0kqllzidSMtaoDwK1RwY5i';

// Start downloading the playlist
downloadYoutubePlaylist(playlistUrl);
