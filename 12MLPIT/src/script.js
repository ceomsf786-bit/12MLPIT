const { useState } = React;

const TaxQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState({});
  const [showTaxTable, setShowTaxTable] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Thabo earns a monthly gross salary of R28,500. He is 35 years old and does not belong to a medical or pension fund. Calculate his ANNUAL taxable income.",
      type: "calculation",
      answer: 342000,
      tolerance: 0,
      hint: "Multiply monthly salary by 12",
      explanation: "Annual income = R28,500 × 12 = R342,000"
    },
    {
      id: 2,
      question: "Using the 2016 tax table: For taxable income of R342,000, which tax bracket applies?",
      type: "multiple",
      options: [
        "R181,901 - R284,100",
        "R284,101 - R393,200",
        "R393,201 - R550,100",
        "R550,101 - R701,300"
      ],
      answer: 1,
      explanation: "R342,000 falls within the bracket R284,101 - R393,200"
    },
    {
      id: 3,
      question: "For the R284,101 - R393,200 bracket (2016), the tax calculation is: R59,314 + 31% of taxable income above R284,100. Calculate the tax BEFORE rebates for R342,000.",
      type: "calculation",
      answer: 77263.9,
      tolerance: 1,
      hint: "R59,314 + 31% of (R342,000 - R284,100)",
      explanation: "Tax = R59,314 + 0.31 × (R342,000 - R284,100) = R77,263.90"
    },
    {
      id: 4,
      question: "What is the primary rebate amount for 2016?",
      type: "calculation",
      answer: 13257,
      tolerance: 0,
      hint: "Check the tax rebate table for 2016",
      explanation: "Primary rebate for 2016 = R13,257"
    },
    {
      id: 5,
      question: "Calculate the annual income tax payable after applying the primary rebate (from Question 3 and 4).",
      type: "calculation",
      answer: 64006.9,
      tolerance: 1,
      hint: "Subtract primary rebate from the tax calculated",
      explanation: "Annual tax = R77,263.90 - R13,257 = R64,006.90"
    },
    {
      id: 6,
      question: "Convert the annual income tax to MONTHLY income tax.",
      type: "calculation",
      answer: 5333.91,
      tolerance: 0.1,
      hint: "Divide annual tax by 12",
      explanation: "Monthly tax = R64,006.90 ÷ 12 = R5,333.91"
    },
    {
      id: 7,
      question: "Sarah is 67 years old with taxable income of R400,000 in 2016. How many rebates does she qualify for?",
      type: "multiple",
      options: [
        "Primary only",
        "Primary + Secondary",
        "Primary + Secondary + Tertiary",
        "None"
      ],
      answer: 1,
      explanation: "At 67 years old, Sarah qualifies for Primary rebate (all ages) AND Secondary rebate (65+ years)"
    },
    {
      id: 8,
      question: "Calculate the total rebate amount for someone aged 67 in 2016.",
      type: "calculation",
      answer: 20664,
      tolerance: 0,
      hint: "Primary + Secondary rebate",
      explanation: "Total rebate = R13,257 (primary) + R7,407 (secondary) = R20,664"
    },
    {
      id: 9,
      question: "What does UIF stand for and what percentage of gross salary must employees contribute?",
      type: "multiple",
      options: [
        "Unemployment Insurance Fund - 1%",
        "Universal Income Fund - 2%",
        "Unemployment Insurance Fund - 2%",
        "Universal Income Fund - 1%"
      ],
      answer: 0,
      explanation: "UIF = Unemployment Insurance Fund, employees contribute 1% of gross salary"
    },
    {
      id: 10,
      question: "A person has medical aid for themselves and 2 dependents in 2016. Calculate the monthly medical aid tax credit.",
      type: "calculation",
      answer: 721,
      tolerance: 0,
      hint: "Taxpayer: R270, First dependent: R270, Additional: R181",
      explanation: "Credit = R270 + R270 + R181 = R721 per month"
    }
  ];

  const TaxTableReference = () => (
    <div style={{ background: "#ebf8ff", border: "2px solid #bee3f8", borderRadius: "8px", padding: "12px", marginBottom: "16px" }}>
      <button
        onClick={() => setShowTaxTable(!showTaxTable)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", fontWeight: "bold", cursor: "pointer" }}
      >
        <span>📚 2016 Tax Tables & Reference</span>
        <span>{showTaxTable ? "▲" : "▼"}</span>
      </button>
      {showTaxTable && (
        <div style={{ marginTop: "12px", fontSize: "14px" }}>
          <h4 style={{ fontWeight: "bold" }}>2016 Tax Brackets:</h4>
          <p>• R0 - R181,900: 18% of taxable income</p>
          <p>• R181,901 - R284,100: R32,742 + 26% above R181,900</p>
          <p>• R284,101 - R393,200: R59,314 + 31% above R284,100</p>
          <h4 style={{ fontWeight: "bold", marginTop: "8px" }}>2016 Tax Rebates:</h4>
          <p>• Primary (all ages): R13,257</p>
          <p>• Secondary (65+ years): R7,407</p>
          <h4 style={{ fontWeight: "bold", marginTop: "8px" }}>2016 Medical Aid Tax Credits (Monthly):</h4>
          <p>• Taxpayer only: R270</p>
          <p>• First dependent: R270</p>
          <p>• Each additional dependent: R181</p>
        </div>
      )}
    </div>
  );

  const handleAnswer = (answer) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: answer });
  };

  const checkAnswer = () => {
    const question = questions[currentQuestion];
    let isCorrect = false;
    if (question.type === "calculation") {
      const userAns = parseFloat(userAnswers[currentQuestion]);
      isCorrect = Math.abs(userAns - question.answer) <= question.tolerance;
    } else {
      isCorrect = userAnswers[currentQuestion] === question.answer;
    }
    setFeedback({ ...feedback, [currentQuestion]: isCorrect });
    return isCorrect;
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (feedback[idx]) correct++;
    });
    return { correct, total: questions.length };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setFeedback({});
    setShowTaxTable(false);
  };

  if (showResults) {
    const { correct, total } = calculateScore();
    const percentage = ((correct / total) * 100).toFixed(1);
    return (
      <div style={{ minHeight: "100vh", padding: "24px", background: "linear-gradient(to bottom right, #ebf8ff, #e0e7ff)" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", background: "#fff", borderRadius: "12px", padding: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "16px" }}>Quiz Complete! 🎉</h1>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#4c51bf" }}>{percentage}%</div>
            <div style={{ fontSize: "18px", color: "#4a5568" }}>{correct} out of {total} correct</div>
          </div>
          <button
            onClick={resetQuiz}
            style={{ width: "100%", padding: "12px", fontWeight: "bold", borderRadius: "8px", background: "#4c51bf", color: "#fff", cursor: "pointer" }}
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const hasAnswered = userAnswers[currentQuestion] !== undefined;

  return (
    <div style={{ minHeight: "100vh", padding: "24px", background: "linear-gradient(to bottom right, #ebf8ff, #e0e7ff)" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>🧮 Grade 12 Tax Quiz</h1>
            <div style={{ fontSize: "14px", color: "#718096" }}>
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <TaxTableReference />

          <div style={{ marginBottom: "16px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>{question.question}</h2>

            {question.type === "calculation" ? (
              <div>
                <input
                  type="number"
                  step="0.01"
                  value={userAnswers[currentQuestion] || ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                  style={{ width: "100%", padding: "12px", border: "2px solid #cbd5e0", borderRadius: "8px", fontSize: "16px" }}
                  placeholder="Enter your answer (numbers only)"
                />
                {question.hint && <p style={{ fontSize: "14px", color: "#718096", marginTop: "4px" }}>💡 Hint: {question.hint}</p>}
              </div>
            ) : (
              <div>
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      marginBottom: "6px",
                      textAlign: "left",
                      borderRadius: "8px",
                      border: userAnswers[currentQuestion] === idx ? "2px solid #4c51bf" : "2px solid #cbd5e0",
                      background: userAnswers[currentQuestion] === idx ? "#ebf4ff" : "#fff",
                      cursor: "pointer"
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {feedback[currentQuestion] !== undefined && (
            <div style={{ padding: "12px", borderRadius: "8px", marginBottom: "16px", background: feedback[currentQuestion] ? "#f0fff4" : "#fff5f5", border: feedback[currentQuestion] ? "2px solid #48bb78" : "2px solid #f56565" }}>
              <p style={{ fontWeight: "bold", color: feedback[currentQuestion] ? "#2f855a" : "#c53030" }}>
                {feedback[currentQuestion] ? "✓ Correct!" : "✗ Incorrect"}
              </p>
              <p style={{ fontSize: "14px", color: "#4a5568" }}>{question.explanation}</p>
            </div>
          )}

          <div style={{ display: "flex", gap: "12px" }}>
            {!feedback[currentQuestion] ? (
              <button
                onClick={checkAnswer}
                disabled={!hasAnswered}
                style={{
                  flex: 1,
                  padding: "12px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  background: hasAnswered ? "#4c51bf" : "#e2e8f0",
                  color: hasAnswered ? "#fff" : "#718096",
                  cursor: hasAnswered ? "pointer" : "not-allowed"
                }}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                style={{
                  flex: 1,
                  padding: "12px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  background: "#48bb78",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                {currentQuestion < questions.length - 1 ? "Next Question →" : "See Results"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<TaxQuiz />);
