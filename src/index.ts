import express from 'express';
import  { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Submission } from './types';

const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended:false }))
app.use(express.json());

const DB_PATH = path.resolve(__dirname, '../src/db.json');

const readDatabase = () => {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    const parsedData = JSON.parse(data);

    // Ensure submissions is an array
    if (!Array.isArray(parsedData.submissions)) {
        parsedData.submissions = [];
    }

    return parsedData;
};


const writeDatabase = (data: any) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

app.get('/ping', (req: Request, res: Response) => {
    res.send(true);
    });

    app.get('/read', (req: Request, res: Response) => {
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
    app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const database = readDatabase();
    database.submissions.push({ name, email, phone, github_link, stopwatch_time });
    writeDatabase(database);
    res.send({ success: true });
});


app.delete('/delete', (req: Request, res: Response) => {
    const { index } = req.query;

    if (index === undefined || isNaN(Number(index))) {
        return res.status(400).send('Index is required and should be a number.');
    }

    const database = readDatabase();
    const submissionIndex = parseInt(index as string);

    if (submissionIndex < 0 || submissionIndex >= database.submissions.length) {
        return res.status(404).send('Submission not found.');
    }

    database.submissions.splice(submissionIndex, 1);
    writeDatabase(database);
    res.status(200).send('Submission deleted successfully.');
});

app.get('/count', (req: Request, res: Response) => {
    const database = readDatabase();
    const count = database.submissions.length;
    res.json({ count });
});

app.put('/edit', (req: Request, res: Response) => {
    const { index } = req.query;

    if (index === undefined || isNaN(Number(index))) {
        return res.status(400).send('Index is required and should be a number.');
    }

    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const database = readDatabase();
    const submissionIndex = parseInt(index as string);

    if (submissionIndex < 0 || submissionIndex >= database.submissions.length) {
        return res.status(404).send('Submission not found.');
    }

    // Update the submission at the specified index
    database.submissions[submissionIndex] = { name, email, phone, github_link, stopwatch_time };
    writeDatabase(database);
    res.send({ success: true });
});

app.get('/search', (req: Request, res: Response) => {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
        return res.status(400).send('Email parameter is required and must be a string.');
    }

    const database = readDatabase();
    const matchingSubmissions = database.submissions.filter((submission: any) => submission.email === email);

    if (matchingSubmissions.length === 0) {
        return res.status(404).send('No submissions found for the provided email.');
    }

    res.json(matchingSubmissions);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    });