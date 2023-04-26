import nodemailer from 'nodemailer'
import config from './config.js'

export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:config.GMAIL_USER,
        pass:config.GMAIL_PASSWORD
    }
})