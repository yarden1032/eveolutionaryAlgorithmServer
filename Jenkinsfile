pipeline {
    agent any 
    stages {
        stage('version')
        {
             agent {
                docker {
                    image 'python:3.12.1-alpine3.19' 
                }
            }
            steps{
                sh 'python3 --version'
            }
        }
        // stage('Build') { 
        //     steps {
        //         sh 'python main.py' 
        //     }
        // }
    }
}
