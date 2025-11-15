// world4.js - Fourth level for the platformer game
import { runGame } from './game.js';

const level = [
    '                                                                                ',
    '                                                                                ',
    '    ==    ==                =      =    ====  ==    ===   ==    ==    ==    ==  ',
    '               ==   ===    =     ==                                             ',
    '                           G                                     G           G  ',
    '    ==    ==     =    ========    ==    ==    ==   ===     =    ====  ==    ==  ',
    '                =                                         =                     ',
    '                                         G                                      ',
    '    ==    ====  ==    ==    ==    ==    ==    ==    ==    ==    ==    ==    ==  ',
    '    ?              G                   G         G                   G      G   ',
    '==========================    ============================   ===================',
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
                document.getElementById('congratsScreen').classList.add('hidden');
                alert('You finished World 4! More levels coming soon!');
            };
        }
    }
});
