const model = require('../models/studentModel');
const view = require('../views/index');

const parseBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
    });
};

function getAllStudents(req, res){
    const allStudents = model.getAllStudents();
    res.setHeader('Content-Type', 'application/json');
    res.end(view.renderStudents(allStudents));
}

function getStudentById(req, res) {
    try {
        const studentId = parseInt(req.params.studentId);
        console.log("student id control", studentId);
        const student = model.findStudentById(studentId);

        if (student) {
            res.setHeader('Content-Type', 'application/json');
            res.end(view.renderStudent(student));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Student not found!' }));
        }
    } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: 'Invalid request data' }));
    }
}

async function createStudent(req, res){
    try {
        const body = await parseBody(req);
        const newStudent = model.createStudent(body.name);
        res.setHeader('Content-Type', 'application/json');
        res.end(view.renderStudent(newStudent));
    } catch (error) {
        res.end(JSON.stringify({ message: 'Invalid data' }));
    }
}
async function updateStudent(req, res) {
    try {
        const body = await parseBody(req);
        const studentId = parseInt(req.params.studentId);
        const isUpdated = model.updateStudent(studentId, body.newName);

        if (isUpdated) {
            const student = model.findStudentById(studentId);
            res.setHeader('Content-Type', 'application/json');
            res.end(view.renderStudent(student));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Student not found!' }));
        }
    } catch (error) {
        res.writeHead(400);  // Thêm mã trạng thái lỗi
        res.end(JSON.stringify({ message: 'Invalid data' }));
    }
}

function deleteStudent(req, res) {
    try {
        const studentId = parseInt(req.params.studentId);
        const student = model.deleteStudent(studentId);

        if (student) {
            res.setHeader('Content-Type', 'application/json');
            const allStudents = model.getAllStudents();
            res.end(view.renderStudents(allStudents));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Student not found!' }));
        }
    } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: 'Invalid request data' }));
    }
}


module.exports = {getAllStudents, createStudent, deleteStudent, getStudentById, updateStudent};