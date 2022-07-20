import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config({ path: './.env' })
import logger from './utils/logger';
import { connectDatabase, disconnectFromDatabase } from './config/database';
import { CORS_ORIGIN } from './utils/constants';
import helmet from 'helmet';
//all routes here
import userRoutes from './modules/user/user.route'
const PORT = process.env.PORT || 5000;
const app = express();
//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
 origin: CORS_ORIGIN,
 credentials: true
}))
app.use(helmet());
app.use('/api/users', userRoutes)
const server = app.listen(PORT, async () => {
 await connectDatabase();
 logger.info(`Server Listening at http://localhost:${PORT}`)
})
const signals = ["SIGTERM", "SIGINT"];
function gracefulShutdown(signal: string) {
 process.on(signal, async () => {
  logger.info("Goodbye, got signal", signal)
  server.close()
  //disconnect from the 
  await disconnectFromDatabase();
  logger.info("My work here is done")
  process.exit(0);
 })
}
for (let i = 0; i < signals.length; i++) {
 gracefulShutdown(signals[i]);
}