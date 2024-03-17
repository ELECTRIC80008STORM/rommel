const usersInformation = [];

module.exports = class User {

    constructor(name, email, age, gender){
        this.name = name;
        this.email = email;
        this.age = age;
        this.gender = gender;
    }

    save(){
        usersInformation.push({
            name: this.name,
            email: this.email,
            age: this.age,
            gender: this.gender,
        })
    }

    static fetchAll(){
        return usersInformation;
    }
}