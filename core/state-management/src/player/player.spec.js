import { JSDOM } from 'jsdom';
import { Player } from './player';

describe('Player', () => {
    const trackName = 'Unknown Artist - Track 01';
    let jsDom;
    let rootElement;

    const selectors = {
        trackName: '[data-ts="now-playing"]',
        volumeLevel: '[data-ts="volume-level"]'
    };

    beforeEach(() => {
        jsDom = new JSDOM();
        rootElement = jsDom.window.document.getElementsByTagName('body')[0];
        global.CustomEvent = jsDom.window.CustomEvent;
        global.EventTarget = jsDom.window.EventTarget;
    });

    it('does init', async () => {
        const player = new Player(rootElement, trackName);
        await player.init();

        setTimeout(() => {
            expect(rootElement.querySelector(selectors.trackName).innerHTML).toEqual(`Now Playing: ${trackName}`);
        });
    });
});
