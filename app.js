    // Step 1: Create a init funciton to load the webpage
    function init() {
        // Step 2: Using the d3 select statement I selected the dropdown from the html and 
        //stored it in the variable name dropdown
        let dropdown = d3.select("#selDataset");

        // Step 3: Using d3 I read the json data
        d3.json("data/samples.json").then((data) => {
            console.log(data)

            // Step 4: append each of the value in names to a dropdown menu option using a foreach loop
            data.names.forEach((name) => {
                dropdown.append("option").text(name).property("value");
            });

            // Step 5: display the figures on the page by calling the functions
            //and feeding them the data.names to iniciate on the first parameter
            charts(data.names[0]);
            table(data.names[0]);

            // Bonus step gage

        });
    }

    init();

    // Step 6: Created a function for the change event
    function optionChanged(id) {
        charts(id);
        table(id);
    }

    //Step 7: Create a function called charts to plot the bar chart adn bubble chart
    function charts(id) {
        //Step 8: Started by reading the json file 
        d3.json("data/samples.json").then(sampledata => {
            console.log(sampledata)
                //Step 9: Created the variable ids
            var ids = sampledata.samples[0].otu_ids;
            console.log(ids)
                //Step 10: Created the variable sampleValues top 10
            var sampleValues = sampledata.samples[0].sample_values.slice(0, 10).reverse();
            console.log(sampleValues)
                //Step 11: Created the variable lables only top 10
            var labels = sampledata.samples[0].otu_labels.slice(0, 10);
            console.log(labels)
                // Step 12: Created top 10 otu ids for the plot  
            var otuTop = (sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
            // Step 13: Format the plot place OTU infront of the id
            var otuId = otuTop.map(d => "OTU" + d);
            console.log(`OTU IDS: ${otuId}`)
                // Step 14: Get the top 10 labels for the plot
            var labels = sampledata.samples[0].otu_labels.slice(0, 10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: otuId,
                text: labels,
                marker: {
                    color: 'light blue'
                },
                type: "bar",
                orientation: "h",
            };
            // Step 15: Create data variable with trace
            var data = [trace];

            // Step 16: create layout variable for the bar chart
            var layoutbar = {
                title: "Top 10 OTU",
                yaxis: {
                    tickmode: "linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };

            // Step 17: Create the bar plot using plotly.newPlot
            Plotly.newPlot("bar", data, layoutbar);

            // Step 18: Create the bubble chart
            // Create the trace var and add the hover text option 
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text: sampledata.samples[0].otu_labels

            };

            // Step 19: layout for the bubble plot
            var layoutBubble = {
                xaxis: { title: "OTU ID" },
                height: 600,
                width: 1000
            };

            //Step 20: Create the data variable 
            var data1 = [trace1];

            // create the bubble plot
            Plotly.newPlot("bubble", data1, layoutBubble);
        });
    }
    // get the data
    function table(id) {
        // read the json file to get data
        d3.json("data/samples.json").then((data) => {
            // metadata for the demographic panel
            var metadata = data.metadata;

            console.log(metadata)

            // filter metadata info by id
            var result = metadata.filter(meta => meta.id.toString() === id)[0];
            // select demographic panel to put data
            var demographicInfo = d3.select("#sample-metadata");

            // empty the demographic panel
            demographicInfo.html("");

            // demographic data to append on change event
            Object.entries(result).forEach((key) => {
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
            });
        });
    }