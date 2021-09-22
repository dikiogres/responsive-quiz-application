
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const questionLimit = 5; // quiz.length if want all question

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswer = 0;
let attempt = 0;

//push the question into availableQuestions Array
function setAvailableQuestions(){
  const totalQuestion = quiz.length;
  for(let i=0; i<totalQuestion; i++){
    availableQuestions.push(quiz[i])
  }
}
//set question number and option
function getNewQuestion(){
  //set question questionNumber
  questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + questionLimit;
  //set question questionText
  //get random quesiton
  const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;
  //get position of questionIndex from the availableQuestions Array
  const index1 = availableQuestions.indexOf(questionIndex);
  //remove the questionIndex from the availableQuestions Array
  availableQuestions.splice(index1,1);
  //show // QUESTION:  image
  if(currentQuestion.hasOwnProperty("img")){
    const img = document.createElement("img");
    img.src = currentQuestion.img;
    questionText.appendChild(img);
  }
  //set optionContainer
  //get the lenght of options
  const optionLen = currentQuestion.option.length;
  //console.log(currentQuestion.option)
  //push option into availableOptions Array
  for(let i=0; i<optionLen; i++){
    availableOptions.push(i)
  }
  //console.log(availableOptions)
  optionContainer.innerHTML = '';
  let animationDelay = 0.15;
  //create option in innerHTML
  for(let i=0; i<optionLen; i++){
    //random option
    const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
    //get the position of optionIndex in availableOptions array
    const index2 = availableOptions.indexOf(optionIndex);
    //remove the optionIndex in availableOptions array
    availableOptions.splice(index2,1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.option[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + 's';
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option)
    option.setAttribute("onclick","getResult(this)");
  }

  questionCounter++
}
//get result of current attempt question
function getResult(element){
  const id = parseInt(element.id);
  // get the answer by comparing the id of clicked option
  if(id === currentQuestion.answer){
    //set the green colour to the correct answer
    element.classList.add("correct");
    // add color indicator
    updateAnswerIndicator("correct");
    correctAnswer++;
  }
  else{
    //set the red color to the inccoret asnwer
    element.classList.add("wrong");
    updateAnswerIndicator("wrong");
    //if the answer is incorrent the show the correct option by adding green color
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
      if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  attempt++;
  unclickableOptions();
}
//make all option uinclickavle
function unclickableOptions(){
  const optionLen = optionContainer.children.length;
  for(let i=0; i<optionLen; i++){
    optionContainer.children[i].classList.add("already-answered");
  }
}

function answerIndicator(){
  answerIndicatorContainer.innerHTML = '';
  const totalQuestion = questionLimit;
  for(let i=0; i<totalQuestion; i++){
    const indicator = document.createElement("div");
    answerIndicatorContainer.appendChild(indicator);
  }
}

function updateAnswerIndicator(markType){
  answerIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next(){
  if(questionCounter === questionLimit){
    quizOver();
  }
  else{
    getNewQuestion();
  }
}

function quizOver(){
  //hide quiz box
  quizBox.classList.add("hide");
  //show result box
  resultBox.classList.remove("hide");
  quizResult();
}

function quizResult(){
  resultBox.querySelector(".total-question").innerHTML = questionLimit;
  resultBox.querySelector(".total-attempt").innerHTML = attempt;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswer;
  resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswer;
  const percentage = (correctAnswer/questionLimit)*100;
  resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%"
  resultBox.querySelector(".total-score").innerHTML = correctAnswer + " / " + questionLimit;
}

function resetQuiz(){
  questionCounter = 0;
  correctAnswer = 0;
  attempt = 0;
}

function tryAgainQuiz(){
  //hide quizResult
  resultBox.classList.add("hide");
  //show quiz
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
}

function goToHome(){
  //hide quizResult
  resultBox.classList.add("hide");
  //show quiz
  homeBox.classList.remove("hide");
}

function startQuiz(){
  //hide home box
  homeBox.classList.add("hide");
  //show quiz box
  quizBox.classList.remove("hide");
  //set all question
  setAvailableQuestions();
  //call get getNewQuestion
  getNewQuestion();
  //to create indicators of answer
  answerIndicator();
}

window.onload = function(){
  homeBox.querySelector(".total-question").innerHTML = questionLimit;
}








//
