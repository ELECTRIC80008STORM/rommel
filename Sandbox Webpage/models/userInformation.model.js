const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User {

    constructor(username, name, password, email, age, gender){
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.age = age;
        this.gender = gender;
    }

    save(){
        return bcrypt.hash(this.password, 12)
        .then((encrypted_password) => {
            return db.execute(`
            insert into user (username, name, password, email, age, gender)
            values (?, ?, ?, ?, ?, ?)
            `, [this.username, this.name, encrypted_password, this.email, this.age, this.gender]);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    static fetchAll(){
        return db.execute('select * from user');
    }

    static fetchOne(username){
        return db.execute('select * from user where username = ?', [username]);
    }

    static fetch(username) {
        if(username) {
            return this.fetchOne(username);
        } else {
            return this.fetchAll();
        }
    }

    static update(username, name, password, email, age, gender){
        return db.execute(`
            update user 
            set name = ?, password = ?, email = ?, age = ?, gender = ?
            where username = ?
        `, [name, password, email, age, gender, username]);
    }
}