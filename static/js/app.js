// fetch json data and establish a globalData variable so the data call works outside of initialization
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let globalData;

d3.json(url).then(data => {
    globalData = data; 
    populateDropdown(data);
    optionChanged(data.samples[0].id, data); 
});

// populate dropdown with names and data
function populateDropdown(data) {
    const select = d3.select("#selDataset");
    select.selectAll("option")
        .data(data.samples)
        .enter()
        .append("option")
        .text(d => d.id); 
}

// function to update metadata panel
function updateMetadata(selectedId) {
  const metadata = globalData.metadata.find(item => item.id == selectedId); 

  const metadataContainer = d3.select("#sample-metadata");
  metadataContainer.html(""); 

  Object.entries(metadata).forEach(([key, value]) => {
      metadataContainer.append("p").text(`${key}: ${value}`);
  });
}

// Event listener for dropdown change
d3.select("#selDataset").on("change", function() {
  const selectedId = d3.select(this).property("value");
  updateMetadata(selectedId);
});

// create d3 function for dropdown button to call "optionChanged" function
d3.select("#selDataset").on("change", function() {
    const selectedId = d3.select(this).property("value");
    optionChanged(selectedId, globalData);
});

// create optionChanged function to 
function optionChanged(selectedId) {
  const selectedSample = globalData.samples.find(sample => sample.id == selectedId);
  createChart(selectedSample);
  updateMetadata(selectedId); 
}

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

 // layout for Plotly Bubble Chart
 const bubbleTrace = {
  x: sampleData.map(({ otu_id }) => otu_id), 
  y: sampleData.map(({ sample_value }) => sample_value), 
  text: sampleData.map(({ otu_label }) => otu_label), 
  mode: 'markers', 
  marker: {
      size: sampleData.map(({ sample_value }) => sample_value), 
      color: sampleData.map(({ otu_id }) => otu_id), 
      colorscale: 'Earth', 
      opacity: 0.7,
      line: {
          color: 'rgb(8,48,107)',
          width: 1
      }
  }
};

// create plotly charts
Plotly.newPlot('bar', [barTrace]);
Plotly.newPlot('bubble', [bubbleTrace]);

}