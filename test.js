const fs = require('fs')

const readDir = (directoryPath) => {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        console.log(files)
    });
}

readDir('./process-video')