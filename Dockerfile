FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY --chown=node:node package.json server.js index.html agri_text_sms_simulator.html agri_text_sms_simulator.js ./

USER node
EXPOSE 3000

CMD ["npm", "start"]
