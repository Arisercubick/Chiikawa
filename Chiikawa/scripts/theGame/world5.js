// world5.js - Fifth level for the platformer game
import { runGame } from './game.js';

const level = [
    '                                                                                ',
    '                                                             G                  ',
    '   =     T               =         G       == G  ==    ==    ==    ==    ==     ',
    '            ==    ==    ==         ==    ==   ===    ==    ==    ==    ==       ',
    '      = ==  =      ==    ==    ==         ==    ==    ==   G==    ==    ==      ',
    '   =   T     ==       T ==    ==    ==      G  ==    ==    ==    ==    ==       ',
    '  ?  =   ==    ==    ==         ==    ==  ====         ==    ==    ==    ==     ',
    '            G       G   G       G   G   G   G   G   G   G       G       G   G   ',
    '==========================    ============================   ===================',
];

runGame({
    level,
    playerStart: { x: undefined, y: undefined }, // Start on a valid platform near the top left
    onWin: () => {
        const continueBtn = document.getElementById('continueBTN');
        if (continueBtn) {
            continueBtn.onclick = () => {
                document.getElementById('congratsScreen').classList.add('hidden');
                alert('You finished World 5! More levels coming soon!');
            };
        }
    }
});
