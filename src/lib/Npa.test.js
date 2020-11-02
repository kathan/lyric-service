const Npa = require('./Npa.js')

describe("Npa tests", () => {
    it('', async () => {
        class MyNpa extends Npa{
            constructor(name){
                super(name)
                console.log('MyNpa Reflect.ownKeys', Reflect.ownKeys(this))
                console.log('MyNpa properties', this)
            }
        }
        const npa = new MyNpa('blah')
    })
})    