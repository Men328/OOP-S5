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

    get name() {
        return this._name;
    }

    getName() {
        console.log(this._name);
    }
}

class Member extends Person{
    private _membershipType: string;

    constructor(id: number, name: string, membershipType: string) {
        // super(1, "Men");
        super(id, name);
        this._membershipType = membershipType;
    }

    get membershipType() {
        return this._membershipType;
    }

    getMembershipType() {
        console.log(this._membershipType);
    }
}

class Librarian extends Person {
    private _position: string;

    constructor(id: number, name: string, position: string) {
        // super(2, "mal");
        super(id, name);
        this._position = position;
    }

    get position() {
        return this._position;
    }

    getPosition() {
        console.log(this._position);
    }
}

class CD {
    private _id: number;
    private _title: string;
    private _artist: string;
    private _isBorrowed: boolean;

    constructor(id: number, title: string, artist: string, isBorrowed: boolean = false) {
        this._id = id;
        this._artist = artist;
        this._title = title;
        this._isBorrowed = isBorrowed;
    }

    get id() {
        return this._id;
    }

    borrow(): void {
        if(this._isBorrowed) {
            console.log("CD đã được mượn.");
        }
        this._isBorrowed = true;
    }

    returnCD() {
        if(!this._isBorrowed) {
            console.log("CD chưa được mượn.");
        }
        this._isBorrowed = false;
    }

    //lấy thông tin chi tiết của CD 
    getDetails(): string {
        return `Id: ${this._id}, Tên: ${this._title}, Nghệ sĩ: ${this._artist}, Trạng thái: ${this._isBorrowed}`
    }
}

class BorrowRecord {
    private _member: Member;
    private _cd: CD;

    constructor(member: Member, cd: CD) {
        this._cd = cd;
        this._member = member;
    }

    get member() {
        return this._member;
    }

    getRecordDetails(): string {
        return `Thành viên: ${this._member.getName()}, CD: ${this._cd.getDetails()}`
    }
}

class LibraryManager {
    private _members: Member[];
    private _librarians: Librarian[];
    private _cds: CD[];
    private borowRecords: BorrowRecord[];

    constructor() {
        this._members = [];
        this._librarians =[];
        this._cds = [];
        this.borowRecords = [];
    }

    //thêm thành viên mới
    addMember(name: string, membershipType: string): void {
        let id = Math.random();
        let newMember = new Member(id, name, membershipType);
        this._members.push(newMember);

    }
    //thêm thủ thư mới
    addLibrarian(name: string, position: string): void{
        let id = Math.random();
        let newLibrarian = new Librarian(id, name, position);
        this._librarians.push(newLibrarian);
    }

    //thêm CD mới vào thư viện
    addCD(title: string, artist: string): void {
        let id = Math.random();
        let newCD = new CD(id, title, artist);
        this._cds.push(newCD);
    }

    //cho thành viên mượn CD nếu CD còn có sẵn
    borrowCD(memberId: number, cdId: number): void {
        let member: Member | undefined = this._members.find(m => m.id === memberId);
        let cd = this._cds.find(c => c.id === cdId);
        if(!member || !cd) {
            console.log("Không tìm thấy thành viên hoặc CD.");
            return;
        }
        else if (cd['_isBorrowed']) {
            console.log("CD đã được mượn.");
            cd.borrow();
        }
        let newRecord = new BorrowRecord(member, cd);
        this.borowRecords.push(newRecord);
    }

    //Trả CD về thư viện
    returnCD(cdId: number): void {
        let cd: CD | undefined = this._cds.find(c => c.id === cdId);
        if(!cd) {
            throw new Error("Không tìm thấy CD.");
        }
        cd.returnCD();
    }

    //hiển thị danh sách bản ghi mượn CD
    listBorrowRecords(): void {
        this.borowRecords.forEach((record) => {
            console.log(record.getRecordDetails());
        });
    }
}

class Main {
    private _LibraryManager: LibraryManager;

    constructor() {
        this._LibraryManager = new LibraryManager;
    }

    run(): void {
        let loop: boolean = true;
        while (loop) {
            console.log("===QUẢN LÝ THƯ VIỆN===");

            console.log("1.Thêm thành viên");
            console.log("2.Thêm thủ thư");
            console.log("3.Thêm CD");
            console.log("4.Mượn CD");
            console.log("5.Trả CD");
            console.log("6.Hiển thị danh sách bản ghi mượn CD");
            console.log("7.Thoát");

            let choice = prompt ("Mời bạn nhập lựa chọn từ 1 đến 7 để điều khiển chương trình");

            switch (choice) {
                case "1":
                    let name: string | null = prompt("Tên thành viên: ");
                    let membershipType = prompt("Loại thẻ (VIP/Thường");
                    
                    if(name === null || membershipType === null) {
                        console.log("Thông tin không hợp lệ! Vui lòng nhập lại!");
                        break;
                    }

                    this._LibraryManager.addMember(name, membershipType);
                    console.log("Thành viên đã được thêm.");
                    break;
                
                case "2":
                    let libraryanName: string | null = prompt("Tên thủ thư: ");
                    let position: string | null = prompt("Vị trí: ");
                    
                    if(libraryanName === null || position === null) {
                        console.log("Thông tin không hợp lệ. Vui lòng nhập lại thông tin!");
                        break;
                    }

                    this._LibraryManager.addLibrarian(libraryanName, position);
                    console.log("Thủ thư đã được thêm");

                    break;

                case "3":
                    let cdTitle: string | null = prompt("tên CD: ");
                    let cdArtist: string | null = prompt("Nghệ sĩ: ");

                    if(cdArtist === null || cdTitle === null) {
                        console.log("Thông tin không hợp lệ. Vui lòng nhập lại thông tin!");
                        break;
                    }

                    this._LibraryManager.addCD(cdTitle, cdArtist);
                    console.log("CD đã được thêm");

                    break;
                
                case "4":
                    let memberId: number = parseInt(prompt("Mời nhập memberID") ?? "0");
                    let cdId: number = parseInt(prompt("Mời nhập ID CD: ") ?? "0");
                    if(isNaN(memberId || cdId) ){
                        console.log("Thông tin không hợp lệ. Vui lòng nhập một số nguyên.");
                        break;
                    }
                    this._LibraryManager.borrowCD(memberId, cdId);
                    console.log("CD đã được mượn.");
                    break;
            
                case "5":
                    let CD_id: number = parseInt(prompt("Vui lòng nhập ID CD: ") ?? "0");
                    if(isNaN(CD_id)){
                        console.log("Thông tin không hợp lệ, vui lòng nhập vào một số nguyên.");
                        break;
                    }
                    this._LibraryManager.returnCD(CD_id);
                    console.log("CD đã được trả");
                    break;
                
                case "6":
                    console.log("Danh sách bản ghi mượn CD:");
                    this._LibraryManager.listBorrowRecords();
                    break;

                case "7":
                    console.log("Cảm ơn và hẹn gặp lại");
                    return;

                default:
                    console.log("Lựa chọn không hợp lệ");
                    break;
            
            }
        }

    }
}

let app = new Main();
app.run();