const shell = require('shelljs')

let video_path = './upload-video/rogi.mp4'
let output_dir = './hls'
shell.exec(`bash ./scripts/convert_video_to_hls.sh ${video_path} ${output_dir}`)