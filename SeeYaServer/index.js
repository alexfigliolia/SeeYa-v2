import Express, { json } from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import Graph from 'Graph';
import Listeners from 'Listeners';
import Logger from 'Logger';
import Routes from 'Routes';
import Authentication from 'Middleware/Authentication';

require('dotenv').config();
Listeners();

const PORT = process.env.PORT || 3001;
const IS_DEV = process.env.NODE_ENV === 'development';
const App = Express();

App.use(json());
App.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

App.use('/api', Authentication, Routes);

App.use('/graphql', (req, res) => {
  graphqlHTTP({
    schema: Graph,
    graphiql: IS_DEV,
    context: { req },
    pretty: IS_DEV,
    customFormatErrorFn: error => {
      // console.log('\n\n\n\n\n', 'CUSTOM ERROR', JSON.stringify(error));
      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
      }
    }
  })(req, res)
});

App.listen(PORT, () => {
  Logger.log(['green', 'bold'], `\n» Server is listening on port ${PORT}\n`);
});