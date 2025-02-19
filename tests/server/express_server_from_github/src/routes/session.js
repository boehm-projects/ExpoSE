import { createRouter } from '../../../express_model/express';

const router = createRouter();

router.get('/', (req, res) => {
  console.log("get session", req.context.models.users[req.context.me.id])
  return res.send(req.context.models.users[req.context.me.id]);
});

export default router;
