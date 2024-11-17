const { google } = require('googleapis');
const express = require ('express');
const app = express();
const port = 5000;
const path = require('path');
const fs = require('fs');

const clientid = '16768062663-i5v43pf8eu3udprak46hdqvs96ictm4l.apps.googleusercontent.com';
const clientsecret = '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';
const redirecturi = 'https://developers.google.com/oauthplayground';
const refreshtoken = '1//04AYOmjxJTAnBCgYIARAAGAQSNwF-L9IroaEjEVmJtHgc4Sqxy6QXk-10rbjeYb1dHgInfXxEL6-QL-ec3WHJNs21CmhDdSumqxw';
const destinationFolder = 'C:/Destination';

const oauthtoclient = new google.auth.OAuth2(clientid, clientsecret, redirecturi);
oauthtoclient.setCredentials({ refresh_token: refreshtoken });

const drive = google.drive({ version: 'v3', auth: oauthtoclient });



async function listFiles() {
  try {
    const response = await drive.files.list({ fields: 'files(id, name)' });
    if (response.data.files && response.data.files.length > 0) {
      for (const file of response.data.files) {
        console.log(`File Name: ${file.name}, ID: ${file.id}`);
        await syncFile(file.id, destinationFolder, file.name);
        await deleteFile(file.id);
      }
    } else {
      console.log('No files found.');
    }
  } catch (error) {
    console.error('Error listing files:', error.message);
  }
}

async function syncFile(fileId, destinationFolder, fileName) {
  try {
    const filePath = path.join(destinationFolder, fileName);
    const dest = fs.createWriteStream(filePath);
    const downloadResponse = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });

    await new Promise((resolve, reject) => {
      downloadResponse.data
        .on('end', () => {
          console.log('Download completed.');
          resolve();
        })
        .on('error', (err) => {
          console.error('Error during download:', err.message);
          reject(err);
        })
        .pipe(dest);
    });
  } catch (error) {
    console.error('SyncFile operation:', error.message);
  }
}

async function deleteFile(fileId) {
  try {
    const response = await drive.files.delete({ fileId });
    console.log(response.data, response.status);
  } catch (error) {
    console.error('Error deleting file:', error.message);
  }
}

app.get('/list-files', async (req,res)=> {
    try {
        await listFiles();
        res.status(204).send('syncing complete');
    }
    catch(error) {
        console.error("error in syncing ");
    }
});

app.listen(port, ()=>{
    console.log("server is running ");
})

// listFiles();
