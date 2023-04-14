
# Health Admin

## Description

​Platform linking patients with doctors, and helping them make and change appointments

## Features

* Signup as a new user
* Log in as Admin and create, edit and delete Doctors, Patients, and Appointments
* Login as Patient and add/change your username, email, photo, date of birth, gender, and blood type
* Login as Doctor and add/change your username, email, photo, price, department, and gender
* Login as Patient or Doctor and view or edit your public profile
* Login as Patient and view the public profile of doctors with whom you have an appointment
* Login as Patient or Doctor and view and edit your Appointments
* Link to the home page which displays the number of doctors and patients currently in the system

## COMPONENTS: (in src/components)

* Footer.jsx - footer which appears on all pages
* isAnon.jsx - test to see if route is anonymous
* isPrivate.jsx - test to see if route is private
* Navbar.jsx - Navigation bar which appears on all pages, consisting of:
    * Logo and Home button
    * Signup and login (if not logged in).
    Otherwise
    * MyProfile button (Patient and Doctor only)
    * List of patients (Admin only)
    * List of doctors (Admin only)
    * Appointments for this patient / doctor / everyone (if logged in as Admin)
* ShowAppointment.jsx - display the information for an individual appointment
* ShowDoctor.jsx - display the information for an individual doctor
* ShowPatient.jsx - display the information for an individual patient

## CONTEXT (in src/context)

* auth.context.jsx - store the token used for user authentication

## IMAGES (in src/images)

* appointment.jsx - used on the page for an individual appointment
* doctor.png - default picture used when no photo has been specified for a doctor
* patient.png - default picture used when no photo has been specified for a patient

## APPOINTMENT PAGES (in src/pages/appointment)

* AddAppointment.jsx - add a new appointment
* AppointmentInfo.jsx - show the information for a single appointment
* AppointmentList.jsx - show a list of all appointments
* EditAppointment.jsx - edit a single appointment

## DOCTOR PAGES (in src/pages/doctor)

* AddDoctor.jsx - add a new doctor
* DoctorInfo.jsx - show the information for a single doctor
* DoctorList.jsx - show a list of all doctors
* EditDoctor.jsx - edit a single doctor

## PATIENT PAGES (in src/pages/patient)

* AddPatient.jsx - add a new patient
* EditPatient.jsx - edit a single patient
* PatientInfo.jsx - show the information for a single patient
* PatientList.jsx - show a list of all patients

## OTHER PAGES (in src/pages)

* Homepage.jsx - Home page with welcome message and number of Doctors and Patients in database
* LoginPage.jsx - Page used to login
* SignupPage.jsx - Page used to sign up a new user
​

* Miro https://miro.com/app/board/uXjVMcWdAuU=/
* Github https://github.com/philipbutland/health-admin-client
* Presentation https://docs.google.com/presentation/d/1DaUd0SUFgsfSXEORaM57-M0A0etiBNJMifn9MpsDFPo/edit#slide=id.p