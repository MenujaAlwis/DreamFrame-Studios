const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

async function createAdmin() {
  await mongoose.connect('mongodb://localhost:27017/DreamFrame-Studios');

  const hashedPassword = await bcrypt.hash('', 10);

  await User.create({
    name: '',
    email: '',
    password: hashedPassword,
    role: 'admin'
  });

  console.log('Admin created');
  process.exit();
}

createAdmin();