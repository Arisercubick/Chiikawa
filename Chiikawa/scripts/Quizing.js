'use strict'
function clickSubmit() {
	const response = document.querySelector('input[name="answer"]:checked');
	
	if (response) {
		const responses = response.value;
		
		if (responses == '1') {
			document.getElementById('result').innerText = "I'm so proud of you!! :D";
		}
		else {
			document.getElementById('result').innerText = "Try again... :(";
		}
	}
	
	else {
		document.getElementById('resulting').innerText = "Answer the damn question.";
	}
}
const submit = document.querySelector("#submit");
submit.addEventListener("click",clickSubmit);


/* rating the interactive page */
function clickButton() {
	const answer = document.querySelector('input[name="rating"]:checked');
	const name = document.getElementById('first_name');
	
	if (answer) {
		const answers = answer.value;
		const names = name.value;
		
		if (answers == '1') {
			document.getElementById('resulting').innerText = "Thank you " + names + " for giving a 1 star";
			console.log(answer);
		}
		else if (answers == '2') {
			document.getElementById('resulting').innerText = "Thank you " + names + " for giving a 2 star";
			console.log(answer);
		}
		else if (answers == '3') {
			document.getElementById('resulting').innerText = "Thank you " + names + " for giving a 3 star";
			console.log(answer);
		}
		else if (answers == '4') {
			document.getElementById('resulting').innerText = "Thank you " + names + " for giving a 4 star";
			console.log(answer);
		}
		else {
			document.getElementById('resulting').innerText = "Thank you " + names + " for giving a 5 star";
			console.log(answer);
		}
	}
	
	else {
		document.getElementById('resulting').innerText = "Please make a selection";
		console.log("ANSWER IT");
	}
}
const check = document.querySelector("#checking");
check.addEventListener("click",clickButton);