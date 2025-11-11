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
        // You can add logic for finishing world2 here
        alert('You finished World 2!');
    }
});
