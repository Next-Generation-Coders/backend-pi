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
        /* stage('Test') {
            steps {
                sh 'npm test'
            }
        } */
        /* stage('Deploy') {
            steps {
                // Add your deployment steps here
            }
        } */
        stage('SonarQube Analysis') {
            def scannerHome = tool 'SonarQube_Server'
            if (scannerHome == null) {
                        error "Default scannerHome tool not found"
                    }
                    sh "${scannerHome}/bin/sonar-scanner clean verify sonar:sonar -Dsonar.projectKey=nodeappPi -Dsonar.projectName='nodeappPi' -Dsonar.login=admin -Dsonar.password=123"
        }
    }
}
