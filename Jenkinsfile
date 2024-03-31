pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'youssef', url: 'https://github.com/Next-Generation-Coders/backend-pi.git'
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install --force'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        /* stage('Deploy') {
            steps {
                // Add your deployment steps here
            }
        } */
    }
}
