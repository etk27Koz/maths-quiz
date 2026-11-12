
// ======================================
// MATHS QUIZ QUESTIONS
// ======================================

let questions = [

    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "10"],
        correct: "4",
        explanation: "Two plus two equals four."
    },

    {
        question: "What is 2 x 4?",
        answers: ["6", "5", "8", "10"],
        correct: "8",
        explanation: "Two times four equals eight."
    },

    {
        question: "What is 3 divided by 3?",
        answers: ["0", "1", "3", "10"],
        correct: "1",
        explanation: "Three divided by three equals one."
    },

    {
        question: "What is 5 x 7?",
        answers: ["30", "25", "35", "40"],
        correct: "35",
        explanation: "Five times seven equals 35."
    },

    {
        question: "What is 4 x 6?",
        answers: ["20", "24", "28", "30"],
        correct: "24",
        explanation: "Four times six equals 24."
    },

    {
        question: "What is 8 x 5?",
        answers: ["35", "45", "40", "50"],
        correct: "40",
        explanation: "Eight times five equals 40."
    },

    {
        question: "What is 9 x 3?",
        answers: ["18", "21", "27", "30"],
        correct: "27",
        explanation: "Nine times three equals 27."
    },

    {
        question: "What is 7 x 8?",
        answers: ["54", "56", "48", "64"],
        correct: "56",
        explanation: "Seven times eight equals 56."
    },

    {
        question: "What is 6 x 7?",
        answers: ["36", "40", "42", "48"],
        correct: "42",
        explanation: "Six times seven equals 42."
    },

    {
        question: "What is 12 x 4?",
        answers: ["36", "44", "48", "52"],
        correct: "48",
        explanation: "Twelve times four equals 48."
    }

];



// QUIZ VARIABLES


let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";
let answerChecked = false;


// DISPLAY QUESTION


function showQuestion() {

    let q = questions[currentQuestion];

    document.getElementById("questionNumber").innerText =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    document.getElementById("question").innerText =
        q.question;

    let answersHTML = "";

    q.answers.forEach(function(answer, index) {

        answersHTML += `
            <button
                type="button"
                aria-pressed="false"
                aria-label="Answer ${index + 1}: ${answer}"
                onclick="selectAnswer('${answer}')">

                ${answer}

            </button>
        `;

    });

    document.getElementById("answers").innerHTML =
        answersHTML;

    document.getElementById("error").innerText = "";

    document.getElementById("feedback").innerText = "";

    document.getElementById("feedback").style.color = "";

    document.getElementById("checkButton").disabled = false;

    document.getElementById("checkButton").hidden = false;

    document.getElementById("nextButton").hidden = true;

    selectedAnswer = "";

    answerChecked = false;

}



// SELECT ANSWER


function selectAnswer(answer) {

    if (answerChecked) return;

    selectedAnswer = answer;

    document.getElementById("error").innerText = "";

    document.getElementById("feedback").innerText =
        "You selected: " + answer;

    document.querySelectorAll("#answers button").forEach(
        function(button) {

            button.classList.remove("selected");

            button.setAttribute("aria-pressed", "false");

            if (button.innerText.trim() === answer) {

                button.classList.add("selected");

                button.setAttribute("aria-pressed", "true");

            }

        }
    );

}



// CHECK ANSWER

function checkAnswer() {

    if (selectedAnswer === "") {

        document.getElementById("error").innerText =
            "Please select an answer!";

        return;

    }

    let q = questions[currentQuestion];

    if (selectedAnswer === q.correct) {

        score++;

        document.getElementById("feedback").innerText =
            "Correct! " + q.explanation;

        document.getElementById("feedback").style.color =
            "green";

    } else {

        document.getElementById("feedback").innerText =
            "Incorrect! " + q.explanation;

        document.getElementById("feedback").style.color =
            "red";

    }

    answerChecked = true;

    let percentage = Math.round(
        (score / questions.length) * 100
    );

    document.getElementById("score").innerText =
        "Score: " + percentage + "%";

    document.getElementById("checkButton").disabled = true;

    document.getElementById("nextButton").hidden = false;

    document.querySelectorAll("#answers button").forEach(
        function(button) {
            button.disabled = true;
        }
    );

    document.getElementById("nextButton").focus();

}



// NEXT QUESTION


function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        finishQuiz();

    }

}



// FINISH QUIZ


function finishQuiz() {

    let percentage = Math.round(
        (score / questions.length) * 100
    );

    document.getElementById("question").innerText =
        "Quiz Completed!";

    document.getElementById("questionNumber").innerText =
        "Well done!";

    document.getElementById("answers").innerHTML = "";

    document.getElementById("feedback").innerText =
        "You scored " + score + " out of " +
        questions.length + "!";

    document.getElementById("score").innerText =
        "Final Score: " + percentage + "%";

    document.getElementById("checkButton").hidden = true;

    document.getElementById("nextButton").hidden = true;

}



// RESTART QUIZ


function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    document.getElementById("score").innerText =
        "Score: 0%";

    showQuestion();

}


// NEW SHUFFLED QUIZ


function newQuiz() {

    questions.sort(() => Math.random() - 0.5);

    restartQuiz();

}



// KEYBOARD CONTROLS

document.addEventListener("keydown", function(event) {

    if (
        event.target.matches("input, textarea, select") ||
        event.target.isContentEditable
    ) {
        return;
    }

    if (
        event.ctrlKey ||
        event.altKey ||
        event.metaKey ||
        event.repeat
    ) {
        return;
    }

    let key = event.key.toLowerCase();


    // SELECT ANSWERS WITH 1, 2, 3 OR 4

    if (["1", "2", "3", "4"].includes(key)) {

        if (answerChecked) return;

        let answerIndex = Number(key) - 1;

        let answerButtons = document.querySelectorAll(
            "#answers button"
        );

        if (answerButtons[answerIndex]) {

            answerButtons[answerIndex].click();

        }

    }


    // CHECK ANSWER WITH C

    else if (key === "c") {

        if (!answerChecked) {
            checkAnswer();
        }

    }


    // NEXT QUESTION WITH N

    else if (key === "n") {

        if (answerChecked) {
            nextQuestion();
        }

    }


    // RESTART WITH R

    else if (key === "r") {

        restartQuiz();

    }

});



// START QUIZ


showQuestion();
