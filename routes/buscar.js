const { Router } = require("express");
const { buscar } = require("../controllers/buscar");



router = Router();

router.get('/:coleccion/:termino', buscar)




module.exports = router;


