class Foo{
    constructor(){
        if(new.target == Foo){
            console.log(new.target);
        }
    }
}

describe('Instant test suit', ()=>{
    it('Abstraction test', ()=>{
        var bar = new Foo();
    });
});