"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
const DB_PATH = path_1.default.resolve(__dirname, '../src/db.json');
const readDatabase = () => {
    const data = fs_1.default.readFileSync(DB_PATH, 'utf-8');
    const parsedData = JSON.parse(data);
    // Ensure submissions is an array
    if (!Array.isArray(parsedData.submissions)) {
        parsedData.submissions = [];
    }
    return parsedData;
};
const writeDatabase = (data) => {
    fs_1.default.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};
app.get('/ping', (req, res) => {
    res.send(true);
});
app.get('/read', (req, res) => {
    const { index } = req.query;
    if (index === undefined || isNaN(Number(index))) {
        return res.status(400).send('Index is required and should be a number.');
    }
    const database = readDatabase();
    if (Number(index) < 0 || Number(index) >= database.submissions.length) {
        return res.status(404).send('Submission not found.');
    }
    res.json(database.submissions[Number(index)]);
});
// Submit endpoint
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const database = readDatabase();
    database.submissions.push({ name, email, phone, github_link, stopwatch_time });
    writeDatabase(database);
    res.send({ success: true });
});
app.delete('/delete', (req, res) => {
    const { index } = req.query;
    if (index === undefined || isNaN(Number(index))) {
        return res.status(400).send('Index is required and should be a number.');
    }
    const database = readDatabase();
    const submissionIndex = parseInt(index);
    if (submissionIndex < 0 || submissionIndex >= database.submissions.length) {
        return res.status(404).send('Submission not found.');
    }
    database.submissions.splice(submissionIndex, 1);
    writeDatabase(database);
    res.send({ success: true });
});
app.put('/edit', (req, res) => {
    const { index } = req.query;
    if (index === undefined || isNaN(Number(index))) {
        return res.status(400).send('Index is required and should be a number.');
    }
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const database = readDatabase();
    const submissionIndex = parseInt(index);
    if (submissionIndex < 0 || submissionIndex >= database.submissions.length) {
        return res.status(404).send('Submission not found.');
    }
    // Update the submission at the specified index
    database.submissions[submissionIndex] = { name, email, phone, github_link, stopwatch_time };
    writeDatabase(database);
    res.send({ success: true });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
