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

    // Validate that all elements exist
    const requiredElements = [
        theoryMst1, theoryMst2, theoryAssignment,
        practicalAttendance, practicalViva, practicalFile,
        calculateBtn, resetBtn, resultDiv
    ];

    if (requiredElements.some(element => !element)) {
        console.error('Some required elements are missing');
        return;
    }

    // Validate input value
    function validateInput(value, max) {
        const num = parseFloat(value);
        return !isNaN(num) && num >= 0 && num <= max;
    }

    // Validate attendance (special case - only 0 or 2)
    function validateAttendance(value) {
        return value === '0' || value === '2';
    }

    // Calculate Theory Component (70%)
    function calculateTheory(mst1, mst2, assignment) {
        // MST average (out of 20 each) * 0.8 = 80% of theory internal
        const mstAverage = (parseFloat(mst1) + parseFloat(mst2)) / 2;
        // Assignment (out of 10) * 0.2 = 20% of theory internal
        const assignmentMarks = parseFloat(assignment);
        // Total theory marks = (MST_avg * 0.8 + Assignment * 0.2) * 0.7
        return (mstAverage * 0.8 + assignmentMarks * 0.2) * 0.7;
    }

    // Calculate Practical Component (30%)
    function calculatePractical(attendance, viva, file) {
        // Each component out of 10
        // Attendance 40%, Viva 30%, File 30% of practical marks
        return (parseFloat(attendance) * 0.4 + 
                parseFloat(viva) * 0.3 + 
                parseFloat(file) * 0.3) * 0.3;
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
            if (!validateInput(theoryMst1.value, 20) || 
                !validateInput(theoryMst2.value, 20) || 
                !validateInput(theoryAssignment.value, 10)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Theory Marks',
                    text: 'Please enter valid marks: MSTs (0-20), Assignment (0-10)'
                });
                return;
            }

            // Validate practical inputs
            if (!validateAttendance(practicalAttendance.value) || 
                !validateInput(practicalViva.value, 10) || 
                !validateInput(practicalFile.value, 10)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Practical Marks',
                    text: 'Please enter valid marks: Attendance (0 or 2), Viva (0-10), File (0-10)'
                });
                return;
            }

            // Calculate components
            const theoryMarks = calculateTheory(
                theoryMst1.value,
                theoryMst2.value,
                theoryAssignment.value
            );

            const practicalMarks = calculatePractical(
                practicalAttendance.value,
                practicalViva.value,
                practicalFile.value
            );

            const totalMarks = theoryMarks + practicalMarks;

            // Display results with SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Marks Calculated Successfully',
                html: `
                    <div class="text-start">
                        <p class="mb-2"><strong>Theory Component (70%):</strong> ${theoryMarks.toFixed(2)}</p>
                        <p class="mb-2"><strong>Practical Component (30%):</strong> ${practicalMarks.toFixed(2)}</p>
                        <p class="mb-0"><strong>Total Internal Marks:</strong> ${totalMarks.toFixed(2)}</p>
                    </div>
                `
            });

            // Update result div with Bootstrap styling
            resultDiv.innerHTML = `
                <div class="alert alert-success shadow-sm">
                    <h5 class="alert-heading mb-3">Results:</h5>
                    <div class="row">
                        <div class="col-md-6 mb-2">
                            <strong>Theory Component (70%):</strong><br>
                            ${theoryMarks.toFixed(2)}
                        </div>
                        <div class="col-md-6 mb-2">
                            <strong>Practical Component (30%):</strong><br>
                            ${practicalMarks.toFixed(2)}
                        </div>
                    </div>
                    <hr>
                    <div class="text-center">
                        <h5 class="mb-0">Total Internal Marks: ${totalMarks.toFixed(2)}</h5>
                    </div>
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
        try {
            resetInputs();
            Swal.fire({
                icon: 'success',
                title: 'Reset Complete',
                text: 'All inputs have been cleared'
            });
        } catch (error) {
            console.error('Reset error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Reset Error',
                text: 'An error occurred while resetting. Please try again.'
            });
        }
    });

    // Add input validation on change
    [theoryMst1, theoryMst2, theoryAssignment, practicalAttendance, practicalViva, practicalFile].forEach(input => {
        input.addEventListener('input', function() {
            const max = this.max ? parseInt(this.max) : 10;
            if (this.value > max) {
                this.value = max;
            }
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
}); 