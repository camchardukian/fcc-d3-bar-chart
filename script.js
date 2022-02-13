document.addEventListener("DOMContentLoaded", async () => {
  console.log("loaded whoaaaa");
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

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    // @ TODO -- Scale this data later.
    .attr("x", (_, i) => i * 2.5)
    .attr("y", (d) => height - 0.02 * d[1])
    .attr("width", 2)
    .attr("height", (d) => 0.02 * d[1])
    .attr("class", "bar")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1]);
});
