pipeline {
    agent any
    environment {
        registryCredentials = "nexus"
        registry = "197.26.204.208:8081"
    }
    stages {
        stage('Install dependencies') {
            steps {
                script {
                    sh 'npm install --force'
                }
            }
        }
        stage('Building image') {
            steps {
                script {
                    sh('docker-compose build')
                }
            }
        }
        stage('Deploy to Nexus') {
            steps {
                script {
                    docker.withRegistry("http://"+registry, registryCredentials) {
                        sh "docker tag backed-pipe_main_node_app:latest $registry/backed-pipe_main_node_app:latest"
                        sh('docker push $registry/backed-pipe_main_node_app:latest')
                    }
                }
            }
        }


    }
}
