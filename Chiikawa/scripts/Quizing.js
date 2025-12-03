'use strict'

//Changes the image and possible answers
function clickNext() {
	const image = document.getElementById('quizImage');
	let src = image.getAttribute('src');
	console.log("Source1 " +src);
	if (src == "../images/LittleChiikawa.webp"){
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
	else if (src == "../images/YahaUsagi.png") {
		src = "../images/ChiikawaMarshmallow.webp";
		console.log("FOOD");
		document.getElementById('question').innerText = "What is Chiikawa's favorite food?";
		document.getElementById('01').innerText = "Dango";
		document.getElementById('02').innerText = "Cheese";
		document.getElementById('03').innerText = "Rice Balls";
		document.getElementById('04').innerText = "Honey Toast";
	}
	else if (src == "../images/ChiikawaMarshmallow.webp") {
		src = "../images/Momonga.webp";
		console.log("MOMONGA");
		document.getElementById('question').innerText = "Which character is the most mischievous?";
		document.getElementById('01').innerText = "Momonga";
		document.getElementById('02').innerText = "Rakko";
		document.getElementById('03').innerText = "Kurimanju";
		document.getElementById('04').innerText = "Hachiware";
	}
	else if (src == "../images/Momonga.webp") {
		src = "../images/Rakko.webp";
		console.log("RAKKO");
		document.getElementById('question').innerText = "Who is known for their hunting skills";
		document.getElementById('01').innerText = "Chiikawa";
		document.getElementById('02').innerText = "Momonga";
		document.getElementById('03').innerText = "Usagi";
		document.getElementById('04').innerText = "Rakko";
	}
	else if (src == "../images/Rakko.webp") {
		src = "../images/MomongaFire.jpg";
		console.log("MONGAAA");
		document.getElementById('question').innerText = "Which character is a flying squirrel?";
		document.getElementById('01').innerText = "Hachiware";
		document.getElementById('02').innerText = "Freddy Fazbear";
		document.getElementById('03').innerText = "Momonga";
		document.getElementById('04').innerText = "Chiikawa";
	}
	else if (src == "../images/MomongaFire.jpg") {
		src = "../images/UsagiSad.jpg";
		console.log("Friendship :D");
		document.getElementById('question').innerText = "What is the main theme of Chiikawa?";
		document.getElementById('01').innerText = "Adventure";
		document.getElementById('02').innerText = "Friendship";
		document.getElementById('03').innerText = "Competition";
		document.getElementById('04').innerText = "Cooking";
	}
	else if (src == "../images/UsagiSad.jpg") {
		src = "../images/LittleChiikawa.webp";
		console.log("CHIIKAWA");
		document.getElementById('question').innerText = "Which character is known for their blue color";
		document.getElementById('01').innerText = "Chiikawa";
		document.getElementById('02').innerText = "Usagi";
		document.getElementById('03').innerText = "Kurimaju";
		document.getElementById('04').innerText = "Momonga";
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
		src = "../images/LittleChiikawa.webp";
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
	else if (src == "../images/ChiikawaMarshmallow.webp") {
		src = "../images/YahaUsagi.png";
		document.getElementById('question').innerText = "Which character has rabbit ears?";
		document.getElementById('01').innerText = "Momonga";
		document.getElementById('02').innerText = "Hachiware";
		document.getElementById('03').innerText = "Rakko";
		document.getElementById('04').innerText = "Usagi";
	}
	else if (src == "../images/Momonga.webp") {
		src = "../images/ChiikawaMarshmallow.webp";
		document.getElementById('question').innerText = "What is Chiikawa's favorite food?";
		document.getElementById('01').innerText = "Dango";
		document.getElementById('02').innerText = "Cheese";
		document.getElementById('03').innerText = "Rice Balls";
		document.getElementById('04').innerText = "Honey Toast";
	}
	else if (src == "../images/Rakko.webp") {
		src = "../images/Momonga.webp";
		document.getElementById('question').innerText = "Which character is the most mischievous?";
		document.getElementById('01').innerText = "Momonga";
		document.getElementById('02').innerText = "Rakko";
		document.getElementById('03').innerText = "Kurimanju";
		document.getElementById('04').innerText = "Hachiware";
	}
	else if (src == "../images/MomongaFire.jpg") {
		src = "../images/Rakko.webp";
		document.getElementById('question').innerText = "Who is known for their hunting skills";
		document.getElementById('01').innerText = "Chiikawa";
		document.getElementById('02').innerText = "Momonga";
		document.getElementById('03').innerText = "Usagi";
		document.getElementById('04').innerText = "Rakko";
	}
	else if (src == "../images/UsagiSad.jpg") {
		src = "../images/MomongaFire.jpg";
		document.getElementById('question').innerText = "Which character is a flying squirrel?";
		document.getElementById('01').innerText = "Hachiware";
		document.getElementById('02').innerText = "Freddy Fazbear";
		document.getElementById('03').innerText = "Momonga";
		document.getElementById('04').innerText = "Chiikawa";
	}
	else if (src == "../images/LittleChiikawa.webp") {
		src = "../images/UsagiSad.jpg";
		document.getElementById('question').innerText = "What is the main theme of Chiikawa?";
		document.getElementById('01').innerText = "Adventure";
		document.getElementById('02').innerText = "Friendship";
		document.getElementById('03').innerText = "Competition";
		document.getElementById('04').innerText = "Cooking";
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
		if (src === "../images/LittleChiikawa.webp" && responses === '1') {
			document.getElementById('result').innerText = "I'm so proud of you!! :D";
		}
		
		else if (src === "../images/SweetBabyHachiware2.png" && responses === '2') {
			document.getElementById('result').innerText = "You're doing great!! :D";
		}
		
		else if (src === "../images/YahaUsagi.png" && responses === '4') {
			document.getElementById('result').innerText = "Nice Job!! :D";
		}
		
		else if (src === "../images/ChiikawaMarshmallow.webp" && responses === '3') {
			document.getElementById('result').innerText = "You're killing it!! :D";
		}
		
		else if (src === "../images/Momonga.webp" && responses === '1') {
			document.getElementById('result').innerText = "YAY!! :D";
		}
		
		else if (src === "../images/Rakko.webp" && responses === '4') {
			document.getElementById('result').innerText = "AMAZING!! :D";
		}
		
		else if (src === "../images/MomongaFire.jpg" && responses === '3') {
			document.getElementById('result').innerText = "WE are very proud of you >:D";
		}
		
		else if (src === "../images/UsagiSad.jpg" && responses === '2') {
			document.getElementById('result').innerText = "You reached the end! Good job :)";
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
	const secret = document.getElementById('secret');
	
	if (answer) {
		const answers = answer.value;
		const names = name.value;
		const secrets = secret.value;
		
		if (answers == '1') {
			document.getElementById('resulting').innerText = "Thank you " + names + " for giving a 1 star";
			console.log(answer);
			
			if (secrets === 'Freddy Fazbear') {
				document.getElementById('charSecret').innerText = "Freddy Fazbear was indeed the secret character in the quiz!";
			}
			else if (!secrets) {
				document.getElementById('charSecret').innerText = "Please put a guess for the question above first name.";
			}
			else {
				document.getElementById('charSecret').innerText = "Please put the correct answer";
			}
		}
		else if (answers == '2') {
			document.getElementById('resulting').innerText = "Thank you " + names + " for giving a 2 star";
			console.log(answer);
			
			if (secrets === 'Freddy Fazbear') {
				document.getElementById('charSecret').innerText = "Freddy Fazbear was indeed the secret character in the quiz!";
			}
			else if (!secrets) {
				document.getElementById('charSecret').innerText = "Please put a guess for the question above first name.";
			}
			else {
				document.getElementById('charSecret').innerText = "Please put the correct answer";
			}
		}
		else if (answers == '3') {
			document.getElementById('resulting').innerText = "Thank you " + names + " for giving a 3 star";
			console.log(answer);
			
			if (secrets === 'Freddy Fazbear') {
				document.getElementById('charSecret').innerText = "Freddy Fazbear was indeed the secret character in the quiz!";
			}
			else if (!secrets) {
				document.getElementById('charSecret').innerText = "Please put a guess for the question above first name.";
			}
			else {
				document.getElementById('charSecret').innerText = "Please put the correct answer";
			}
		}
		else if (answers == '4') {
			document.getElementById('resulting').innerText = "Thank you " + names + " for giving a 4 star";
			console.log(answer);
			
			if (secrets === 'Freddy Fazbear') {
				document.getElementById('charSecret').innerText = "Freddy Fazbear was indeed the secret character in the quiz!";
			}
			else if (!secrets) {
				document.getElementById('charSecret').innerText = "Please put a guess for the question above first name.";
			}
			else {
				document.getElementById('charSecret').innerText = "Please put the correct answer";
			}
		}
		else {
			document.getElementById('resulting').innerText = "Thank you " + names + " for giving a 5 star";
			console.log(answer);
			
			if (secrets === 'Freddy Fazbear') {
				document.getElementById('charSecret').innerText = "Freddy Fazbear was indeed the secret character in the quiz!";
			}
			else if (!secrets) {
				document.getElementById('charSecret').innerText = "Please put a guess for the question above first name.";
			}
			else {
				document.getElementById('charSecret').innerText = "Please put the correct answer";
			}
		}
	}
	
	else {
		document.getElementById('resulting').innerText = "Please make a selection";
		console.log("ANSWER IT");
		
		document.getElementById('charSecret').innerText = "Answer the question above the First Name"
	}
}
const check = document.querySelector("#checking");
check.addEventListener("click",clickButton);