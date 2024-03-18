const db = require('../util/database');

module.exports = class User {

    constructor(username, name, email, age, gender){
        this.username = username;
        this.name = name;
        this.email = email;
        this.age = age;
        this.gender = gender;
    }

    save(){
        return db.execute(`
        insert into user (username, name, email, age, gender)
        values (?, ?, ?, ?, ?)
        `, [this.username, this.name, this.email, this.age, this.gender]); 
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

    static update(username, name, email, age, gender){
        return db.execute(`
            update user 
            set name = ?, email = ?, age = ?, gender = ?
            where username = ?
        `, [name, email, age, gender, username]);
    }
}