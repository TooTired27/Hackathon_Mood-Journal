async function analyzeMood() {
    const text = document.getElementById('journalEntry').value;
    if (!text) return alert("Please write something!");
    try{
        const response = await fetch('/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
        // Check if response is OK
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        const result = await response.json();
    document.getElementById('result').innerHTML = 
        `Today you're feeling: <span style="color: #ff6b6b;">${result.emotion} (${Math.round(result.score * 100)}%)</span>`;

    loadEntries();
    loadChart();
    }catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = 
            `❌ Error: ${error.message}. Check console for details.`;
    }
    

    
}

async function loadEntries() {
    const response = await fetch('/entries');
    const entries = await response.json();
    const list = document.getElementById('entriesList');
    list.innerHTML = entries.map(entry => `
        <li>
            <strong>${new Date(entry.date).toLocaleDateString()}</strong>: 
            ${entry.text} <em>(${entry.emotion})</em>
        </li>
    `).join('');
}

async function loadChart() {
    const response = await fetch('/entries');
    const entries = await response.json();

    const labels = entries.map(entry => new Date(entry.date).toLocaleDateString());
    const data = entries.map(entry => entry.score * 100);

    const ctx = document.getElementById('moodChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.reverse(),
            datasets: [{
                label: 'Mood Score (%)',
                data: data.reverse(),
                borderColor: '#ff6b6b',
                tension: 0.3
            }]
        }
    });
}

// Load past entries and chart on start
loadEntries();
loadChart();