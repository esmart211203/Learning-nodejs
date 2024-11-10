const model = require('../models/studentModel');
const view = require('../views/index');
const StudentModel = require('../models/studentModel');
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
class StudentController {
    getAllStudents = async (req, res) => {
        try {
            const allStudents = await StudentModel.findAll();
            res.setHeader('Content-Type', 'application/json');
            res.end(view.renderStudents(allStudents));
        } catch (error) {
            res.statusCode = 500; 
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
    }
      
    getStudentById = async (req, res) => {
        try { 
            const studentId = req.params.studentId; 
            const student = await StudentModel.findStudentById(studentId); 
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
    };

    createStudent = async (req, res) => {
        try {
            const body = await parseBody(req);
            console.log(body);
            const newStudent = await StudentModel.createStudent(body.name, body.age, body.city);
            
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 201; 
            res.end(view.renderStudent(newStudent));
        } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: 'Invalid data' }));
        }
    };
    
    deleteStudentById = async (req, res) => {
        try {
            const studentId = req.params.studentId; 
            const result = await StudentModel.deleteStudentById(studentId); 
            if (result.success) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({ message: result.message }));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ message: result.message }));
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            res.statusCode = 500; 
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
    };

    updateStudentById = async(req, res) =>{
        try {
            const body = await parseBody(req);
            const studentId = req.params.studentId; 
            const result = await StudentModel.updateStudentById(studentId, body.newName, body.newAge, body.newCity);
            if (result.success) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({ message: result.message }));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ message: result.message }));
            } 
        } catch (error) {
            res.statusCode = 500; 
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
    }
}

module.exports = new StudentController();