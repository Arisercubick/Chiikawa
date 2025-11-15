// world3.js - Third level for the platformer game
import { runGame } from './game.js';

const level = [
    '                                                                                ',
    '                                                                                ',
    '                                                                                ',
    '       ==      ==      ==      ==      ==      ==      ==      ==      ==      ==      ==       ',
    '                                                                                ',
    '       ==      ==      ==      ==      ==      ==      ==      ==      ==      ==      ==   G   ',
    '                                                                                ',
    '       ==      ==      ==      ==      ==      ==      ==      ==      ==      ==      ==       ',
    '                                            G                           G       ',
    '===========================   ============================   ===================',
    '                                                                                ',
    '                                                                                '
];

runGame({
    level,
    playerStart: { x: undefined, y: undefined },
    onWin: () => {
        alert('You finished World 3! More levels coming soon!');
    }
});
