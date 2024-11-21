'use strict';
class Patient{
    constructor(name) {
        this.name = name;
    }
}

class CovidPositive extends Patient{
    constructor(name,datum,pol,vozrast,region,simpomi=false,respiratoren=false,dijabetis=false,result=false) {
        super(name)
        this.result=result;
        this.datum=datum;
        this.pol=pol;
        this.vozrast=vozrast;
        this.simpomi=simpomi;
        this.respiratoren=respiratoren;
        this.dijabetis=dijabetis;
        this.region = region;

    }

    risk(){
        if (this.simpomi && this.dijabetis && this.respiratoren ){
            if (this.vozrast > 75){
                console.log(`Patient ${this.id} ${this.name} is with high risk`)
            }else if (this.vozrast > 50 && this.pol==='male'){
                console.log(`Patient ${this.id} ${this.name} is with avarage risk`)
            }
        }else if (!this.simpomi && this.dijabetis && this.respiratoren){
            console.log(`Patient ${this.id} ${this.name} is with high risk`)
        }else if (this.simpomi && this.dijabetis || this.respiratoren){
            console.log(`Patient ${this.id} ${this.name} is with avarage risk`)
        }else if (this.simpomi && !this.dijabetis && !this.respiratoren){
            console.log(`Patient ${this.id} ${this.name} is with low risk`)
        }else if (!this.simpomi && this.dijabetis && this.respiratoren){
            console.log(`Patient ${this.id} ${this.name} is with low risk (resistant of covid)`)
        }
    }
    toString(){
        console.log(`Patient ${this.id} ${this.name}  ${this.result ? "is positive" : "is negative"}`)
    }

}

class EHospital{
    constructor(){
        this.pacienti =[];
    }
    add_patient(patient){
        this.pacienti.push(patient);
    }
    test_patient(obj)
    {
        var date1 = obj.data;
        var date2 = Date.now();
        var diffTime = Math.abs(date1 - date2);
        var diffDate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDate = 15){
            obj.result = false
        }
    }
    check(){
        for (let p of this.pacienti){
            this.test_patient(p);
            p.risk()
        }
    }
    safe_zone(opstina){
        let count  = 0
        this.pacienti.forEach(patient => {
            if (patient.region === opstina){
                count++
            }

        })
        let percentage = (count / (this.pacienti.length) * 100)
        console.log(`You are in ${percentage.toFixed(2)}% safe zone `)
    }

    print(){
        this.pacienti.forEach(patient => {
            console.log(patient)
        })
    }
}

var hospital = new EHospital();
var a = new CovidPositive("Dejan", new Date(2020,10,17), "male", "50", "Aerodrom", true, true, true);
var b = new CovidPositive("Dejan1", new Date(2020,10,17), "male", "75", "Aerodrom", true, true, true);
var c = new CovidPositive("Dejan2", new Date(2020,11,20), "male", "50", "Dracevo", true, true, true);
var d = new CovidPositive("Dejan3", new Date(2020,11,20), "male", "25", "Aerodrom", false, false, false);
var e = new CovidPositive("Dejan4", new Date(2020,11,9), "male", "50", "Aerodrom", true, false, true);
var f = new CovidPositive("Dejan5", new Date(2020,11,20), "male", "59", "Aerodrom", false, false, false);


hospital.add_patient(a);
hospital.add_patient(b);
hospital.add_patient(c);
hospital.add_patient(d);
hospital.add_patient(e);
hospital.add_patient(f);

hospital.check();
console.log();
hospital.print();
console.log();

hospital.safe_zone("Aerodrom");