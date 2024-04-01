pipeline {
    agent any
    environment {
        registryCredentials = "nexus"
        registry = "197.26.204.208:8083"
    }
    stages {
        stage('Run application') {
            steps {
                script {
                        sh('docker-compose up -d')
                }
            }
        }
    }
}
