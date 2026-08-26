pipeline {
  agent {
    docker {
      image 'python:3.11-slim'
      args '-u root --privileged'
    }
  }

  stages {
    stage('Setup') {
      steps {
        sh 'python -m pip install --disable-pip-version-check -r requirements.txt'
      }
    }
    stage('Validate') {
      steps {
        sh 'python -m compileall -q main.py find_meal_evaluator.py'
        sh 'python -c "from main import app; assert \'/optimize\' in {rule.rule for rule in app.url_map.iter_rules()}"'
      }
    }
    stage('Run') {
      steps {
        sh 'python main.py'
      }
    }
  }
}
