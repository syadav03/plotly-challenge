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
})
