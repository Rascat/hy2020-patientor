"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isArray = (array) => {
    return Array.isArray(array);
};
const isDiagnosisCodeArray = (array) => {
    return isArray(array) && array.every(isString);
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
const isHealthCheckRating = (rating) => {
    return Object.values(types_1.HealthCheckRating).includes(rating);
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${name}`);
    }
    return name;
};
const parseDateOfBirth = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: ${ssn}`);
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
    }
    return occupation;
};
const toNewPatient = (object) => {
    const newPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };
    return newPatient;
};
exports.toNewPatient = toNewPatient;
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error(`Incorrect or missing description: ${description}`);
    }
    return description;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error(`Incorrect or missing specialist: ${specialist}`);
    }
    return specialist;
};
const parseDiagnosisCodes = (codes) => {
    if (!codes || !isDiagnosisCodeArray(codes)) {
        throw new Error(`Incorrect or missing diagnosis codes: ${codes}`);
    }
    return codes;
};
const isType = (type) => {
    return type === 'HealthCheck'
        || type === 'OccupationalHealthcare'
        || type === 'Hospital';
};
const parseType = (type) => {
    if (!type || !isString(type) || !isType(type)) {
        throw new Error(`Incorrect or missing type: ${type}`);
    }
    return type;
};
const parseHealthCheckRating = (rating) => {
    if (!rating || !isHealthCheckRating(rating)) {
        throw new Error(`Incorrect or missing rating: ${rating}`);
    }
    return rating;
};
const isDischarge = (discharge) => {
    return isString(discharge.date)
        && isDate(discharge.date)
        && isString(discharge.criteria);
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error(`Incorrect or missing discharge: ${discharge}`);
    }
    return discharge;
};
const isSickLeave = (leave) => {
    const validStartDate = isString(leave.startDate) && isDate(leave.startDate);
    const validEndDate = isString(leave.endDate) && isDate(leave.endDate);
    return validStartDate && validEndDate;
};
const parseSickLeave = (leave) => {
    if (!leave || !isSickLeave(leave)) {
        throw new Error(`Incorrect or missing sick leave: ${leave}`);
    }
    return leave;
};
const toNewEntry = (object) => {
    const baseEntry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: object.diagnosisCodes
            ? parseDiagnosisCodes(object.diagnosisCodes)
            : undefined,
        type: parseType(object.type)
    };
    switch (baseEntry.type) {
        case 'HealthCheck': {
            const healthCheckEntry = Object.assign(Object.assign({}, baseEntry), { healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
            return healthCheckEntry;
        }
        case 'Hospital': {
            const hospitalEntry = Object.assign(Object.assign({}, baseEntry), { discharge: parseDischarge(object.discharge) });
            return hospitalEntry;
        }
        case 'OccupationalHealthcare': {
            const occupationalHealthcare = Object.assign(Object.assign({}, baseEntry), { employerName: parseName(object.employerName), sickLeave: object.sickLeave
                    ? parseSickLeave(object.sickLeave)
                    : undefined });
            return occupationalHealthcare;
        }
        default:
            throw new Error(`Could not parse entry: ${object}`);
    }
};
exports.toNewEntry = toNewEntry;
