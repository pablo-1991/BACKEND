import mongoose from 'mongoose'
import config from '../../config.js'

mongoose.set('strictQuery', false)


const URI = config.MONGOURL

try {
    await mongoose.connect(URI)
    console.log('Conectado a la base de datos')
} catch (error) {
    console.log('error')
}