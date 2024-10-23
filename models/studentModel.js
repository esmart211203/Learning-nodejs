let StudentItems = [
    { id: 1, name: 'Đỗ Xuân Trọng' },
    { id: 2, name: 'Đậu Quốc Lợi' },
    { id: 3, name: 'Lâm Minh Quang' },
    { id: 4, name: 'Lê Phước Lộc' },
];

function getAllStudents(){
    return StudentItems;
}
function findStudentById(studentId) {
    return StudentItems.find(student => student.id === studentId) || null;
}
function createStudent(name){
    const newStudent = {
        id: StudentItems.length + 1,
        name: name,
    }
    StudentItems.push(newStudent);
    return newStudent;
}
function deleteStudent(studentId) {
    const index = StudentItems.findIndex(i => i.id === studentId);
    if (index !== -1) {
        return StudentItems.splice(index, 1)[0];
    }
    return false;
}
function updateStudent(studentId, newName){
    const student = StudentItems.find(student => student.id === studentId) || null;
    if(student){
        student.name = newName;
        return true;
    }
    return false;
}
module.exports = {getAllStudents, createStudent, deleteStudent, findStudentById, updateStudent};