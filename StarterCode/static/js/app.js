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

        
    })
}
