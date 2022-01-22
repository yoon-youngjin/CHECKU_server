import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const subjectSchema = new Schema(
    {
        title: {
            type: String,
            // 해당 데이터가 필수임을 명시
            required: true,
            // 기본값 설정
            // default :"yoon"
        },
        professor_name: {
            type: String,
            required: true,
        },
        total_num: {
            type: String,
            required: true,
        },
        current_num: {
            type: String,
            required: true,
        },
        subject_num: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;
