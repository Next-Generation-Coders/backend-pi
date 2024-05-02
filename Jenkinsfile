pipeline {
    agent any
    environment {
        registryCredentials = "nexus"
        registry = "197.26.204.208:8083"
    }
    stages {
        stage('Install dependencies') {
            steps {
                script {
                    sh 'npm install --force'
                }
            }
        }
        stage('Unit Test') {
            steps {
                script {
                    sh 'npm run test'
                }
            }
        }
        stage('Build application') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'scanner'
                    withSonarQubeEnv {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Building image') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }
        stage('Deploy to Nexus') {
            steps {
                script {
                    docker.withRegistry("http://" + registry, registryCredentials) {
                        sh 'docker push $registry/backend-pipeline_moataz_production-node_app:latest'
                    }
                }
            }
        }
        stage('Run application') {
            steps {
                script {
                    docker.withRegistry("http://" + registry, registryCredentials) {
                        sh 'docker pull $registry/backend-pipeline_moataz_production-node_app:latest'
                        sh 'docker-compose up -d'
                    }
                }
            }
        }

    }
}
