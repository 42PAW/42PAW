#!/bin/bash

SERVICE_NAME=petboot
SOURCE_DIR_PATH=/home/ec2-user/deploy
TARGET_PATH=/usr/local/pet_service.jar

echo "jar 파일이 있는지 확인합니다"
if [ -e ${TARGET_PATH} ] ; then
	echo "기존의 jar파일 삭제합니다"
	sudo rm $TARGET_PATH
	STATUS=`echo $?`
	if [ ${STATUS} -ne 0 ] ; then
		echo "기존 jar파일 삭제를 실패했습니다"
		exit 1
	fi
fi

echo "build된 jar파일이 있는지 확인합니다"
SOURCE_PATH=`find $SOURCE_DIR_PATH -type f -name "*jar"`
if [ ${TARGET_PATH} -ef ${SOURCE_PATH} ] ; then
	echo "build된 jar파일을 찾지 못했습니다"
	exit 1
fi

echo "$SOURCE_PATH 에서 jar파일을 찾았습니다"
echo "build된 jar파일을 옮깁니다"

sudo cp ${SOURCE_PATH} ${TARGET_PATH}
STATUS=`echo $?`

if [ ${STATUS} -ne 0 ] ; then
	echo "jar파일 옮기기를 실패했습니다"
	exit 1
fi

echo "실행되고 있는 spring service가 있는지 확인합니다"
sudo systemctl is-active $SERVICE_NAME
SERVICE_STATUS=`echo $?`

echo "실행 되는 서비스 상태는 $SERVICE_STATUS 입니다"
if [ ${SERVICE_STATUS} -eq 0 ] ; then
	echo "실행중인 서비스를 종료합니다"
	sudo systemctl stop $SERVICE_NAME
	STATUS=`echo $?`
	if [ ${STATUS} -ne 0 ] ; then
		echo "서비스 종료에 실패했습니다"
		exit 1
	fi
fi

echo "서비스를 실행합니다."
sudo systemctl start $SERVICE_NAME
STATUS=`echo $?`
if [ ${STATUS} -ne 0 ] ; then
	echo "서비스 실행에 실패했습니다"
	exit 1
fi

sudo systemctl is-active $SERVICE_NAME
SERVICE_STATUS=`echo $?`
if [ ${SERVICE_STATUS} -ne 0 ] ; then
	echo "서비스 실행에 실패했습니다"
	exit 1
fi

exit 0