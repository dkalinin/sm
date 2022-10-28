export class RequestService {
    loadTrack(trackName) {
        return Promise.resolve({
            trackName,
            codec: 'aac',
            bitrate: '224kbps',
        });
    }
}
