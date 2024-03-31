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
            steps {
                script {
                    /* def scannerHome = tool 'SonarQube_Server'
                    if (scannerHome == null) {
                        error "Default scannerHome tool not found"
                    } */
/*                     sh "${scannerHome}/bin/sonar-scanner clean verify sonar:sonar -Dsonar.projectKey=nodeappPi -Dsonar.projectName='nodeappPi' -Dsonar.login=admin -Dsonar.password=123"
 */                    def mvnHome = tool 'M2_HOME'
                    
                    // Check if the tool exists
                    if (mvnHome == null) {
                        error "Default Maven tool not found"
                    }
                    withSonarQubeEnv('SonarQube_Server') {
                        sh "${mvnHome}/bin/sonar-scanner clean -Dsonar.projectKey=nodeappPi -Dsonar.projectName=nodeappPi -Dsonar.login=admin -Dsonar.password=123"                    }
                }
            }
        }
    }
}
