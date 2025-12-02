'use strict'

//Changes the image and possible answers
function clickNext() {
	const image = document.getElementById('quizImage');
	let src = image.getAttribute('src');
	console.log("Source1 " +src);
	if (src == "../images/AdorableCutieChiikawa.png"){
		src = "../images/SweetBabyHachiware2.png";
		console.log("HACHIWARE");
		document.getElementById('question').innerText = "Which character is known for their blue color";
		document.getElementById('01').innerText = "Chiikawa";
		document.getElementById('02').innerText = "Hachiware";
		document.getElementById('03').innerText = "Usagi";
		document.getElementById('04').innerText = "Momonga";
	}
	else if (src == "../images/SweetBabyHachiware2.png") {
		src = "../images/YahaUsagi.png";
		console.log("USAGI");
		document.getElementById('question').innerText = "Which character has rabbit ears?";
		document.getElementById('01').innerText = "Momonga";
		document.getElementById('02').innerText = "Hachiware";
		document.getElementById('03').innerText = "Rakko";
		document.getElementById('04').innerText = "Usagi";
	}
	image.setAttribute('src', src);
	console.log("Source2 " +src);
}
const next = document.querySelector("#nextButton");
next.addEventListener("click",clickNext);


function clickBack() {
	const image = document.getElementById('quizImage');
	let src = image.getAttribute('src');
	if (src == "../images/SweetBabyHachiware2.png"){
		src = "../images/AdorableCutieChiikawa.png";
		document.getElementById('question').innerText = "Which character is known for their blue color";
		document.getElementById('01').innerText = "Chiikawa";
		document.getElementById('02').innerText = "Usagi";
		document.getElementById('03').innerText = "Kurimaju";
		document.getElementById('04').innerText = "Momonga";
	}
	else if (src == "../images/YahaUsagi.png") {
		src = "../images/SweetBabyHachiware2.png";
		document.getElementById('question').innerText = "Which character is known for their blue color";
		document.getElementById('01').innerText = "Chiikawa";
		document.getElementById('02').innerText = "Hachiware";
		document.getElementById('03').innerText = "Usagi";
		document.getElementById('04').innerText = "Momonga";
	}
	image.setAttribute('src', src);
}
const back = document.querySelector("#backButton");
back.addEventListener("click",clickBack);


//Checking the answer
function clickSubmit() {
	const response = document.querySelector('input[name="answer"]:checked');
	const image = document.getElementById('quizImage');
	let src = image.getAttribute('src');
	if (response) {
		const responses = response.value;
		const image = document.getElementById('quizImage');
		let src = image.getAttribute('src');
		if (src === "../images/AdorableCutieChiikawa.png" && responses === '1') {
			document.getElementById('result').innerText = "I'm so proud of you!! :D";
		}
		else if (src === "../images/SweetBabyHachiware2.png" && responses === '2') {
			document.getElementById('result').innerText = "I'm so proud of you!! :D";
		}
		else if (src === "../images/YahaUsagi.png" && responses === '4') {
			document.getElementById('result').innerText = "I'm so proud of you!! :D";
		}
		else {
			document.getElementById('result').innerText = "Try again :(";
		}
	}
	
	else {
		document.getElementById('result').innerText = "Please put an answer.";
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