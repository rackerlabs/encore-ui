'use strict';

import {expect} from 'chai';
import {rxLocalStorage} from '../index';

let demoPage = require('../../demo.page');

describe('utilities:rxLocalStorage', () => {
    before(() => {
        demoPage.go('#/utilities/rxLocalStorage');
    });

    it('should set and return a string', () => {
        let aString = 'hello world';

        rxLocalStorage.setItem('aString', aString);
        expect(rxLocalStorage.getItem('aString')).to.eventually.equal(aString);
    });

    it('should set and return an int', () => {
        let anInt = 42;

        rxLocalStorage.setItem('anInt', anInt);
        expect(rxLocalStorage.getItem('anInt')).to.eventually.equal(anInt);
    });

    it('should set and return a float', () => {
        let aFloat = 42.0000002;

        rxLocalStorage.setItem('aFloat', aFloat);
        expect(rxLocalStorage.getItem('aFloat')).to.eventually.equal(aFloat);
    });

    it('should set and return an array', () => {
        let anArray = [1, 'cat', 3];

        rxLocalStorage.setItem('anArray', anArray);
        expect(rxLocalStorage.getItem('anArray')).to.eventually.deep.equal(anArray);
    });

    it('should set and return an object', () => {
        let anObject = {
            foo: 'bar',
            life: 42,
        };

        rxLocalStorage.setItem('anObject', anObject);
        expect(rxLocalStorage.getItem('anObject')).to.eventually.deep.equal(anObject);
    });

    it('should set and return an array of objects', () => {
        let anArrayOfObjects = [
            {
                foo: {
                    bar: 1,
                    baz: 2,
                },
            },
            {
                fizz: {
                    buzz: 'fizzbuzz',
                },
            },
        ];

        rxLocalStorage.setItem('anArrayOfObjects', anArrayOfObjects);
        expect(rxLocalStorage.getItem('anArrayOfObjects')).to.eventually.deep.equal(anArrayOfObjects);
    });

    it('should remove something that has been set', () => {
        rxLocalStorage.setItem('something', 42);
        rxLocalStorage.removeItem('something');
        expect(rxLocalStorage.isPresent('something')).to.eventually.be.false;
    });

    it('should allow removing something that doesn\'t exist', () => {
        rxLocalStorage.removeItem('doesNotExist');
        expect(rxLocalStorage.isPresent('doesNotExist')).to.eventually.be.false;
    });

    it('should return true if key is present', () => {
        rxLocalStorage.setItem('cortana', 123);
        expect(rxLocalStorage.isPresent('cortana')).to.eventually.be.true;
    });

    it('should return false if a key does not exist', () => {
        expect(rxLocalStorage.isPresent('masterChief')).to.eventually.be.false;
    });

    it('should return null if getting a key that does not exist', () => {
        expect(rxLocalStorage.getItem('doesNotExist')).to.eventually.be.null;
    });

    it('should not return null if getting an item that is present', () => {
        expect(rxLocalStorage.isPresent('cortana')).to.eventually.not.be.null;
    });

});
