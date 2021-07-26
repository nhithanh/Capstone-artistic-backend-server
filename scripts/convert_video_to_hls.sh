# $1 video_path
# $2 output_dir
ffmpeg/bin/ffmpeg.exe -i $1 -codec: copy -start_number 0 -hls_time 5 -hls_list_size 0 -f hls $2/playlist.m3u8