$(document).ready(function() {
    var dataJSON	= getRolFormularioList(_parm06BASE);

	$('#tableLoads').DataTable({
		processing	: true,
		destroy		: true,
		searching	: true,
		paging		: true,
		lengthChange: true,
		info		: true,
		order: [[8, "desc"]],
		orderCellsTop: true,
		fixedHeader	: true,
		language	: {
            lengthMenu: "Mostrar _MENU_ registros por pagina",
            zeroRecords: "No hay registros disponibles.",
            info: "Mostrando pagina _PAGE_ de _PAGES_",
            infoEmpty: "No hay registros disponibles.",
			infoFiltered: "(Filtrado de _MAX_ registros totales)",
			sZeroRecords: "No se encontraron resultados",
			sSearch: "buscar",
			oPaginate: {
				sFirst:    "Primero",
				sLast:     "Último",
				sNext:     "Siguiente",
				sPrevious: "Anterior"
			},
        },

        data		: dataJSON,
		columnDefs	: [
			{ targets			: [0],	visible : false,searchable : true,	orderData : [0, 0] },
			{ targets			: [1],	visible : true,	searchable : true,	orderData : [1, 0] },
			{ targets			: [2],	visible : true,	searchable : true,	orderData : [2, 0] },
			{ targets			: [3],	visible : true, searchable : true,	orderData : [3, 0] },
			{ targets			: [4],	visible : true,	searchable : true,	orderData : [4, 0] },
			{ targets			: [5],	visible : false,searchable : true,	orderData : [5, 0] },
			{ targets			: [6],	visible : false,searchable : true,	orderData : [6, 0] },
			{ targets			: [7],	visible : true, searchable : true,	orderData : [7, 0] },
			{ targets			: [8],	visible : true, searchable : true,	orderData : [8, 0] },
			{ targets			: [9],	visible : true,	searchable : true,	orderData : [9, 0] },
			{ targets			: [10],	visible : true,	searchable : true,	orderData : [10, 0] }
		],
		
		columns		: [
			{ data				: 'rolFormularioOrden', name : 'rolFormularioOrden'},
			{ render			:
				function (data, type, full, meta) {
					var rowEST = '<span class="label label-rounded" style="background-color:'+ full.tipoEstadoCss +'">'+ full.tipoEstadoNombre +'</span>';
					
					return rowEST;
				}
			},
			{ data				: 'empresaNombre', name : 'empresaNombre'},
			{ data				: 'rolNombre', name : 'rolNombre'},
			{ data				: 'formularioNombre', name : 'formularioNombre'},
			{ data				: 'rolFormularioAcceso', name : 'rolFormularioAcceso'},
			{ data				: 'rolFormularioAccesoObservacion', name : 'rolFormularioAccesoObservacion'},
			{ data				: 'auditoriaUsuario', name : 'auditoriaUsuario'},
			{ data				: 'auditoriaFechaHora', name : 'auditoriaFechaHora'},
			{ data				: 'auditoriaIp', name : 'auditoriaIp'},
            { render			: 
				function (data, type, full, meta) {
					var btnDSP	= '<button onclick="setRolFormulario('+ full.rolCodigo +', '+ full.formularioCodigo +', 2);" title="Ver" type="button" class="btn btn-primary btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eye"></i></button>';
					var btnUPD	= '<button onclick="setRolFormulario('+ full.rolCodigo +', '+ full.formularioCodigo +', 3);" title="Editar" type="button" class="btn btn-success btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-edit"></i></button>';
					var btnDLT	= '<button onclick="setRolFormulario('+ full.rolCodigo +', '+ full.formularioCodigo +', 4);" title="Anular" type="button" class="btn btn-danger btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eraser"></i></button>';
					var btnAUD	= '<button onclick="setRolFormulario('+ full.rolCodigo +', '+ full.formularioCodigo +', 5);" title="Auditoria" type="button" class="btn btn-warning btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-user-secret"></i></button>';

					if (_parm00DSP == 'N') {
						btnDSP = '';
					}

					if (_parm00UPD == 'N') {
						btnUPD = '';
					}
					
					if (_parm00DLT == 'N') {
						btnDLT = '';
					}

					if (full.tipoEstadoParametro != 1) {
						btnUPD	= '';
						btnDLT	= '';
					} 

					return (btnDSP + '&nbsp;' + btnUPD + '&nbsp;' + btnDLT + '&nbsp;');
				}
			},
        ],
    });
});


