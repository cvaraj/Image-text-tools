const express = require('express');
const fileUpload = require('express-fileupload');
const Tesseract = require('tesseract.js');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const mammoth = require('mammoth');
const pdfParse = require('pdf-parse');

const app = express();
app.use(cors());
app.use(fileUpload());

app.post("/api/extract", async (req, res) => {
  if (!req.files || !req.files.image)
    return res.status(400).json({ error: "No image uploaded" });

  const image = req.files.image;
  try {
    const { data: { text } } = await Tesseract.recognize(
      image.data,
      "eng",
      { logger: (m) => console.log(m) } // optional progress logging
    );
    res.json({ text });
  } catch (error) {
    console.error("Tesseract error:", error);
    res.status(500).json({ error: "Failed to extract text" });
  }
});

app.post("/api/image-to-word", async (req, res) => {
  if (!req.files || !req.files.image)
    return res.status(400).json({ error: "No image uploaded" });

  const image = req.files.image;
  try {
    const { data: { text } } = await Tesseract.recognize(
      image.data,
      "eng",
      { logger: (m) => console.log(m) }
    );

    // Create a simple DOCX with the extracted text
    const docxBuffer = Buffer.from(`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:r>
        <w:t>${text.replace(/&/g, '&amp;').replace(/</g, '<').replace(/>/g, '>')}</w:t>
      </w:r>
    </w:p>
  </w:body>
</w:document>
`, 'utf8');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename="extracted_text.docx"');
    res.send(docxBuffer);
  } catch (error) {
    console.error("Image to Word error:", error);
    res.status(500).json({ error: "Failed to convert image to Word" });
  }
});

app.post("/api/image-to-pdf", async (req, res) => {
  if (!req.files || !req.files.image)
    return res.status(400).json({ error: "No image uploaded" });

  const image = req.files.image;
  try {
    // Create PDF with the image embedded
    const doc = new PDFDocument();
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="converted_image.pdf"');
      res.send(pdfData);
    });

    // Add the image to the PDF
    doc.image(image.data, 50, 50, {
      width: 500,
      height: 400
    });

    doc.end();
  } catch (error) {
    console.error("Image to PDF error:", error);
    res.status(500).json({ error: "Failed to convert image to PDF" });
  }
});

app.post("/api/pdf-to-text", async (req, res) => {
  if (!req.files || !req.files.pdf)
    return res.status(400).json({ error: "No PDF uploaded" });

  const pdf = req.files.pdf;
  try {
    const data = await pdfParse(pdf.data);
    res.json({ text: data.text });
  } catch (error) {
    console.error("PDF to Text error:", error);
    res.status(500).json({ error: "Failed to extract text from PDF" });
  }
});

app.post("/api/pdf-to-word", async (req, res) => {
  if (!req.files || !req.files.pdf)
    return res.status(400).json({ error: "No PDF uploaded" });

  const pdf = req.files.pdf;
  try {
    const data = await pdfParse(pdf.data);
    const text = data.text;

    // Create a simple DOCX with the extracted text
    const docxBuffer = Buffer.from(`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:r>
        <w:t>${text.replace(/&/g, '&amp;').replace(/</g, '<').replace(/>/g, '>')}</w:t>
      </w:r>
    </w:p>
  </w:body>
</w:document>
`, 'utf8');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename="converted_document.docx"');
    res.send(docxBuffer);
  } catch (error) {
    console.error("PDF to Word error:", error);
    res.status(500).json({ error: "Failed to convert PDF to Word" });
  }
});

// Background removal is now handled client-side with @imgly/background-removal

app.get('/', (req, res) => res.send('ImageExtractor backend is running. Available endpoints: /api/extract, /api/image-to-word, /api/image-to-pdf, /api/pdf-to-text, /api/pdf-to-word, /api/remove-background'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
