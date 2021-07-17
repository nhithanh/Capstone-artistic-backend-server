# $1 video_path
# $2 output_dir
ffmpeg/bin/ffmpeg.exe -hide_banner -y -i $1 \
  -vf scale=w=842:h=480:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 7 -hls_playlist_type vod -b:v 1400k -maxrate 1498k -bufsize 2100k -b:a 128k -hls_segment_filename $2/480p_%03d.ts $2/480p.m3u8