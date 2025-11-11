import { runGame } from './game.js'; // Import shared game data and helpers

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
        // Show Continue button and set up event
        const continueBtn = document.getElementById('continueBTN');
        if (continueBtn) {
            continueBtn.onclick = () => {
                import('./world2.js');
                document.getElementById('congratsScreen').classList.add('hidden');
            };
        }
    }
});
