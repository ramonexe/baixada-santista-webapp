
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Close';
import AppTheme from '../shared-theme/AppTheme';
import { cadastrarProduto } from '../../services/axiosServices';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  overflow: 'hidden',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 90dvh)',
  minHeight: '90%',
  overflow: 'hidden',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    overflow: 'hidden',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function CadastrarProduto(props: { disableCustomTheme?: boolean }) {
  const [id, setId] = React.useState('');
  const [ativo, setAtivo] = React.useState(false);
  const [avaliacao, setAvaliacao] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const [preco, setPreco] = React.useState('');
  const [quantEstoque, setQuantEstoque] = React.useState('');
  const [imagens, setImagens] = React.useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setImagens([...imagens, ...files]);

      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews([...imagePreviews, ...previews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = imagens.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImagens(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  const validateInputs = () => {
    if (!id || !avaliacao || !nome || !descricao || !preco || !quantEstoque || imagens.length === 0) {
      setErrorMessage('Todos os campos são obrigatórios, incluindo pelo menos uma imagem.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const formData = new FormData();
    formData.append('id', id);
    formData.append('ativo', ativo ? 'true' : 'false');
    formData.append('avaliacao', avaliacao);
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('preco', preco);
    formData.append('quant_estoque', quantEstoque);
    imagens.forEach((imagem) => formData.append('imagens', imagem));

    try {
      await cadastrarProduto(formData);
      setSuccessMessage('Produto cadastrado com sucesso!');
      setErrorMessage('');
      setId('');
      setAtivo(false);
      setAvaliacao('');
      setNome('');
      setDescricao('');
      setPreco('');
      setQuantEstoque('');
      setImagens([]);
      setImagePreviews([]);
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      setErrorMessage('Erro ao cadastrar produto. Tente novamente.');
      setSuccessMessage('');
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography component="h1" variant="h4">
            Cadastrar Produto
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { label: 'Nome do Produto', value: nome, setter: setNome },
              { label: 'Avaliação', value: avaliacao, setter: setAvaliacao },
              
              { label: 'Descrição', value: descricao, setter: setDescricao },
              { label: 'Preço', value: preco, setter: setPreco },
              { label: 'Quantidade em Estoque', value: quantEstoque, setter: setQuantEstoque }].map((field, index) => (
              <FormControl key={index}>
                <FormLabel>{field.label}</FormLabel>
                <TextField
                  required
                  fullWidth
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                />
              </FormControl>
            ))}

            <FormControl>
              
              <h3> Inativo / Ativo</h3>
              <Switch checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="imagens">Imagens do Produto</FormLabel>
              <input
                type="file"
                id="imagens"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>

            {imagePreviews.map((preview, index) => (
              <Box key={index} sx={{ position: 'relative', display: 'inline-block', marginRight: 1 }}>
                <img src={preview} alt={`Imagem ${index + 1}`} style={{ width: 100, height: 100, objectFit: 'cover' }} />
                <IconButton onClick={() => handleRemoveImage(index)} sx={{ position: 'absolute', top: 0, right: 0 }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}