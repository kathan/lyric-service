module.exports = class Npa {
    name = "";
    
    constructor(name) {
        this.name = name;
        this.createEtters()
    }

    createEtters() {
        console.log('Npa Reflect.ownKeys', Reflect.ownKeys(this))
        console.log('Npa properties', this)
        console.log('this.constructor.name', this.constructor.name)
    }
}