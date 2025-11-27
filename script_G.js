
  
  let currentQuestion = 0;
  let score = 0;
  let selectedOption = null;
  
  function showQuestion() {
    const q =  geographyQuestions[currentQuestion];
    document.getElementById("questionText").innerHTML = q.question;
  
    const optionBtns = document.querySelectorAll(".optionBtn");
    optionBtns.forEach((btn, index) => {
      btn.innerHTML = q.options[index];
      btn.classList.remove("btn-success", "btn-danger", "active");
      btn.disabled = false;
    });
  
    document.getElementById("nextBtn").disabled = true;
  }
  
  function selectOption(btn) {
    const optionBtns = document.querySelectorAll(".optionBtn");
    optionBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedOption = btn.innerHTML.replace(" ✅", "").replace(" ❌", "");
    document.getElementById("nextBtn").disabled = false;
  }
  
  
  function nextQuestion() {
    const correctAnswer =  geographyQuestions[currentQuestion].answer;
    const optionBtns = document.querySelectorAll(".optionBtn");
  
    optionBtns.forEach(btn => {
      btn.disabled = true;
      if (btn.innerHTML === correctAnswer) {
        btn.classList.add("correct");
        btn.innerHTML += ' ✅';  // add correct icon
      } else if (btn.classList.contains("active")) {
        btn.classList.add("wrong");
        btn.innerHTML += ' ❌';  // add wrong icon
      }
    });
  
    if (selectedOption === correctAnswer) {
      score++;
    }
  
    currentQuestion++;
  
    if (currentQuestion <  geographyQuestions.length) {
      setTimeout(() => {
        selectedOption = null;
        showQuestion();
      }, 1000);
    } else {
      setTimeout(() => {
        showResult();
      }, 1000);
    }
  }
  
  
  function showResult() {
    document.getElementById("quizCard").style.display = "none";
  
    const finalScreen = document.getElementById("finalScreen");
    finalScreen.classList.remove("d-none");
  
    const total =  geographyQuestions.length;
    const finalScoreText = `${userName}, your Score: ${score} / ${total}`;
    document.getElementById("finalScore").innerHTML = finalScoreText;
  
    let message = "";
  
    if (score === total) {
      message = "🎉 Congrats! You nailed it!";
    } else if (score >= total * 0.7) {
      message = "👏 Well done! Keep it up.";
    } else {
      message = "💪 Try again, you can do better!";
    }
  
    document.getElementById("finalMessage").innerHTML = message;
  }

  
  let userName = "";  // global variable

  function startQuiz() {
    userName = document.getElementById("userName").value.trim();
    if (userName === "") {
      alert("Please enter your name!");
      return;
    }
  
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizCard").classList.remove("d-none");
  
    showQuestion();
  }
    
  

  