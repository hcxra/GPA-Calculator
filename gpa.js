document.addEventListener('DOMContentLoaded', () => {
    const gpaTable = document.querySelector('.table-container tbody');
    const addRowBtn = document.getElementById('add-row-btn');
    const resetBtn = document.getElementById('reset-btn');
    const calculateGpaBtn = document.getElementById('calculate-btn');
    const gpaResult = document.getElementById('gpa-result');

    // Function to add a new row
    const addRow = () => {
        const row = document.createElement('tr');
        row.classList.add('table-row');
        row.innerHTML = `
            <td class="table-cell"><input type="checkbox" class="select-row" checked></td>
            <td class="table-cell"><input type="text" placeholder="Course name"></td>
            <td class="table-cell">
                <select class="grade">
                    <option value="4.0">A+</option>
                    <option value="4.0">A</option>
                    <option value="3.7">A−</option>
                    <option value="3.3">B+</option>
                    <option value="3.0">B</option>
                    <option value="2.7">B−</option>
                    <option value="2.3">C+</option>
                    <option value="2.0">C</option>
                    <option value="1.7">C−</option>
                    <option value="1.3">D+</option>
                    <option value="1.0">D</option>
                    <option value="0.7">D−</option>
                    <option value="0">F</option>
                </select>
            </td>
            <td class="table-cell"><input type="number" class="credits" placeholder="Credits" min="0"></td>
            <td class="table-cell"><button type="button" class="remove-btn">X</button></td>
        `;
        gpaTable.appendChild(row);
        attachRemoveEvent(row.querySelector('.remove-btn'));
    };

    // Function to remove a row
    const attachRemoveEvent = (button) => {
        button.addEventListener('click', (event) => {
            event.target.closest('tr').remove();
        });
    };

    // Function to reset
    const resetForm = () => {
        const rows = gpaTable.querySelectorAll('tr');
        rows.forEach((row) => {
            const checkbox = row.querySelector('.select-row');
            if (checkbox.checked) {  // Only reset if checkbox is checked
                row.querySelectorAll('input, select').forEach((input) => {
                    if (input.type === 'checkbox') {
                        input.checked = true; // Keep the checkbox checked
                    } else if (input.tagName === 'SELECT') {
                        input.selectedIndex = 0; // Reset the dropdown to the first option
                    } else {
                        input.value = ''; // Clear the text and number inputs
                    }
                });
            }
        });
        gpaResult.textContent = '0.00'; // Reset GPA result to 0
    };

    // Function to calculate GPA
    const calculateGPA = () => {
        let totalCredits = 0;
        let totalGradePoints = 0;
        const rows = gpaTable.querySelectorAll('tr');

        rows.forEach((row) => {
            const checkbox = row.querySelector('.select-row');
            const grade = parseFloat(row.querySelector('.grade').value);
            const credits = parseFloat(row.querySelector('.credits').value);

            if (!isNaN(credits) && !isNaN(grade) && checkbox.checked) {
                totalCredits += credits;
                totalGradePoints += credits * grade;
            }
        });

        const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
        gpaResult.textContent = gpa;
    };

    // Buttons for adding row, reset, and calculate
    addRowBtn.addEventListener('click', addRow);
    resetBtn.addEventListener('click', resetForm);
    calculateGpaBtn.addEventListener('click', calculateGPA);

    // removing button
    attachRemoveEvent(document.querySelector('.remove-btn'));
});
