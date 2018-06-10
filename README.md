![fireData](http://frapbot.kohze.com/SpatialMaps/SpatialMap_cover.jpg)

Platform: https://SpatialMap.org 

---

### About

SpatialMap aims to connect and spatial proteomics data (analyzed with pRoloc or retrived from pRolocdata) in a dynamic and interactive way. The SpatialMap framework runs on distributed webservers (CDN) and the Firebase Cloud - and seamlessly connects to existing workflows via the SpatialMap R API library. 



### Setting the project up:

##### Required Environment:
- node 6.4.0+
- npm 3.10.7+

##### Run SpatialMap:
```
git clone https://github.com/SpatialMap/SpatialMapDev.git
npm run start
(open localhost:3000 in browser)
```

in case errors appear you might need to add

```
npm install --save firebase
npm install --save react-dimensions
npm install --save react-parallel-coordinates
```

##### Deploy to server:
https://firebase.google.com/docs/hosting/deploying
```
npm run build
firebase deploy
```

### Specifications:

##### boilerplate preset:
- react 15.4.1
- webpack 2.2
- babel 6.x
- eslint: 3.11
- redux: 3.6.0

##### added:
- office-ui-fabric-react : 2.24.0
- react-svg-pan-zoom: 2.7.0
- d3 : 3.5.17
- firebase 3.9.0

---
