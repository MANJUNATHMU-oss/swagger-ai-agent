import createApp from './app';
import config from './config';

const app = createApp();

const port = process.env.PORT || (config.app && config.app.port) || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
