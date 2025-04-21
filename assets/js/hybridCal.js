document.addEventListener('DOMContentLoaded', function() {
    // Get all input elements
    const theoryMst1 = document.getElementById('theory-mst1');
    const theoryMst2 = document.getElementById('theory-mst2');
    const theoryAssignment = document.getElementById('theory-assignment');
    const practicalAttendance = document.getElementById('practical-attendance');
    const practicalViva = document.getElementById('practical-viva');
    const practicalFile = document.getElementById('practical-file');
    const calculateBtn = document.getElementById('calculate');
    const resetBtn = document.getElementById('reset');
    const resultDiv = document.getElementById('result');

    // Validate inputs
    function validateInput(value, max) {
        const num = parseFloat(value);
        return !isNaN(num) && num >= 0 && num <= max;
    }

    // Calculate Theory Component (70%)
    function calculateTheory(mst1, mst2, assignment) {
        const mstAverage = (parseFloat(mst1) + parseFloat(mst2)) / 2;
        return (mstAverage * 0.8 + parseFloat(assignment) * 0.2) * 0.7;
    }

    // Calculate Practical Component (30%)
    function calculatePractical(attendance, viva, file) {
        return (parseFloat(attendance) * 0.4 + parseFloat(viva) * 0.3 + parseFloat(file) * 0.3) * 0.3;
    }

    // Reset all inputs
    function resetInputs() {
        theoryMst1.value = '';
        theoryMst2.value = '';
        theoryAssignment.value = '';
        practicalAttendance.value = '';
        practicalViva.value = '';
        practicalFile.value = '';
        resultDiv.innerHTML = '';
    }

    // Calculate button click handler
    calculateBtn.addEventListener('click', function() {
        try {
            // Validate theory inputs
            if (!validateInput(theoryMst1.value, 20) || !validateInput(theoryMst2.value, 20) || !validateInput(theoryAssignment.value, 10)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Theory Marks',
                    text: 'Please enter valid marks: MSTs (0-20), Assignment (0-10)'
                });
                return;
            }

            // Validate practical inputs
            if (!validateInput(practicalAttendance.value, 10) || !validateInput(practicalViva.value, 10) || !validateInput(practicalFile.value, 10)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Practical Marks',
                    text: 'Please enter valid marks (0-10) for all practical components'
                });
                return;
            }

            // Calculate components
            const theoryMarks = calculateTheory(theoryMst1.value, theoryMst2.value, theoryAssignment.value);
            const practicalMarks = calculatePractical(practicalAttendance.value, practicalViva.value, practicalFile.value);
            const totalMarks = theoryMarks + practicalMarks;

            // Display results with SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Marks Calculated',
                html: `
                    <div class="text-left">
                        <p><strong>Theory Component (70%):</strong> ${theoryMarks.toFixed(2)}</p>
                        <p><strong>Practical Component (30%):</strong> ${practicalMarks.toFixed(2)}</p>
                        <p><strong>Total Marks:</strong> ${totalMarks.toFixed(2)}</p>
                    </div>
                `
            });

            // Update result div
            resultDiv.innerHTML = `
                <div class="alert alert-success">
                    <h4 class="alert-heading">Results:</h4>
                    <p><strong>Theory Component (70%):</strong> ${theoryMarks.toFixed(2)}</p>
                    <p><strong>Practical Component (30%):</strong> ${practicalMarks.toFixed(2)}</p>
                    <p><strong>Total Marks:</strong> ${totalMarks.toFixed(2)}</p>
                </div>
            `;

        } catch (error) {
            console.error('Calculation error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Calculation Error',
                text: 'An error occurred while calculating marks. Please try again.'
            });
        }
    });

    // Reset button click handler
    resetBtn.addEventListener('click', function() {
        resetInputs();
        Swal.fire({
            icon: 'info',
            title: 'Reset Complete',
            text: 'All inputs have been cleared'
        });
    });
}); 