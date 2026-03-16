const asyncGetCurrentPosition = (options) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

// 2. Use the wrapper function with async/await inside an async function
export async function getLocationDetails(){
  try {
    const position = await asyncGetCurrentPosition({ enableHighAccuracy: true });
    const { latitude, longitude } = position.coords;
    return {x:latitude,y:longitude};
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Example of a subsequent async operation using the location
    // const response = await fetch(`https://example.com{latitude}&lon=${longitude}`);
    // const data = await response.json();
    // console.log(data);

  } catch (error) {
    // Handle any errors (e.g., user denies permission, timeout)
    console.error("Error getting location:", error.message);
  }
};

window.addEventListener("deviceorientation", (e) => {
  let compassHeading;
  if (e.webkitCompassHeading) {
    // iOS
    compassHeading = e.webkitCompassHeading;
  } else if (e.alpha) {
    // Android/General - Alpha is absolute (if supported)
    compassHeading = 360 - e.alpha; 
  }
  console.log("Heading: ", compassHeading);
}, true);