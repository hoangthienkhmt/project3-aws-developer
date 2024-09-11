import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util.js';

// Initialize the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8083;

// Use the body parser middleware for POST requests
app.use(bodyParser.json());

// RESTful endpoint to filter an image from a public URL
app.get('/filteredimage', async (req, res) => {
  const { image_url: imageUrl } = req.query;

  // Validate the image_url query parameter
  if (!imageUrl) {
    return res.status(400).send('Image URL is required.');
  }

  try {
    // Call filterImageFromURL(image_url) to filter the image
    const imageFile = await filterImageFromURL(imageUrl);

    // Send the resulting file in the response
    res.sendFile(imageFile, (err) => {
      if (err) {
        return res.status(500).send('Error sending the file.');
      }
      // Delete any files on the server after the response is finished
      deleteLocalFiles([imageFile]);
    });
  } catch (error) {
    res.status(500).send('Error processing the image.');
  }
});

// Root endpoint to display a simple message to the user
app.get('/', (req, res) => {
  res.send('Try GET /filteredimage?image_url={{your_image_url}}');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Press CTRL+C to stop the server');
});
