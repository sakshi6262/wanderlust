
    // document.addEventListener('DOMContentLoaded', () => {
    //     // Ensure mapToken is available
    //     if (typeof mapToken === 'undefined') {
    //         console.error('Map token is not defined');
    //         return;
    //     }
    //      // Ensure listing is defined
    // if (typeof listing === 'undefined' || !listing.geometry || !listing.geometry.coordinates) {
    //     console.error('Listing or its geometry coordinates are not defined');
    //     return;
    // }
    //     // Initialize the Mapbox map
    //     mapboxgl.accessToken = mapToken;
    //     const map = new mapboxgl.Map({
    //         container: 'map', // container ID
    //         style: 'mapbox://styles/mapbox/streets-v11', // style URL
    //         center: listing.geometry.coordinates, // starting position [lng, lat]
    //         zoom: 9 // starting zoom
    //     });
    //     console.log(listing.geometry.coordinates);
    //     const marker=new mapboxgl.Marker({color:"red"})
    //     .setLngLat( listing.geometry.coordinates)//Listing.geometry.coordinates
    //     .setPopup(
    //         new mapboxgl.Popup({offset:25}).setHTML(
    //             `<h4>${listing.title}</h4><p>exact location will be provided after bookoing!</p>`
    //         )
    //     )
    //     .addTo(map);
    //  }) ;
    
    // let mapToken=mapToken;
    // console.log(mapToken);




//final


	mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12',
        center: listing.geometry.coordinates,
        // center:coordinates,
        zoom: 8,
    });

    // console.log(coordinates);
   
const marker=new mapboxgl.Marker({color:"red"})

.setLngLat(listing.geometry.coordinates)//Listing.geometry.coordinates

.setPopup(
    new mapboxgl.Popup({offset:25}).setHTML(
        `<h4>${listing.title}</h4><p>exact location will be provided after bookoing</p>`
    )
)
.addTo(map);
