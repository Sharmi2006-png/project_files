const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function checkPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return 'Weak 🔴';
  else if (score === 3 || score === 4) return 'Moderate 🟠';
  else return 'Strong 🟢';
}

app.post('/check', (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required!' });
  const strength = checkPasswordStrength(password);
  res.json({ strength });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
