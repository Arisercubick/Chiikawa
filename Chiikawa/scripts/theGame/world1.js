// world1.js - First level for the platformer game
'use strict';
import { runGame } from './game.js';

const level = [
    '                                                                                ',
    '                                                                                ',
    '                                                                                ',
    '                                      =                                         ',
    '                                     ==                                         ',
    '                                    ===                                         ',
    '                                   ====                                         ',
    '                                  =====                                         ',
    '                                 ======                                         ',
    '        ?   G    G              =======      G                    G             ',
    '===========================   ============================   ===================',
    '                                                                                '
];

runGame({
    level,
    playerStart: { x: undefined, y: undefined },
    onWin: () => {
        const continueBtn = document.getElementById('continueBTN');
        if (continueBtn) {
            continueBtn.onclick = () => {
                window.location.href = 'world2.html';
                document.getElementById('congratsScreen').classList.add('hidden');
            };
        }
    }
});
