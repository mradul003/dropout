document.getElementById('predictionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const cgpa = parseFloat(document.getElementById('cgpa').value);
    const attendance = parseFloat(document.getElementById('attendance').value);
    const backs = parseInt(document.getElementById('backs').value);
    const activities = document.getElementById('activities').value;

    let riskScore = 0;

    // Simulated AI logic (simple rules-based system)
    // CGPA: Higher risk for lower CGPA
    riskScore += (10 - cgpa) * 5; // Max 50 points if CGPA is 0
    if (cgpa < 6) riskScore += 10;
    if (cgpa < 4) riskScore += 20;

    // Attendance: Higher risk for lower attendance
    riskScore += (100 - attendance) * 0.4; // Max 40 points if attendance is 0
    if (attendance < 75) riskScore += 10;

    // Backs: Higher risk for more backlogs
    riskScore += backs * 10; // 10 points per backlog
    if (backs > 2) riskScore += 20;

    // Activities: Minor risk for no extracurriculars
    if (activities === 'no') {
        riskScore += 5;
    }

    // Normalize the score to a percentage (assuming a max theoretical score)
    const maxScore = 50 + 40 + 20 + 5; // Based on the worst-case scenario
    let riskPercentage = Math.min(Math.round((riskScore / maxScore) * 100), 96);

    // Determine risk level based on score
    let riskLevel = '';
    let advice = '';
    let riskClass = '';

    if (riskPercentage >= 70) {
        riskLevel = 'High Risk 🔴';
        riskClass = 'high-risk';
        advice = `
            Your current academic performance and engagement suggest a **high risk** of dropping out.
            <br><br>
            **Immediate Actions:**
            <ul>
                <li>Schedule an urgent meeting with your academic advisor.</li>
                <li>Reach out to student support services and explore tutoring options.</li>
                <li>Connect with a mental health counselor if you're feeling overwhelmed.</li>
            </ul>
        `;
    } else if (riskPercentage >= 30) {
        riskLevel = 'Medium Risk 🟡';
        riskClass = 'medium-risk';
        advice = `
            You are at a **medium risk** of dropping out. There are areas for improvement.
            <br><br>
            **Suggestions:**
            <ul>
                <li>Maintain or improve your attendance and focus on clearing your backlogs.</li>
                <li>Attend professor office hours to get help with difficult subjects.</li>
                <li>Consider joining an extracurricular activity to build community.</li>
            </ul>
        `;
    } else {
        riskLevel = 'Low Risk 🟢';
        riskClass = 'low-risk';
        advice = `
            You are at a **low risk** of dropping out. Keep up the great work!
            <br><br>
            **Keep It Up!**
            <ul>
                <li>Continue to stay engaged in your studies and clear any backlogs.</li>
                <li>Balance your academic life with social and personal well-being.</li>
                <li>Explore advanced courses or research opportunities.</li>
            </ul>
        `;
    }

    // Display results with a fade-in effect
    const resultBox = document.getElementById('predictionResult');
    const riskLevelElement = document.getElementById('riskLevel');
    const riskPercentageElement = document.getElementById('riskPercentage');
    const adviceTextElement = document.getElementById('adviceText');
    const counselingBox = document.getElementById('counselingAdvice');

    riskLevelElement.textContent = `Predicted Dropout Risk: ${riskLevel}`;
    riskLevelElement.className = `risk-level ${riskClass}`;
    riskPercentageElement.textContent = `Risk Percentage: ${riskPercentage}%`;
    adviceTextElement.innerHTML = advice;

    resultBox.classList.remove('hidden');
    counselingBox.classList.remove('hidden');
});