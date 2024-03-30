pipeline {
    agent any
    environment {
        registryCredentials = "nexus"
        registry = "172.17.0.2:8083"
    }
    stages {
        stage('Install dependencies') {
            steps {
                script {
                    sh 'npm install --force'
                }
            }
        }
        stage('Deploy to Nexus') {
            steps {
                script {
                    docker.withRegistry("http://"+registry, registryCredentials) {
                        sh('docker push $registry/backed-pipe_main_node_app:latest')
                    }
                }
            }
        }


    }
}
