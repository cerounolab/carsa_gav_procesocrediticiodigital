$(document).ready(function() {
    var dataJSON	= getUsuarioRolList(_parm06BASE);

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
			{ targets			: [6],	visible : true,	searchable : true,	orderData : [6, 0] },
			{ targets			: [7],	visible : false,searchable : true,	orderData : [7, 0] },
			{ targets			: [8],	visible : true, searchable : true,	orderData : [8, 0] },
			{ targets			: [9],	visible : true, searchable : true,	orderData : [9, 0] },
			{ targets			: [10],	visible : true,	searchable : true,	orderData : [10, 0] },
			{ targets			: [11],	visible : true,	searchable : true,	orderData : [11, 0] }
		],
		
		columns		: [
			{ data				: 'usuarioRolOrden', name : 'usuarioRolOrden'},
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
			{ data				: 'rolNombre', name : 'rolNombre'},
			{ data				: 'usuarioUsuario', name : 'usuarioUsuario'},
			{ data				: 'usuarioRolFechaDesde2', name : 'usuarioRolFechaDesde2'},
			{ data				: 'usuarioRolFechaHasta2', name : 'usuarioRolFechaHasta2'},
			{ data				: 'usuarioRolObservacion', name : 'usuarioRolObservacion'},
			{ data				: 'auditoriaUsuario', name : 'auditoriaUsuario'},
			{ data				: 'auditoriaFechaHora', name : 'auditoriaFechaHora'},
			{ data				: 'auditoriaIp', name : 'auditoriaIp'},
            { render			: 
				function (data, type, full, meta) {
					var btnDSP	= '<button onclick="setUsuarioRol('+ full.usuarioCodigo +', '+ full.rolCodigo +','+ full.empresaCodigo +', 2);" title="Ver" type="button" class="btn btn-primary btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eye"></i></button>';
					var btnUPD	= '<button onclick="setUsuarioRol('+ full.usuarioCodigo +', '+ full.rolCodigo +','+ full.empresaCodigo +', 3);" title="Editar" type="button" class="btn btn-success btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-edit"></i></button>';
					var btnDLT	= '<button onclick="setUsuarioRol('+ full.usuarioCodigo +', '+ full.rolCodigo +','+ full.empresaCodigo +', 4);" title="Anular" type="button" class="btn btn-danger btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eraser"></i></button>';
					var btnAUD	= '<button onclick="setUsuarioRol('+ full.usuarioCodigo +', '+ full.rolCodigo +','+ full.empresaCodigo +', 5);" title="Auditoria" type="button" class="btn btn-warning btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-user-secret"></i></button>';
					
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


function setUsuarioRol(codUsu, codRol, codEmp, codAcc) {
	var xJSON       	= [];
	var xJSON1     		= getDominioValor('ADMUSUARIOROLESTADO');
	var xJSON2     		= getEmpresaList();
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
	var selUsu			= '';

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
		'					<form class="needs-validation" method="post" action="../class/crud/usuariorol.php">'+
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
		`       					                <select id="var03" name="var03" class="select2 form-control custom-select" onchange="selectEmpresaRol('var04','var03', 1, 1, 'var04'); selectEmpresaUsuarioListado('var05','var03', 1, 1);" style="width:100%; height:40px;" required="true">`+
		'       					                    <optgroup label="Seleccionar">'+ 
		'													<option value="0" disabled selected> SELECCIONAR </option>' + selEmpresa +
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-6">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var04">Rol</label>'+
		`       					                <select id="var04" name="var04" class="select2 form-control custom-select" onchange="selectEmpresaUsuarioListado('var05','var03', 1, 1);" style="width:100%; height:40px;" required="true" ${bodyOnl}>`+
		'       					                    <optgroup label="Seleccionar">'+
		'													<option value="0" disabled selected> SELECCIONAR </option>' + 
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'									<div class="col-sm-12 col-md-6">'+
		'       					            <div class="form-group">'+
		'       					                <label for="var05">Usuario</label>'+
		'       					                <select id="var05" name="var05" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
		'       					                    <optgroup label="Seleccionar">'+
		'													<option value="0" disabled selected> SELECCIONAR </option>' + 
		'       					                    </optgroup>'+
		'       					                </select>'+
		'       					            </div>'+
		'       					        </div>'+
		''+
		'               					<div class="col-sm-12 col-md-6">'+
		'               					    <div class="form-group">'+
		'               					        <label for="var06">Fecha Desde</label>'+
		'               					        <input id="var06" name="var06" value="" class="form-control" type="date" style="text-transform:uppercase; height:40px;" placeholder="Orden" required="true" '+ bodyOnl +'>'+
		'               					    </div>'+
		'               					</div>'+
		''+
		'               					<div class="col-sm-12 col-md-6">'+
		'               					    <div class="form-group">'+
		'               					        <label for="var07">Fecha Hasta</label>'+
		'               					        <input id="var07" name="var07" value="" class="form-control" type="date" style="text-transform:uppercase; height:40px;" placeholder="Orden" '+ bodyOnl +'>'+
		'               					    </div>'+
		'               					</div>'+
		''+
		'               					<div class="col-sm-12">'+
		'               					    <div class="form-group">'+
		'               					        <label for="var08">Comentario</label>'+
		'               					        <textarea id="var08" name="var08" value="" class="form-control" rows="5" style="" '+ bodyOnl +'></textarea>'+
		'               					    </div>'+
		'               					</div>'+
		'           				</div>'+
		''+
		'           				<div class="form-group">'+
		'           				    <input class="form-control" type="hidden" id="workCodRol"		name="workCodRol"			value="'+ codRol +'"					required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workCodUsu"		name="workCodUsu"			value="'+ codUsu +'"					required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workModo"			name="workModo"				value="'+ bodyMod +'"					required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workPage"			name="workPage"				value="public/usuariorol.php?"			required readonly>'+
		'           				    <input class="form-control" type="hidden" id="workPrograma"		name="workPrograma"			value="usuariorol"						required readonly>'+
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
		xJSON       = getUsuarioRolId(codUsu, codRol, codEmp);

		xJSON.forEach(element => {
			if (element.rolCodigo == codRol && element.usuarioCodigo == codUsu) {
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

				var usuarioRolOrden						= (element.usuarioRolOrden == null) ? '' : element.usuarioRolOrden;
				var usuarioRolFechaDesde				= (element.usuarioRolFechaDesde1 == null) ? '' : element.usuarioRolFechaDesde1;
				var usuarioRolFechaHasta				= (element.usuarioRolFechaHasta1 == null) ? '' : element.usuarioRolFechaHasta1;
				var usuarioRolObservacion				= (element.usuarioRolObservacion == null) ? '' : element.usuarioRolObservacion;

				selRol	= selRol + '           			<option value="'+ element.rolCodigo +'" selected>'+ element.rolNombre +'</option>';
				selUsu	= selUsu + '            		<option value="'+ element.usuarioCodigo +'" selected>'+ element.usuarioDocumento +' - '+element.usuarioApellido +', '+element.usuarioNombre +'</option>';

				html = 
				'				<div class="modal-content">'+
				'					<form class="needs-validation" method="post" action="../class/crud/usuariorol.php">'+
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
				'               					        <input id="var02" name="var02" value="'+usuarioRolOrden+'" class="form-control" type="number" min="0" max="999" style="text-transform:uppercase; height:40px;" placeholder="Orden" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'									<div class="col-sm-12 col-md-4">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var03">Empresa</label>'+
				`       					                <select id="var03" name="var03" value="" class="select2 form-control custom-select" onchange="" style="width:100%; height:40px;" required="true">`+
				'       					                    <optgroup label="Seleccionar">'+ selEmpresa +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-6">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var04">Rol</label>'+
				'       					                <select id="var04" name="var04" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+ selRol +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-6">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var05">Usuario</label>'+
				'       					                <select id="var05" name="var05" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+ selUsu +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'               					<div class="col-sm-12 col-md-6">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var06">Fecha Desde</label>'+
				'               					        <input id="var06" name="var06" value="'+usuarioRolFechaDesde+'" class="form-control" type="date" style="text-transform:uppercase; height:40px;" placeholder="Orden" required="true" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-6">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var07">Fecha Hasta</label>'+
				'               					        <input id="var07" name="var07" value="'+usuarioRolFechaHasta+'" class="form-control" type="date" style="text-transform:uppercase; height:40px;" placeholder="Orden" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var08">Comentario</label>'+
				'               					        <textarea id="var08" name="var08" value="" class="form-control" rows="5" style="" '+ bodyOnl +'>'+usuarioRolObservacion+'</textarea>'+
				'               					    </div>'+
				'               					</div>'+
				'           				</div>'+
				''+
				'           				<div class="form-group">'+
				'           				    <input class="form-control" type="hidden" id="workCodRol"		name="workCodRol"		value="'+ codRol +'"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workCodUsu"		name="workCodUsu"		value="'+ codUsu +'"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workModo"			name="workModo"			value="'+ bodyMod +'"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPage"			name="workPage"			value="public/usuariorol.php?"			required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPrograma"		name="workPrograma"		value="usuariorol"						required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workAccion"		name="workAccion"		value="'+bodAcc+'"						required readonly>'+
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
}