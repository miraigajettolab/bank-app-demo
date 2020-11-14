use Clinic

--1
Select Reception.Date,Staff.Name, Reception.isFinished from Reception
join Staff
on Staff.idStaff = Reception.idStaff
where Reception.isFinished = 'Завершен' 
--2
Select Staff.Name, Treatment.idTreatment,Treatment.Name, Treatment.Complaints,Treatment.Diagnosis from Staff
join Treatment
on Staff.idStaff = Treatment.idStaff
--where Staff.idStaff = '2'
Group by Staff.Name, Treatment.idTreatment,Treatment.Name,  Treatment.Complaints,Treatment.Diagnosis
--3
Select Patient.Name, Treatment.Diagnosis, Treatment.isFinished from Patient
join Treatment
on Patient.idPatient = Treatment.idPatient
where Treatment.isFinished = 'Завершен'
--4
Select Distinct Staff.Name, Patient.Name from Staff
join Treatment
on Staff.idStaff = Treatment.idStaff
join Patient
on Patient.idPatient = Treatment.idPatient
--where Staff.idStaff = '3'
--5
Select Patient.Name, Reception.idReception, Reception.Date from Patient
join Reception
on Patient.idPatient = Reception.idPatient
where Reception.isFinished = 'Завершен' --and Patient.idPatient = '1'
--6
--Select Treatment.Diagnosis,Patient.idPatient,(Treatment.Diagnosis) from Treatment
--join Patient
--on Treatment.idPatient = Patient.idPatient
--where exists(Select top (1) Treatment.Diagnosis, count(*) from Treatment
--group by Treatment.Diagnosis
--order by 2 desc)

Select top (10) Treatment.Complaints, count(*),Patient.Name from Treatment 
join Patient
on Patient.idPatient = Treatment.idPatient
group by Treatment.Complaints,Patient.Name
order by 2 desc
--7
Select top (10) Treatment.Diagnosis, count(*),Patient.Name from Treatment 
join Patient
on Patient.idPatient = Treatment.idPatient
where Treatment.DateOfAppoint >= '2020-09-01' and Treatment.DateOfAppoint <= '2020-11-30'
group by Treatment.Diagnosis,Patient.Name
order by 2 desc
Select top (10) Treatment.Diagnosis, count(*),Patient.Name from Treatment 
join Patient
on Patient.idPatient = Treatment.idPatient
where Treatment.DateOfAppoint >= '2019-12-01' and Treatment.DateOfAppoint <= '2020-02-28'
group by Treatment.Diagnosis,Patient.Name
order by 2 desc
Select top (10) Treatment.Diagnosis, count(*),Patient.Name from Treatment 
join Patient
on Patient.idPatient = Treatment.idPatient
where Treatment.DateOfAppoint >= '2020-03-01' and Treatment.DateOfAppoint <= '2020-05-31'
group by Treatment.Diagnosis,Patient.Name
order by 2 desc
Select top (10) Treatment.Diagnosis, count(*),Patient.Name from Treatment 
join Patient
on Patient.idPatient = Treatment.idPatient
where Treatment.DateOfAppoint >= '2020-06-01' and Treatment.DateOfAppoint <= '2020-08-31'
group by Treatment.Diagnosis,Patient.Name
order by 2 desc
--8
Select top(10) Staff.Name,count(*) from Staff
join Treatment
on Staff.idStaff = Treatment.idStaff where Treatment.isFinished = 'Завершен'
group by Staff.Name

Update Autentification
set login = 'PatientGod', password = 'fjhjyue'
from Patient as p1
where p1.idAutentification = Autentification.Autentification_id and p1.Passport = 'afajf12461'
--9
Select Patient.idPatient, Patient.Name, Treatment.DateOfAppoint from Patient
join Treatment
on Patient.idPatient = Treatment.idPatient
join Staff
on Staff.idStaff = Treatment.idStaff
where Treatment.isFinished = 'Завершен' and Staff.idStaff = '3'
--10
Select Distinct Patient.idPatient, Patient.Name from Patient
join Treatment
on Patient.idPatient = Treatment.idPatient
join Reception
on Patient.idPatient = Reception.idPatient
where Reception.isFinished = 'Завершен' and Treatment.isFinished = 'Нет'


Select Patient.idPatient, Treatment.Complaints,Treatment.Diagnosis from Patient
join Treatment
on Patient.idPatient = Treatment.idPatient
--where Treatment.isFinished = 'Завершен' or Treatment.isFinished = 'Нет'

Select Staff.idStaff, Staff.Name, Reception.Date,Reception.isFinished from Staff
join Reception
on Staff.idStaff = Reception.idStaff

Select Patient.idPatient, Patient.Name, Patient.Phone, Patient.Passport from Patient

Update Autentification
set login = 'PatientGod', password = 'fjhjyue'
from Patient as p1
where p1.idAutentification = Autentification.Autentification_id and p1.Passport = 'afajf12461'

Select *  from vwPatientInformation