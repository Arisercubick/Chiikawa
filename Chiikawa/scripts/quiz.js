// Quiz data: 8 questions, each with image, caption, choices, and correct answer index
const quizData = [
  {
    image: "https://placehold.co/300x200?text=Q1",
    caption: "Who is the main character in Chiikawa?",
    choices: ["Chiikawa", "Hachiware", "Usagi", "Kurimanju"],
    answer: 0
  },
  {
    image: "https://placehold.co/300x200?text=Q2",
    caption: "Which character is known for their blue color?",
    choices: ["Chiikawa", "Hachiware", "Usagi", "Momonga"],
    answer: 1
  },
  {
    image: "https://placehold.co/300x200?text=Q3",
    caption: "Which character has rabbit ears?",
    choices: ["Chiikawa", "Hachiware", "Usagi", "Kurimanju"],
    answer: 2
  },
  {
    image: "https://placehold.co/300x200?text=Q4",
    caption: "What is Chiikawa's favorite food?",
    choices: ["Dango", "Cheese", "Honey Toast", "Rice Balls"],
    answer: 3
  },
  {
    image: "https://placehold.co/300x200?text=Q5",
    caption: "Which character is the most mischievous?",
    choices: ["Usagi", "Chiikawa", "Hachiware", "Kurimanju"],
    answer: 0
  },
  {
    image: "https://placehold.co/300x200?text=Q6",
    caption: "Who is known for their positive attitude?",
    choices: ["Chiikawa", "Hachiware", "Usagi", "Momonga"],
    answer: 1
  },
  {
    image: "https://placehold.co/300x200?text=Q7",
    caption: "Which character is a flying squirrel?",
    choices: ["Kurimanju", "Momonga", "Usagi", "Chiikawa"],
    answer: 1
  },
  {
    image: "https://placehold.co/300x200?text=Q8",
    caption: "What is the main theme of Chiikawa?",
    choices: ["Adventure", "Friendship", "Competition", "Cooking"],
    answer: 1
  }
];

let current = 0;
const responses = Array(quizData.length).fill(null);

function renderQuestion() {
  const q = quizData[current];
  document.getElementById('quizImage').src = q.image;
  document.getElementById('quizCaption').textContent = q.caption;
  // Render choices as <li> with <button>
  const choicesList = document.getElementById('quizChoices');
  choicesList.innerHTML = '';
  q.choices.forEach((choice, idx) => {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  // Use the CSS class name defined in the page's stylesheet
  btn.className = 'quiz-choice-btn';
    btn.textContent = choice;
    if (responses[current] === idx) btn.classList.add('selected');
    btn.onclick = () => {
      responses[current] = idx;
      renderQuestion();
    };
    li.appendChild(btn);
    choicesList.appendChild(li);
  });
  // Nav buttons
  document.getElementById('backBTN').hidden = !(current > 0);
  document.getElementById('nextBTN').hidden = !(current < quizData.length - 1);
  document.getElementById('submitBTN').hidden = !(current === quizData.length - 1);
}

document.getElementById('nextBTN').onclick = () => {
  if (current < quizData.length - 1) {
    current++;
    renderQuestion();
  }
};
document.getElementById('backBTN').onclick = () => {
  if (current > 0) {
    current--;
    renderQuestion();
  }
};
  document.getElementById('submitBTN').onclick = () => {
  // Show loading
  // The section element in the HTML uses id="quiz-section" (kebab-case),
  // so query that id here to find the buttons to disable.
  document.getElementById('quiz-section').querySelectorAll('button').forEach(b => b.disabled = true);
  const loadingEl = document.getElementById('quizLoading');
  const loadingTextEl = loadingEl.querySelector('p') || loadingEl;
  const messages = [
    'Computing your score...',
    'Calling AI',
    'Doing the griddy',
    'Calling my ex to help',
    'Analyzing data',
    'Finalizing results'
  ];
  let msgIndex = 0;
  // Ensure loading area visible and initialize text
  loadingEl.hidden = false;
  if (loadingTextEl) loadingTextEl.textContent = messages[msgIndex];
  // Rotate messages every 1500ms
  const loadingInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % messages.length;
    if (loadingTextEl) loadingTextEl.textContent = messages[msgIndex];
  }, 1500);

  document.getElementById('quizResult').hidden = true;
  setTimeout(() => {
    // Stop rotating messages and hide loader
    clearInterval(loadingInterval);
    loadingEl.hidden = true;
    // Score calculation
    let score = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (responses[i] === quizData[i].answer) score++;
    }
    document.getElementById('quizResult').textContent = `You scored ${score} out of ${quizData.length}!`;
    //document.getElementById('quizResult').textContent = `You scored Hello World`;
    document.getElementById('quizResult').hidden = false;
  }, 8000);
};

// Initial render
renderQuestion();
