"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const newEntry = utils_1.toNewEntry(req.body);
        const entry = patientService_1.default.addEntryToPatient(id, newEntry);
        res.json(entry);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService_1.default.getPatientById(id);
    if (patient) {
        res.json(patient);
    }
    else {
        res
            .status(404)
            .json({ error: `No patient found with id: ${id}` });
    }
});
router.get('/', (_req, res) => {
    res.json(patientService_1.default.getPublicEntries());
});
router.post('/', (req, res) => {
    try {
        const newPatient = utils_1.toNewPatient(req.body);
        const patient = patientService_1.default.addPatient(newPatient);
        res.json(patient);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
});
exports.default = router;
