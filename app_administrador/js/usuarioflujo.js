$(document).ready(function() {
    var dataJSON	= getusuarioFlujoList(_parm06BASE);

	$('#tableLoads').DataTable({
		processing	: true,
		destroy		: true,
		searching	: true,
		paging		: true,
		lengthChange: true,
		info		: true,
		order: [[9, "desc"]],
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
			{ targets			: [5],	visible : true, searchable : true,	orderData : [5, 0] },
			{ targets			: [6],	visible : true, searchable : true,	orderData : [6, 0] },
			{ targets			: [7],	visible : false,searchable : true,	orderData : [7, 0] },
			{ targets			: [8],	visible : true, searchable : true,	orderData : [8, 0] },
			{ targets			: [9],	visible : true, searchable : true,	orderData : [9, 0] },
			{ targets			: [10],	visible : true ,searchable : true,	orderData : [10, 0] },
			{ targets			: [11],	visible : true ,searchable : true,	orderData : [11, 0] },
		],
		
		columns		: [
			{ data				: 'usuarioFlujoOrden', name : 'usuarioFlujoOrden'},
			{ render			:
				function (data, type, full, meta) {
					var rowEST = '';
					if (full.tipoEstadoParametro == 1) {
						rowEST = '<span class="label label-rounded" style="background-color:'+ full.tipoEstadoCss +'">'+ full.tipoEstadoNombre +'</span>';
					} else if (full.tipoEstadoParametro == 2){
					 	rowEST = '<span class="label label-rounded" style="background-color:'+ full.tipoEstadoCss +'">'+ full.tipoEstadoNombre +'</span>';
					} else if (full.tipoEstadoParametro == 3){
						rowEST = '<span class="label label-rounded" style="background-color:'+ full.tipoEstadoCss +'">'+ full.tipoEstadoNombre +'</span>';
					} else {
						rowEST = '<span class="label label-rounded" style="background-color:'+ full.tipoEstadoCss +'">'+ full.tipoEstadoNombre +'</span>';
					}
					
					return rowEST;
				}
			},
			{ data				: 'empresaNombre', name : 'empresaNombre'},
			{ data				: 'rolSubordinadoNombre', name : 'rolSubordinadoNombre'},
			{ data				: 'usuarioSuperiorNombre', name : 'usuarioSuperiorNombre'},
			{ data				: 'rolSuperiorNombre', name : 'rolSuperiorNombre'},
			{ data				: 'usuarioSubordinadoNombre', name : 'usuarioSubordinadoNombre'},
			{ data				: 'usuarioFlujoObservacion', name : 'usuarioFlujoObservacion'},
			{ data				: 'auditoriaUsuario', name : 'auditoriaUsuario'},
			{ data				: 'auditoriaFechaHora', name : 'auditoriaFechaHora'},
			{ data				: 'auditoriaIp', name : 'auditoriaIp'},
            { render			: 
				function (data, type, full, meta) {
					var btnDSP	= '<button onclick="setUsuarioFlujo('+ full.rolSubordinadoCodigo +', '+ full.usuarioSubordinadoCodigo +', '+ full.rolSuperiorCodigo +', '+ full.usuarioSuperiorCodigo +', '+ full.empresaCodigo +', 2);" title="Ver" type="button" class="btn btn-primary btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eye"></i></button>';
					var btnUPD	= '<button onclick="setUsuarioFlujo('+ full.rolSubordinadoCodigo +', '+ full.usuarioSubordinadoCodigo +', '+ full.rolSuperiorCodigo +', '+ full.usuarioSuperiorCodigo +', '+ full.empresaCodigo +', 3);" title="Editar" type="button" class="btn btn-success btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-edit"></i></button>';
					var btnDLT	= '<button onclick="setUsuarioFlujo('+ full.rolSubordinadoCodigo +', '+ full.usuarioSubordinadoCodigo +', '+ full.rolSuperiorCodigo +', '+ full.usuarioSuperiorCodigo +', '+ full.empresaCodigo +', 4);" title="Anular" type="button" class="btn btn-danger btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eraser"></i></button>';
					var btnAUD	= '<button onclick="setUsuarioFlujo('+ full.rolSubordinadoCodigo +', '+ full.usuarioSubordinadoCodigo +', '+ full.rolSuperiorCodigo +', '+ full.usuarioSuperiorCodigo +', '+ full.empresaCodigo +', 5);" title="Auditoria" type="button" class="btn btn-warning btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-user-secret"></i></button>';

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

function setUsuarioFlujo(codRolC, codUsuC, codRolS, codUsuS, codEmp, codAcc) {
	var xJSON       	= [];
	var xJSON1     		= getDominioValor('ADMUSUARIOFLUJOESTADO');
	var xJSON2     		= getEmpresaList(_parm06BASE);
	var xJSON3     		= getRolList(_parm06BASE);
	var xJSON4     		= getUsuarioList(_parm06BASE);
	var html			= '';
	var bodyCol     	= '';
	var bodyTit     	= '';
	var bodyMod     	= '';
	var bodyOnl     	= '';
	var bodyBot     	= '';
	var bodAcc			= 0;
	var selEstado   	= '';
	var selEmpresa  	= '';
	var selRolS			= '';
	var selRolC			= '';
	var selUsuS			= '';
	var selUsuC			= '';

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

		html = 
		'				<div class="modal-content">'+
		'					<form class="needs-validation" method="post" action="../class/crud/usuarioflujo.php">'+
		'	    				<div class="modal-header" style="color:#ffffff; background:'+ bodyCol +'">'+
		'							<h5 class="modal-title" id="modal-title">'+ bodyTit +' </h5>'+
		'							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
		'						</div>'+
		''+
		'	    					<div class="modal-body" >'+
		'       					    <div class="row">'+
		'       					        <div class="col-sm-12 col-md-4">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var01">Estado</label>'+
		'       					                <select id="var01" name="var01" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
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
		'       					                <label for="var03">Empresa</label>'+ 
		`       					                <select id="var03" name="var03" value="" class="select2 form-control custom-select" onchange="selectEmpresaRol('var04','var03', 1, 1, 'var06'); selectEmpresaUsuario('var05', 'var04', 'var03', 1, 1, 'var07'); selectEmpresaRol('var06','var03', 1, 2, 'var04');" style="width:100%; height:40px;" required="true">`+
		'       					                    <optgroup label="Seleccionar">'+ 
		'													<option value="0" disabled selected> SELECCIONAR </option>' + selEmpresa +
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-6">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var04">Rol Superior</label>'+
		`       					                <select id="var04" name="var04" class="select2 form-control custom-select" onchange="selectEmpresaRol('var06','var03', 1, 2, 'var04'); selectEmpresaUsuario('var05', 'var04', 'var03', 1, 1, 'var07');" style="width:100%; height:40px;" required="true" ${bodyOnl}>`+
		'       					                    <optgroup label="Seleccionar">'+ 
		'													<option value="0" disabled selected> SELECCIONAR </option>' + selRolS +
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-6">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var05">Usuario Superior</label>'+
		`       					                <select id="var05" name="var05" value="" class="select2 form-control custom-select" onchange="" style="width:100%; height:40px;" required="true">`+
		'       					                    <optgroup label="Seleccionar">'+ 
		'													<option value="0" disabled selected> SELECCIONAR </option>' + selUsuS +
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-6">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var06">Rol Colaborador</label>'+
		`       					                <select id="var06" name="var06" value="" class="select2 form-control custom-select" onchange=" selectEmpresaUsuario('var07', 'var06', 'var03', 1, 1, 'var05');" style="width:100%; height:40px;" required="true">`+
		'       					                    <optgroup label="Seleccionar">'+ 
		'													<option value="0" disabled selected> SELECCIONAR </option>' + selRolC +
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-6">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var07">Usuario Colaborador</label>'+
		'       					                <select id="var07" name="var07" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
		'       					                    <optgroup label="Seleccionar">'+
		'													<option value="0" disabled selected> SELECCIONAR </option>' +  selUsuC +
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'               					<div class="col-sm-12">'+
		'               					    <div class="form-group">'+
		'               					        <label for="var08">Comentario</label>'+
		'               					        <textarea id="var0" name="var08" value="" class="form-control" rows="5" style="" '+ bodyOnl +'></textarea>'+
		'               					    </div>'+
		'               					</div>'+
		'           				</div>'+
		''+
		'           				<div class="form-group">'+
		'           				    <input class="form-control" type="hidden" id="workcodRolSup"		name="workcodRolSup"		value="'+ codRolS +'"					required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workCodUsuSup"		name="workCodUsuSup"		value="'+ codUsuS +'"					required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workcodRolCol"		name="workcodRolCol"		value="'+ codRolC +'"					required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workCodUsuCol"		name="workCodUsuCol"		value="'+ codUsuC +'"					required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workModo"				name="workModo"				value="'+ bodyMod +'"					required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workPage"				name="workPage"				value="'+_parm04BASE+'"					required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workPrograma"			name="workPrograma"			value="'+_parm07BASE+'"					required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workAccion"			name="workAccion"			value="'+ bodAcc+'"						required readonly>'+
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
		xJSON       = getUsuarioFlujoId(codRolC, codUsuC, codRolS, codUsuS, codEmp);
		
		xJSON.forEach(element => {
			if (element.usuarioSuperiorCodigo == codUsuS && element.rolSuperiorCodigo == codRolS && element.usuarioSubordinadoCodigo == codUsuC && element.rolSubordinadoCodigo == codRolC) {
				xJSON1.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.tipoParametro == element.tipoEstadoParametro) {
							selEstado = selEstado + '            				<option value="'+ element1.tipoParametro +'" selected>'+ element1.tipoNombre +'</option>';
						} else {
							selEstado = selEstado + '            				<option value="'+ element1.tipoParametro +'">'+ element1.tipoNombre +'</option>';
						}
					}
				});
					
				xJSON2.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.empresaCodigo == element.empresaCodigo) {
							selEmpresa = selEmpresa + '            				<option value="'+ element1.empresaCodigo +'" selected>'+ element1.empresaNombre +'</option>';
						} 
					}
				});

				xJSON3.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.rolCodigo == element.rolSuperiorCodigo) {
							selRolS = selRolS + '            									<option value="'+ element1.rolCodigo +'">'+ element1.rolNombre +'</option>';
						} 
					}
				});

				xJSON3.forEach(element2 => {
					if (element2.tipoEstadoParametro == 1) {
						if (element2.rolCodigo == element.rolSubordinadoCodigo) {
							selRolC = selRolC + '            									<option value="'+ element2.rolCodigo +'">'+ element2.rolNombre +'</option>';
						} 
					}
				});

				xJSON4.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.usuarioCodigo == element.usuarioSuperiorCodigo) {
							selUsuS = selUsuS + '            						<option value="'+ element1.usuarioCodigo +'" selected>'+ element1.usuarioDocumento +' - '+element1.usuarioNombre +'</option>';
						}
					}
				});

				xJSON4.forEach(element2 => {
					if (element2.tipoEstadoParametro == 1) {
						if (element2.usuarioCodigo == element.usuarioSubordinadoCodigo) {
							selUsuC = selUsuC + '            						<option value="'+ element2.usuarioCodigo +'" selected>'+ element2.usuarioDocumento +' - '+element2.usuarioNombre +'</option>';
						}
					}
				});


				var usuarioFlujoOrden			= (element.usuarioFlujoOrden == null) ? '' : element.usuarioFlujoOrden;
				var usuarioFlujoObservacion		= (element.usuarioFlujoObservacion == null) ? '' : element.usuarioFlujoObservacion;

				html = 
				'				<div class="modal-content">'+
				'					<form class="needs-validation" method="post" action="../class/crud/usuarioflujo.php">'+
				'	    				<div class="modal-header" style="color:#ffffff; background:'+ bodyCol +'">'+
				'							<h5 class="modal-title" id="modal-title">'+ bodyTit +' </h5>'+
				'							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
				'						</div>'+
				''+
				'	    					<div class="modal-body" >'+
				'       					    <div class="row">'+
				'       					        <div class="col-sm-12 col-md-4">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var01">Estado</label>'+
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
				'               					        <input id="var02" name="var02" value="'+usuarioFlujoOrden+'" class="form-control" type="number" min="0" max="999" style="text-transform:uppercase; height:40px;" placeholder="Orden" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'									<div class="col-sm-12 col-md-4">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var03">Empresa</label>'+
				`       					                <select id="var03" name="var03" value="" class="select2 form-control custom-select" onchange="selectEmpresaRol('var04','var03', 1, 1); selectEmpresaUsuario('var05','var03', 1, 1);" style="width:100%; height:40px;" required="true">`+
				'       					                    <optgroup label="Seleccionar">'+ selEmpresa +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-6">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var04">Rol Superior</label>'+
				'       					                <select id="var04" name="var04" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+ selRolS +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-6">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var05">Usuario Superior</label>'+
				`       					                <select id="var05" name="var05" value="" class="select2 form-control custom-select" onchange="" style="width:100%; height:40px;" required="true">`+
				'       					                    <optgroup label="Seleccionar">'+ selUsuS +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-6">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var06">Rol Colaborador</label>'+
				`       					                <select id="var06" name="var06" value="" class="select2 form-control custom-select" onchange="selectEmpresaRolUsuario('var04','var03', 'var05', 1, 2);" style="width:100%; height:40px;" required="true">`+
				'       					                    <optgroup label="Seleccionar">'+ selRolC +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-6">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var07">Usuario Colaborador</label>'+
				'       					                <select id="var07" name="var07" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+ selUsuC +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
						'       					        </div>'+
				'               					<div class="col-sm-12">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var08">Comentario</label>'+
				'               					        <textarea id="var08" name="var08" value="" class="form-control" rows="5" style="" '+ bodyOnl +'>'+usuarioFlujoObservacion+'</textarea>'+
				'               					    </div>'+
				'               					</div>'+
				'           				</div>'+
				''+
				'           				<div class="form-group">'+
				'           				    <input class="form-control" type="hidden" id="workcodRolSup"		name="workcodRolSup"		value="'+ codRolS +'"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workCodUsuSup"		name="workCodUsuSup"		value="'+ codUsuS +'"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workcodRolCol"		name="workcodRolCol"		value="'+ codRolC +'"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workCodUsuCol"		name="workCodUsuCol"		value="'+ codUsuC +'"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workModo"				name="workModo"				value="'+ bodyMod +'"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPage"				name="workPage"				value="'+_parm04BASE+'"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPrograma"			name="workPrograma"			value="'+_parm07BASE+'"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workAccion"			name="workAccion"			value="'+ bodAcc+'"						required readonly>'+
				'           				</div>'+
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
}