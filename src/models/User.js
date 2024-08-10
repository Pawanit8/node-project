const {Sequelize, DataTypes} = require("sequelize");

// Import sequelize object, 
// Database connection pool managed by Sequelize.
const sequelize = require('../database/db')
  
// Define method takes two arguments
// 1st - name of table
// 2nd - columns inside the table
const User = sequelize.define('user', {
    // Column-1, user_id is an object with 
    // properties like type, keys, 
    // validation of column.
    id:{
  
        // Sequelize module has INTEGER Data_Type.
        type:Sequelize.INTEGER,
  
        // To increment user_id automatically.
        autoIncrement:true,
  
        // user_id can not be null.
        allowNull:false,
  
        // For uniquely identify user.
        primaryKey:true
    },
  
    // Column-2, name
    name: { type: Sequelize.STRING, allowNull:false },
  
    // Column-3, email
    email: { type: Sequelize.STRING, allowNull:false },
        // Column-3, email
    address: { type: Sequelize.STRING, allowNull:true },
  
     // Timestamps
     createdAt: Sequelize.DATE,
     updatedAt: Sequelize.DATE,
})
  
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
module.exports = User

sequelize.sync().then(() => {
    console.log('Book table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });