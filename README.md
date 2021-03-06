<div align="center">
  <img src="static/img/dojimanetworklogo.png?raw=true">
</div>

 ## Dojima Docs
 
 ## Overview
This repo contains the contents for our docs deployed [here](https://docs.dojima.network).

The website is built using [Docusaurus 2](https://docusaurus.io/).

## Deployment
set environment variables
```ts
EXPORT TAG=2022_03_12-v0.0.1-master
EXPORT REGION=region_name
```
run deploy.sh script to push to aws ecr repository.

## Contributing

Contributing to the docs site is a great way to get involved with the Dojima dev community! Here's some things you need to know to get started.

### Contents
* All the docs are located in the [docs](docs) directory.
* The left side-bar of the page is controlled by [sidebars.js](sidebars.js).
* Extensive docs for Docusaurus can be found [here](https://docusaurus.io/docs).

### Pull Request (PR)
* All PRs should be made against the `master` branch.
* Once your PR is merged into `master`, [https://docs.dojima.network/](https://docs.dojima.network/) will be updated with your changes.


### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
