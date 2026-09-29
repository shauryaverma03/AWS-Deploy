# Production deployment

These steps assume an Ubuntu-based EC2 instance and that the repository is deployed to `/var/www/aws`.

## Install the runtime

```sh
sudo apt update
sudo apt install -y nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

## Start the app with PM2

```sh
cd /var/www/aws
npm ci --omit=dev
npm run pm2:start
pm2 save
pm2 startup
```

Run the `sudo ...` command printed by `pm2 startup`, then run `pm2 save` again.

## Configure Nginx

```sh
sudo cp deploy/nginx.conf /etc/nginx/sites-available/aws
sudo ln -s /etc/nginx/sites-available/aws /etc/nginx/sites-enabled/aws
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

The included config listens on port 80 and proxies to the PM2 app on `127.0.0.1:3000`. Replace `server_name _;` with the server's domain name when one is available.

## Useful commands

```sh
npm run pm2:restart
npm run pm2:stop
npm run pm2:logs
sudo systemctl status nginx
```