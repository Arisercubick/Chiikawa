// world3.js - Third level for the platformer game
'use strict';
import { runGame } from '../game.js';

// TODO: Make this level harder
const level = [
    '                                                                                ',
    '                                             T  =     T =         T             ',
    '      ==      ==      ==      ==    ====     ===      ==      ===     ==  =   ==',
    '                                                                        T       ',
    '                         ====                  T                                ',
    '      ==      ==     ===      ==      ==     ===      ==    ====    ====      ==',
    '             =                                      =                  T        ',
    '         ====   T                           G     =                             ',
    '      ==      ==      ==      ==      ==========      ==      ==      ==        ',
    '      ?                          G          G         G                 G       ',
    '===========================   ============================   ===================',
    '                                                                                ',
    '                                                                                '
];

runGame({
    level,
    playerStart: { x: undefined, y: undefined },
    onWin: () => {
        const continueBtn = document.getElementById('continueBTN');
        if (continueBtn) {
            continueBtn.onclick = () => {
                window.location.href = 'world4.html';
                document.getElementById('congratsScreen').classList.add('hidden');
            };
        }
    }
});
