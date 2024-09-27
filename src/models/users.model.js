const { model, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

const saltWorkFactor = 12;

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'user' },  // Asigna un valor predeterminado
    createdAt: { type: Date, default: Date.now } // Usa Date para manejar fechas correctamente
});


userSchema.pre('save', async function(next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, saltWorkFactor);
        }
        next();
    } catch (err) {
        next(err); 
    }
});


userSchema.methods.checkPassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};

const User = model('User', userSchema);

module.exports = User;
