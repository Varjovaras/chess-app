import express from 'express';
import chessRouter from './routes/chessRouter';
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.use('/', chessRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
