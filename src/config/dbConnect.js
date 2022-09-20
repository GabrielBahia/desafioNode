import mongoose from "mongoose"

mongoose.connect("mongodb+srv://bahia:123@cluster0.g30xhq2.mongodb.net/crud-membros");

let db = mongoose.connection;

export default db;