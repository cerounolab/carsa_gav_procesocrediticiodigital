require('dotenv').config({ path:__dirname+'/./../../.env' });

const camelcaseKeys = require('camelcase-keys');

const {selectPERSONA}= require('../helpers/sql_select');
const {insertPERFIC, insertCLIFIC, insertOPESOL}    = require('../helpers/sql_insert');
const {formatDateTime}  = require('../utils/_json_date');
const {jsonBody}        = require('../utils/_json');

const postOperacionSolicitud  = (apiREQ, apiRES) => {
    let  xDATA      = []; 
/*
    $SCID       = 0;
    $SCAACUEN   = $request->getParsedBody()['persona_cuenta'];
    $SCGP       = strtoupper(trim($request->getParsedBody()['solicitud_parentesco']));
    $SCFECHA    = date('d/m/Y');
    $SCMONTO    = $request->getParsedBody()['solicitud_monto'];
    $SCCUOTA    = $request->getParsedBody()['solicitud_cuota'];
    $SCPLAZO    = $request->getParsedBody()['solicitud_plazo'];
    $SCFEVENC   = date('d/m/Y', strtotime($request->getParsedBody()['solicitud_primer_vencimiento']));
    $SCEJEVENT  = intval($request->getParsedBody()['solicitud_ejecutivoventa_codigo']);
    $SCEJEVENOM = $SCEJEVENT;
    $SCSUPVENT  = $SCEJEVENT;
    $SCTIPOPE   = intval($request->getParsedBody()['solicitud_tipooperacion_codigo']);

    //DATOS PERSONA
    $SCNOM      = strtoupper(trim($request->getParsedBody()['persona_nombre']));
    $SCAPE      = strtoupper(trim($request->getParsedBody()['persona_apellido']));
    $SCAPECA    = strtoupper(trim($request->getParsedBody()['persona_apellido_casada']));
    $SCCI       = strtoupper(trim($request->getParsedBody()['persona_documento_numero']));
    $SCPAISNAC  = intval($request->getParsedBody()['localidad_pais_codigo']);
    $SCPAISNACD = $SCPAISNAC;
    $SCFECHNAC  = date('d/m/Y', strtotime($request->getParsedBody()['persona_fecha_nacimiento']));
    $SCESTCI    = intval($request->getParsedBody()['tipo_estadocivil_parametro']);
    $SCRUCTI    = strtoupper(trim($request->getParsedBody()['persona_documento_ruc']));
    $SCSEXO     = intval($request->getParsedBody()['tipo_sexo_parametro']);

    //DATOS PERSONALES
    $SCCALLE1TI = strtoupper(trim($request->getParsedBody()['persona_datoparticular_principal']));
    $SCCALLE2TI = strtoupper(trim($request->getParsedBody()['persona_datoparticular_esquina']));
    $SCDPTOTI   = intval($request->getParsedBody()['persona_datoparticular_localidad_departamento_codigo']);
    $SCDPTOTID  = $SCDPTOTI;
    $SCCIUDTI   = intval($request->getParsedBody()['persona_datoparticular_localidad_ciudad_codigo']);
    $SCCIUDTID  = $SCCIUDTI;
    $SCBARRIOTI = intval($request->getParsedBody()['persona_datoparticular_localidad_barrio_codigo']);
    $SCBARRIOTID= $SCBARRIOTI;
    $SCNROCASA  = intval($request->getParsedBody()['persona_datoparticular_casanumero']);
    $SCTELEFTI  = strtoupper(trim($request->getParsedBody()['persona_datoparticular_telefono']));
    $SCCELTI    = strtoupper(trim($request->getParsedBody()['persona_datoparticular_celular']));
    $SCEMAILTI  = strtolower(trim($request->getParsedBody()['persona_datoparticular_email']));
    $SCVIVIENDA = intval($request->getParsedBody()['persona_datoparticular_tipo_vivienda_parametro']);

    //DATOS LABORALES
    $SCEMPP     = intval($request->getParsedBody()['persona_datolaboral_empresa_codigo']);
    $SCEMPPD    = $SCEMPP;
    $SCPROFESP  = intval($request->getParsedBody()['persona_datolaboral_profesion_codigo']);
    $SCPROFESPD = $SCPROFESP;
    $SCCARGOP   = intval($request->getParsedBody()['persona_datolaboral_cargo_codigo']);
    $SCCARGOPD  = $SCCARGOP;
    $SCACTILAP  = intval($request->getParsedBody()['persona_datolaboral_actividad_codigo']);
    $SCACTILAPD = $SCACTILAP;
    $SCTIPAJ    = intval($request->getParsedBody()['persona_datolaboral_aportejubilatorio_codigo']);
    $SCFECINGP  = date('d/m/Y', strtotime($request->getParsedBody()['persona_datolaboral_fechaingreso']));
    $SCHORLABDP = strtoupper(trim($request->getParsedBody()['persona_datolaboral_hora_desde']));
    $SCHORDDP   = $SCHORLABDP;
    $SCHORLABHP = strtoupper(trim($request->getParsedBody()['persona_datolaboral_hora_hasta']));
    $SCHORDHP   = $SCHORLABHP;
    $SCCALLE1P  = strtoupper(trim($request->getParsedBody()['persona_datolaboral_principal']));
    $SCCALLE2P  = strtoupper(trim($request->getParsedBody()['persona_datolaboral_esquina']));
    $SCNROP     = strtoupper(trim($request->getParsedBody()['persona_datolaboral_casanumero']));
    $SCDEPTOP   = intval($request->getParsedBody()['persona_datolaboral_localidad_departamento_codigo']);
    $SCCIUDADP  = intval($request->getParsedBody()['persona_datolaboral_localidad_ciudad_codigo']);
    $SCCIUPDES  = $SCCIUDADP;
    $SCBARIOP   = intval($request->getParsedBody()['persona_datolaboral_localidad_barrio_codigo']);
    $SCBAPDES   = $SCBARIOP;
    $SCTELEF1P  = strtoupper(trim($request->getParsedBody()['persona_datolaboral_telefono1']));
    $SCTELEF2P  = strtoupper(trim($request->getParsedBody()['persona_datolaboral_telefono2']));
    $SCTELEF3P  = strtoupper(trim($request->getParsedBody()['persona_datolaboral_telefono3']));
    $SCINTERP   = intval($request->getParsedBody()['persona_datolaboral_interno']);
    $SCEMAILP   = strtolower(trim($request->getParsedBody()['persona_datolaboral_email']));
    $SCSALAMP   = intval($request->getParsedBody()['persona_datolaboral_salario']);
    $SCFECCOBP  = intval($request->getParsedBody()['persona_datolaboral_diacobro']);
    $SCLUP      = strtolower(trim($request->getParsedBody()['persona_datolaboral_dialunes']));
    $SCMARP     = strtolower(trim($request->getParsedBody()['persona_datolaboral_diamartes']));
    $SCMIERP    = strtolower(trim($request->getParsedBody()['persona_datolaboral_diamiercoles']));
    $SCJUEP     = strtolower(trim($request->getParsedBody()['persona_datolaboral_diajueves']));
    $SCVIERP    = strtolower(trim($request->getParsedBody()['persona_datolaboral_diaviernes']));
    $SCSABP     = strtolower(trim($request->getParsedBody()['persona_datolaboral_diasabado']));
    $SCDOMP     = strtolower(trim($request->getParsedBody()['persona_datolaboral_diadomingo']));

    //DATOS REFERENCIAS
    $SCREFPER1  = strtoupper(trim($request->getParsedBody()['persona_datoreferencia_contacto1_nombre']));
    $SCREFPERP1 = strtoupper(trim($request->getParsedBody()['persona_datoreferencia_contacto1_parentesco']));
    $SCREFPPRF1 = strtoupper(trim($request->getParsedBody()['persona_datoreferencia_contacto1_prefijo']));
    $SCREFPERT1 = strtoupper(trim($request->getParsedBody()['persona_datoreferencia_contacto1_numero']));
    $SCREFPER2  = strtoupper(trim($request->getParsedBody()['persona_datoreferencia_contacto2_nombre']));
    $SCREFPERP2 = strtoupper(trim($request->getParsedBody()['persona_datoreferencia_contacto2_parentesco']));
    $SCREFPPRF2 = strtoupper(trim($request->getParsedBody()['persona_datoreferencia_contacto2_prefijo']));
    $SCREFPERT2 = strtoupper(trim($request->getParsedBody()['persona_datoreferencia_contacto2_numero']));
    $SCREFPER3  = strtoupper(trim($request->getParsedBody()['persona_datoreferencia_contacto3_nombre']));
    $SCREFPERP3 = strtoupper(trim($request->getParsedBody()['persona_datoreferencia_contacto3_parentesco']));
    $SCREFPPRF3 = strtoupper(trim($request->getParsedBody()['persona_datoreferencia_contacto3_prefijo']));
    $SCREFPERT3 = strtoupper(trim($request->getParsedBody()['persona_datoreferencia_contacto3_numero']));

    //SOLICITUD OPERACION
    $SCESTADO   = strtoupper(trim($request->getParsedBody()['solicitud_estadooperacion_codigo']));
    $SCUSUAL    = strtoupper(trim($request->getParsedBody()['auditoria_usuario']));
    $SCUSUAL2   = strtoupper(trim($request->getParsedBody()['auditoria_plataforma']));
    $SCUSUMOD   = $SCUSUAL;
    $SCFECAL    = date('d/m/Y');
    $SCFECMOD   = $SCFECAL;
    $SCHORAAL   = date('H:i:s');
    $SCHORAMOD  = $SCHORAAL;
    $SCASIGNADO = $SCEJEVENT;
    $SCCANAL    = $SCEJEVENT;
    $PTKCODE    = intval($request->getParsedBody()['solicitud_campanha_codigo']);
    $SCSOLTIP   = strtoupper(trim($request->getParsedBody()['solicitud_tiposolicitud_codigo']));
    $SCMED      = intval($request->getParsedBody()['solicitud_medio_codigo']);
    $SCFOPAGO   = intval($request->getParsedBody()['solicitud_formapago_codigo']);
    $SCENTE     = intval($request->getParsedBody()['solicitud_banco_codigo']);
    $SCCTABAN   = strtoupper(trim($request->getParsedBody()['solicitud_banco_cuenta']));
    $SCTIPCUEN  = strtoupper(trim($request->getParsedBody()['solicitud_banco_tipo']));
    $SCDOCADD   = strtoupper(trim($request->getParsedBody()['solicitud_documento_adjunto']));
    $SCTOPER    = strtoupper(trim($request->getParsedBody()['solicitud_tipooperador_codigo']));
    $SCBGARAN   = intval($request->getParsedBody()['solicitud_garante_codigo']);
    $SCBANCA    = intval($request->getParsedBody()['solicitud_banca_codigo']);
    $SCCUODINA  = strtoupper(trim($request->getParsedBody()['solicitud_cuota_dinamica']));

    $WFINSPRCID = 0;
    $WFINSPRCSU = '';

    if (isset($SCAACUEN) && issetL($SCMONTO) && isset($SCPLAZO) && isset($SCFEVENC)) {

*/
    let _aPERFICTPC = (apiREQ.body.tipo_persona_parametro != undefined && apiREQ.body.tipo_persona_parametro != null && apiREQ.body.tipo_persona_parametro != '' && apiREQ.body.tipo_persona_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_persona_parametro) : false;   																						           
    let _aPERFICTDC = (apiREQ.body.tipo_documento_parametro != undefined && apiREQ.body.tipo_documento_parametro != null && apiREQ.body.tipo_documento_parametro != '' && apiREQ.body.tipo_documento_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_documento_parametro) : false;   																						           
    let _aPERFICTSC = (apiREQ.body.tipo_sexo_parametro != undefined && apiREQ.body.tipo_sexo_parametro != null && apiREQ.body.tipo_sexo_parametro != '' && apiREQ.body.tipo_sexo_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_sexo_parametro) : false;   																						           
    let _aPERFICTEC = (apiREQ.body.tipo_estadocivil_parametro != undefined && apiREQ.body.tipo_estadocivil_parametro != null && apiREQ.body.tipo_estadocivil_parametro != '' && apiREQ.body.tipo_estadocivil_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_estadocivil_parametro) : false;   																						            
    let _aPERFICNAC = (apiREQ.body.localidad_pais_codigo != undefined && apiREQ.body.localidad_pais_codigo != null && apiREQ.body.localidad_pais_codigo != '' && apiREQ.body.localidad_pais_codigo > 0) ? Number.parseInt(apiREQ.body.localidad_pais_codigo) : false;   																						            
    let _aPERFICEMC = (apiREQ.body.empresa_codigo != undefined && apiREQ.body.empresa_codigo != null && apiREQ.body.empresa_codigo != '' && apiREQ.body.empresa_codigo > 0) ? Number.parseInt(apiREQ.body.empresa_codigo) : false;   																						            
    let _aPERFICNO1 = (apiREQ.body.persona_nombre_primer != undefined && apiREQ.body.persona_nombre_primer != null && apiREQ.body.persona_nombre_primer != '') ? "'"+apiREQ.body.persona_nombre_primer.trim().toUpperCase()+"'" : false;//string.charAt(0).toUpperCase()
    let _aPERFICNO2 = (apiREQ.body.persona_nombre_segundo != undefined && apiREQ.body.persona_nombre_segundo != null && apiREQ.body.persona_nombre_segundo != '') ? "'"+apiREQ.body.persona_nombre_segundo.trim()+"'" : null;      
    let _aPERFICAP1 = (apiREQ.body.persona_apellido_paterno != undefined && apiREQ.body.persona_apellido_paterno != null && apiREQ.body.persona_apellido_paterno != '') ? "'"+apiREQ.body.persona_apellido_paterno.trim().toUpperCase()+"'" : false;
    let _aPERFICAP2 = (apiREQ.body.persona_apellido_materno != undefined && apiREQ.body.persona_apellido_materno != null && apiREQ.body.persona_apellido_materno != '') ? "'"+apiREQ.body.persona_apellido_materno.trim()+"'" : null;        
    let _aPERFICAP3 = (apiREQ.body.persona_apellido_casada != undefined && apiREQ.body.persona_apellido_casada != null && apiREQ.body.persona_apellido_casada != '') ? "'"+apiREQ.body.persona_apellido_casada.trim()+"'" : null;         
    let _aPERFICDNU = (apiREQ.body.persona_documento_numero != undefined && apiREQ.body.persona_documento_numero != null && apiREQ.body.persona_documento_numero != '') ? "'"+apiREQ.body.persona_documento_numero.trim().toUpperCase()+"'" : false;
    let _aPERFICDVE = (apiREQ.body.persona_documento_fechaemision == undefined || apiREQ.body.persona_documento_fechaemision == null || apiREQ.body.persona_documento_fechaemision == '') ? null: new Date(apiREQ.body.persona_documento_fechaemision);
    let _aPERFICFNA = (apiREQ.body.persona_fecha_nacimiento == undefined || apiREQ.body.persona_fecha_nacimiento == null || apiREQ.body.persona_fecha_nacimiento == '') ? null: new Date(apiREQ.body.persona_fecha_nacimiento);
    let _aPERFICCEL = (apiREQ.body.persona_celular1_numero != undefined && apiREQ.body.persona_celular1_numero != null && apiREQ.body.persona_celular1_numero != '') ? "'"+apiREQ.body.persona_celular1_numero.trim().toLowerCase().toUpperCase()+"'" : null;  
   // let _mPERFICCEL = _aPERFICCEL;
    _aPERFICCEL     = (_aPERFICCEL != null && _aPERFICCEL!= '') ?_aPERFICCEL.replace('(', ''): null;
    _aPERFICCEL     = (_aPERFICCEL != null && _aPERFICCEL!= '') ?_aPERFICCEL.replace(')', ''): null;
    _aPERFICCEL     = (_aPERFICCEL != null && _aPERFICCEL!= '') ?_aPERFICCEL.replace('-', ''): null;
    _aPERFICCEL     = (_aPERFICCEL != null && _aPERFICCEL!= '') ?_aPERFICCEL.replace(' ', ''): null;
    let _PERFICCEL  = _aPERFICCEL;
    let _aPERFICEMA = (apiREQ.body.persona_email != undefined && apiREQ.body.persona_email != null && apiREQ.body.persona_email != '') ? "'"+apiREQ.body.persona_email.trim().toLowerCase()+"'" : null;  
    let _aPERFICNOM = _aPERFICAP1+' '+_aPERFICAP2+', '+_aPERFICNO1+' '+_aPERFICNO2;

    let _aPERDICEST = 1;
    let _aPERDICTDC = 1;
    let _aPERDICTVC = 0;
    let _aPERDICLDC = (apiREQ.body.localidad_departamento_parametro != undefined && apiREQ.body.localidad_departamento_parametro != null && apiREQ.body.localidad_departamento_parametro != '' && apiREQ.body.localidad_departamento_parametro > 0) ? Number.parseInt(apiREQ.body.localidad_departamento_parametro) : false;   																						           
    let _aPERDICLCC = (apiREQ.body.localidad_ciudad_parametro != undefined && apiREQ.body.localidad_ciudad_parametro != null && apiREQ.body.localidad_ciudad_parametro != '' && apiREQ.body.localidad_ciudad_parametro > 0) ? Number.parseInt(apiREQ.body.localidad_ciudad_parametro) : false;   																						           
    let _aPERDICLBC = (apiREQ.body.localidad_barrio_parametro != undefined && apiREQ.body.localidad_barrio_parametro != null && apiREQ.body.localidad_barrio_parametro != '' && apiREQ.body.localidad_barrio_parametro > 0) ? Number.parseInt(apiREQ.body.localidad_barrio_parametro) : false;   																						           
    let _aPERDICPER = null;
    let _aPERDICORD = 999;
    let _aPERDICEQU = null;
    let _aPERDICEDI = null;
    let _aPERDICAPA = null;
    let _aPERDICNRO = null;
    let _aPERDICBAR = (apiREQ.body.persona_direccion_barrio != undefined && apiREQ.body.persona_direccion_barrio != null && apiREQ.body.persona_direccion_barrio != '') ? "'"+apiREQ.body.persona_direccion_barrio.trim()+"'" : null; 
    let _aPERDICCA1 = (apiREQ.body.persona_direccion_calle_principal != undefined && apiREQ.body.persona_direccion_calle_principal != null && apiREQ.body.persona_direccion_calle_principal != '') ? "'"+apiREQ.body.persona_direccion_calle_principal.trim()+"'" : null; 
    let _aPERDICCA2 = (apiREQ.body.persona_direccion_calle_izquierda != undefined && apiREQ.body.persona_direccion_calle_izquierda != null && apiREQ.body.persona_direccion_calle_izquierda != '') ? "'"+apiREQ.body.persona_direccion_calle_izquierda.trim()+"'" : null; 
    let _aPERDICCA3 = (apiREQ.body.persona_direccion_calle_derecha != undefined && apiREQ.body.persona_direccion_calle_derecha != null && apiREQ.body.persona_direccion_calle_derecha != '') ? "'"+apiREQ.body.persona_direccion_calle_derecha.trim()+"'" : null; 
    let _aPERDICREF = (apiREQ.body.persona_direccion_referencia != undefined && apiREQ.body.persona_direccion_referencia != null && apiREQ.body.persona_direccion_referencia != '') ? "'"+apiREQ.body.persona_direccion_referencia.trim()+"'" : null; 
    let _aPERDICMLA = null;
    let _aPERDICMLO = null;
    let _aPERDICMUR = null;
    let _aPERDICMGE = null;
    let _aPERDICPAT = null;
    let _aPERDICFIL = null;
    let _aPERDICAYU = null;
    let _aPERDICOBS = null;

    let _aPEROCUEST  = 1;
    let _aPEROCUTOC  = (apiREQ.body.tipo_ocupacion_parametro != undefined && apiREQ.body.tipo_ocupacion_parametro != null && apiREQ.body.tipo_ocupacion_parametro != '' && apiREQ.body.tipo_ocupacion_parametro > 0) ? Number.parseInt(apiREQ.body.tipo_ocupacion_parametro) : false;   																						           
    let _aPEROCUPER = null;
    let _aPEROCUORD = 999;
    let _aPEROCUEQU = null;
    let _aPEROCUOCU = null;
    let _aPEROCUFDE = null;
    let _aPEROCUFHA = null;
    let _aPEROCUPAT = null;
    let _aPEROCUFIL = null;
    let _aPEROCUAYU = null;
    let _aPEROCUOBS = null;

    let _OPESOLEQU  = (apiREQ.body.operacion_solicitud_equivalente != undefined && apiREQ.body.operacion_solicitud_equivalente != null && apiREQ.body.operacion_solicitud_equivalente != '' && apiREQ.body.operacion_solicitud_equivalente > 0) ? Number.parseInt(apiREQ.body.operacion_solicitud_equivalente) : null;   																						              
    let _OPESOLSIS  = (apiREQ.body.operacion_solicitud_importe != undefined && apiREQ.body.operacion_solicitud_importe != null && apiREQ.body.operacion_solicitud_importe != '' && apiREQ.body.operacion_solicitud_importe > 0) ? Number.parseInt(apiREQ.body.operacion_solicitud_importe) : false;   																						               
    // let _OPESOLSIS  = strreplace('.', '', _OPESOLSIS);
    // let _OPESOLSIS  =  Number.parseInt(_OPESOLSIS);
    let _OPESOLSIC  = (apiREQ.body.operacion_solicitud_cuota != undefined && apiREQ.body.operacion_solicitud_cuota != null && apiREQ.body.operacion_solicitud_cuota != '' && apiREQ.body.operacion_solicitud_cuota > 0) ? Number.parseInt(apiREQ.body.operacion_solicitud_cuota) : null;   																						               
    // let _OPESOLSIC
    // let _OPESOLSIC
    let _OPESOLSPL  = (apiREQ.body.operacion_solicitud_plazo != undefined && apiREQ.body.operacion_solicitud_plazo != null && apiREQ.body.operacion_solicitud_plazo != '' && apiREQ.body.operacion_solicitud_plazo > 0) ? Number.parseInt(apiREQ.body.operacion_solicitud_plazo) : null;   																						               
    let _OPESOLSPV  = (apiREQ.body.operacion_solicitud_primer_vencimiento == undefined || apiREQ.body.operacion_solicitud_primer_vencimiento == null || apiREQ.body.operacion_solicitud_primer_vencimiento == '') ? false: new Date(apiREQ.body.operacion_solicitud_primer_vencimiento);
    let _OPESOLSLA  = (apiREQ.body.operacion_solicitud_latitud != undefined && apiREQ.body.operacion_solicitud_latitud != null && apiREQ.body.operacion_solicitud_latitud != '') ? "'"+apiREQ.body.operacion_solicitud_latitud.trim()+"'" : null; 
    let _OPESOLSLO  = (apiREQ.body.operacion_solicitud_longitud != undefined && apiREQ.body.operacion_solicitud_longitud != null && apiREQ.body.operacion_solicitud_longitud != '') ? "'"+apiREQ.body.operacion_solicitud_longitud.trim()+"'" : null; 

    let _OPESOLEST  = 1;
    let _OPESOLTNC  = (apiREQ.body.tipo_moneda_codigo != undefined && apiREQ.body.tipo_moneda_codigo != null && apiREQ.body.tipo_moneda_codigo != '' && apiREQ.body.tipo_moneda_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_moneda_codigo) : false;
    let _OPESOLTBC  = (apiREQ.body.tipo_banca_codigo != undefined && apiREQ.body.tipo_banca_codigo != null && apiREQ.body.tipo_banca_codigo != '' && apiREQ.body.tipo_banca_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_banca_codigo) : false;
    let _OPESOLTPC  = (apiREQ.body.tipo_producto_codigo != undefined && apiREQ.body.tipo_producto_codigo != null && apiREQ.body.tipo_producto_codigo != '' && apiREQ.body.tipo_producto_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_producto_codigo) : false;
    let _OPESOLTAC  = (apiREQ.body.tipo_campanha_codigo != undefined && apiREQ.body.tipo_campanha_codigo != null && apiREQ.body.tipo_campanha_codigo != '' && apiREQ.body.tipo_campanha_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_campanha_codigo) : false;
    let _OPESOLTCC  = (apiREQ.body.tipo_canal_codigo != undefined && apiREQ.body.tipo_canal_codigo != null && apiREQ.body.tipo_canal_codigo != '' && apiREQ.body.tipo_canal_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_canal_codigo) : false;
    let _OPESOLTMC  = (apiREQ.body.tipo_medio_codigo != undefined && apiREQ.body.tipo_medio_codigo != null && apiREQ.body.tipo_medio_codigo != '' && apiREQ.body.tipo_medio_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_medio_codigo) : false;
    //let _OPESOLCLI = (apiREQ.body.tipo_medio_codigo != undefined && apiREQ.body.tipo_medio_codigo != null && apiREQ.body.tipo_medio_codigo != '' && apiREQ.body.tipo_medio_codigo > 0) ? Number.parseInt(apiREQ.body.tipo_medio_codigo) : false;//intval($row_mssql00_0['cliente_equivalente']);
    let _OPESOLSSU  = 10110;
    let _OPESOLSEJ  = 10110;

    let _CLIFICTCC  = 1;
    let _CLIFICTOC  = 0;
    let _CLIFICTAC  = 0;
    let _CLIFICPER  = _aPERFICDNU;

    let _OPESOLTEM  = 0;
    let _OPESOLCEM  = (apiREQ.body.alta_empresa_codigo != undefined && apiREQ.body.alta_empresa_codigo != null && apiREQ.body.alta_empresa_codigo != '' && apiREQ.body.alta_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.alta_empresa_codigo) : false; 
    let _OPESOLCUS  = (apiREQ.body.alta_usuario != undefined && apiREQ.body.alta_usuario != null && apiREQ.body.alta_usuario != '') ? "'"+apiREQ.body.alta_usuario.trim().toUpperCase()+"'" : false; 
    let _OPESOLCIP  = (apiREQ.body.alta_ip != undefined && apiREQ.body.alta_ip != null && apiREQ.body.alta_ip != '') ? "'"+apiREQ.body.alta_ip.trim().toUpperCase()+"'" : false;  
    let _OPESOLCPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : false;

    let _OPESOLAEM  = (apiREQ.body.auditoria_empresa_codigo != undefined && apiREQ.body.auditoria_empresa_codigo != null && apiREQ.body.auditoria_empresa_codigo != '' && apiREQ.body.auditoria_empresa_codigo > 0) ? Number.parseInt(apiREQ.body.auditoria_empresa_codigo) : false; 
    let _OPESOLAUS  = (apiREQ.body.auditoria_usuario != undefined && apiREQ.body.auditoria_usuario != null && apiREQ.body.auditoria_usuario != '') ? "'"+apiREQ.body.auditoria_usuario.trim().toUpperCase()+"'" : false; 
    let _OPESOLAIP  = (apiREQ.body.auditoria_ip != undefined && apiREQ.body.auditoria_ip != null && apiREQ.body.auditoria_ip != '') ? "'"+apiREQ.body.auditoria_ip.trim().toUpperCase()+"'" : false; 
    let _OPESOLAPR  = (apiREQ.body.alta_programa != undefined && apiREQ.body.alta_programa != null && apiREQ.body.alta_programa != '') ? "'"+apiREQ.body.alta_programa.trim().toUpperCase()+"'" : false;
    //let _PLATAFORMA = (_OPESOLEQU !== 0) ? 'Sistema Corporativo' : 'Plataforma Crediticio Digital';

   // console.log('_aPERFICTPC => '+_aPERFICTPC+' _aPERFICTDC=> '+_aPERFICTDC+' _aPERFICTSC=> '+_aPERFICTSC+ '_aPERFICTEC => '+_aPERFICTEC+' _aPERFICNO1=> '+_aPERFICNO1+' _aPERFICAP1=> '+_aPERFICAP1+' _aPERFICDNU=> '+_aPERFICDNU+' _aPERFICEMC=> '+_aPERFICEMC+' _OPESOLCEM=> '+_OPESOLCEM+' _OPESOLCUS>= '+_OPESOLCUS+' _OPESOLCIP>= '+_OPESOLCIP+' _OPESOLAEM=> '+_OPESOLAEM+' _OPESOLAUS=> '+_OPESOLAUS+' _OPESOLAIP>= '+_OPESOLAIP);
    if (_aPERFICTPC && _aPERFICTDC && _aPERFICTSC && _aPERFICTEC && _aPERFICNO1 && _aPERFICAP1 && _aPERFICDNU && _aPERFICNAC && _aPERFICEMC && _OPESOLCEM && _OPESOLCUS && _OPESOLCIP && _OPESOLCPR && _OPESOLAEM && _OPESOLAUS && _OPESOLAIP && _OPESOLAPR){
        (async () => {

            _aPERFICDVE = (_aPERFICDVE != null) ? `'${await formatDateTime(1, _aPERFICDVE)}'`: null;
           
            // _OPESOLSPV  = (_OPESOLSPV != null) ? `'${await formatDateTime(1, _OPESOLSPV)}'`: null;

            xDATA   = await selectPERSONA(1, _aPERFICDNU);
            _code   = xDATA[0];
            xJSON   = xDATA[1];

            if (_code == 200) {

                let _PERFICTSC  = xJSON[0].tipo_sexo_equivalente;
                let _PERFICTEC  = xJSON[0].tipo_estadocivil_equivalente;
                let _PERFICNAC  = xJSON[0].nacionalidad_codigo_equivalente;
                let _PERFICNO1  = xJSON[0].persona_nombre_primero;
                let _PERFICNO2  = xJSON[0].persona_nombre_segundo;
                let _PERFICAP1  = xJSON[0].apellido_paterno; 
                let _PERFICAP2  = xJSON[0].apellido_materno;
                let _PERFICAP3  = xJSON[0].apellido_casada; 
                let _PERFICFNA  = xJSON[0].persona_fechanacimiento; 
                let _CLIFICEQU  = xJSON[0].cliente_equivalente; 
                let _CLIFICFIN  = xJSON[0].persona_ingreso; 
                let _PERFICDVE  = _aPERFICDVE; 
                let _OPESOLCLI  = _CLIFICEQU;

                console.log('_CLIFICFIN>= '+_CLIFICFIN);

                _PERFICNO1  = (_PERFICNO1 != null && _PERFICNO1 != '') ? `'${_PERFICNO1}'` : _aPERFICNO1; 
                _PERFICNO2  = (_PERFICNO2 != null && _PERFICNO2 != '') ? `'${_PERFICNO2}'` : _aPERFICNO2;
                _PERFICAP1  = (_PERFICAP1 != null && _PERFICAP1 != '') ? `'${_PERFICAP1}'` : _aPERFICAP1;  
                _PERFICAP2  = (_PERFICAP2 != null && _PERFICAP2 != '') ? `'${_PERFICAP2}'` : _aPERFICAP2;  
                _PERFICAP3  = (_PERFICAP3 != null && _PERFICAP3 != '') ? `'${_PERFICAP3}'` : _aPERFICAP3; 
                _PERFICFNA  = (_PERFICFNA != null) ? _PERFICFNA : (_aPERFICFNA != null) ? `${await formatDateTime(1, _aPERFICFNA)}`: null;  
                _CLIFICFIN  = (_CLIFICFIN != null) ? `'${await formatDateTime(1, _CLIFICFIN)}'`: null; 

                xDATA   = await insertPERFIC(_aPERFICTDC, _aPERFICTDC, _PERFICTSC, _aPERFICTSC, _PERFICTEC, _aPERFICTEC, _PERFICNAC, _aPERFICNAC, 
                _aPERFICEMC, _PERFICNO1, _PERFICNO2, _PERFICAP1, _PERFICAP2, _PERFICAP3, _aPERFICDNU, _PERFICDVE, _PERFICFNA, _PERFICCEL, 
                _aPERFICEMA, _OPESOLCEM, _OPESOLCUS, _OPESOLCIP, _OPESOLCPR, _OPESOLAEM, _OPESOLAUS, _OPESOLAIP, _OPESOLAPR) ;

                xDATA   = await insertCLIFIC(_CLIFICTCC, _CLIFICTOC, _CLIFICTAC, _aPERFICEMC, _CLIFICPER, _CLIFICEQU, _CLIFICFIN, 
                _OPESOLCEM, _OPESOLCUS, _OPESOLCIP, _OPESOLCPR, _OPESOLAEM, _OPESOLAUS, _OPESOLAIP, _OPESOLAPR);

                // xDATA   = await insertOPESOL(_OPESOLTNC, _OPESOLTBC, _OPESOLTPC, _OPESOLTAC, _OPESOLTCC, _OPESOLTMC, _aPERFICEMC, 
                // _OPESOLTEM, _OPESOLCLI, _aPERFICDNU, _OPESOLEQU, _OPESOLSIS, _OPESOLSIC, _OPESOLSPL, _OPESOLSPV, _OPESOLSSU, _OPESOLSEJ, 
                // _OPESOLSLA, _OPESOLSLO,  _OPESOLCEM, _OPESOLCUS, _OPESOLCIP, _OPESOLCPR, _OPESOLAEM, _OPESOLAUS, _OPESOLAIP, _OPESOLAPR);

                _code   = xDATA[0];
                xJSON   = xDATA[1];
            }

            if (_code == 200) {
                xJSON = await jsonBody(_code, 'Success', null, 'Correcto', null, 0, 0, 0, 0, xJSON);

            } else {
                xJSON   = xDATA[1];
                xJSON   = await jsonBody(_code, 'Error', null, null, null, 0, 0, 0, 0, []);
            }

            xJSON = camelcaseKeys(xJSON, {deep: true});

            return apiRES.status(_code).json(xJSON);

        })();       
    }else{
        (async () => {
            _code   = 400;
            xJSON   = await jsonBody(_code, 'Error', 'postOperacionSolicitud', 'Error: Verifique algún campo esta vacío', null, 0, 0, 0, 0, []); 
            xJSON   = camelcaseKeys(xJSON, {deep: true});
            return apiRES.status(200).json(xJSON);
        })();
    
    }       

}

module.exports  = {
    postOperacionSolicitud
}