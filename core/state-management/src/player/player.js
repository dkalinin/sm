import { PLAYING_STATUS } from '../constants';
import { mutators } from '../mutators/index.js';
import { StateManagementService } from '../services/state-management-service/state-management-service.js';
import { RequestService } from '../services/request-service/request-service.js';
import { PlayAction } from '../actions/play-action/play-action.js';
import { VolumeAction } from '../actions/volume-action/volume-action.js';

export class Player {
    #rootElement;
    #trackName;

    constructor(rootElement, trackName) {
        this.#rootElement = rootElement;
        this.#trackName = trackName;
    }

    init() {
        const initialState = {
            isLoading: false,
            trackName: null,
            track: null,
            volumeLevel: '50%',
            playingStatus: PLAYING_STATUS.PAUSE,
            error: null,
        };

        const stateManagementService = new StateManagementService(mutators, initialState);

        stateManagementService.addStateListener('trackName', () => {
            console.log(`PlayAction is dispatched: ${stateManagementService.state.trackName}`);
            this.#rootElement.innerHTML += `<h3 data-ts="now-playing">Now Playing: ${stateManagementService.state.trackName}</h3>`;
        });

        stateManagementService.addStateListener('volumeLevel', () => {
            console.log(`VolumeAction is dispatched: ${stateManagementService.state.volumeLevel}`);
            this.#rootElement.innerHTML += `<h4 data-ts="volume-level">Volume: ${stateManagementService.state.volumeLevel}</h4>`;
        });

        const requestService = new RequestService();

        stateManagementService.dispatch(new PlayAction(requestService, { trackName: this.#trackName }));
        stateManagementService.dispatch(new VolumeAction({ volumeLevel: '10%' }));
    }
}
