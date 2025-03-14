import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useState } from 'react';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  gap: 20px;
  max-width: 900px;
  width: 90%;

    @media (max-width: 768px) {
        overflow-y: auto;
        max-height: 90%;
        width: 80%;
        padding: 10px;
    }
`;

const CloseButton = styled.button`
  display: flex;
  margin-left: auto;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CarouselContainer = styled.div`
  width: 400px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
  }
  
  .carousel-item {
    padding: 0 5px;
  }
  
  img {
    border-radius: 10px;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const Thumbnail = styled.div<{ active: string }>`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.active === 'true' ? props.theme.colors.primary : 'transparent'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const Titulo = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const Qtd = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  margin-top: auto;
`;

const Preco = styled.p`
  font-size: 42px;
  font-weight: 300;
  margin: 0;
  margin-top: auto;
`;

const Un = styled.span`
  font-size: 14px;
  font-weight: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: auto;
  margin-left: auto;
`;

interface VisualizarModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    nome: string;
    avaliacao: string;
    descricao: string;
    preco: string;
    quantidadeEstoque: string;
}

export default function VisualizarModal(props: VisualizarModalProps) {
    const { isOpen, onClose, images, nome, avaliacao, descricao, preco, quantidadeEstoque } = props;
    const [activeSlide, setActiveSlide] = useState(0);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    if (!isOpen) return null;

    return (
        <Modal>
            <ModalContent>
                <CloseButton onClick={onClose}><CloseIcon /></CloseButton>
                <Wrapper>
                    <CarouselContainer>
                        <Carousel
                            responsive={responsive}
                            infinite={true}
                            showDots={false}
                            autoPlay={false}
                            afterChange={(nextSlide) => setActiveSlide(nextSlide)}
                        >
                            {images.map((image, index) => (
                                <div key={index} className="carousel-item">
                                    <img src={image} alt={`${nome} - Imagem ${index + 1}`} />
                                </div>
                            ))}
                        </Carousel>
                        <ThumbnailsContainer>
                            {images.map((image, index) => (
                                <Thumbnail
                                    key={index}
                                    active={index === activeSlide ? 'true' : 'false'}
                                    onClick={() => setActiveSlide(index)}
                                >
                                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                                </Thumbnail>
                            ))}
                        </ThumbnailsContainer>
                    </CarouselContainer>
                    <Details>
                        <DetailsContainer>
                            <Titulo>{nome}</Titulo>
                            <p style={{ marginTop: '0' }}>{descricao}</p>
                            <Preco>R$ {preco}<Un>(un)</Un></Preco>
                            <p style={{ color: '#6B97D9', margin: '0', fontSize: '14px' }}>Ver meios de pagamento</p>
                            <Qtd>QUANTIDADE: {quantidadeEstoque}</Qtd>
                            <p>AVALIAÇÃO: {avaliacao}</p>
                        </DetailsContainer>
                        <ButtonContainer>
                            <Button variant="contained" color="primary" disabled>Adicionar no carrinho</Button>
                        </ButtonContainer>
                    </Details>
                </Wrapper>
            </ModalContent>
        </Modal>
    );
}