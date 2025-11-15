import { runGame } from './game.js'; // Import shared game data and helpers

const level = [
    '                                                                                ',
    '                                                                                ',
    '                                                                                ',
    '                                                                                ',
    '                                                                                ',
    '         ==    ==    ==    ==    ==    ==    ==    ==    ==    ==    ==         ',
    '                                                                                ',
    '        ==    ==    ==    ==    ==    ==    ==    ==    ==    ==    ==          ',
    '                  G                                                     G       ',
    '===========================   ============================   ===================',
    '                                                                                ',
    '                                                                                '
];

runGame({
    level,
    playerStart: { x: undefined, y: undefined },
    onWin: () => {
        // logic for finishing world2 here
        const continueBtn = document.getElementById('continueBTN');
        if (continueBtn) {
            continueBtn.onclick = () => {
                import('./world3.js');
                document.getElementById('congratsScreen').classList.add('hidden');
            };
        }
    }
});
