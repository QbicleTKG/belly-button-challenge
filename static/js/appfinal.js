// fetch json data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
    let yvalue =  data.samples.map(sample => sample.otu_ids).flat();
    let xvalue =  data.samples.map(d => d.sample_values).flat();
    let names = Object.values(data.names);
    let metadata = Object.values(data.metadata);
    console.log(data);
    console.log("OTU IDs: ", xvalue);
    console.log("Sample Values :", yvalue);
    console.log("Names: ", names)
    console.log("Metadata: ", metadata)
    

let trace1 = {
    x: yvalue,
    y: xvalue,
    type: 'bar',
    orientation: 'h', 
};

    Plotly.newPlot('bar', [trace1]);
});


// On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", getData);






// fetch json data
d3.json(url).then(data => {
    populateDropdown(data);
    optionChanged(data, data.samples[0]); // Initialize chart with the first sample
});

// populate dropdown with names and data
function populateDropdown(data) {
    const select = d3.select("#selDataset");
    select.selectAll("option")
        .data(data.samples)
        .enter()
        .append("option")
        .text(d => d.id); // Assuming each sample has an 'id' you want to use
}

// create metadata panel
function optionChanged(data, selectedSample) {
    let xvalue = selectedSample.otu_ids.slice(0, 10);
    let yvalue = selectedSample.sample_values;

    let trace1 = {
        x: xvalue,
        y: yvalue,
        type: 'bar',
        orientation: 'h',
    };

    Plotly.newPlot('bar', [trace1]);
}
// create charts with plotly 

 // prepare data for charts
 
 // sort and filter top 10 samples

 // prepare data for bar chart

 // layout for bubble chart

 // prepare data for gauge chart

// create plotly charts

 // Plotly.newPlot('bar')
 // Plotly.newPlot('bubble')
 // Plotly.newPlot('gauge')

// update plot on dropdown
d3.select("#selDataset").on("change", function() {
    const selectedId = d3.select(this).property("value");
    const selectedSample = data.samples.find(s => s.id === selectedId);
    optionChanged(data, selectedSample);
});

// fetch and initialize page

// trigger fetching and utlization