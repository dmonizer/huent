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

    test('this.createFluentSetterGetter returns itself no matter how many times its called', () => {
        const hf = new Huent('p');
        
        expect(hf.createFluentSetterGetter("test"))
            .toStrictEqual(hf.createFluentSetterGetter);
        
        expect(hf.createFluentSetterGetter("test")("test2")("test3"))
            .toStrictEqual(hf.createFluentSetterGetter);

    });

    test('incorrect setter (element P does not have "checked" property) should throw error, while for input, it should work', () => {
        const hfP = new Huent('p')
            .classes("testclass")
            .id("thisP");
        const hfInput = new Huent('input')
            .classes("testclass")
            .id("thisInput");
        
        expect(() => {
            hfInput.checked(true);
        }).not.toThrow();

        expect(hfInput.checked()).toStrictEqual(true);

        expect(() => {
            hfP.checked(true);
        }).toThrow();
    });
})
