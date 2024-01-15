// fetch json data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let globalData;

d3.json(url).then(data => {
    globalData = data; // Save the fetched data to the global variable
    populateDropdown(data);
    optionChanged(data.samples[0].id, data); // Adjusted to pass the ID and data
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

d3.select("#selDataset").on("change", function() {
    const selectedId = d3.select(this).property("value");
    optionChanged(selectedId, globalData);
});


function optionChanged(selectedId, data) {
    const selectedSample = data.samples.find(sample => sample.id === selectedId);
    createChart(selectedSample);
}

// create metadata panel

// Create Chart using Plotly
function createChart(sample) {
    const { otu_ids, sample_values, otu_labels, wfreq } = sample;

  // Prepare Data
  const sampleData = otu_ids.map((otu_id, index) => ({
    otu_id,
    sample_value: sample_values[index],
    otu_label: otu_labels[index]
  }));

  // Sort and Filter Top 10 Samples
  const topOTU = sampleData.sort((a, b) => b.sample_value - a.sample_value).slice(0, 10).reverse();
  console.log(topOTU)
  // Prepare data for Plotly Bar Chart
  const barTrace = {
    x: topOTU.map(({ sample_value }) => sample_value),
    y: topOTU.map(({ otu_id }) => `OTU ${otu_id}`),
    text: topOTU.map(({ otu_label }) => otu_label),
    type: "bar",
    orientation: 'h',
    marker: {
      colorscale: 'rgb(49,130,189)',
      opacity: 0.5,
      line: {
        color: 'rgb(8,48,107)',
        width: 1.5
      }
    }
  };

 // layout for bubble chart

 // prepare data for gauge chart

// create plotly charts

Plotly.newPlot('bar', [barTrace]);
 // Plotly.newPlot('bubble')
 // Plotly.newPlot('gauge')

// update plot on dropdown


// fetch and initialize page

// trigger fetching and utilization
}