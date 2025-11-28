// Kelly Yu
'use strict'
const check = document.getElementById('checking');
function clickButton () {
	const name =  document.querySelector('input[name="first name"]');
	const answer = document.querySelector('input[name="rating"]:checked');
	if (answer) {
		const answers = answer.value;
		document.getElementById('result') = "Thank you for giving" + answers ;
	}
	else {
		document.getElementById('result').innerText = "Please make a selection";
	}
}
check.addEventListener('click',clickButton);