// src/api/service.js

import axios from "axios";

const service = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005",
  // withCredentials: true // => you might need this when having the users in the app
});

const errorHandler = (err) => {
  throw err;
};

const getDoctors = () => {
  return service
    .get("/doctors")
    .then((res) => res.data)
    .catch(errorHandler);
};

const createDoctors = (newDoctor) => {
  console.log("new doctor in service: ", newDoctor)
  return service
    .post("/doctors/add-doctor", newDoctor)
    .then((res) => res.data)
    .catch(errorHandler);
};

const getPatients = () => {
  return service
    .get("/patients")
    .then((res) => res.data)
    .catch(errorHandler);
};

const createPatients = (newPatient) => {
  console.log("new patient in the database: ", newPatient)
  return service
    .post("/patients/add-patient", newPatient)
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  return service
    .post("/upload", file)
    .then((res) => res.data)
    .catch(errorHandler);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  service,
  getDoctors,
  createDoctors,
  getPatients,
  createPatients,
  uploadImage,
};