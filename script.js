// Topics database
const topics = {
  recount: {
    title: "Recounts Text",
    content: "Recount texts are used to retell past events in the order they happened.",
    example: "Yesterday, I went to the zoo. I saw lions, elephants, and penguins. It was amazing!",
    questions: [
      {
        text: "What is the purpose of a recount text?",
        options: [
          { text: "To retell past events", correct: true },
          { text: "To describe something", correct: false },
          { text: "To persuade readers", correct: false }
        ]
      },
      {
        text: "Which word is common in recount texts?",
        options: [
          { text: "Yesterday", correct: true },
          { text: "In my opinion", correct: false },
          { text: "Usually", correct: false }
        ]
      }
    ]
  },
  descriptive: {
    title: "Descriptive Text",
    content: "Descriptive texts describe a person, place, or thing in detail.",
    example: "My cat is fluffy and white. She has bright blue eyes and loves to play with yarn.",
    questions: [
      {
        text: "Which is an example of a descriptive text?",
        options: [
          { text: "A news report about an event", correct: false },
          { text: "A paragraph describing a beach", correct: true },
          { text: "A story about a hero's journey", correct: false }
        ]
      },
      {
        text: "What is the main purpose of a descriptive text?",
        options: [
          { text: "To entertain", correct: false },
          { text: "To describe clearly", correct: true },
          { text: "To instruct someone", correct: false }
        ]
      }
    ]
  }
};

let score = 0;
let answered = false;
let currentQuestionIndex = 0;

// Shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function selectTopic(topicName) {
  localStorage.setItem('selectedTopic', topicName);
  window.location.href = 'topic.html';
}

function loadTopic() {
  const topicName = localStorage.getItem('selectedTopic');
  if (!topicName) {
    window.location.href = 'index.html';
    return;
  }
  const topic = topics[topicName];
  document.getElementById('topic-title').innerText = topic.title;
  document.getElementById('topic-content').innerText = topic.content;
  document.getElementById('topic-example').innerText = topic.example;
}

function goToExercise() {
  window.location.href = 'exercise.html';
}

function loadExercise() {
  const topicName = localStorage.getItem('selectedTopic');
  if (!topicName) {
    window.location.href = 'index.html';
    return;
  }

  const topic = topics[topicName];
  const question = topic.questions[currentQuestionIndex];

  document.getElementById('exercise-question').innerText = question.text;

  const optionsDiv = document.getElementById('exercise-options');
  optionsDiv.innerHTML = '';

  // Create a copy of options and shuffle it
  const shuffledOptions = [...question.options];
  shuffleArray(shuffledOptions);

  shuffledOptions.forEach((option) => {
    const button = document.createElement('button');
    button.innerText = option.text;
    button.onclick = () => checkAnswer(option.correct, button);
    optionsDiv.appendChild(button);
  });

  document.getElementById('feedback').innerText = '';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('finish-btn').style.display = 'none';
  answered = false;
}

function checkAnswer(isCorrect, button) {
  if (answered) return;
  answered = true;

  if (isCorrect) {
    document.getElementById('feedback').innerText = "Correct!";
    button.style.backgroundColor = "#00b894"; // green
    score++;
  } else {
    document.getElementById('feedback').innerText = "Wrong!";
    button.style.backgroundColor = "#d63031"; // red
  }

  const topicName = localStorage.getItem('selectedTopic');
  const topic = topics[topicName];

  if (currentQuestionIndex < topic.questions.length - 1) {
    document.getElementById('next-btn').style.display = 'inline-block';
  } else {
    document.getElementById('finish-btn').style.display = 'inline-block';
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  loadExercise();
}

function showScore() {
  finishExercise();
}

function finishExercise() {
  document.getElementById('completion-modal').style.display = 'flex';
  
  const topicName = localStorage.getItem('selectedTopic');
  const topic = topics[topicName];
  document.querySelector('#completion-modal p').innerText = `You scored ${score} out of ${topic.questions.length}! 🎯`;
}

function backToHome() {
  localStorage.removeItem('selectedTopic');
  window.location.href = 'index.html';
}

function goHome() {
  window.location.href = "index.html"; // change path if needed
}

// Auto-loaders
if (document.getElementById('topic-title')) loadTopic();
if (document.getElementById('exercise-question')) loadExercise();
