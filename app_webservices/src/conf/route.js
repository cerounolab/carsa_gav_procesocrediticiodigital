const { Router }    = require('express');
const router        = Router();

require('express-group-routes');

//ENDPOINTS
const { getDominio, getDominioId, getDominioValor, postDominio, putDominio, deleteDominio} = require('../controllers/DOMFICController');
const { getEmpresa, getEmpresaId, getEmpresaRUC, getEmpresaTipoRubro, postEmpresa, putEmpresa, deleteEmpresa } = require('../controllers/EMPFICController');
const { getSucursal, getSucursalId, getSucursalEmpresaId, getEmpresaTipoSucursal, postSucursal, putSucursal, deleteSucursal } = require('../controllers/SUCFICController');
const { getUsuario, getUsuarioId, getUsuarioEmpresaId, getUsuarioSucursalId, getUsuarioDocumento, getUsuarioUsu, getUsuarioDocumentoEmpresa, postUsuario,  postUsuarioLogin, putUsuario, deleteUsuario} = require('../controllers/USUFICController');



router.group('/v1/', (routerGroup) => {
  routerGroup.get('/dominio/listado', getDominio);
  routerGroup.get('/dominio/codigo/:codigo', getDominioId);
  routerGroup.get('/dominio/valor/:valor', getDominioValor);
  routerGroup.post('/dominio', postDominio);
  routerGroup.put('/dominio/:codigo', putDominio);
  routerGroup.delete('/dominio/:codigo', deleteDominio);

  routerGroup.get('/empresa/listado', getEmpresa);
  routerGroup.get('/empresa/codigo/:codigo', getEmpresaId);
  routerGroup.get('/empresa/ruc/:ruc', getEmpresaRUC);
  routerGroup.get('/empresa/tiporubro/:tiporubro', getEmpresaTipoRubro);
  routerGroup.post('/empresa', postEmpresa);
  routerGroup.put('/empresa/:codigo', putEmpresa);
  routerGroup.delete('/empresa/:codigo', deleteEmpresa);

  routerGroup.get('/sucursal/listado', getSucursal);
  routerGroup.get('/sucursal/codigo/:codigo', getSucursalId);
  routerGroup.get('/sucursal/empresa/:empresa', getSucursalEmpresaId);
  routerGroup.get('/sucursal/tiposucursal/:tiposucursal', getEmpresaTipoSucursal);
  routerGroup.post('/sucursal', postSucursal);
  routerGroup.put('/sucursal/:codigo', putSucursal);
  routerGroup.delete('/sucursal/:codigo', deleteSucursal);

  routerGroup.get('/usuario/listado', getUsuario);
  routerGroup.get('/usuario/codigo/:codigo', getUsuarioId);
  routerGroup.get('/usuario/empresa/:empresa', getUsuarioEmpresaId);
  routerGroup.get('/usuario/sucursal/:sucursal', getUsuarioSucursalId);
  routerGroup.get('/usuario/documento/:documento', getUsuarioDocumento);
  routerGroup.get('/usuario/documento/:documento/empresa/:empresa', getUsuarioDocumentoEmpresa);
  routerGroup.get('/usuario/usuario/:usuario', getUsuarioUsu);
  routerGroup.post('/usuario/registro', postUsuario);
  routerGroup.post('/usuario/login', postUsuarioLogin);
  routerGroup.put('/usuario/:codigo', putUsuario);
  routerGroup.delete('/usuario/:codigo', deleteUsuario);

}); 

module.exports = router;