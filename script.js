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
});
