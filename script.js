//your JS code here. If required.
// Select the DOM elements
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const outputDiv = document.getElementById('output');

// Sample image URLs (you can replace with your own)
const imageUrls = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/200",
  "https://via.placeholder.com/250"
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(`❌ Failed to load image: ${url}`);

    img.src = url;
  });
}

// Main function to handle downloading multiple images
async function downloadImages() {
  // Clear previous messages and images
  outputDiv.innerHTML = "";
  errorDiv.textContent = "";

  // Show loading spinner
  loadingDiv.style.display = "block";

  try {
    // Download all images in parallel
    const images = await Promise.all(imageUrls.map(downloadImage));

    // Hide loading spinner
    loadingDiv.style.display = "none";

    // Display all images in output div
    images.forEach(img => {
      img.style.margin = "10px";
      outputDiv.appendChild(img);
    });
  } catch (error) {
    // Hide loading spinner
    loadingDiv.style.display = "none";

    // Display error message
    errorDiv.textContent = error;
  }
}

// Start downloading when page loads (or you can attach to a button)
downloadImages();
