import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            // 해당 데이터가 필수임을 명시
            required: true,
            // 기본값 설정
            // default :"yoon"
        },
        email: {
            type: String,
            required: true,
            // 유일함을 명시
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
