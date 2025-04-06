import User from '../models/user.js'
import bcrypt from 'bcrypt'




// Buscar todos usuários
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Buscar usuário por ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Criar novo usuário
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body; // pega os dados enviados pelo corpo da requisição

        // Verifica se o e-mail já está em uso
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }

        // Gera um hash da senha (com 10 salt rounds)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o novo usuário com a senha criptografada
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save(); // salva no banco de dados

        res.status(201).json({ 
            message: 'Usuário criado com sucesso',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
                // nunca envie a senha no JSON de resposta!
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//Atualizar usuário 

export const updateUser = async (req, res) => {
    try {
        // Verifica se o body existe
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição ausente' });
        }

        const { name, email, password } = req.body;

        // Busca usuário existente
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        // Atualiza os campos apenas se forem enviados
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        res.json({
            message: 'Usuário atualizado com sucesso',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Deletar usuário
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Outros métodos podem ser adicionados aqui...