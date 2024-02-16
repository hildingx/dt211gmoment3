import Chart from 'chart.js/auto'

//Funktion för att hämta data från api
async function fetchData() {
    try {
        const response = await fetch(`https://studenter.miun.se/~mallar/dt211g/`);
        const data = await response.json();

        return data;
    } catch (error) {
        document.getElementById("diagrams").innerHTML = `<p>Data kunde inte hämtas</p>`;
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

    //Funktion för att dela upp varje ord med mellanslag
    function processCourseNames(courseNames) {
        return courseNames.map(name => 
            name.split(" ")
        );
    }
    
    let processedCourseNames = processCourseNames(courseNames);

    // Kör Chart.js-diagrammet med kursnamn och antal sökande
    new Chart(
        document.getElementById('barAcquisitions'),
        {
        type: 'bar',
        data: {
            labels: processedCourseNames,
            datasets: [{
                label: 'Totalt antal sökande',
                data: courseApplicants,
                borderWidth: 1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)'
                ],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "black",
                        font: {
                            size: 14
                        }
                    },
                    title: {
                        display: true,
                        text: 'Totalt antal sökande',
                        color: "black",
                        font: {
                            size: 20
                        }
                    }
                },
                x: {
                    ticks: {
                        color: "black",
                        maxRotation: 0,
                        minRotation: 0
                    },
                }
            },
            animation: true,
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    //Funktion för att ta bort ',' i tooltipen
                    callbacks: {
                        title: function(tooltipItems) {
                            let tooltipItem = tooltipItems[0];
                            let originalLabel = tooltipItem.chart.data.labels[tooltipItem.dataIndex];
                            return originalLabel.join(" ");
                        }
                    }
                }
            }
        }
    });
}

//Funktion som filtrerar ut program, sorterar efter sökande och slice'ar ut de 5 första.
async function filterAndSortPrograms() {
    const data = await fetchData();

    let programs = data.filter(item => item.type === "Program");

    programs.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    let topPrograms = programs.slice(0, 5);

    return topPrograms;
}

//Funktion som skriver ut programmen i pajdiagram med chart.js
async function displayTopPrograms() {
    let topPrograms = await filterAndSortPrograms();

    // Skapa arrays för programnamn och antal sökande
    let programNames = topPrograms.map(program => program.name);
    let programApplicants = topPrograms.map(program => program.applicantsTotal);
    
    // Kör Chart.js-diagrammet med programnamn och antal sökande
    new Chart(
        document.getElementById('pieAcquisitions'),
        {
        type: 'pie',
        data: {
            labels: programNames,
            datasets: [{
                label: 'Totalt antal sökande',
                data: programApplicants,
                borderWidth: 1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)'
                ],
                borderColor: [
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)'
                ],
            }]
        },
        options: {
            animation: true,
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'black',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    });
}

//Kör båda funktionerna vid sidans laddning
window.onload = function() {
    displayTopCourses();
    displayTopPrograms();
};