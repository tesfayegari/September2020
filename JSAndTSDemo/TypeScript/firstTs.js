var Student = /** @class */ (function () {
    function Student(fName, phone, dob) {
        this.fullName = fName;
        this.phone = phone;
        this.DOB = new Date(dob);
    }
    Student.prototype.sayName = function () {
        console.log('My Name is ' + this.fullName);
    };
    return Student;
}());
var mesi = new Student('Meselech Eba', '555-333-6543', '4/4/2000');
mesi.sayName();
