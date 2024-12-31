class Person {
    private _id: number;
    private _name: string;

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    get id() {
        return this._id;
    }

    get name(){
        return this._name;
    }

    getName(): string {
        return(this._name);
    }
}

class Employee extends Person {
    private _role: string;

    constructor(id: number, name: string, role: string) {
        // super(1, "men");
        super(id, name);
        this._role = role;
    }

    getRole(): string {
        return(this._role);
    }
}

class Manager extends Employee {
    private _department: string;

    constructor(id: number, name: string, role: string, department: string) {
        // super("staff");
        super(id, name, role);
        this._department = department;
    }

    getDepartment(): string {
        return(this._department);
    }
}

class Task {
    private _id: number;
    private _title: string;
    private _deadline: Date;
    private _isCompleted: boolean;

    constructor(id: number, title: string, deadline: Date, isCompleted: boolean = false) {
        this._id = id;
        this._deadline = deadline;
        this._isCompleted = isCompleted;
        this._title = title;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    complete(): void {
        this._isCompleted = true;
    }

    getDetails(): string {
        return `ID: ${this._id}, Tên công việc: ${this._title}, Hạn hoàn thành: ${this._deadline}, Trạng thái hoàn thành: ${this._isCompleted}`;
    }
}

class Assignment {
    private _employee: Employee;
    private _task: Task;

    constructor(employee: Employee, task: Task) {
        this._employee = employee;
        this._task = task;
    }

    getAssignmentDetails(): string {
        return `Nhân viên được giao công việc: ${this._employee.getName()}, Công việc được phân công: ${this._task.getDetails()}`
    }
}

class TaskManager {
    private _employee: Employee[];
    private _managers: Manager[];
    private _tasks: Task[];
    private _assignments: Assignment[];

    constructor() {
        this._assignments = [];
        this._employee = [];
        this._managers = [];
        this._tasks = [];
    }

    addEmployee(name: string, role: string): void {
        let id = Math.random();
        let newEmployee = new Employee(id, name, role);
        this._employee.push(newEmployee);
    }

    addManager(name: string, role: string, department: string): void {
        let id = Math.random();
        let newManager = new Manager(id, name, role, department);
        this._managers.push(newManager);
    }

    addTask(title: string, deadline: string): void {
        let id = Math.random();
        let newTask = new Task(id, title, new Date(deadline));
        this._tasks.push(newTask);
    }

    //Phân công công việc cho nhân viên
    assignTask(employeeId: number, taskId: number): void {
        let employee = this._employee.find(ep => ep.id === employeeId);
        let task = this._tasks.find(tk => tk.id === taskId);
        if(!employee || !task) {
            console.log("Không tìm thấy nhân viên hoặc công việc.");
            return;
        }
        let newAssignment = new Assignment(employee, task);
        this._assignments.push(newAssignment);
        console.log(`Gán task ${task.title} cho nhân viên ${employee.name}`);
    }

    completeTask(taskId: number): void {
        let task: Task | undefined = this._tasks.find(t => t.id === taskId);
        if(!task) {
            throw console.error("Task không hợp lệ");
            return;
        }
        else{
            task.complete();
            console.log("Công việc đã hoàn thành");
        }
    }

    listAssignments(): void {
        if (this._assignments.length === 0) {
            console.log("Không có công việc nào được phân công.");
            return;
        }

        this._assignments.forEach(assignment => {
            console.log(assignment.getAssignmentDetails());
        });
    }
}

class Main {
    private _TaskManagers: TaskManager;

    constructor() {
        this._TaskManagers = new TaskManager;
    }

    run(): void {
        let loop: boolean = true;
        while (loop) {
        console.log("Chương trình bắt đầu");

        console.log("1.Thêm nhân viên mới");
        console.log("2.Thêm task mới");
        console.log("3.Gán task cho nhân viên");
        console.log("4.Đánh dấu task hoàn thành");
        console.log("5.Hiển thị danh sách task");
        console.log("6.Dừng chương trình");

        let choice = prompt("mời chọn");

        switch (choice) {
            case "1":
                let empName: string | null = prompt("Nhập tên nhân viên:");
                let role = prompt("nhập vai trò của nhân viên.")
                if (empName === null || role === null)  {
                    throw console.error("thông tin không hợp lệ. Vui lòng nhập lại.");
                } else {
                    this._TaskManagers.addEmployee(empName, role);
               }
                break;

            case "2":
                let taskTitle = prompt("Nhập tên task:");
                let deadline = prompt("Nhập hạn hoàn thành (YYYY-MM-DD):");
                if (taskTitle && deadline) {
                    this._TaskManagers.addTask(taskTitle, deadline);
                } else {
                    console.error("Thông tin task không hợp lệ.");
                }
                break;

            case "3":
                const empId = Number(prompt("Nhập ID nhân viên:"));
                const taskId = Number(prompt("Nhập ID task:"));
                this._TaskManagers.assignTask(empId, taskId);
                break;

            case "4":
                const completedTaskId = Number(prompt("Nhập ID task hoàn thành:"));
                this._TaskManagers.completeTask(completedTaskId);
                break;

            case "5":
                this._TaskManagers.listAssignments();
                break;

            case "6":
                console.log("Dừng chương trình.");
                loop = false;
                break;

            default:
                console.log("Lựa chọn không hợp lệ.");
                break;
        }
    }
    }
}

let app = new Main;
app.run;