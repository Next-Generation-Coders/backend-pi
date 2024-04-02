pipeline {
    agent any
    environment {
        registryCredentials = "nexus"
        registry = "197.26.204.208:8083"
    }
    stages {
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
                                sh('docker push $registry/backed-pipe_moataz_production_node_app:latest')
                            }
                        }
                    }
                }
                stage('Run application') {
                    steps {
                        script {
                            docker.withRegistry("http://" + registry, registryCredentials) {
                                sh('docker pull $registry/backed-pipe_moataz_production_node_app:latest')
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
