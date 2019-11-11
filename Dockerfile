#使用alpine nodejs镜像、体积更小
FROM node:10-alpine
#新建工作目录
RUN mkdir -p /project
#下载项目代码
ADD https://github.com/shixiaohu2206/admin/archive/master.zip /project/
#解压、安装包、编译TS
RUN cd /project && unzip master.zip && cd admin-master && npm install && npm run ci
#进入到app目录下
WORKDIR /project/admin-master
#对外暴露的端口
EXPOSE 7001
#程序启动脚本
CMD ["npm", "start"]