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
                                sh "${scannerHome}/bin/sonar-scanner -X"
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
                    docker.withRegistry("http://"+registry, registryCredentials) {
                        sh "docker tag backed-pipe_main_node_app:latest $registry/backed-pipe_main_node_app:latest"
                        sh('docker push $registry/backed-pipe_main_node_app:latest')
                    }
                }
            }
        }
        stage('Run application') {
            steps {
                script {
                    docker.withRegistry("http://" + registry, registryCredentials) {
                        sh('docker pull $registry/backed-pipe_main_node_app:latest')
                        sh('docker-compose up -d')
                    }
                }
            }
        }
        stage('Run Prometheus') {
            steps {
                script {
                    sh('docker start prometheus')
                }
            }
        }
        stage('Run Grafana') {
            steps {
                script {
                    sh('docker start grafana')
                }
            }
        }

    }
}
