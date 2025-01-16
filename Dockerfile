# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Instale as dependências necessárias para compilar o bcrypt
RUN apk add --no-cache make gcc g++ python3

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Compile o TypeScript para JavaScript
RUN npm run build

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]