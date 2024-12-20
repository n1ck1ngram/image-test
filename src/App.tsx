import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card";
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";

const App = () => {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleImageChange = (event) => {
    const newImages = event.target.files;
    const imagesArray = Array.from(newImages);
    if (imagesArray.length <= 50) {
      setImages(imagesArray);
      const previews = Array.from(newImages).map((image) => {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
        };
        reader.readAsDataURL(image);
      });
    } else {
      alert("You can upload up to 50 images");
    }
  };

  const handleGenerateImage = () => {
    setLoading(true);
    // This is a placeholder for the image generation logic
    // You would need to implement the actual logic to generate the image
    // For example, you could use a library like TensorFlow.js or a backend API
    const generatedImageUrl = "https://via.placeholder.com/300";
    setGeneratedImage(generatedImageUrl);
    setLoading(false);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.style.background = "#1a1d23";
    } else {
      document.body.classList.remove("dark");
      document.body.style.background = "#f9fafb";
    }
  }, [darkMode]);

  return (
    <div
      className={`max-w-5xl mx-auto p-4 md:p-6 lg:p-8 mt-10 ${
        darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-100"
      } rounded-lg shadow-lg`}
    >
      <Card
        className={`${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
        }`}
      >
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Label
              htmlFor="images"
              className={`${darkMode ? "text-gray-100" : "text-gray-900"}`}
            >
              Upload up to 50 images
            </Label>
            <Input
              type="file"
              multiple
              id="images"
              onChange={handleImageChange}
              accept="image/*"
              className={`${
                darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-900"
              }`}
            />
            <div className="flex flex-wrap justify-center">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt="Uploaded Image"
                  className={`w-32 h-32 object-cover m-2 ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } border-2 rounded-lg`}
                />
              ))}
            </div>
            <Button
              variant="primary"
              onClick={handleGenerateImage}
              className={`${
                darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
              }`}
            >
              {loading ? "Generating..." : "Generate Image"}
            </Button>
            {generatedImage && (
              <div className="mt-4">
                <img src={generatedImage} alt="Generated Image" />
              </div>
            )}
            <Button
              variant="outline"
              onClick={handleDarkModeToggle}
              className={`${
                darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-900"
              }`}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;