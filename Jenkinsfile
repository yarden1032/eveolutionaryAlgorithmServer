pipeline {
  agent {
  docker {
    image 'python:3.9-slim'
    args '-u root --privileged'
  }
} 
triggers {
    githubPush()
}

stages {     
    stage('Setup'){
       steps{
           sh 'pip install -r requirements.txt'  
        }
     }
      


stage('run'){ 
           steps{
               sh 'python main.py'
            }                    
         }                              
       ...
       ...  
      }
}