//Funktion för att initialisera kartan
async function initMap() {
    //Importerar maps-biblioteket dynamiskt
    const { Map } = await google.maps.importLibrary("maps");

    //Skapar en karta med en standardposition (Sundsvall)
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 62.396099, lng: 17.2932193 }, // Lat lng: Sundsvall
        zoom: 8,
    });

    //Försöker hämta användarens position
    navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        //Uppdaterar kartans centrum till användarens position
        map.setCenter({ lat: latitude, lng: longitude });

        //Lägg till en markör på användarens position
        new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            title: "Din position"
        });
    }, function (error) {
        console.error("Error: " + error.message);
    });

    //Hämtar places-biblioteket 
    const placesService = new google.maps.places.PlacesService(map);
    //Deklarerar variabel för kartmarkören
    let searchMarker; 

    document.getElementById('search-form').addEventListener('submit', function(event) {
        //Förhindra omladdning av sidan vid formulärskickande
        event.preventDefault();
        //Hämta söksträng
        const searchValue = document.getElementById('search-box').value;
        //Skicka med söksträng och fält som ska returneras
        if (searchValue) {
            const request = {
                query: searchValue,
                fields: ['name', 'geometry'],
            };
            //Anrop till Gmaps Places API
            placesService.findPlaceFromQuery(request, function(results, status) {
                //Kontrollera om resultat hittats
                if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
                    //API't returnerar en array
                    const place = results[0];
                    //Uppdaterar kartans centrum till första sökresultatet
                    map.setCenter(place.geometry.location);

                    // Ta bort tidigare sökmarkör om den finns
                    if (searchMarker) searchMarker.setMap(null);

                    // Lägg till en ny markör baserat på sökresultatet
                    searchMarker = new google.maps.Marker({
                        position: place.geometry.location,
                        map: map,
                        title: place.name,
                    });
                } else {
                    console.error('No results found or error in search');
                }
            });
        }
    });
}

window.onload = initMap();
