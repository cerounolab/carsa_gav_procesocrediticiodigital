const { Router }    = require('express');
const router        = Router();

require('express-group-routes');

//ENDPOINTS
const { getDominio, getDominioId, getDominioValor, postDominio, putDominio, deleteDominio} = require('../controllers/DOMFICController');
const { getEmpresa, getEmpresaId, getEmpresaRUC, getEmpresaTipoRubro, postEmpresa, putEmpresa, deleteEmpresa } = require('../controllers/EMPFICController');
const { getSucursal, getSucursalId, getSucursalEmpresaId, getEmpresaTipoSucursal, postSucursal, putSucursal, deleteSucursal } = require('../controllers/SUCFICController');
const { getUsuario, getUsuarioId, getUsuarioEmpresaId, getUsuarioSucursalId, getUsuarioDocumento, getUsuarioUsu, getUsuarioDashboardEmpresa, getUsuarioDocumentoEmpresa, postUsuario,  postUsuarioLogin, putUsuario, deleteUsuario} = require('../controllers/USUFICController');
const { getRol, getRolId, getRolEmpresaId, postRol, putRol, deleteRol } = require('../controllers/ROLFICController');
const { getCampanha, getCampanhaId, getCampanhaTipoCampanha, getCampanhaEmpresaId, postCampanha, putCampanha, deleteCampanha } = require('../controllers/CAMFICController');
const { getFormulario, getFormularioId, getFormularioEmpresaId, postFormulario, putFormulario, deleteFormulario } = require('../controllers/FORFICController');
const { getRolFormulario, getRolFormularioId, getRolFormularioEmpresaId, postRolFormulario, putRolFormulario, deleteRolFormulario } = require('../controllers/ROLFORController');
const { getUsuarioRol, getUsuarioRolId, postUsuarioRol, putUsuarioRol, deleteUsuarioRol } = require('../controllers/USUROLController');
const { getUsuarioCampanha, getUsuarioCampanhaId, postUsuarioCampanha, putUsuarioCampanha, deleteUsuarioCampanha } = require('../controllers/USUCAMController');
const { getUsuarioFlujo, getUsuarioFlujoUsuarioSup, getUsuarioFlujoUsuarioSub, getUsuarioFlujoRolSup, getUsuarioFlujoRolSub, getUsuarioFlujoRolSubEmpresa,
  getUsuarioFlujoRolSupEmpresa, getUsuarioFlujoId, postUsuarioFlujo, putUsuarioFlujo, deleteUsuarioFlujo } = require('../controllers/USUFLUController');

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

  routerGroup.get('/sucursal/listado/empresa/:empresa', getSucursal);
  routerGroup.get('/sucursal/codigo/:codigo', getSucursalId);
  routerGroup.get('/sucursal/empresa/:empresa', getSucursalEmpresaId);
  routerGroup.get('/sucursal/tiposucursal/:tiposucursal', getEmpresaTipoSucursal);
  routerGroup.post('/sucursal', postSucursal);
  routerGroup.put('/sucursal/:codigo', putSucursal);
  routerGroup.delete('/sucursal/:codigo', deleteSucursal);

  routerGroup.get('/usuario/listado/empresa/:empresa', getUsuario);
  routerGroup.get('/usuario/codigo/:codigo', getUsuarioId);
  routerGroup.get('/usuario/documento/:documento', getUsuarioDocumento);
  routerGroup.get('/usuario/usuario/:usuario', getUsuarioUsu);
  routerGroup.get('/usuario/empresa/:empresa', getUsuarioEmpresaId);
  routerGroup.get('/usuario/sucursal/:sucursal', getUsuarioSucursalId);
  routerGroup.get('/usuario/documento/:documento/empresa/:empresa', getUsuarioDocumentoEmpresa);
  routerGroup.get('/usuario/dashboard/empresa/:empresa', getUsuarioDashboardEmpresa);
  routerGroup.post('/usuario/registro', postUsuario);
  routerGroup.post('/usuario/login', postUsuarioLogin);
  routerGroup.put('/usuario/:codigo', putUsuario);
  routerGroup.delete('/usuario/:codigo', deleteUsuario);

  routerGroup.get('/rol/listado/empresa/:empresa', getRol);
  routerGroup.get('/rol/codigo/:codigo', getRolId);
  routerGroup.get('/rol/empresa/:empresa', getRolEmpresaId);
  routerGroup.post('/rol', postRol);
  routerGroup.put('/rol/:codigo', putRol);
  routerGroup.delete('/rol/:codigo', deleteRol);

  routerGroup.get('/campanha/listado/empresa/:empresa', getCampanha);
  routerGroup.get('/campanha/codigo/:codigo', getCampanhaId);
  routerGroup.get('/campanha/tipocampanha/:tipocampanha', getCampanhaTipoCampanha);
  routerGroup.get('/campanha/empresa/:empresa', getCampanhaEmpresaId);
  routerGroup.post('/campanha', postCampanha);
  routerGroup.put('/campanha/:codigo', putCampanha);
  routerGroup.delete('/campanha/:codigo', deleteCampanha);

  routerGroup.get('/formulario/listado/empresa/:empresa', getFormulario);
  routerGroup.get('/formulario/codigo/:codigo', getFormularioId);
  routerGroup.get('/formulario/empresa/:empresa', getFormularioEmpresaId);
  routerGroup.post('/formulario', postFormulario);
  routerGroup.put('/formulario/:codigo', putFormulario);
  routerGroup.delete('/formulario/:codigo', deleteFormulario);

  routerGroup.get('/rolformulario/listado/empresa/:empresa', getRolFormulario);
  routerGroup.get('/rolformulario/empresa/:empresa', getRolFormularioEmpresaId);
  routerGroup.get('/rolformulario/codigorol/:codigorol/codigoformulario/:codigoformulario', getRolFormularioId);
  routerGroup.post('/rolformulario', postRolFormulario);
  routerGroup.put('/rolformulario/codigorol/:codigorol/codigoformulario/:codigoformulario', putRolFormulario);
  routerGroup.delete('/rolformulario/codigorol/:codigorol/codigoformulario/:codigoformulario', deleteRolFormulario);

  routerGroup.get('/usuariorol/listado/empresa/:empresa', getUsuarioRol);
  routerGroup.get('/usuariorol/codigousuario/:codigousuario/codigorol/:codigorol/empresa/:empresa', getUsuarioRolId);
  routerGroup.post('/usuariorol', postUsuarioRol);
  routerGroup.put('/usuariorol/codigousuario/:codigousuario/codigorol/:codigorol', putUsuarioRol);
  routerGroup.delete('/usuariorol/codigousuario/:codigousuario/codigorol/:codigorol', deleteUsuarioRol);

  routerGroup.get('/usuariocampanha/listado/empresa/:empresa', getUsuarioCampanha);
  routerGroup.get('/usuariocampanha/codigousuario/:codigousuario/codigocampanha/:codigocampanha/empresa/:empresa', getUsuarioCampanhaId);
  routerGroup.post('/usuariocampanha', postUsuarioCampanha);
  routerGroup.put('/usuariocampanha/codigousuario/:codigousuario/codigocampanha/:codigocampanha', putUsuarioCampanha);
  routerGroup.delete('/usuariocampanha/codigousuario/:codigousuario/codigocampanha/:codigocampanha', deleteUsuarioCampanha);

  routerGroup.get('/usuarioflujo/listado/empresa/:empresa', getUsuarioFlujo);
  routerGroup.get('/usuarioflujo/usuariosuperior/:usuariosuperior', getUsuarioFlujoUsuarioSup);
  routerGroup.get('/usuarioflujo/usuariosubordinado/:usuariosubordinado', getUsuarioFlujoUsuarioSub);
  routerGroup.get('/usuarioflujo/rolsuperior/:rolsuperior', getUsuarioFlujoRolSup);
  routerGroup.get('/usuarioflujo/rolsubordinado/:rolsubordinado', getUsuarioFlujoRolSub);
  routerGroup.get('/usuarioflujo/rolsubordinado/:rolsubordinado/empresa/:empresa', getUsuarioFlujoRolSubEmpresa);
  routerGroup.get('/usuarioflujo/rolsuperior/:rolsuperior/empresa/:empresa', getUsuarioFlujoRolSupEmpresa);
  routerGroup.get('/usuarioflujo/usuariosuperior/:usuariosuperior/rolsuperior/:rolsuperior/usuariosubordinado/:usuariosubordinado/rolsubordinado/:rolsubordinado', getUsuarioFlujoId);
  routerGroup.post('/usuarioflujo', postUsuarioFlujo);
  routerGroup.put('/usuarioflujo/usuariosuperior/:usuariosuperior/rolsuperior/:rolsuperior/usuariosubordinado/:usuariosubordinado/rolsubordinado/:rolsubordinado', putUsuarioFlujo);
  routerGroup.delete('/usuarioflujo/usuariosuperior/:usuariosuperior/rolsuperior/:rolsuperior/usuariosubordinado/:usuariosubordinado/rolsubordinado/:rolsubordinado', deleteUsuarioFlujo);



}); 

module.exports = router;