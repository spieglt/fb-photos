# Description

This tool downloads all photos you're tagged in on Facebook. You will be prompted for your username, password, and whether you want to start from the most recent photos (backward) or the oldest (forward). A Chrome window will then open to Facebook, log you in, navigate to Photos of You, and start downloading. Because it uses a fresh Chrome instance, it will save the pictures to your default Downloads directory (`C:\Users\You\Downloads` or `~/Downloads`), though you can change this during the transfer in Chrome's settings. It does not handle videos.

# Setup and Use

- Install Node.js/NPM: https://nodejs.org/en/download/
- Download or clone this repo (then unzip to a folder if downloading: https://github.com/spieglt/fb-photos/archive/master.zip)
- Open your terminal or command prompt or Powershell and navigate to the fb-delete folder
- Run `npm install` to install dependencies, wait for it to finish
- Run `node ./index.js`, follow the prompts, and press `Enter`
- When the Chrome window appears, click `Allow` or `Block` to the prompt for Facebook to send you notifications, and then click `Allow` when prompted to let Chrome download multiple files.

Also strongly recommended: https://blog.mozilla.org/firefox/facebook-container-extension/

**Please Check Out:** 
https://github.com/spieglt/flyingcarpet
