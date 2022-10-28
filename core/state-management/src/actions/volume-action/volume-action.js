import { BaseAction } from '../base-action/base-action.js';
import { ACTION_NAME, MUTATOR_NAME, PLAYING_STATUS } from '../../constants';

export class VolumeAction extends BaseAction {
    constructor(payload) {
        super();

        this._title = ACTION_NAME.VOLUME;
        this._payload = payload;
    }

    execute(mutationExecutor) {
        const { volumeLevel } = this._payload;
        mutationExecutor(MUTATOR_NAME.SET_VOLUME_LEVEL, volumeLevel);
    }
}
