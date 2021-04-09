// Select tag 

var selectedTag = d3.select("#selDataset");

d3.json("samples.json").then((importedData) =>{
    console.log("importedData")
    console.log(importedData)

    var subject_ids = importedData.names;
    console.log("Subject_ids")
    console.log(subject_ids)

    subject_ids.map((id) =>{
        selectedTag
        .append("option")
        .property("value" ,id)
        .text(id)
    });
     // Loads the dashboard with 940 for the initial page load
  optionChanged(subject_ids[0]);
});

function optionChanged(selected_id) {
    console.log("selected_id=", selected_id);

    d3.json("samples.json").then((data) =>{
        //bar chart
        var samples = data.samples;
        var results=samples.filter(sampleObject => sampleObject.id == selected_id);

        console.log("samples:", samples);

        var result = results[0];

        console.log("results: ");
        console.log(results);

        console.log("result: ");
        console.log(result);

        var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var y_label = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    console.log("y_label: ");
    console.log(y_label);

    console.log("sample_valuese: ");
    console.log(sample_values.slice(0, 10).reverse());

    var bar_trace = {
      y: y_label,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };

    var data = [bar_trace];

    var bar_layout = {
      title: "Top 10 OTUs",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", data, bar_layout);

     // Bubble chart 

     var results = samples.filter(sampleObject => sampleObject.id == selected_id);
     var result = results[0];
 
     var otu_ids = result.otu_ids;
     var otu_labels = result.otu_labels;
     var sample_values = result.sample_values;
 
     var bubble_trace = {
       x: otu_ids,
       y: sample_values,
       text: otu_labels,
       mode: "markers",
       marker: {
         size: sample_values,
         color: otu_ids,
         colorscale: "Earth"
       }
     };
 
     var data = [bubble_trace];
 
     var bubble_layout = {
       hovermode: "closest",
       xaxis: { title: "OTU ID" },
       margin: { t: 30 }
     };
 
     Plotly.newPlot("bubble", [bubble_trace], bubble_layout);
   });

};

// function updateMetadata(sample) {
//     d3.json("samples.json").then((data) => {
//         // obtain Demographic Info for panel
//         var metadata = data.metadata;
//         var filterData = metadata.filter(sampleObject => sampleObject.id == sample);
//         // console.log(filterData);
//         var result = filterData[0];
//         // console.log(result);
//         var panelBody = d3.select("#sample-metadata");
//          // remove any children from the list before refreshing with new data
//          panelBody.html("");
//         // append Demographic Info for panel
//         Object.entries(result).forEach((key)=>{
//             panelBody.append("p").text(key[0] + ":" + key[1]);
//         })
//     });
