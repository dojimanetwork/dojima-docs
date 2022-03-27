pipeline {
    agent { label 'master'}

    // tools{
    //     docker "myDocker"
    // }
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    parameters {
		string(name: 'PROJECT_NAME', defaultValue: 'Dojima Docs', description: '')
		string(name: 'DOCKER_IMG_NAME', defaultValue: 'core/docs', description: '')
		string(name: 'ECR_URL', defaultValue: '576263512135.dkr.ecr.ap-south-1.amazonaws.com/', description: '')
		choice(name: 'RELEASE_MODE', choices: ['patch', 'minor', 'major'], description: 'Pick one.')
		gitParameter branchFilter: 'origin/(.*)', defaultValue: 'master', name: 'BRANCH', type: 'PT_BRANCH'

	}
	

    stages {
        
        stage ('Initialize') {
            steps {
                script {
                    def dockerHome = tool 'myDocker'
                    env.PATH = "${dockerHome}/bin:${env.PATH}" 
                }
                
            }     
        }
        
        stage ('Checkout') {
            steps {
                script {
                    if ("${params.BRANCH_NAME}" == 'master' || "${params.BRANCH_NAME}".startsWith('release-')) {
                        echo 'Development build not allowed on master or release branch!'
                        sh 'exit 1'
                    }
                }
                checkout scm

            }
        }

        stage('Auto tagging') {
          steps {
            script {
              //FINALTAG = sh (script: "bash /opt/jenkins-tag/tag.sh ${params.RELEASE_MODE} ${params.BRANCH}", returnStdout: true).trim()
	 	        FINALTAG = sh (script: "echo `date '+%Y%m%d-%H%M' ` ",returnStdout: true).trim()
                echo "Tag is : ${FINALTAG}"
            }
            echo "Returned Tag is : ${FINALTAG}"
          }
        }



	    stage('Build') {
            steps {
                sh "echo $PATH; printenv; uname -a; hostname; docker -v; docker build -t ${params.DOCKER_IMG_NAME} -f Dockerfile ."
            }
        }


        stage('Publish') {
            steps {
                 script {
                    sh "docker tag ${params.DOCKER_IMG_NAME}:latest ${params.ECR_URL}${params.DOCKER_IMG_NAME}:${FINALTAG}"
		            docker.withRegistry("https://${params.ECR_URL}", "ecr:ap-south-1:AWSECR") {
                        sh "docker push ${params.ECR_URL}${params.DOCKER_IMG_NAME}:${FINALTAG}"
                    }
                }
            }
        }

    }

	post {
		success {
		    writeFile file: "output/tag.txt", text: "tag=1.1"
		    archiveArtifacts artifacts: 'output/*.txt'
			emailext (recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']], to: "bhagath.reddy@dojima.network", subject:"RELEASE BUILD SUCCESS: ${currentBuild.fullDisplayName}", body: "Release Build Successful! Reports Attached. Please review the reports and take necessary actions.")
		}

		failure {
			emailext (recipientProviders: [[$class: 'CulpritsRecipientProvider'], [$class: 'RequesterRecipientProvider']], to: "bhagath.reddy@dojima.network", subject:"RELEASE BUILD FAILURE: ${currentBuild.fullDisplayName}", body: "Release Build Failed! Your commits is suspected to have caused the build failure. Please go to ${BUILD_URL} for details and resolve the build failure at the earliest.", attachLog: true, compressLog: true)
		}

		aborted {
			emailext (recipientProviders: [[$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']], subject:"RELEASE BUILD ABORTED: ${currentBuild.fullDisplayName}", body: "Release Build Aborted! Please go to ${BUILD_URL} and verify the build.", attachLog: false, compressLog: false)
		}
	}
}

