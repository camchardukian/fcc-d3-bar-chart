document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch(
        "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    );
    if (!response.ok) {
        const errorMessage = `An error has occured: ${response.status}`;
        throw new Error(errorMessage);
    }
    const { data } = await response.json();
    console.log("data", data);

    const width = 800;
    const height = 400;
    const padding = 60;
    const scaleX = d3.scaleLinear()
        .domain([d3.min(data, (d) => {
            return parseInt(d[0])
        }), d3.max(data, (d) => {
            return parseInt(d[0])
        })])
        .range([padding, width - padding])
    const scaleY = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d[1])])
        .range([height - padding, padding])

    const svg = d3
        .select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
    // AXES
    const xAxis = d3.axisBottom(scaleX).tickFormat((d, i) => d)
    const yAxis = d3.axisLeft(scaleY)

    const tooltip = d3.select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("visibility", "hidden")
        .style("width", "auto")
        .style("height", "auto")
        .style("background-color", "lightblue")
        .style("display", "inline-block")
        .style("padding", "8px 16px")

    svg.append("g").attr("id", "x-axis").attr("transform", `translate(0, ${height - padding})`).call(xAxis)
    svg.append("g").attr("id", "y-axis").attr("transform", `translate(${padding}, 0)`).call(yAxis)
        // RECT
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (_, i) => (width - (padding * 2)) / data.length * i)
        .attr("y", (d) => scaleY(d[1]))
        .attr("width", (width - (padding * 2)) / data.length * 0.75)
        .attr("height", (d) => height - padding - scaleY(d[1]))
        .attr("class", "bar")
        .attr("data-date", (d) => d[0])
        .attr("data-gdp", (d) => d[1])
        .on("mouseenter", (item) => {
            const barData = item.target?.__data__
            tooltip.transition()
                .style("visibility", "visible")
                .text(`Date: ${barData[0]}, GDP ${barData[1]} (in billions)`)
            // @NOTE: On my own project I'd prefer to set the "data-date" using D3 rather than directly using JS,
            // but doing so strips unnecessary zeroes from the date which causes the FCC unit test for the tooltip's attribute to fail.
            document.getElementById("tooltip").setAttribute("data-date", barData[0])
        })
        .on("mouseout", () => tooltip.transition().style("visibility", "hidden"))
});
