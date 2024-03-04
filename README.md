# client

## STARTING BACKEND
NEWTAB
```
cd ~/sites/PEVN-SITE/PEVN
postgres -D /usr/local/pgsql/data >logfile 2>&1 &
sudo -u postgres psql
```

### NEWTAB RUN DEV
```
cd ~/sites/PEVN-SITE/PEVN-OAUTH-SERVER
npm run dev
```

### NEWTAB STARTING FRONTEND
```
cd ~/sites/PEVN-SITE/PEVN-OAUTH-CLIENT
npm run serve
```

### OPEN BROWSER
```
http://localhost:8081/
```

### OAUTH SERVER
```
/home/pevn/sites/PEVN-SITE/PEVN-OATH-CLIENT/fusionauth/bin/startup.sh
```

```
http://localhost:9011
```
