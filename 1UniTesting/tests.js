/* eslint-disable no-undef */

let assert = require('chai').assert;
let expect = require('chai').expect;


//    1. Even or Odd
function isOddOrEven(string) {
    if (typeof (string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return 'even';
    }

    return 'odd';
}

//let assert =require('chai').assert;

describe('IsOddEven behavier', () => {

    it('Check for undefine', () => {
        let result = isOddOrEven(13);
        assert.equal(result, undefined, 'The result shuld be undefined');
    });


    it('Check for even', () => {
        let result = isOddOrEven('aa');
        assert.equal(result, 'even', 'Shuld be even');
    });

    it('Check for odd', () => {
        let result = isOddOrEven('aaa');
        assert.equal(result, 'odd', 'Shuld be odd');
    });
});



//    2. Char Lookup
function lookupChar(string, index) {
    if (typeof (string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

describe('LookupChar behavier', () => {

    it('Happy path', () => {
        expect(lookupChar('aaa', 1)).to.equal('a');
    });

    it('Check for undefined ,null', () => {
        expect(lookupChar(null, 0)).to.equal(undefined);
    });

    it('Check for undefined, index is correct', () => {
        expect(lookupChar('aaa', 3.5)).to.equal(undefined);
    });

    it('Check for index in range (not bigger)', () => {
        expect(lookupChar('aaa', 5)).to.equal("Incorrect index");
    });

    it('Check for index in range (not negativ)', () => {
        expect(lookupChar('aaa', -1)).to.equal("Incorrect index");
    });
});


//    3. Math Enforcer
let mathEnforcer = {
    addFive: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof (num1) !== 'number' || typeof (num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};


describe('mathEnforcer', function () {
    describe('addFive', function () {
        it('shuld return correct result with a non-number parameter', () => {
            expect(mathEnforcer.addFive('aaa')).to.equal(undefined);
        });
        it('shuld return correct result with a number parameter', () => {
            expect(mathEnforcer.addFive(5)).to.equal(10);
        });
        it('shuld return correct result with a number parameter', () => {
            expect(mathEnforcer.addFive(-5)).to.equal(0);
        });
        it('shuld return correct result with a number parameter', () => {
            assert.closeTo(mathEnforcer.addFive(-5.555), -0.555, 0.01, 'Shuld be - 0.555');
        });

    });

    describe('subtractTen', () => {
        it('shuld return correct result with a non-number parameter', () => {
            assert.equal(mathEnforcer.subtractTen('aa'), undefined, 'Shuld be number');
        });
        it('shuld return correct result with a number parameter', () => {
            assert.equal(mathEnforcer.subtractTen(15), 5, 'Shuld be 5');
        });
        it('shuld return correct result with a number parameter', () => {
            assert.equal(mathEnforcer.subtractTen(-5), -15, 'Shuld be -15');
        });
        it('shuld return correct result with a number parameter', () => {
            assert.closeTo(mathEnforcer.subtractTen(-5.555), -15.555, 0.01, 'Shuld be - 15.555');
        });
    });

    describe('sum', () => {
        it('shuld return correct result with a non-number 1 parameter', () => {
            assert.equal(mathEnforcer.sum('aa', 5), undefined, 'Shuld be number');
        });
        it('shuld return correct result with a non-number 2 parameter', () => {
            assert.equal(mathEnforcer.sum(5, 'aa'), undefined, 'Shuld be number');
        });
        it('shuld return correct result with a number parameter', () => {
            assert.equal(mathEnforcer.sum(5, 5), 10, 'Shuld be 10');
        });
        it('shuld return correct result with a number parameter', () => {
            assert.equal(mathEnforcer.sum(5, -5), 0, 'Shuld be 0');
        });
        it('shuld return correct result with a number parameter', () => {
            assert.closeTo(mathEnforcer.sum(5, -5.55), -0.55, 0.01, 'Shuld be -0.55');
        });
        it('shuld return correct result with a number parameter', () => {
            assert.closeTo(mathEnforcer.sum(-5.55, 5), -0.55, 0.01, 'Shuld be -0.55');
        });
    });

});


//    5. String Builder

class StringBuilder {
    constructor(string) {
        if (string !== undefined) {
            StringBuilder._vrfyParam(string);
            this._stringArray = Array.from(string);
        } else {
            this._stringArray = [];
        }
    }

    append(string) {
        StringBuilder._vrfyParam(string);
        for (let i = 0; i < string.length; i++) {
            this._stringArray.push(string[i]);
        }
    }

    prepend(string) {
        StringBuilder._vrfyParam(string);
        for (let i = string.length - 1; i >= 0; i--) {
            this._stringArray.unshift(string[i]);
        }
    }

    insertAt(string, startIndex) {
        StringBuilder._vrfyParam(string);
        this._stringArray.splice(startIndex, 0, ...string);
    }

    remove(startIndex, length) {
        this._stringArray.splice(startIndex, length);
    }

    static _vrfyParam(param) {
        if (typeof param !== 'string') throw new TypeError('Argument must be string');
    }

    toString() {
        return this._stringArray.join('');
    }
}

describe('StringBuilder Tests', () => {
    let stringBuilder = new StringBuilder('hello');

    it('Constructor work corectly with not a string', () => {
        const testStr = stringBuilder.toString();
        const expLength = 5;
        assert.equal(testStr.length, expLength, 'Shuld be <hello>');
    });

    it('Constructor work corectly with a string', () => {
        const testStr = stringBuilder.toString();
        const expStr = 'hello';
        assert.equal(testStr.length, expStr.length, 'Shuld be <hello>');
    });

    it('Test with empty parameter', function () {
        const testStr = new StringBuilder('').toString();
        const expStr = '';
        assert.equal(testStr.length, expStr.length, 'Shuld be space');
    });

    it('Function APPEND work correctly', () => {
        stringBuilder.append(', there');
        const testStr = stringBuilder.toString();
        const expStr = 'hello, there';
        assert.equal(testStr, expStr, 'Shuld be <hello, there>');
    });

    it('Function APPEND work correctly with not a string', () => {

        expect(() => stringBuilder.append(-1)).to.throw();
    });

    it('Function PREPEND work correctly', () => {
        stringBuilder.prepend('User, ');
        const testStr = stringBuilder.toString();
        const expStr = 'User, hello, there';
        assert.equal(testStr, expStr, 'Shuld be <User, hello, there>');
    });

    it('Function PREPEND work correctly with not a string', () => {

        expect(() => stringBuilder.prepend(-1)).to.throw();
    });


    it('Function insertAt', () => {
        const str = new StringBuilder('hello');
        str.insertAt('l', 4);
        const testStr = str.toString();
        const expStr = 'helllo';
        assert.equal(testStr, expStr, 'Shuld be <helllo>');
    });

    it('Function remove', () => {
        const str = new StringBuilder('hello');
        str.remove(3, 2);
        const testStr = str.toString();
        const expStr = 'hel';
        assert.equal(testStr, expStr, 'Shuld be <hel>');
    });


});




//    6. Payment Package

class PaymentPackage {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.VAT = 20; // Default value    
        this.active = true; // Default value
    }

    get name() {
        return this._name;
    }

    set name(newValue) {
        if (typeof newValue !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        if (newValue.length === 0) {
            throw new Error('Name must be a non-empty string');
        }
        this._name = newValue;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('Value must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('Value must be a non-negative number');
        }
        this._value = newValue;
    }

    get VAT() {
        return this._VAT;
    }

    set VAT(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('VAT must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('VAT must be a non-negative number');
        }
        this._VAT = newValue;
    }

    get active() {
        return this._active;
    }

    set active(newValue) {
        if (typeof newValue !== 'boolean') {
            throw new Error('Active status must be a boolean');
        }
        this._active = newValue;
    }

    toString() {
        const output = [
            `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
            `- Value (excl. VAT): ${this.value}`,
            `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
        ];
        return output.join('\n');
    }
}


describe('PaymentPackage', () => {
    describe('Test name', () => {
        it("'' => Error", () => {
            expect(() => new PaymentPackage('', 1)).to.Throw('Name must be a non-empty string');
        });
        it('test => test', () => {
            let newObj = new PaymentPackage('test', 1);
            expect(newObj.name).to.equal('test');
        });
    });

    describe('Test value', () => {
        
        it('-1 => Error', () => {
            expect(() => new PaymentPackage('a', -1)).to.Throw('Value must be a non-negative number');
        });

        it('1 => 1', () => {
            let newObj = new PaymentPackage('a', 1);
            expect(newObj.value).to.equal(1);
        });
    });

    describe('Test VAT', () => {
        it("'' => 20", () => {
            let newObj = new PaymentPackage('a', 1);
            expect(newObj.VAT).to.equal(20);
        });       

        it('-1 => Error', () => {
            let newObj = new PaymentPackage('a', 1);
            expect(() => newObj.VAT = -1).to.Throw('VAT must be a non-negative number');
        });

        it('1 => 1', () => {
            let newObj = new PaymentPackage('a', 1);
            expect(newObj.VAT = 1).to.equal(1);
        });
    });
    describe('Test active', () => {
        it("'' => true", () => {
            let newObj = new PaymentPackage('a', 1);
            expect(newObj.active).to.equal(true);
        });

        it('test => Error', () => {
            let newObj = new PaymentPackage('a', 1);
            expect(() => newObj.active = 'test').to.Throw('Active status must be a boolean');
        });

        it('false => false', () => {
            let newObj = new PaymentPackage('a', 1);
            expect(newObj.active = false).to.equal(false);
        });
    });
    describe('Test toString', () => {
        it('test toString', () => {
            let newObj = new PaymentPackage('HR Services', 1500);
            expect(newObj.toString()).to.equal('Package: HR Services\n- Value (excl. VAT): 1500\n- Value (VAT 20%): 1800');
        });

        it('test toString', () => {
            let newObj = new PaymentPackage('HR Services', 1500);
            newObj.active = false;
            expect(newObj.toString()).to.equal('Package: HR Services (inactive)\n- Value (excl. VAT): 1500\n- Value (VAT 20%): 1800');
        });

        it('test toString', () => {
            let newObj = new PaymentPackage('HR Services', 1500);
            newObj.VAT = 0;
            expect(newObj.toString()).to.equal('Package: HR Services\n- Value (excl. VAT): 1500\n- Value (VAT 0%): 1500');
        });

        it('test toString', () => {
            let newObj = new PaymentPackage('HR Services', 0);
            newObj.VAT = 0;
            expect(newObj.toString()).to.equal('Package: HR Services\n- Value (excl. VAT): 0\n- Value (VAT 0%): 0');
        });
    });
});