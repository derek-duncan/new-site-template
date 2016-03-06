const projectName = 'template';

export default {
  name: projectName,
  koa: {
    port: 3000,
  },
  mongodb: {
    url: `localhost:27017/${projectName}`,
  },
};
