#! /bin/bash

ENV=dev
APP_NAME=all_dashboard
APP_TYPE=next
APP_DIR=$(pwd)
# DEST=/var/www/html/hk.com
# KEY=/Users/firozmidda/Documents/Holidaykeepers/tools/key/skimbox_ec2.pem
# SRC=/Users/firozmidda/Documents/Holidaykeepers/Src/react-app/build/*
BUILD_APP=true


#update the enviroment if it is provided. 
arg1=($1)

if [[ $arg1 != "" ]]; then
    ENV=$arg1;
fi


# function to check the environment
CheckEnvFn () {
  if [[ $ENV == "dev" ]]; then
    printf %b '\e[40m' '\e[8]' '\e[H\e[J'
  elif [[ $ENV == "stage" ]]; then
    printf %b '\e[42m' '\e[8]' '\e[H\e[J'
  elif [[ $ENV == "prod" ]]; then
    printf %b '\e[41m' '\e[8]' '\e[H\e[J'
  else
    echo "Invalid environment. Exiting."
    exit 1
  fi
}

# invoke the function to check the environment
CheckEnvFn

echo ===================================================
echo "                  $APP_NAME                      "
echo ===================================================

echo "We are going to deploy $APP_NAME"
echo "Are you sure? (y/n)"
read DEPLOY_CONFIRMATION

echo "We are deploying to $ENV environment"
echo "Are you sure? (y/n)"
read ENV_CONFIRMATION

echo ===================================================
echo "           Deploying App Type $APP_TYPE          "
echo ===================================================

# function to show starting deployment steps
ShowDeployStepsFn () {
    echo "Deploying $APP_NAME"
    echo "Deployment started."
    sleep 1
    cd $APP_DIR
    echo "Showing all files and folders in current directory - $APP_DIR"
    ls
    sleep 1
    echo "Showing current working directory: \n"
    pwd
    echo "Showing current branch"
    git branch --show-current
    sleep 1
    echo "Pulling latest code"
    git pull
    if [ $? -ne 0 ]; then
        echo "==================================================="
        echo "   Warning: Error pulling latest code. Exiting.    "
        echo "==================================================="
        exit 1
    fi
    sleep 1
    echo "Completed pulling latest code"
    echo "Removing node_modules"
    rm -rf node_modules/
    sleep 1
}


# function to deploy the next app
DeployNextFn () {
    # invoke 'ShowDeployStepsFn' function to show starting deployment steps
    ShowDeployStepsFn

    echo "Removing previous build"
    rm -rf build/
    sleep 1

    # invoke 'buildCode' function to install and build the app
    buildCode

    # invoke 'CheckAppRunning' function to check if the app is running
    CheckAppRunningFn
    if [ $? = 1 ]; then
        echo "Re-Starting $APP_NAME"
        pm2 restart $APP_NAME
    else
        echo "Stopped"
        echo "Starting $APP_NAME"
        pm2 start npm --name=$APP_NAME -- start
    fi
    
    pm2 save
    pm2 list
    
    echo "Deployed $APP_NAME"
    echo "Deployment complete."
    echo "Exiting."
    exit 0 
}



# function to check if the app is running
CheckAppRunningFn () {
    if (pm2 list -ef | grep "$APP_NAME" | grep -w "online")
    then
          echo "Running already"
          return 1;
    else
          echo "Stopped || Not Running"
          return 0;
    fi
}

# install and build the app
buildCode () {
    echo "Installing dependencies..."
    npm install
    echo "Building code..."
    npm run build
    # UploadBuild
  
}

# function to check app type and invoke the respective function to deploy the app

if [[ $DEPLOY_CONFIRMATION == "y" && $ENV_CONFIRMATION == "y" ]]; then
  # invoke the function to check app type and deploy the app
    DeployNextFn
else
  echo "Exiting."
  exit 1
fi
