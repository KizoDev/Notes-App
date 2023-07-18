import express, {Request, Response,  NextFunction } from "express";
const app = express()
import router from "./routes/notes";
import createHttpError, {isHttpError} from "http-errors";

app.use(express.json())
app.use("/api", router)


app.use((req, res, next) => {
    next( createHttpError(404, 'Endpoint not found'))

    
});


app.use(( error: unknown, req:Request, res:Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "unknown error occured"
    let statusCode = 500
    if (isHttpError(error) ) {
        statusCode = error.status
        errorMessage = error.message
        
    }
    res.status(statusCode).json({error:errorMessage})
});


export default app