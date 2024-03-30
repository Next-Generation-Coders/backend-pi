pipeline {
    agent any
    environment {
        nexusRepoUrl = "197.26.204.208:8083"
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
                        docker.withRegistry("http://"+nexusRepoUrl, "nexus") {
                            sh "docker tag backed-pipe_main_node_app:latest 197.26.204.208:8083/backed-pipe_main_node_app:latest"
                            sh "docker push 197.26.204.208:8083/backed-pipe_main_node_app:latest"
                        }
                    } catch (Exception e) {
                        echo "Error occurred during Docker push:"
                        echo e.getMessage()
                        echo e.getStackTrace().join('\n')
                        error "Failed to push Docker image to Nexus"
                    }
                }
            }
        }
    }
}
