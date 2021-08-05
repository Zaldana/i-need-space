async function fetchMapbox() {

    const apiKey = $("#api-key").val();
    const address = encodeURI($("#address").val());

    const rawData = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey}`);
    const data = await rawData.json();
    return data;

}

async function fetchNorad() {


    const norad = $("#norad").val();
    const mapData = await fetchMapbox();
    const lon = mapData.features[0].center[0];
    const lat = mapData.features[0].center[1];

    const rawData = await fetch(`https://satellites.fly.dev/passes/${norad}?lat=${lat}&lon=${lon}&limit=1&days=15&visible_only=true`);
    const data = await rawData.json();


    return data;

}


$("#search").click(async function () {

    const noradData = await fetchNorad();

    $('#modal-label').text('Satellite: ' + $("#norad").val());

    console.log(noradData)
    
    const body = $(`<div class="modal-body"><b>Rise:</b><br><b>UTC Date/Time:</b>${noradData[0].rise.utc_datetime}<br><b>Satellite Direction:</b>${noradData[0].rise.az_octant}<br><br><b>Culmination:</b><br><b>UTC Date/Time:</b>${noradData[0].culmination.utc_datetime}<br><br><b>Set:</b><br><b>UTC Date/Time:</b>${noradData[0].set.utc_datetime}</div>`);

    $('#modal-label').append(body);

})