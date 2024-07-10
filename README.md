
# GymBro

O projeto se trata de uma plataforma voltado para pessoas que gostam e querem poder cadastrar suas séries de academia de modo a ter sempre um local onde eles possam usar para fazer o seu treino matinal ou queiram saber o seu histórico de treinos para poder comprar exercício e executar estímulos diferentes no mesmo.

## Passo a passo para utilização (sem docker)

    1. Primeiro **clone** o projeto no seu computador;
    2. Entre na pasta do seu projeto dando **cd ./grym-bro**;
    3. Rode o comando **npm install**;
    4. Por fim, rode o comando **npm run dev** para rodar o projeto localmente

## Passo a passo para utilização (com docker)
    
    1. Crie uma imagem docker utilizando **docker build -t gym-bro-docker .**;
    2. A partir da imagem acima execute o container rodando o comando **docker run -p 5000:3000 gym-bro-docker**;
    3. Caso queira interagir com o container utiliza o comando **docker exec -it <ID_do_seu_contêiner> bash** passando o id do container gerado no comando acima;

## Fluxograma da aplicação

![alt text](<Fluxograma Puc.png>)
