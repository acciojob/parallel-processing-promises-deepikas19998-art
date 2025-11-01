const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Helper function: downloads a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(`❌ Failed to load image: ${url}`);

    img.src = url;
  });
}

// Main function: handles download of all images
async function downloadImages() {
  // Reset UI
  output.innerHTML = "";
  errorDiv.textContent = "";

  // Show loading spinner
  loadingDiv.style.display = "block";

  try {
    // Download all images in parallel
    const downloadedImages = await Promise.all(
      images.map(image => downloadImage(image.url))
    );

    // Hide loading spinner
    loadingDiv.style.display = "none";

    // Display all downloaded images
    downloadedImages.forEach(img => {
      img.style.margin = "10px";
      img.style.borderRadius = "8px";
      output.appendChild(img);
    });
  } catch (error) {
    // Hide loading spinner
    loadingDiv.style.display = "none";

    // Show error message
    errorDiv.textContent = error;
  }
}

// Event listener for button
btn.addEventListener("click", downloadImages);
