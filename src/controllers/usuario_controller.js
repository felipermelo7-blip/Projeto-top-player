import * as usuarioModel from '../models/usuario_model.js';
import crypto from 'crypto';

export async function listar(req, res) {
    try {
        const usuarios = await usuarioModel.listarUsuarios();
        res.json(usuarios);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ msg: "Erro interno do servidor" });
    }
}

export async function buscarPorId(req, res) {
    try {
        const resultado = await usuarioModel.buscarUsuarios(req.params.id);
        const usuario = resultado && resultado[0];

        if (!usuario) {
            return res.status(404).json({ msg: "Usuario não encontrado" });
        }

        res.json(usuario);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ msg: "Erro interno do servidor" });
    }
}

export async function criar(req, res) {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ msg: "Nome, email e senha são obrigatórios" });
        }

        const senha_hash = crypto
            .createHash('sha256')
            .update(senha)
            .digest('hex');

        const id = await usuarioModel.criarUsuario(nome, email, senha_hash);

        return res.status(201).json({
            msg: "Usuario criado com sucesso",
            id
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ msg: "Erro interno do servidor" });
    }
}

export async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ msg: "Email e senha são obrigatórios" });
        }

        const usuario = await usuarioModel.buscarUsuariosPorEmail(email);

        if (!usuario) {
            return res.status(404).json({ msg: "Credenciais inválidas" });
        }

        const senha_hash = crypto
            .createHash('sha256')
            .update(senha)
            .digest('hex');

        if (senha_hash !== usuario.senha_hash) {
            return res.status(401).json({ msg: "Credenciais inválidas" });
        }

        const token = crypto.randomBytes(24).toString('hex');

        return res.status(200).json({
            msg: "Login bem sucedido",
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ msg: "Erro interno do servidor" });
    }
}

export async function atualizar(req, res) {
    try {
        const { nome, email } = req.body;
        const { id } = req.params;

        if (!nome || !email) {
            return res.status(400).json({ msg: "Nome e email são obrigatórios" });
        }

        const resultado = await usuarioModel.atualizarUsuario(id, nome, email);

        if (!resultado) {
            return res.status(404).json({ msg: "Usuario não encontrado" });
        }

        return res.status(200).json({ msg: "Usuário atualizado com sucesso" });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ msg: "Erro interno do servidor" });
    }
}

export async function remover(req, res) {
    try {
        const { id } = req.params;

        const resultado = await usuarioModel.removerUsuario(id);

        if (!resultado) {
            return res.status(404).json({ msg: "Usuario não encontrado" });
        }

        return res.status(200).json({ msg: "Usuário deletado com sucesso" });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ msg: "Erro interno do servidor" });
    }
}