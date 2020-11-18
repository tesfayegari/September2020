class Student {
  fullName: string;
  phone: string;
  DOB: Date;
  constructor(fName: string, phone: string, dob: string){
    this.fullName = fName;
    this.phone = phone;
    this.DOB = new Date(dob);
  }

  sayName() {
    console.log('My Name is ' + this.fullName);
  }
}

let mesi = new Student('Meselech Eba', '555-333-6543', '4/4/2000');
mesi.sayName();




