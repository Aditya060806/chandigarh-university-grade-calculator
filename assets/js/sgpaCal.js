document.addEventListener('DOMContentLoaded', function() {
    // Get all required elements
    const add = document.querySelector("#add");
    const courseCode = document.querySelector("#course-code");
    const unitLoad = document.querySelector("#unit-load");
    const grade = document.querySelector("#grade");
    const tbody = document.querySelector("#tbody");
    const tfoot = document.querySelector("#tfoot");
    const table = document.querySelector("#table");
    const calcGp = document.querySelector("#calc-gp");
    const clear = document.querySelector("#clear");
    const print = document.querySelector("#print");

    // Initialize array to store grade points
    let gpArry = [];

    // Validate that all required elements are present
    if (!add || !courseCode || !unitLoad || !grade || !tbody || !tfoot || !table || !calcGp || !clear || !print) {
        console.error('Required elements not found');
        return;
    }

    // Add subject event handler
    add.addEventListener("click", () => {
        try {
            if (unitLoad.value <= 0 || grade.selectedIndex === 0) {
                showError();
                return;
            }

            const tr = document.createElement("tr");
            const tdCourseCode = document.createElement("td");
            tdCourseCode.textContent = courseCode.value || 'N/A';
            
            const tdUnitLoad = document.createElement("td");
            tdUnitLoad.textContent = unitLoad.value;
            
            const tdGrade = document.createElement("td");
            tdGrade.textContent = grade.options[grade.selectedIndex].text;

            tr.appendChild(tdCourseCode);
            tr.appendChild(tdUnitLoad);
            tr.appendChild(tdGrade);
            tbody.appendChild(tr);

            // Show the table and buttons
            table.classList.remove("display-none");
            calcGp.classList.remove("display-none");
            print.classList.remove("display-none");
            clear.classList.remove("display-none");

            // Store the grade point
            gpArry.push({
                unitLoad: unitLoad.value,
                grade: grade.options[grade.selectedIndex].value
            });

            // Reset inputs
            courseCode.value = "";
            unitLoad.value = "";
            grade.selectedIndex = 0;

        } catch (error) {
            console.error('Error adding subject:', error);
            showErrorAlert('Failed to add subject. Please try again.');
        }
    });

    // Calculate GPA event handler
    calcGp.addEventListener("click", () => {
        try {
            if (gpArry.length === 0) {
                showErrorAlert('Please add at least one subject before calculating SGPA.');
                return;
            }

            let totalUnitLoads = 0;
            let totalGradePoints = 0;

            gpArry.forEach((result) => {
                const unitLoads = parseFloat(result.unitLoad);
                const gradePoint = parseFloat(result.grade);
                
                totalUnitLoads += unitLoads;
                totalGradePoints += (unitLoads * gradePoint);
            });

            const sgpa = totalGradePoints / totalUnitLoads;

            // Create result row
            const tr = document.createElement("tr");
            
            const tdTotalUnitLoad = document.createElement("td");
            tdTotalUnitLoad.textContent = `Total Credit: ${totalUnitLoads}`;

            const tdGpa = document.createElement("td");
            tdGpa.setAttribute("colspan", "2");
            tdGpa.textContent = `Your SGPA is: ${sgpa.toFixed(2)}`;

            tr.appendChild(tdTotalUnitLoad);
            tr.appendChild(tdGpa);

            // Remove existing result if any
            if (tfoot.querySelector("tr")) {
                tfoot.querySelector("tr").remove();
            }

            tfoot.appendChild(tr);
            showSGPAAlert(sgpa);

        } catch (error) {
            console.error('Error calculating SGPA:', error);
            showErrorAlert('Failed to calculate SGPA. Please try again.');
        }
    });

    // Clear all event handler
    clear.addEventListener("click", () => {
        try {
            gpArry = [];
            tbody.innerHTML = '';
            if (tfoot.querySelector("tr")) {
                tfoot.querySelector("tr").remove();
            }

            table.classList.add("display-none");
            print.classList.add("display-none");
            calcGp.classList.add("display-none");
            clear.classList.add("display-none");

            Swal.fire({
                icon: 'success',
                title: 'Cleared',
                text: 'All data has been cleared successfully.'
            });

        } catch (error) {
            console.error('Error clearing data:', error);
            showErrorAlert('Failed to clear data. Please try again.');
        }
    });
});

// Helper function to show error alert
function showError() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please select both credit units and grade.'
        });
    } else {
        alert('Please select both credit units and grade.');
    }
}

// Helper function to show error alert with custom message
function showErrorAlert(message) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
        });
    } else {
        alert(message);
    }
}

// Helper function to show SGPA result alert
function showSGPAAlert(sgpa) {
    if (typeof Swal === 'undefined') {
        alert(`Your SGPA is ${sgpa.toFixed(2)}`);
        return;
    }

    let message = '';
    let icon = 'info';

    if (sgpa <= 0) {
        message = "Invalid SGPA calculation.";
        icon = "error";
    } else if (sgpa >= 1 && sgpa <= 5.99) {
        message = `Your performance is average. Your SGPA is ${sgpa.toFixed(2)}`;
    } else if (sgpa >= 6 && sgpa <= 6.99) {
        message = `Good performance! Your SGPA is ${sgpa.toFixed(2)}`;
        icon = "success";
    } else if (sgpa >= 7 && sgpa <= 7.99) {
        message = `Very good performance! Your SGPA is ${sgpa.toFixed(2)}`;
        icon = "success";
    } else if (sgpa >= 8 && sgpa <= 8.99) {
        message = `Excellent performance! Your SGPA is ${sgpa.toFixed(2)}`;
        icon = "success";
    } else if (sgpa >= 9 && sgpa <= 10) {
        message = `Outstanding performance! Your SGPA is ${sgpa.toFixed(2)}`;
        icon = "success";
    }

    Swal.fire({
        icon: icon,
        title: 'SGPA Calculation Result',
        text: message
    });
}
