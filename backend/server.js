import express from 'express';
import cors from 'cors';

const app = express();

// ✅ Allow multiple origins (Vercel + Localhost + VPS IP)
const allowedOrigins = [
  'https://myjokes-app.vercel.app',
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://62.72.12.52',           // ✅ Added: VPS HTTP
  'https://62.72.12.52'            // ✅ Added: VPS HTTPS (for future SSL)
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed for this origin'));
    }
  },
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.get('/api/jokes', (req, res) => {
  const jokes = [
    {
      id: 1,
      title: 'Parallel Lines',
      content:
        "Parallel lines have so much in common. It's a shame they'll never meet.",
    },
    {
      id: 2,
      title: 'Scarecrow Award',
      content:
        'I heard a scarecrow won an award. It was for being outstanding in its field.',
    },
    {
      id: 3,
      title: 'Restroom Joke',
      content:
        "Why shouldn't you write a test in the restroom? Because the results are always watered down.",
    },
    {
      id: 4,
      title: 'Skeletons',
      content:
        "Why don't skeletons fight each other? They don't have the guts.",
    },
    {
      id: 5,
      title: "Atom's Problem",
      content:
        "An atom walks into a bar and says, 'I think I lost an electron!' The bartender asks, 'Are you sure?' The atom replies, 'Yes, I'm positive!'",
    },
  ];

  res.json(jokes);
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});