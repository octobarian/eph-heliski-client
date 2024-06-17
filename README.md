# installation
### Install Git, NPM and NVM
```
sudo apt install git
sudo apt install nodejs

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
### Ensure we are using NPM 10.2.4, Node 20.11.1
```
npm --version
node --version
```
### Install the project repo
```
mkdir ~/sites
cd ~/sites
```
### Config your GIT with SSH
```
git config --global user.name "<Your Name>"
git config --global user.email "<your-email@example.com>"

ssh-keygen -t rsa -b 4096 -C "<your-email@example.com>"

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

cat ~/.ssh/id_rsa.pub
```
copy your public ssh key, go to github.com
Sign in to your GitHub account and navigate to “Settings” -> “SSH and GPG keys” -> “New SSH key”.
call it “Ubuntu SSH Key,” and paste your public key into the “Key” field.

### test your github connection
```
ssh -T git@github.com
```
### copy repo's
```
git pull https://github.com/octobarian/eph-heliski-client.git
git pull https://github.com/octobarian/eph-heliski-server.git
```

# Database Startup
### NEWTAB STARTING BACKEND DATABASE

```
cd ~/sites/eph-heliski-server
postgres -D /usr/local/pgsql/data >logfile 2>&1 &
sudo -u postgres psql
```

# Server startup
### NEWTAB RUN DEV
```
cd ~/sites/eph-heliski-server
npm run dev
```

#client statup
### NEWTAB STARTING FRONTEND
```
cd ~/sites/eph-heliski-client
npm run serve
```

### OPEN BROWSER
```
http://localhost:8081/
```

# Modification for running
Dont forget to add the server .env, the client .env.development, .env.production.

dont forget to build the postgres server, and import the SQL dump

dont forget to ensure the db.config matches your postgres configuration

