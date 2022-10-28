import { PlayAction } from './play-action';
import { RequestServiceMock } from '../../services/request-service';
import { ACTION_NAME, MUTATOR_NAME, PLAYING_STATUS } from '../../constants';

describe('PlayAction', () => {
    const error = 'ERR_GENERIC';
    const trackName = 'Unknown Artist - Track 01';
    const track = {
        trackName,
        codec: 'aac',
        bitrate: '224kbps',
    };

    let requestService;
    let action;
    let mutationExecutor;

    beforeEach(() => {
        requestService = new RequestServiceMock();
        action = new PlayAction(requestService, { trackName });
        mutationExecutor = jest.fn();
    });

    it('has a proper action title', () => {
        expect(action.title).toEqual(ACTION_NAME.PLAY);
    });

    describe('#execute', () => {
        it('triggers request service', () => {
            requestService.loadTrack.mockReturnValue(Promise.resolve(track));

            action.execute(mutationExecutor);
            expect(requestService.loadTrack).toHaveBeenCalledWith(trackName);
        });

        describe('#success', () => {
            it('properly executes mutators', () => {
                const mutatorCallsStack = [];
                const expectedStack = [
                    { mutator: MUTATOR_NAME.SET_IS_LOADING, payload: true },
                    { mutator: MUTATOR_NAME.SET_TRACK_NAME, payload: trackName },
                    { mutator: MUTATOR_NAME.SET_TRACK, payload: track },
                    { mutator: MUTATOR_NAME.SET_PLAYING_STATUS, payload: PLAYING_STATUS.PLAY },
                    { mutator: MUTATOR_NAME.SET_IS_LOADING, payload: false }
                ];

                mutationExecutor = (mutator, payload) => {
                    mutatorCallsStack.push({ mutator, payload });
                };

                requestService.loadTrack.mockReturnValue(Promise.resolve(track));

                action
                    .execute(mutationExecutor)
                    .then(() => {
                        expect(mutatorCallsStack).toEqual(expectedStack);
                    });
            });
        });

        describe('#failure', () => {
            it('properly executes mutators', () => {
                const mutatorCallsStack = [];
                const expectedStack = [
                    { mutator: MUTATOR_NAME.SET_IS_LOADING, payload: true },
                    { mutator: MUTATOR_NAME.SET_ERROR, payload: error },
                    { mutator: MUTATOR_NAME.SET_IS_LOADING, payload: false }
                ];

                mutationExecutor = (mutator, payload) => {
                    mutatorCallsStack.push({ mutator, payload });
                };

                requestService.loadTrack.mockReturnValue(Promise.reject(error));

                action
                    .execute(mutationExecutor)
                    .then(() => {
                        expect(mutatorCallsStack).toEqual(expectedStack);
                    });
            });
        });
    });
});
