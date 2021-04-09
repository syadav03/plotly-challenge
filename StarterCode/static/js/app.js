var jsData;

function init(){
    var selector = d3.select(#selDataset);

    d3.json("data/samples.jsonn").then((data) =>{
        jsdata = data;
            var subjectID = data.names;
            subjectID.forEach((ID) => {
                selector
                .append('option')
                .text(ID)
                .property('value', ID);
            });
     const firstbutton = subjectID[0];
     updateCharts(firstbutton);
     updateMetadata(firstbutton);
    });
};