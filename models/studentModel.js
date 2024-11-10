const { connectDB } = require('../db/database');

class StudentModel {
    constructor() { this.init(); }
    async init() {
         this.db = await connectDB(); 
         this.collection = this.db.collection('students');
         console.log("StudentModel connecting successfully!");
         // Thêm default nếu db trống hihi
        const defaultStudent = { name: "Do Xuan Trong", age: 21, city: "Go Vap" };
        const existing = await this.collection.findOne({ name: "Do Xuan Trong" });

        if (!existing) { 
            await this.collection.insertOne(defaultStudent);
            console.log("Default student added!"); 
        }
    }
    async findAll() {
        try {
            const db = await connectDB();
            const collection = db.collection('students');
            const students = await collection.find({}).toArray();
            return { success: true,  student: students };
        } catch (error) {
            console.error('Error fetching students:', error);
            throw error;
        }
    }
    
    async findStudentById(studentId) {
        const db = await connectDB();
        const collection = db.collection('students');
        try {
            const ObjectId = require('mongodb').ObjectId;
            if (!ObjectId.isValid(studentId)) {
                console.error('Invalid ID format');
                return null;
            }
            const student = await collection.findOne({ _id: new ObjectId(studentId) });
            if (!student) {
                console.log('Student not found');
            }
            return student;
        } catch (error) {
            console.error('Error finding student by ID:', error);
            return null;
        }
    }
    async createStudent(name, age, city) {
        try {
            const db = await connectDB();
            const collection = db.collection('students');
            const result = await collection.insertOne({ name, age, city });
            
            if (!result.acknowledged) {
                console.log("Failed to insert student");
                return null;
            }
            console.log(result);
            console.log('Student added successfully:', result);
            return result;
        } catch (error) {
            console.error('Error adding student:', error);
            throw error; // Rethrow the error for higher-level handling
        }
    }
    async deleteStudentById(studentId) {
        try {
            // Step 1: Connect to the DB
            const db = await connectDB();
            const collection = db.collection('students');
    
            // Step 2: Validate and parse student ID
            const ObjectId = require('mongodb').ObjectId;
            if (!ObjectId.isValid(studentId)) {
                console.error('Invalid ID format');
                return { success: false, message: 'Invalid ID format' }; // Return result with message        
            }
    
            // Step 3: Attempt to delete the student
            const result = await collection.deleteOne({ _id: new ObjectId(studentId) });
            if (result.deletedCount === 0) {
                console.log('Student not found');
                return { success: false, message: 'Student not found' };
            }
    
            // Return success if deletion was successful
            return { success: true, message: 'Student successfully deleted' };
    
        } catch (error) {
            console.error('Error deleting student:', error);
            throw error; // Re-throw the error to be caught by the controller
        }
    }
    
    async updateStudentById(studentId, newName, newAge, newCity){
        try {
            // Step 1: Connect to the DB
            const db = await connectDB();
            const collection = db.collection('students');
    
            // Step 2: Validate and parse student ID
            const ObjectId = require('mongodb').ObjectId;
            if (!ObjectId.isValid(studentId)) {
                console.error('Invalid ID format');
                return { success: false, message: 'Invalid ID format' };   
            }
            // Step 3: update Student
            const result = await collection.updateOne(
                { _id: new ObjectId(studentId) },
                {$set: {name: newName, age: newAge, city: newCity}}
            );
            if (result.modifiedCount === 0) {
                return { success: false, message: 'Student not found' }; 
            }
            return { success: true, message: 'Student successfully updated' };
        } catch (error) {
            console.error('Error deleting student:', error);
            throw error; // Re-throw the error to be caught by the controller
        }
    }
    
    
}

function updateStudent(studentId, newName){
    const student = StudentItems.find(student => student.id === studentId) || null;
    if(student){
        student.name = newName;
        return true;
    }
    return false;
}
module.exports = new StudentModel();