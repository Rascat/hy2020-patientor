"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getEntries = () => {
    return patients;
};
const getPublicEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const getPatientById = (id) => {
    return patients.find(patient => patient.id === id);
};
const addPatient = (newPatient) => {
    const patient = Object.assign({ id: uuid_1.v4() }, newPatient);
    patients.push(patient);
    return patient;
};
const addEntryToPatient = (id, newEntry) => {
    const entry = Object.assign({ id: uuid_1.v4() }, newEntry);
    const patient = getPatientById(id);
    if (patient) {
        patient.entries.push(entry);
        return entry;
    }
    else {
        throw new Error(`No patient found with id: ${id}`);
    }
};
exports.default = {
    getEntries,
    getPublicEntries,
    addPatient,
    getPatientById,
    addEntryToPatient
};
