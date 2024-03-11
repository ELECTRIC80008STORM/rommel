const usersInformation = [];

module.exports = class User {

    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    save(){
        usersInformation.push({
            name: this.name,
            age: this.age,
            gender: this.gender,
        })
    }

    static fetchAll(){
        return usersInformation;
    }
}