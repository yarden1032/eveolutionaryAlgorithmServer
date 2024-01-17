pipeline {
    agent any 
    stages {
        docker {
                    image 'python:3.12.1-alpine3.19' 
                }
        stage('version')
        {
            steps{
                sh 'python3 --version'
            }
        }
        stage('Build') { 
            steps {
                sh 'python main.py' 
            }
        }
    }
}
