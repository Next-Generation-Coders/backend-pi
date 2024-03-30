pipeline {
    agent any
    environment {
            dockerCredentials = credentials('docker-registry-credentials')
            nexusCredentials = credentials('nexus')
            nexusRepoUrl = "197.26.204.208:8082/repository/docker-repo/"
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
                        docker.withRegistry(nexusRepoUrl, "nexus") {
                            sh "docker push ${nexusRepoUrl}/backed-pipe_main_node_app:1.0"
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
