import {VolumeAction} from "./volume-action.js";
import {ACTION_NAME, MUTATOR_NAME, PLAYING_STATUS} from "../../constants";

describe('VolumeAction', () => {
    const volumeLevel = '10%';
    const payload = { volumeLevel };
    let action;

    beforeEach(() => {
        action = new VolumeAction(payload);
    });

    it('has a proper action title', () => {
        expect(action.title).toEqual(ACTION_NAME.VOLUME);
    });

    it('executes properly', () => {
        const mutatorCallsStack = [];
        const expectedStack = [
            { mutator: MUTATOR_NAME.SET_VOLUME_LEVEL, payload: volumeLevel }
        ];

        const mutationExecutor = (mutator, payload) => {
            mutatorCallsStack.push({ mutator, payload });
        };

        action.execute(mutationExecutor);

        expect(mutatorCallsStack).toEqual(expectedStack);
    });
});
