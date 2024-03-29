pipeline {
    agent any
    stages {
        stage('Install dependencies') {
            steps {
                script {
                    sh('npm install --force')
                }
            }
        }
        stage('Unit Test') {
            steps {
                script {
                    sh('npm run test')
                }
            }
        }
        stage('Build application') {
            steps {
                script {
                    sh('npm run build')
                }
            }
        }
    }
}
