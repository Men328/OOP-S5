"use strict";
class Person {
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }
    getName() {
        return (this._name);
    }
}
class Employee extends Person {
    constructor(role) {
        super(1, "men");
        this._role = role;
    }
    getRole() {
        return (this._role);
    }
}
class Manager extends Employee {
    constructor(department) {
        super("staff");
        this._department = department;
    }
    getDepartment() {
        return (this._department);
    }
}
class Task {
    constructor(id, title, deadline, isCompleted = false) {
        this._id = id;
        this._deadline = deadline;
        this._isCompleted = isCompleted;
        this._title = title;
    }
    complete() {
    }
    getDetails() {
        return;
    }
}
class Assignment {
    constructor(employee, task) {
        this._employee = employee;
        this._task = task;
    }
    getAssignmentDetails() {
    }
}
class TaskManager {
    constructor() {
        this._asignments = [];
        this._employee = [];
        this._managers = [];
        this._tasks = [];
    }
    addEmployee(name, role) {
    }
    addManager(name, role, department) {
    }
    assignTask(employeeId, taskId) {
    }
    completeTask(taskId) {
    }
    listAssignments() {
    }
}
class Main {
}
