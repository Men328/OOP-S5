"use strict";
class Person {
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }
    getName() {
        console.log(this._name);
    }
}
class Member extends Person {
    constructor(membershipType) {
        super(1, "Men");
        this._membershipType = membershipType;
    }
    getMembershipType() {
        console.log(this._membershipType);
    }
}
class Librarian extends Person {
    constructor(position) {
        super(2, "mal");
        this._position = position;
    }
    getPosition() {
        console.log(this._position);
    }
}
class CD {
    constructor(id, title, artist, isBorrowed) {
        this._id = id;
        this._artist = artist;
        this._title = title;
        this._isBorrowed = isBorrowed;
    }
    borrow() {
    }
    returnCD() {
    }
    getDetails() {
    }
}
