const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 TEMP DATABASE (in-memory)
let documents = [
  {
    id: '1',
    title: 'Bike Insurance',
    amount: 2000,
    dueDate: '2026-05-10',
    paid: false,
  },
  {
    id: '2',
    title: 'Netflix Subscription',
    amount: 499,
    dueDate: '2026-04-20',
    paid: false,
  },
];

// ✅ GET all documents
app.get('/documents', (req, res) => {
  res.json(documents);
});

// ✅ ADD document
app.post('/documents', (req, res) => {
  const newDoc = {
    id: Date.now().toString(),
    ...req.body,
  };
  documents.push(newDoc);
  res.json(newDoc);
});

// ✅ MARK AS PAID
app.put('/documents/:id', (req, res) => {
  const { id } = req.params;

  documents = documents.map(doc =>
    doc.id === id ? { ...doc, paid: true } : doc
  );

  res.json({ message: 'Updated' });
});

// ✅ DELETE document
app.delete('/documents/:id', (req, res) => {
  const { id } = req.params;

  documents = documents.filter(doc => doc.id !== id);

  res.json({ message: 'Deleted' });
});

// 🚀 START SERVER
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});