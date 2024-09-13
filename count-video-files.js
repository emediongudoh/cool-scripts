const fs = require('fs');
const path = require('path');

// Specify the directory path
const directoryPath = path.join('C:', 'Users', 'Elite', 'Videos', 'Syntax');

// Function to count video files in the directory
function countVideoFiles(dirPath) {
    try {
        // Get list of files in the directory
        const files = fs.readdirSync(dirPath);

        // Define common video file extensions
        const videoExtensions = ['.mp4', '.mkv', '.avi', '.mov', '.wmv'];

        // Count video files
        const videoCount = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return videoExtensions.includes(ext);
        }).length;

        console.log(`Number of video files in "${dirPath}" -> ${videoCount}`);
    } catch (error) {
        console.error(error.message);
    }
}

// Call the function
countVideoFiles(directoryPath);
