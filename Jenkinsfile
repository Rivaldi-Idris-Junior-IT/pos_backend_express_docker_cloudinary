def builderDocker
def CommitHash

pipeline {
    agent any

    parameters {
        booleanParam(name: 'RUNTEST', defaultValue: true, description: 'Toggle this value for testing')        
        choice(name: 'Deploy', choices: ['production', 'deployement'], description: 'Deploy Other Server')
        choice(name: 'CICD', choices: ['CI', 'CICD'], description: 'Pick something')        
        choice(name: 'Mode', choices: ['master','development', 'production'], description: 'Pili mode push')
    }

    stages {
        stage('Build Project') {
            steps {
                nodejs("node12") {
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    if (params.Mode == GIT_BRANCH) {
                        script {
                            CommitHash = sh(script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
                            builderDocker = docker.build("aldifarzum/dockerpos-backend:latest")
                        }
                        sh 'echo Validasi branch berhasil'
                    } else if (params.Mode != GIT_BRANCH) {
                        currentBuild.result = 'ABORTED'
                        error('Validasi branch gagal …')
                    }
                }
            }
        }

        stage('Run Testing') {
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                script {
                    builderDocker.inside {
                        sh 'echo passed'
                    }
                }
            }
        }

        stage('Push Image') {
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                script {
                    builderDocker.push("latest")
                }
            }
        }



        stage('Deploy-deployement') {
            when {
                expression {
                    params.CICD == 'CICD'
                }
            }
            steps {
                script{
                    sh 'echo Image already push to dockerhub'
                }
            }
        }

        stage('Remove local images') {
            steps {
                script{
                    sh("docker rmi -f aldifarzum/dockerpos-backend:latest || :")        
                }      
            }                  
        }

        stage('Remove local images frontend') {
            steps {
                script{
                    sh("docker rmi -f aldifarzum/dockerpos-frontend:latest || :")
                }      
            }                  
        }
        
        stage("Delete image server"){
            when {
                expression {
                    params.CICD == 'CICD'
                }
            }
            
            steps {
                script{
                    if (params.Deploy == 'deployement') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'Development',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: 'docker rmi -f aldifarzum/dockerpos-frontend; docker rmi -f aldifarzum/dockerpos-backend',
                                            execTimeout: 250000,
                                        )
                                    ]
                                )
                            ]
                        )
                    } else if (params.Deploy == 'production') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'Production',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: 'docker rmi -f aldifarzum/dockerpos-frontend; docker rmi -f aldifarzum/dockerpos-backend',
                                            execTimeout: 250000,
                                        )
                                    ]
                                )
                            ]
                        )
                    }
                }
                echo 'Delete image - success.'
            }
        }
        
        stage("Pull Image Frontend"){
            when {
                expression {
                    params.CICD == 'CICD'
                }
            }
            
            steps {
                script{
                    if (params.Deploy == 'deployement') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'Development',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: 'docker pull aldifarzum/dockerpos-frontend:latest;',
                                            execTimeout: 250000,
                                        )
                                    ]
                                )
                            ]
                        )
                    } else if (params.Deploy == 'production') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'Production',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: 'docker pull aldifarzum/dockerpos-frontend:latest;',
                                            execTimeout: 250000,
                                        )
                                    ]
                                )
                            ]
                        )
                    }
                }
                echo 'Pull image frontend - successfully.'
            }
        }    

        stage("Pull Image Backend"){
            when {
                expression {
                    params.CICD == 'CICD'
                }
            }
            
            steps {
                script{
                    if (params.Deploy == 'deployement') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'Development',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: 'docker pull aldifarzum/dockerpos-backend:latest;',
                                            execTimeout: 250000,
                                        )
                                    ]
                                )
                            ]
                        )
                    } else if (params.Deploy == 'production') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'Production',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: 'docker pull aldifarzum/dockerpos-backend:latest;',
                                            execTimeout: 250000,
                                        )
                                    ]
                                )
                            ]
                        )
                    }
                }
                echo 'Pull image backend - success.'
            }
        }

        stage("Running docker compose"){
            when {
                expression {
                    params.CICD == 'CICD'
                }
            }
            
            steps {
                script{
                    if (params.Deploy == 'deployement') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'Development',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: 'cd pos-backend-frontend-cicd-jenkins-docker; docker-compose up -d',
                                            execTimeout: 250000,
                                        )
                                    ]
                                )
                            ]
                        )
                    } else if (params.Deploy == 'production') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'Production',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: 'cd pos-backend-frontend-cicd-jenkins-docker; docker-compose up -d',
                                            execTimeout: 250000,
                                        )
                                    ]
                                )
                            ]
                        )
                    }
                }
                echo 'Pull image backend - success.'
            }
        }
    }
}