function setRolFormulario(codRol, codForm, codAcc) {
	var xJSON       	= [];
	var xJSON1     		= getDominioValor('ADMROLFORMULARIOESTADO');
	var xJSON2     		= getEmpresaList(_parm06BASE, 1);
	var xJSON3     		= getRolList(_parm06BASE, 1);
	var xJSON4     		= getFormularioList(_parm06BASE, 1);
	var html			= '';
	var bodyCol     	= '';
	var bodyTit     	= '';
	var bodyMod     	= '';
	var bodyOnl     	= '';
	var bodyBot     	= '';
	var bodAcc			= 0;
	var selEstado   	= '';
	var selEmpresa  	= '';
	var selRol			= '';
	var selForm			= '';

	var selAcceso 		= '';
	var selAccesoDsp 	= '';
	var selAccesoUpd 	= '';
	var selAccesoDlt 	= '';
	var selAccesoIns 	= '';
	var selAccesoXls 	= '';

	var selAccesoPdf 	= '';
	var selAccesoImpre	= '';

	switch (codAcc) {
		case 1:
			bodyTit = 'NUEVO';
			bodyCol = '#be9027;';
			bodyMod = 'C';
			bodyOnl = '';
			bodyBot = '           <button type="submit" id="submit" name="submit" value="submit" class="btn btn-primary">Agregar</button>';
			bodAcc	= 1;
			break;

		case 2:
			bodyTit = 'VER';
			bodyCol = '#be9027;';
			bodyMod = 'R';
			bodyOnl = 'disabled';
			bodyBot = '';
			bodAcc	= 1;
			break;

		case 3:
			bodyTit = 'EDITAR';
			bodyCol = '#be9027;';
			bodyMod = 'U';
			bodyOnl = '';
			bodyBot = '           <button type="submit" id="submit" name="submit" value="submit" class="btn btn-primary">Actualizar</button>';
			bodAcc	= 1;
			break;

		case 4:
			bodyTit = 'Anular';
			bodyCol = '#be9027;';
			bodyMod = 'U';
			bodyOnl = 'readonly';
			bodyBot = '           <button type="submit" id="submit" name="submit" value="submit" class="btn btn-primary">Anular</button>';
			bodAcc	= 2;

			break;
	
		case 5:
			bodyTit = 'AUDITORIA';
			bodyCol = '#be9027;';
			bodyMod = 'A';
			bodyOnl = 'readonly';
			bodyBot = '';
			bodAcc	= 1;
			break;

		default:
			break;
	}
	
	if (codAcc == 1) {
		xJSON1.forEach(element1 => {
			if (element1.tipoEstadoParametro == 1) {
				selEstado = selEstado + '                               			<option value="'+ element1.tipoParametro +'">'+ element1.tipoNombre +'</option>';
			}
		});
    
		xJSON2.forEach(element1 => {
			if (element1.tipoEstadoParametro == 1) {
				selEmpresa = selEmpresa + '            								<option value="'+ element1.empresaCodigo +'">'+ element1.empresaNombre +'</option>';
			}
		});

		xJSON3.forEach(element1 => {
			if (element1.tipoEstadoParametro == 1) {
				selRol = selRol + '            										<option value="'+ element1.rolCodigo +'">'+ element1.rolNombre +'</option>';
			}
		});
		
		xJSON4.forEach(element1 => {
			if (element1.tipoEstadoParametro == 1) {
				selForm = selForm + '            									<option value="'+ element1.formularioCodigo +'">'+ element1.formularioNombre +'</option>';
			}
		});

		html = 
		'				<div class="modal-content">'+
		'					<form class="needs-validation" onsubmit="return validarForm();" method="post" action="../class/crud/rolformulario.php">'+
		'	    				<div class="modal-header" style="color:#ffffff; background:'+ bodyCol +'">'+
		'							<h5 class="modal-title" id="modal-title">'+ bodyTit +' </h5>'+
		'							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
		'						</div>'+
		''+
		'	    					<div class="modal-body" >'+
		'       					    <div class="row">'+
		'       					        <div class="col-sm-12 col-md-4">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var01">Estado<span style="color:red;"> * </span></label>'+
		'       					                <select id="var01" name="var01" class="select2 form-control custom-select" style="width:100%; height:40px;" required '+ bodyOnl +'>'+
		'       					                    <optgroup label="Estado">'+
		'													<option value="0" disabled selected> SELECCIONAR </option>' + selEstado+
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'               					<div class="col-sm-12 col-md-4">'+
		'               					    <div class="form-group">'+
		'               					        <label for="var02">Orden</label>'+
		'               					        <input id="var02" name="var02" value="" class="form-control" type="number" min="0" max="999" style="text-transform:uppercase; height:40px;" placeholder="Orden" '+ bodyOnl +'>'+
		'               					    </div>'+
		'               					</div>'+
		''+
		'									<div class="col-sm-12 col-md-4">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var03">Empresa<span style="color:red;"> * </span></label>'+
		`       					                <select id="var03" name="var03" value="" class="select2 form-control custom-select" onchange="selectEmpresaRol('var04','var03', 1, 1); selectEmpresaForm('var05','var03', 1, 1);" style="width:100%; height:40px;" required="true">`+
		'       					                    <optgroup label="Seleccionar">'+ 
		'													<option value="0" disabled selected> SELECCIONAR </option>' + selEmpresa +
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-6">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var04">Rol<span style="color:red;"> * </span></label>'+
		'       					                <select id="var04" name="var04" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
		'       					                    <optgroup label="Seleccionar">'+
		'													<option value="0" disabled selected> SELECCIONAR </option>' + 
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-6">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var05">Formulario<span style="color:red;"> * </span></label>'+
		'       					                <select id="var05" name="var05" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
		'       					                    <optgroup label="Seleccionar">'+
		'													<option value="0" disabled selected> SELECCIONAR </option>' + 
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-3">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var06"> Plataforma <span style="color:red;"> * </span></label>'+
		'       					                <select id="var06" name="var06" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
		'       					                    <optgroup label="Seleccionar">'+
		'							   						<option value="N">NO</option>'+
		'													<option value="S">SI</option>'+
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-3">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var07"> Visualizar <span style="color:red;"> * </span></label>'+
		'       					                <select id="var07" name="var07" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
		'       					                    <optgroup label="Seleccionar">'+
		'							   						<option value="N">NO</option>'+
		'													<option value="S">SI</option>'+
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-3">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var08"> Editar <span style="color:red;"> * </span></label>'+
		'       					                <select id="var08" name="var08" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
		'       					                    <optgroup label="Seleccionar">'+
		'							   						<option value="N">NO</option>'+
		'													<option value="S">SI</option>'+
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-3">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var09"> Eliminar <span style="color:red;"> * </span></label>'+
		'       					                <select id="var09" name="var09" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
		'       					                    <optgroup label="Seleccionar">'+
		'							   						<option value="N">NO</option>'+
		'													<option value="S">SI</option>'+
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-3">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var010"> Insertar <span style="color:red;"> * </span></label>'+
		'       					                <select id="var010" name="var010" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
		'       					                    <optgroup label="Seleccionar">'+
		'							   						<option value="N">NO</option>'+
		'													<option value="S">SI</option>'+
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-3">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var011"> Exportar Excel <span style="color:red;"> * </span></label>'+
		'       					                <select id="var011" name="var011" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
		'       					                    <optgroup label="Seleccionar">'+
		'							   						<option value="N">NO</option>'+
		'													<option value="S">SI</option>'+
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-3">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var012"> Exportar PDF <span style="color:red;"> * </span></label>'+
		'       					                <select id="var012" name="var012" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
		'       					                    <optgroup label="Seleccionar">'+
		'							   						<option value="N">NO</option>'+
		'													<option value="S">SI</option>'+
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-3">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var013"> Imprimir <span style="color:red;"> * </span></label>'+
		'       					                <select id="var013" name="var013" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
		'       					                    <optgroup label="Seleccionar">'+
		'							   						<option value="N">NO</option>'+
		'													<option value="S">SI</option>'+
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'               					<div class="col-sm-12">'+
		'               					    <div class="form-group">'+
		'               					        <label for="var014">Comentario</label>'+
		'               					        <textarea id="var014" name="var014" value="" class="form-control" rows="5" style="" '+ bodyOnl +'></textarea>'+
		'               					    </div>'+
		'               					</div>'+
		'           				</div>'+
		''+
		'           				<div class="form-group">'+
		'           				    <input class="form-control" type="hidden" id="workCodigoRol"	name="workCodigoRol"	value="'+ codRol +'"					required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workCodigoForm"	name="workCodigoForm"	value="'+ codForm +'"					required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workModo"		name="workModo"				value="'+ bodyMod +'"					required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workPage"		name="workPage"				value="public/rolformulario.php?"		required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workPrograma"	name="workPrograma"			value="rolformulario"					required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workAccion"		name="workAccion"			value="'+ bodAcc+'"						required readonly>'+
		'           				</div>'+
		'						</div>'+
		''+
		'	    				<div class="modal-footer" style="text-align:right; width:100%;">'+ 
		'							<div class="row">'+
		'       						<div class="col-sm-12">'+
		'           						<div class="form-group">'+ bodyBot +
		'		    							<button type="button" class="btn btn-dark" data-bs-dismiss="modal">Cerrar</button>'+
		'           						</div>'+
		'           					</div>'+
		'           				</div>'+
		'	    				</div>'+
		'					</div>'+
		'				</form>'+
		'			</div>';

	} else if (codAcc > 1 && codAcc < 5) {
		xJSON       = getRolFormularioId(codRol, codForm);

		xJSON.forEach(element => {
			if (element.rolCodigo == codRol && element.formularioCodigo == codForm) {
				xJSON1.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.tipoParametro == element.tipoEstadoParametro) {
							selEstado = selEstado + '            			<option value="'+ element1.tipoParametro +'" selected>'+ element1.tipoNombre +'</option>';
						} else {
							selEstado = selEstado + '            			<option value="'+ element1.tipoParametro +'">'+ element1.tipoNombre +'</option>';
						}
					}
				});
					
				xJSON2.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.empresaCodigo == element.empresaCodigo) {
							selEmpresa = selEmpresa + '            			<option value="'+ element1.empresaCodigo +'" selected>'+ element1.empresaNombre +'</option>';
						} 
					}
				});


				xJSON3.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.rolCodigo == element.rolCodigo) {
							selRol = selRol + '            			<option value="'+ element1.rolCodigo +'" selected>'+ element1.rolNombre +'</option>';
						} 
					}
				});

				xJSON4.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.formularioCodigo == element.formularioCodigo) {
							selForm = selForm + '            		<option value="'+ element1.formularioCodigo +'" selected>'+ element1.formularioNombre +'</option>';
						}
					}
				});

				var rolFormularioOrden					= (element.rolFormularioOrden == null) ? '' : element.rolFormularioOrden;
				var rolFormularioAcceso					= (element.rolFormularioAcceso == null) ? '' : element.rolFormularioAcceso;
				var rolFormularioAccesoDsp				= (element.rolFormularioAccesoDsp == null) ? '' : element.rolFormularioAccesoDsp;
				var rolFormularioAccesoUpd				= (element.rolFormularioAccesoUpd == null) ? '' : element.rolFormularioAccesoUpd;
				var rolFormularioAccesoDlt				= (element.rolFormularioAccesoDlt == null) ? '' : element.rolFormularioAccesoDlt;
				var rolFormularioAccesoIns				= (element.rolFormularioAccesoIns == null) ? '' : element.rolFormularioAccesoIns;

				var rolFormularioAccesoXls				= (element.rolFormularioAccesoXls == null) ? '' : element.rolFormularioAccesoXls;
				var rolFormularioAccesoPdf				= (element.rolFormularioAccesoPdf == null) ? '' : element.rolFormularioAccesoPdf;
				var rolFormularioAcesoImpresion			= (element.rolFormularioAcesoImpresion == null) ? '' : element.rolFormularioAcesoImpresion;
				var rolFormularioAccesoObservacion		= (element.rolFormularioAccesoObservacion == null) ? '' : element.rolFormularioAccesoObservacion;

				if (rolFormularioAcceso == 'S') {
					selAcceso  =                     
					'                               <option value="S" selected>SI</option>'+
					'                               <option value="N">NO</option>';
				} else { 
					selAcceso  =                     
					'                               <option value="S">SI</option>'+
					'                               <option value="N" selected>NO</option>';
				}

				if (rolFormularioAccesoDsp == 'S') {
					selAccesoDsp  =                     
					'                               <option value="S" selected>SI</option>'+
					'                               <option value="N">NO</option>';
				} else { 
					selAccesoDsp  =                     
					'                               <option value="S">SI</option>'+
					'                               <option value="N" selected>NO</option>';
				}

				if (rolFormularioAccesoUpd == 'S') {
					selAccesoUpd  =                     
					'                               <option value="S" selected>SI</option>'+
					'                               <option value="N">NO</option>';
				} else { 
					selAccesoUpd  =                     
					'                               <option value="S">SI</option>'+
					'                               <option value="N" selected>NO</option>';
				}

				if (rolFormularioAccesoDlt == 'S') {
					selAccesoDlt  =                     
					'                               <option value="S" selected>SI</option>'+
					'                               <option value="N">NO</option>';
				} else { 
					selAccesoDlt  =                     
					'                               <option value="S">SI</option>'+
					'                               <option value="N" selected>NO</option>';
				}

				if (rolFormularioAccesoIns == 'S') {
					selAccesoIns  =                     
					'                               <option value="S" selected>SI</option>'+
					'                               <option value="N">NO</option>';
				} else { 
					selAccesoIns  =                     
					'                               <option value="S">SI</option>'+
					'                               <option value="N" selected>NO</option>';
				}

				if (rolFormularioAccesoXls == 'S') {
					selAccesoXls  =                     
					'                               <option value="S" selected>SI</option>'+
					'                               <option value="N">NO</option>';
				} else { 
					selAccesoXls  =                     
					'                               <option value="S">SI</option>'+
					'                               <option value="N" selected>NO</option>';
				}

				if (rolFormularioAccesoPdf == 'S') {
					selAccesoPdf  =                     
					'                               <option value="S" selected>SI</option>'+
					'                               <option value="N">NO</option>';
				} else { 
					selAccesoPdf  =                     
					'                               <option value="S">SI</option>'+
					'                               <option value="N" selected>NO</option>';
				}

				if (rolFormularioAcesoImpresion == 'S') {
					selAccesoImpre  =                     
					'                               <option value="S" selected>SI</option>'+
					'                               <option value="N">NO</option>';
				} else { 
					selAccesoImpre  =                     
					'                               <option value="S">SI</option>'+
					'                               <option value="N" selected>NO</option>';
				}
				html = 
				'				<div class="modal-content">'+
				'					<form class="needs-validation" method="post" action="../class/crud/rolformulario.php">'+
				'	    				<div class="modal-header" style="color:#ffffff; background:'+ bodyCol +'">'+
				'							<h5 class="modal-title" id="modal-title">'+ bodyTit +' </h5>'+
				'							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
				'						</div>'+
				''+
				'	    					<div class="modal-body" >'+
				'       					    <div class="row">'+
				'       					        <div class="col-sm-12 col-md-4">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var01">Estado<span style="color:red;"> * </span></label>'+
				'       					                <select id="var01" name="var01" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Estado">'+selEstado+
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var02">Orden</label>'+
				'               					        <input id="var02" name="var02" value="'+rolFormularioOrden+'" class="form-control" type="number" min="0" max="999" style="text-transform:uppercase; height:40px;" placeholder="Orden" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'									<div class="col-sm-12 col-md-4">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var03">Empresa<span style="color:red;"> * </span></label>'+
				`       					                <select id="var03" name="var03" value="" class="select2 form-control custom-select" onchange="selectEmpresaRol('var04','var03', 1, 0);" style="width:100%; height:40px;" required="true">`+
				'       					                    <optgroup label="Seleccionar">'+ selEmpresa +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-6">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var04">Rol<span style="color:red;"> * </span></label>'+
				'       					                <select id="var04" name="var04" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+ selRol +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-6">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var05">Formulario<span style="color:red;"> * </span></label>'+
				'       					                <select id="var05" name="var05" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+ selForm +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-3">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var06"> Plataforma <span style="color:red;"> * </span></label>'+
				'       					                <select id="var06" name="var06" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+selAcceso+
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-3">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var07"> Visualizar <span style="color:red;"> * </span></label>'+
				'       					                <select id="var07" name="var07" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+selAccesoDsp +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-3">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var08"> Editar <span style="color:red;"> * </span></label>'+
				'       					                <select id="var08" name="var08" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+selAccesoUpd +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-3">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var09"> Eliminar <span style="color:red;"> * </span></label>'+
				'       					                <select id="var09" name="var09" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+selAccesoDlt +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-3">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var010"> Insertar <span style="color:red;"> * </span></label>'+
				'       					                <select id="var010" name="var010" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+selAccesoIns +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-3">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var011"> Exportar Excel <span style="color:red;"> * </span></label>'+
				'       					                <select id="var011" name="var011" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+selAccesoXls +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-3">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var012"> Exportar PDF <span style="color:red;"> * </span></label>'+
				'       					                <select id="var012" name="var012" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+selAccesoPdf +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-3">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var013"> Imprimir <span style="color:red;"> * </span></label>'+
				'       					                <select id="var013" name="var013" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+selAccesoImpre +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'               					<div class="col-sm-12">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var014">Comentario</label>'+
				'               					        <textarea id="var014" name="var014" value="" class="form-control" rows="5" style="" '+ bodyOnl +'>'+rolFormularioAccesoObservacion+'</textarea>'+
				'               					    </div>'+
				'               					</div>'+
				'           				</div>'+
				''+
				'           				<div class="form-group">'+
				'           				    <input class="form-control" type="hidden" id="workCodigoRol"	name="workCodigoRol"		value="'+ codRol +'"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workCodigoForm"	name="workCodigoForm"		value="'+ codForm +'"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workModo"			name="workModo"				value="'+ bodyMod +'"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPage"			name="workPage"				value="public/rolformulario.php?"		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPrograma"		name="workPrograma"			value="rolformulario"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workAccion"		name="workAccion"			value="'+ bodAcc+'"						required readonly>'+
				'							</div>'+
				''+
				'	    				<div class="modal-footer" style="text-align:right; width:100%;">'+ 
				'							<div class="row">'+
				'       						<div class="col-sm-12">'+
				'           						<div class="form-group">'+ bodyBot +
				'		    							<button type="button" class="btn btn-dark" data-bs-dismiss="modal">Cerrar</button>'+
				'           						</div>'+
				'           					</div>'+
				'           				</div>'+
				'	    				</div>'+
				'					</div>'+
				'				</form>'+
				'			</div>';
			}
		});	
	}

	$("#modal-content").empty();
	$("#modal-content").append(html);

	if (codAcc == 1) {
		selectEmpresaRol('var04','var03', 1, 1); 
		selectEmpresaForm('var05','var03', 1, 1);	
	}
}

function validarForm(){
	var todo_correcto = true;

	if(document.getElementById('var01').value == 0){
		todo_correcto = false;
		swal('Estado debe ser distinto a SELECCIONAR');
	} else if(document.getElementById('var03').value == 0){
		todo_correcto = false;
		swal('Empresa debe ser distinto a SELECCIONAR');
	} else if(document.getElementById('var04').value == 0){
		todo_correcto = false;
		swal('Rol debe ser distinto a SELECCIONAR');
	} else if(document.getElementById('var05').value == 0){
		todo_correcto = false;
		swal('Formulario debe ser distinto a SELECCIONAR');
	}
		
	return todo_correcto;
}