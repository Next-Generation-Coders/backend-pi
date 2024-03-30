pipeline {
environment {
        registryCredentials = credentials('nexus')
        registry = "127.0.0.1:8083"
    }
    agent any
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
        stage('Build application') {
            steps {
                script {
                    sh 'npm run build'
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
                    try {
                        docker.withRegistry("http://${registry}", registryCredentials) {
                            sh "docker push ${registry}/backed-pipe_main_node_app:1.0"
                        }
                    } catch (Exception e) {
                        echo "Error occurred during Docker push:"
                        echo e
                        echo e.getStackTrace().join('\n')
                        // Mark the build as failed
                        error "Failed to push Docker image to Nexus"
                    }
                }
            }
        }

    }
}
