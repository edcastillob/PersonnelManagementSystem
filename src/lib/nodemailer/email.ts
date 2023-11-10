import nodemailer from 'nodemailer';

// Configura el transporte para enviar correos electrónicos (utiliza tu propio servicio de correo saliente)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Cambia esto a tu servicio de correo saliente
  auth: {
    user: 'prodelevatepf@gmail.com', // Cambia esto a tu dirección de correo
    pass: 'znykqbnouxqdrrjf', // Cambia esto a tu contraseña
  },
});

// Función para enviar un correo electrónico
export async function sendEmail({ to, subject, text }) {
  try {
    const info = await transporter.sendMail({
      from: 'prodelevatepf@gmail.com', // Cambia esto a tu dirección de correo
      to,
      subject,
      text,
    });

    console.log('Correo electrónico enviado:', info.response);
    return true;
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return false;
  }
}


