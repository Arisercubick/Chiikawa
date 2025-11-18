// world5.js - Fifth level for the platformer game
'use strict';
import { runGame } from './game.js';

const level = [
    '                                                                                       ====                                        ',
    '        T         T          T                T   T    T       T      T       T             T       G TTT      TTT   TTT G  GT GTT ',
    '                                                                          ===   T        G   ====  ====  ====   ====   ============',
    '                                                                                       ======                                      ',
    '                                                                                   ===                                             ',
    '      T        T           T        T        T    G    T     TG    T    T      ===  T              T                     T         ',
    '   =     T  G            =               G == G  ==    ==    ==    ==    == ==         =====      ==    ==    ==    ==    ==   ====',
    '           ===   ===   ===         ==   ===   ===    ==    ==    ==    ==      ====      G       T                 G    =          ',
    '      = ==  =      ==    ==    ==         ==    ==    ==   G==    ==    ==           ========     ===        T  =======            ',
    '   =         ==       T ==    ==    ==      G  ==    ==    ==    ==    == G  ==  T                               ===               ',
    '  ?  =   ==    ==    ==         ==    ==  ====         ==    ==    ==    ==          T            T      T     T       T     T     ',
    '            G       G   G       G   G   G   G G G G G G G      G G     G   GG             ====  =   =  ===    ===                  ',
    '==========================    ============================   ===================  ==== ==                                          ',
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
