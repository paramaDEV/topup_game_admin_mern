var express = require('express');
var router = express.Router();
var {index,viewCreate,actionCreate,viewEdit,actionEdit,actionDelete} = require('./controller')

/* GET home page. */
router.get('/',index)
router.get('/create',viewCreate)
router.post('/create',actionCreate)
router.get('/edit/:id',viewEdit)
router.put('/edit',actionEdit)
router.delete('/delete',actionDelete)
module.exports = router;
