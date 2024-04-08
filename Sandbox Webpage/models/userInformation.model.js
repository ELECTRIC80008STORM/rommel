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

    // Stores the new user in the database, along with its encrypted password
    save(){
        return bcrypt.hash(this.password, 12)
        .then((encrypted_password) => {
            return db.execute('call createNewUser(?, ?, ?, ?, ?, ?)', [this.username, this.name, encrypted_password, this.email, this.age, this.gender])
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

    // It would be better to overload the static function in regard of the parameters it receives
    static update(username, name, password, email, age, gender){
        return db.execute(`call updateUserInformation(?, ?, ?, ?, ?, ?)`, [username, name, password, email, age, gender]);
    }

    static getPrivileges(username) {
        return db.execute(`
            select pr.permission
            from user u
            join assigns a on u.username = a.username
            join role r on a.idrole = r.id
            join has h on r.id = h.idrole
            join privilege pr on h.idprivilege = pr.id
            where u.username = ?
        `, [username]);
    }

}