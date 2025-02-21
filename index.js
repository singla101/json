const express = require('express');
const cors = require('cors');

const app = express();
const PORT =  5000;

app.use(cors());
app.use(express.json());

const userDetails = {
  full_name: 'Kanishka',
  dob: '25102004',
  email: 'kanishkaa2504@gmail.com',
  roll_number: '22BCS16275',
};

const getHighestAlphabet = (alphabets) => {
  if (alphabets.length === 0) return [];
  return [alphabets.reduce((a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b))];
};
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: 'Invalid input format' });
    }
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));
    const highest_alphabet = getHighestAlphabet(alphabets);
    res.status(200).json({
      is_success: true,
      user_id: `${userDetails.full_name}_${userDetails.dob}`,
      email: userDetails.email,
      roll_number: userDetails.roll_number,
      numbers: numbers,
      alphabets:alphabets,
      highest_alphabet: highest_alphabet,
    });
    
  } catch (error) {
    res.status(500).json({ is_success: false, error: 'Internal server error' });
  }
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});