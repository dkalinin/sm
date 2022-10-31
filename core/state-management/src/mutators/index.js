import { MUTATOR_NAME } from '../constants';

export const mutators = {
    [MUTATOR_NAME.SET_IS_LOADING]: (state, isLoading) => {
        return {...state, isLoading};
    },
    [MUTATOR_NAME.SET_TRACK]: (state, track) => {
        state.track = track;
    },
    [MUTATOR_NAME.SET_TRACK_NAME]: (state, trackName) => {
        state.trackName = trackName;
    },
    [MUTATOR_NAME.SET_VOLUME_LEVEL]: (state, volumeLevel) => {
        state.volumeLevel = volumeLevel;
    },
    [MUTATOR_NAME.SET_PLAYING_STATUS]: (state, playingStatus) => {
        state.playingStatus = playingStatus;
    },
    [MUTATOR_NAME.SET_ERROR]: (state, error) => {
        state.error = error;
    }
};
