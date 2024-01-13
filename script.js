function getForecast() {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=c32649cc3d774889aa452032241301&q=Vancouver&days=2&aqi=no&alerts=no`, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        console.log(data)

        // Variables
        const tempData = {}
        const day2hours = data.forecast.forecastday[1].hour

        // Loop through the hours of the day and store the temperature in an object (hashmap/dictionary)
        for( hour of day2hours ) {
            tempData[hour.time.slice(11, 16)] = hour.temp_c
        }

        console.log(tempData)

        // Create the chart object
        const chartObject = {
            type: 'line',
            data: {
                labels: [], // x-axis
                datasets: [{
                    label: 'Temperature',
                    data: [], // y-axis
                }]
            }
        }

        // Loop through the hashmap and add the data to the chart object
        for (const [key, value] of Object.entries(tempData)) {
            chartObject.data.labels.push(key)
            chartObject.data.datasets[0].data.push(value)
        }

        // Fetch the chart from the API and display it on the page
        fetch(`https://quickchart.io/chart?c=${JSON.stringify(chartObject)}`, { method: 'GET' })
        .then(response => response.blob())
        .then(data => {
            console.log(data)
            document.getElementById('btn').style.display = 'none';
            const img = document.getElementById('chart');
            img.src = URL.createObjectURL(data);
        })
    })
    .catch(error => console.error('Error:', error))
}