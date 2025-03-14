import axiosInstance from "../api/axiosConfig";

export const cadastrarUsuario = async (data: any) => {
    try {
        const response = await axiosInstance.post('/usuario/cadastrar', data);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw error;
    }
};

export const cadastrarProduto = async (data: any) => {
    try {
        const response = await axiosInstance.post('/produto/cadastrar', data);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw error;
    }
};

export const listarProdutos = async (page: number, size: number) => {
    const response = await axiosInstance.get(`/produto/listarTodos`, {
      params: {
        page,
        size,
        sort: 'id,desc',
      },
    });
    return response.data;
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

export const authUser = async (data: any) => {
    try {
        const response = await axiosInstance.post('/auth/login', data);
        return response.data;
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        throw error;
    }
}