import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

app.post('/send-analytics', async (req, res) => {
    try {
        console.log('req.body:', req.body.data[0].name);
        res.status(200).json({ message: 'Analytics data received successfully' });
    } catch (error) {
        console.error('Error handling analytics data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
