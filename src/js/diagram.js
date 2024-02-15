//Funktion för att hämta data från api
async function fetchData() {
    const response = await fetch(`https://studenter.miun.se/~mallar/dt211g/`);
    const data = await response.json();

    return data;
}

//Funktion som filtrerar ut kurser, sorterar efter sökande och slice'ar ut de 6 första.
async function filterAndSortCourses() {
    const data = await fetchData();

    let courses = data.filter(item => item.type === "Kurs");

    courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    let topCourses = courses.slice(0, 6);

    return topCourses;
}

//Funktion som, just nu, skriver ut kurserna i #barChart.
async function displayTopCourses() {
    let topCourses = await filterAndSortCourses();
    
    let barChartEl = document.getElementById('barChart');
    barChartEl.innerHTML = '';

    topCourses.forEach(course => { 
        barChartEl.innerHTML += 
        `
        <p>${course.name} ${course.applicantsTotal}</p>
        `
    });
}

window.onload = displayTopCourses;

