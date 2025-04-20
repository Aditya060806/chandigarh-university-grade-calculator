document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', handleCalculate);
});

function handleCalculate() {
    const mst1 = parseFloat(document.getElementById('mst1-mark').value);
    const mst2 = parseFloat(document.getElementById('mst2-mark').value);
    const assignment = parseFloat(document.getElementById('assignment-mark').value);
    const quiz = parseFloat(document.getElementById('quiz-mark').value);
    const surpriseTest = parseFloat(document.getElementById('surprise-test-mark').value);
    const attendance = parseFloat(document.getElementById('attendence-mark').value);

    if (!isValidInput(mst1, mst2, assignment, quiz, surpriseTest, attendance)) {
        showInputErrorAlert();
        return;
    }

    const totalTheoryMarks = calculateTotalTheoryMarks(mst1, mst2, assignment, quiz, surpriseTest, attendance);
    displayTotalMarks(totalTheoryMarks);
    showCGPAAlert(totalTheoryMarks);
}

function isValidInput(mst1, mst2, assignment, quiz, surpriseTest, attendance) {
    return !isNaN(mst1) && !isNaN(mst2) && !isNaN(assignment) && !isNaN(quiz) && !isNaN(surpriseTest) && !isNaN(attendance);
}

function showInputErrorAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please enter valid marks for all fields.',
    });
}

function calculateTotalTheoryMarks(mst1, mst2, assignment, quiz, surpriseTest, attendance) {
    const mst1Weighted = mst1 / 2;
    const mst2Weighted = mst2 / 2;
    const surpriseTestWeighted = surpriseTest / 3;
    return parseFloat((mst1Weighted + mst2Weighted + assignment + quiz + surpriseTestWeighted + attendance).toFixed(2));
}

function displayTotalMarks(totalMarks) {
    const cardContainer = createCardContainer();
    const totalMarksText = createTotalMarksText(totalMarks);

    appendToResultContainer(cardContainer);
    appendToCard(cardContainer, totalMarksText);
}

function showCGPAAlert(totalMarks) {
    let message = "";
    let icon = "";

    if (totalMarks <= 0) {
        message = "Oops! Your total theory marks are invalid.";
        icon = "error";
    } else if (totalMarks >= 1 && totalMarks <= 10) {
        message = `Your total theory marks are average. Your Theory Mark is ${totalMarks.toFixed(2)}`;
        icon = "info";
    } else if (totalMarks >= 11 && totalMarks <= 20) {
        message = `Your total theory marks are good. Your Theory Mark is ${totalMarks.toFixed(2)}`;
        icon = "success";
    } else if (totalMarks >= 21 && totalMarks <= 30) {
        message = `Your total theory marks are very good. Your Theory Mark is ${totalMarks.toFixed(2)}`;
        icon = "success";
    } else if (totalMarks >= 31 && totalMarks <= 40) {
        message = `Your total theory marks are excellent. Your Theory Mark is ${totalMarks.toFixed(2)}`;
        icon = "success";
    } else if (totalMarks >= 41) {
        message = `There is an error in the calculation. Please check the marks entered.`;
        icon = "error";
    }

    Swal.fire({
        icon: icon,
        title: "Total Theory Marks Evaluation",
        text: message
    });
}

function createCardContainer() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card', 'mt-3');
    return cardContainer;
}

function createTotalMarksText(totalMarks) {
    const totalMarksText = document.createElement('p');
    totalMarksText.classList.add('card-text');
    totalMarksText.textContent = `Total Theory Marks: ${totalMarks}`;
    return totalMarksText;
}

function appendToResultContainer(cardContainer) {
    const resultContainer = document.querySelector('.container');
    const previousResult = document.getElementById('total-marks-result');
    if (previousResult) {
        previousResult.remove();
    }
    resultContainer.appendChild(cardContainer);
    cardContainer.id = 'total-marks-result';
}

function appendToCard(cardContainer, totalMarksText) {
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.appendChild(totalMarksText);
    cardContainer.appendChild(cardBody);
}
