Before you start to build service-worker for production you should configure it.

For this, you should execute:

```console
yarn sw
```

This will run the command:

```console
node config-service-worker.js
```

This script creates the file list with the last modification date of each file.

Service worker works with this file list to find the newest versions for cached files.
