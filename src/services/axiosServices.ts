import axiosInstance from "../api/axiosConfig";

export const cadastrarUsuario = async () => {
    try {
        const response = await axiosInstance.post('/usuario/cadastrar');
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw error;
    }
};

export const listarUsuarios = async () => {
    try {
        const response = await axiosInstance.get('/usuario/listarTodos');
        return response.data;
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        throw error;
    }
};