FROM ubuntu:20.04

# Install basic CLI tools etc.
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get upgrade -y && apt-get install -y --fix-missing --no-install-recommends \
    build-essential \
    curl \
    git-core \
    iputils-ping \
    pkg-config \
    rsync \
    software-properties-common \
    unzip \
    wget  \
    libopencv-dev \
    python3-opencv \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    libvips \
    libvips-tools \
    libvips42 \
    cmake \ 
    libgtk2.0-dev \
    libavcodec-dev \
    libavformat-dev \
    libswscale-dev


# Install NodeJS
RUN curl --silent --location https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install --yes nodejs
RUN npm install -g npm@9.6.3


#RUN npm install -g npm@9.7.1

# Clean up commands
RUN apt-get autoremove -y && apt-get clean && \
    rm -rf /usr/local/src/*

RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/*


WORKDIR '/app'
COPY ./package.json ./

# Install tfjs-node
RUN npm cache clean --force
RUN npm install
RUN npm i sharp
RUN npm i @tensorflow/tfjs
RUN npm i @tensorflow/tfjs-node@1.2.11
RUN npm i --save opencv-build
RUN npm i --save opencv4nodejs
#RUN npm rebuild @tensorflow/tfjs-node --build-addon-from-source
COPY ./ ./
#RUN npx jest open-cv

CMD ["/bin/bash"]




