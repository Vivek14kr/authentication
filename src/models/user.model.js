const {
    Schema,
    model
} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    versionKey: false,
    timestamps: true,
});



userSchema.pre('save', function (next) {
    console.log(this.password);
    if (!this.isModified('password')) return next();
    const hash = bcrypt.hashSync(this.password, 8);

    this.password = hash;
    next();
});

userSchema.methods.checkPass = function (password) {
    return new Promise((res, rej) => {
        bcrypt.compare(password, this.password, function (err, same) {
            console.log(password);
            if (err) rej(err);

            return res(same);
        });
    });
};

module.exports = model('user', userSchema);