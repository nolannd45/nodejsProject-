import mongoose from 'mongoose';
mongoose.set("strictQuery", true);

export async function connect(){
  try {
    await mongoose.connect(
      "mongodb+srv://nolannd45:nolannd45@projethotel.ojehqtb.mongodb.net/?retryWrites=true&w=majority&appName=ProjetHotel"
    );
    console.log("connecté à la base de donnée");
  } catch (error) {
    console.log(error);
  }
};

export async function disconnect(){
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};