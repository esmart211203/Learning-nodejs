function renderStudents(students){
    return JSON.stringify(students, null, 2);
}
function renderStudent(student){
    return JSON.stringify(student, null, 2);
}
function render404(){
    return JSON.stringify({message: 'Route not found!'});
}

module.exports = {renderStudents, renderStudent, render404};