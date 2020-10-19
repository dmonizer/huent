const Huent = require('../src/huent');
describe('Huent ...', () => {
    test('should return correct element', () => {
        const hf = new Huent('p').classes("test").done();
        const expectedResult = document.createElement('p');
        expectedResult.classList.add('test');

        expect(hf).toStrictEqual(expectedResult)
    });


    test('has at least some required setters-getters', () => {
        const functionType = typeof function () { };

        const hf = new Huent('p');

        expect(typeof hf.name).toStrictEqual(functionType);
        expect(typeof hf.id).toStrictEqual(functionType);
        expect(typeof hf.href).toStrictEqual(functionType);
        expect(typeof hf.type).toStrictEqual(functionType);
        expect(typeof hf.src).toStrictEqual(functionType);
    });

    test('setters return object itself', () => {
        const hf = new Huent('p');

        expect(hf.id("name")).toStrictEqual(hf);
    });

    test('setters sets correct property', () => {
        const testName = "nameForTesting";

        const hf = new Huent('p');
        hf.id(testName);

        expect(hf.id()).toStrictEqual(testName);
    });

    test('test dataset', () => {
        const testData = {"testName" : "testValue"}

        const hf = new Huent('p');
        hf.dataset(testData);
        expect(JSON.stringify(hf.dataset())).toStrictEqual(JSON.stringify(testData));
    });

    

    test('test all setters set and getters get', () => {
        const returnsBoolean = ["hidden", "draggable"]
        const testValue = "valueForTesting";
        const hf = Huent.create('p');
        for (i in HTMLElement.prototype) {
            if (HTMLElement.prototype.hasOwnProperty(i) && !(hf.getNotImplemented().includes(i))) {
                console.log(i)
                if (returnsBoolean.includes(i)) {
                    hf[i](false);
                    expect(hf[i]()).toStrictEqual(false);
                } else if (hf.getReadonlyProperties().includes(i)){
                    /*const returnValue = hf[i]()
                    console.log("!!!!!!!!!!!!!!!!"+returnValue)
                    expect(returnValue).toBe(true).or().toBe(false);*/
                } else{               
                    hf[i](i);
                    expect(hf[i]()).toStrictEqual(i);
                }
            }
        }        
    });
    
    test('this.createFluentSetterGetter returns itself no matter how many times its called', () => {
        const hf = new Huent('p');
        expect(hf.createFluentSetterGetter("test")).toStrictEqual(hf.createFluentSetterGetter);
        expect(hf.createFluentSetterGetter("test1")("test2")("test3")).toStrictEqual(hf.createFluentSetterGetter);

    });

   /* test("special cases", () => {
        const hf = new Huent('p');
        const testValue = "testValue";
        hf.getSpecialCases().map((property)=>{
            expect(hf[property](testValue)).toStrictEqual(hf[property])
            expect(hf[property]()).toStrictEqual(testValue);
        })
    });
*/
    test('incorrect setter (element P does not have "checked" property) should throw error, while for input, it should work', () => {
        const hfP = new Huent('p').classes("testclass").id("thisP");
        const hfInput = new Huent('input').classes("testclass").id("thisInput");
        expect(() => {
            hfInput.checked(true);
        }).not.toThrow();

        expect(hfInput.checked()).toStrictEqual(true);

        expect(() => {
            hfP.checked(true);
        }).toThrow();
    });
})
