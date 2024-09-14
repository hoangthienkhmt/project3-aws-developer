### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:
1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

### Create endpoint in the server.ts file

The starter code has a task for you to complete an endpoint in `./src/server.ts` which uses query parameter to view an image from a URL, and return the result.

we have to import it for you at the top of the `./src/server.ts`  file.

```typescript
import { filterImageFromURL, deleteLocalFiles } from './util/util.js';
```
### Deployment
Follow the process described in the course:
`eb init` a new application.
`eb create` a new environment to deploy your service.
`eb deploy` to push changes.
