const StudentController = require('../controllers/studentController');
function handleRoute(req, res) {
  const { method, url } = req;
  console.log(`Method: ${method}, URL: ${url}`);
    if(method === 'GET' && url === '/students') {
    StudentController.getAllStudents(req, res);
  }else if (method === 'GET' && url.startsWith('/student/')) {
    const studentId = url.split('?studentId=')[1];
    req.params = { studentId };
    StudentController.getStudentById(req, res);  
  } 
  else if (method === 'POST' && url === '/add-student') {
    StudentController.createStudent(req, res);
  }else if (method === 'DELETE' && url.startsWith('/delete-student/')) {
    const studentId = url.split('?studentId=')[1];
    req.params = { studentId };
    StudentController.deleteStudentById(req, res);
  }else if(method === 'POST' && url.startsWith('/update-student/')){
    const studentId = url.split('?studentId=')[1];
    req.params = { studentId };
    StudentController.updateStudentById(req, res);
  }else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found!' }));
  }
}
module.exports = handleRoute;
  