const studentController = require('./controllers/studentController');
function handleRoute(req, res) {
  const { method, url } = req;
  console.log(`Method: ${method}, URL: ${url}`);
  
  if(method === 'GET' && url === '/students') {
    studentController.getAllStudents(req, res);
  }else if (method === 'GET' && url.startsWith('/student/')) {
    const studentId = url.split('?studentId=')[1];
    req.params = { studentId };
    studentController.getStudentById(req, res);  
  } 
  else if (method === 'POST' && url === '/add-student') {
    studentController.createStudent(req, res);
  }else if (method === 'DELETE' && url.startsWith('/delete-student/')) {
    const studentId = url.split('?studentId=')[1];
    req.params = { studentId };
    studentController.deleteStudent(req, res);
  }else if(method === 'POST' && url.startsWith('/update-student/')){
    const studentId = url.split('?studentId=')[1];
    req.params = { studentId };
    studentController.updateStudent(req, res);
  }else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found!' }));
  }
}


module.exports = handleRoute;
  