import dotenv from "dotenv";
dotenv.config();

const { URI, PORT, SECRET_ACCESS_TOKEN } = process.env;

console.log(URI);

export { URI, PORT, SECRET_ACCESS_TOKEN };  