import { BaseAction } from '../base-action/base-action.js';

export class PlayAction extends BaseAction {
    #requestService;

    constructor(requestService, payload) {
        super();

        this.#requestService = requestService;
        this._payload = payload;
    }

    execute(mutationExecutor) {
        const { trackName } = this._payload;

        mutationExecutor(MUTATOR_NAME.SET_IS_LOADING, true);

        return this.#requestService
            .loadTrack(trackName)
            .then((track) => {
                mutationExecutor(MUTATOR_NAME.SET_TRACK_NAME, trackName);
                mutationExecutor(MUTATOR_NAME.SET_TRACK, track);
                mutationExecutor(MUTATOR_NAME.SET_PLAYING_STATUS, PLAYING_STATUS.PLAY);
            })
            .catch((error) => {
                mutationExecutor(MUTATOR_NAME.SET_ERROR, error);
            })
            .finally(() => {
                mutationExecutor(MUTATOR_NAME.SET_IS_LOADING, false);
            });

    }
}
