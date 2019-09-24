FROM kennethheung/pointbase:latest

# setup environment variables
#   This should be replaced by k8s
#   kubectl / docker run
#   arguments
ENV LD_LIBRARY_PATH="/opt/oracle/instantclient_19_3"
# as your working directory is /reward the wallet location is different
# ENV TNS_ADMIN="/usr/src/app/Wallet_MCDemoDB"
# ENV WALLET_LOCATION="/usr/src/app/Wallet_MCDemoDB"
ENV TNS_ADMIN="/reward/Wallet_MCDemoDB/"
ENV WALLET_LOCATION="/reward/Wallet_MCDemoDB/"

# install all required dependencies and create subdir
RUN mkdir -p /reward

WORKDIR /reward
COPY . .

RUN cd /reward \
  && npm install \
  && grunt build:release
EXPOSE 80
CMD ["node","server.js"]
