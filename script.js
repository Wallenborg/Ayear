updateBackgroundColor(); // Initial update

function updateBackgroundColor() {
  const daysElapsed = getDaysElapsed();
  const percentElapsed = daysElapsed / 365;
  const backgroundColor = interpolateColor(
    "rgb(255, 255, 255)",
    "rgb(0, 0, 0)",
    percentElapsed
  );

  document.body.style.backgroundColor = backgroundColor;
  document.getElementById("countdown").textContent = `Day: ${daysElapsed}`;
}

// Update background color once a day
setInterval(updateBackgroundColor, 24 * 60 * 60 * 1000);

function getDaysElapsed() {
  const creationDate = new Date("2024-03-28"); // Replace with your site's creation date
  const currentDate = new Date();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysElapsed = Math.floor(
    (currentDate.getTime() - creationDate.getTime()) / millisecondsPerDay
  );
  return daysElapsed + 1; // Add 1 to start from Day 1
}

function interpolateColor(color1, color2, percent) {
  const color1Components = getColorComponents(color1);
  const color2Components = getColorComponents(color2);
  const interpolatedComponents = color1Components.map((c1, index) => {
    const c2 = color2Components[index];
    return Math.round(c1 + (c2 - c1) * percent);
  });
  return `rgb(${interpolatedComponents.join(", ")})`;
}

function getColorComponents(color) {
  const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (match) {
    return match.slice(1).map(Number);
  } else {
    throw new Error(`Invalid color: ${color}`);
  }
}
