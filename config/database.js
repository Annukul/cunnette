import mongoose from "mongoose";

const connectDatabase = () =>{
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(con => console.log(`MongoDB Database connected with HOST: ${con.connection.host}`))
};

export default connectDatabase;