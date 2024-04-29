# Using an official node js runtime as a parent image
FROM node:lts

# Set the working directory in the container
WORKDIR /usr/src/app

RUN npm install -g bun

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copying the rest of the application code to the docker volume
COPY . .

# Installing node js server dependencies
# RUN rm -r /usr/src/app/bun.lockb

# RUN bun install -g --force

RUN bun install --silent

# Cleaning leftover cache in the dependency installer
# RUN bun cache clean --force

# Giving elevated execution permissions to ngrok file that deals with domain creation
RUN chmod +x /usr/src/app/ngrok/ngrok

# Giving elevated execution permission to bash script that deals with the domain creation process
RUN chmod +x /usr/src/app/ngrok/start-ngrok.sh

# ARG $NGROK_AUTH_TOKEN
# Use NGROK_AUTH_TOKEN environment variable
# ENV NGROK_AUTH_TOKEN=${NGROK_AUTH_TOKEN}
# ENV NGROK_AUTH_TOKEN=${NGROK_AUTH_TOKEN}

# Executing the ngrok user authtoken configuration through which the domain will be created
RUN ./ngrok/ngrok config add-authtoken <authtoken>

# Installing necessary dependencies for the bash script file 
RUN apt-get update && apt-get install -y bash netcat-openbsd 

# Starting the Execution of two commands parallelly one deals with the server and the other handles ngrok domain creation for the server
# CMD ["sh", "-c", "node build/index.js"]
CMD ["sh", "-c", "bun dev & ./ngrok/start-ngrok.sh"]