pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "chatbot-backend"
        DOCKER_IMAGE_TAG = "latest"
        DOCKER_REGISTRY = "your-docker-registry" // Cambiar por tu registro de Docker
        DOCKER_CREDENTIALS_ID = "your-docker-credentials" // Cambiar por tus credenciales de Docker en Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    docker.image('node:22-alpine').inside {
                        sh 'npm install -g pnpm && pnpm install'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    docker.image('node:22-alpine').inside {
                        sh 'pnpm run test'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
                }
            }
        }

        stage('Push to Docker Registry') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS_ID) {
                        docker.image("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Aquí irían los comandos para desplegar la imagen en tu entorno
                    // Por ejemplo, usando ssh para conectarte a un servidor y ejecutar docker-compose
                    sh 'echo "Deploying to production..."'
                    // sh 'ssh user@your-server "cd /path/to/your/app && docker-compose pull && docker-compose up -d"'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
