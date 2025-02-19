import { createRouter } from '../../../express_model/express';

const router = createRouter();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

router.get('/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/', (req, res) => {
  const id = Math.floor(Math.random() * (1000 - 0)) + 0
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

router.delete('/:messageId', (req, res) => {
  const message = req.context.models.messages[req.params.messageId];
  const otherMessages = delete req.context.models.messages[req.params.messageId];

  req.context.models.messages = otherMessages;

  return res.send(message);
});

router.put('/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message
  } = req.context.models.messages;

  const updatedMessage = {
    message,
    text: req.body.text
  };

  req.context.models.messages[req.params.messageId] = updatedMessage;

  return res.send(updatedMessage);
})

export default router;
