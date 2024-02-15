import Chart from 'chart.js/auto'

//Funktion för att hämta data från api
async function fetchData() {
    try {
        const response = await fetch(`https://studenter.miun.se/~mallar/dt211g/`);
        const data = await response.json();

        return data;
    } catch (error) {
        document.getElementById("barChart").innerHTML = `<p>Data kunde inte hämtas</p>`;
    }
}

//Funktion som filtrerar ut kurser, sorterar efter sökande och slice'ar ut de 6 första.
async function filterAndSortCourses() {
    const data = await fetchData();

    let courses = data.filter(item => item.type === "Kurs");

    courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    let topCourses = courses.slice(0, 6);

    return topCourses;
}

//Funktion som skriver ut kurserna i diagram med chart.js
async function displayTopCourses() {
    let topCourses = await filterAndSortCourses();

    // Skapa arrays för kursnamn och antal sökande
    let courseNames = topCourses.map(course => course.name);
    let courseApplicants = topCourses.map(course => course.applicantsTotal);

    // Kör Chart.js-diagrammet med kursnamn och antal sökande
    new Chart(
        document.getElementById('acquisitions'),
        {
        type: 'bar',
        options: {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: false
              }
            }
          },
        data: {
            labels: courseNames,
            datasets: [{
                label: '# of Applicants',
                data: courseApplicants,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

window.onload = displayTopCourses;

