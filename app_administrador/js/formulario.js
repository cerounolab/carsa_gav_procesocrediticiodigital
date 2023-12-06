$(document).ready(function() {
    var dataJSON	= getFormularioList(_parm06BASE);

	$('#tableLoads').DataTable({
		processing	: true,
		destroy		: true,
		searching	: true,
		paging		: true,
		lengthChange: true,
		info		: true,
		order: [[1, "asc"]],
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
			{ targets			: [1],	visible : false,searchable : true,	orderData : [1, 0] },
			{ targets			: [2],	visible : true,	searchable : true,	orderData : [2, 0] },
			{ targets			: [3],	visible : true, searchable : false,	orderData : [3, 0] },
			{ targets			: [4],	visible : true,	searchable : true,	orderData : [4, 0] },
			{ targets			: [5],	visible : true, searchable : true,	orderData : [5, 0] },
			{ targets			: [6],	visible : true,	searchable : true,	orderData : [6, 0] },
			{ targets			: [7],	visible : false,searchable : false,	orderData : [7, 0] },
			{ targets			: [8],	visible : true,searchable : false,	orderData : [8, 0] }
		],
		
		columns		: [
			{ data				: 'formularioCodigo', name : 'formularioCodigo'},
			{ data				: 'formularioOrden', name : 'formularioOrden'},
			{ data				: 'tipoEstadoNombre', name : 'tipoEstadoNombre'},
			{ data				: 'empresaNombre', name : 'empresaNombre'},
			{ data				: 'formularioNombre', name : 'formularioNombre'},
			{ data				: 'formularioObservacion', name : 'formularioObservacion'},
			{ data				: 'auditoriaUsuario', name : 'auditoriaUsuario'},
			{ data				: 'auditoriaIp', name : 'auditoriaIp'},
            { render			: 
				function (data, type, full, meta) {
					var btnDSP	= '<button onclick="setFormulario('+ full.formularioCodigo +', 2);" title="Ver" type="button" class="btn btn-primary btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eye"></i></button>';
					var btnUPD	= '<button onclick="setFormulario('+ full.formularioCodigo +', 3);" title="Editar" type="button" class="btn btn-success btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-edit"></i></button>';
					var btnDLT	= '<button onclick="setFormulario('+ full.formularioCodigo +', 4);" title="Eliminar" type="button" class="btn btn-danger btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eraser"></i></button>';
					var btnAUD	= '<button onclick="setFormulario('+ full.formularioCodigo +', 5);" title="Auditoria" type="button" class="btn btn-warning btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-user-secret"></i></button>';

					return (btnDSP + '&nbsp;' + btnUPD + '&nbsp;' + btnDLT + '&nbsp;');
				}
			},
        ],
    });
});


function setFormulario(codElem, codAcc) {
	var xJSON       = [];
	var xJSON1     	= getDominioValor('ADMROLESTADO');
	var xJSON2     	= getEmpresaList();
	var html		= '';
	var bodyCol     = '';
	var bodyTit     = '';
	var bodyMod     = '';
	var bodyOnl     = '';
	var bodyBot     = '';
	var selEstado   = '';
	var selEmpresa  = '';
	var selTipSuc	= '';

	switch (codAcc) {
		case 1:
			bodyTit = 'NUEVO';
			bodyCol = '#2b5cfd;';
			bodyMod = 'C';
			bodyOnl = '';
			bodyBot = '           <button type="submit" class="btn btn-info">Agregar</button>';
			break;

		case 2:
			bodyTit = 'VER';
			bodyCol = '#6929d5;';
			bodyMod = 'R';
			bodyOnl = 'disabled';
			bodyBot = '';
			break;

		case 3:
			bodyTit = 'EDITAR';
			bodyCol = '#007979;';
			bodyMod = 'U';
			bodyOnl = '';
			bodyBot = '           <button type="submit" class="btn btn-success">Actualizar</button>';
			break;

		case 4:
			bodyTit = 'ELIMINAR';
			bodyCol = '#ff2924;';
			bodyMod = 'D';
			bodyOnl = 'readonly';
			bodyBot = '           <button type="submit" class="btn btn-danger">Eliminar</button>';
			break;
	
		case 5:
			bodyTit = 'AUDITORIA';
			bodyCol = '#d38109;';
			bodyMod = 'A';
			bodyOnl = 'readonly';
			bodyBot = '';
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
			'				<div class="modal-content" style="width:800px">'+
			'					<form class="needs-validation" novalidate method="post" action="../class/crud/formulario.php">'+
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
			'       					                <select id="var01" name="var01" class="select2 form-control custom-select" style="width:100%; height:40px;" '+ bodyOnl +'>'+
			'       					                    <optgroup label="Estado">'+selEstado+
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
			'               					<div class="col-sm-12 col-md-4">'+
			'               					</div>'+
			''+
			'									<div class="col-sm-12 col-md-4">'+
			'       					            <div class="form-group">'+
			'       					                <label for="var03">Empresa</label>'+
			'       					                <select id="var03" name="var03" class="select2 form-control custom-select" style="width:100%; height:40px;" '+ bodyOnl +'>'+
			'       					                    <optgroup label="Seleccionar">'+ selEmpresa +
			'       					                    </optgroup>'+
			'       					                </select>'+
			'       					            </div>'+
			'       					        </div>'+
			''+
			'               					<div class="col-sm-12 col-md-6">'+
			'               				    	<div class="form-group">'+
			'               				        	<label for="var04">Nombre</label>'+
			'               				        	<input id="var04" name="var04" value="" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Nombre" required '+ bodyOnl +'>'+
			'               				    	</div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-6">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var05">Url</label>'+ 
			'											<input id="var05" name="var05" value="" class="form-control" placeholder="Url" type="text" style="text-transform:lowercase; height:40px;" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var06">Observación</label>'+
			'               					        <textarea id="var06" name="var06" value="" class="form-control" rows="5" style="" '+ bodyOnl +'></textarea>'+
			'               					    </div>'+
			'               					</div>'+
			'           				</div>'+
			''+
			'           				<div class="form-group">'+
			'           				    <input class="form-control" type="hidden" id="workCodigo"	name="workCodigo"	value="'+ codElem +'"				required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workModo"		name="workModo"		value="'+ bodyMod +'"				required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workPage"		name="workPage"		value="public/formulario.php?"		required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workPrograma"	name="workPrograma"	value="formulario"		 			required readonly>'+
			'           				</div>'+
			'						</div>'+
			''+
			'						<div class="col-12 text-end">'+
			'	    					<div class="modal-footer" style="text-align: right;">'+ bodyBot +
			'		    					<button type="button" class="btn btn-dark" data-dismiss="modal">Cerrar</button>'+
			'	    					</div>'+
			'						</div>'+
			'					</div>'+
			'				</form>'+
			'			</div>';

	} else if (codAcc > 1 && codAcc < 5) {
		xJSON       = getFormularioId(codElem);

		xJSON.forEach(element => {
			if (element.formularioCodigo == codElem) {
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
						} else {
							selEmpresa = selEmpresa + '            			<option value="'+ element1.empresaCodigo +'">'+ element1.empresaNombre +'</option>';
						}
					}
				});

				var formularioCodigo		= (element.formularioCodigo == null) ? '' : element.formularioCodigo;
				var formularioOrden			= (element.formularioOrden == null) ? '' : element.formularioOrden;
				var formularioNombre		= (element.formularioNombre == null) ? '' : element.formularioNombre;
				var formularioUrl			= (element.formularioUrl == null) ? '' : element.formularioUrl;
				var formularioObservacion	= (element.formularioObservacion == null) ? '' : element.formularioObservacion;

				html = 
				'				<div class="modal-content" style="width:800px">'+
				'					<form class="needs-validation" novalidate method="post" action="../class/crud/formulario.php">'+
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
				'       					                <select id="var01" name="var01" class="select2 form-control custom-select" style="width:100%; height:40px;" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Estado">'+selEstado+
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var02">Orden</label>'+
				'               					        <input id="var02" name="var02" value="'+formularioOrden+'" class="form-control" type="number" min="0" max="999" style="text-transform:uppercase; height:40px;" placeholder="Orden" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					</div>'+
				''+
				'									<div class="col-sm-12 col-md-4">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var03">Empresa</label>'+
				'       					                <select id="var03" name="var03" class="select2 form-control custom-select" style="width:100%; height:40px;" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+ selEmpresa +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'               					<div class="col-sm-12 col-md-6">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var04">Nombre</label>'+
				'               				        	<input id="var04" name="var04" value="'+formularioNombre+'" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="Nombre" required '+ bodyOnl +'>'+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-6">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var05">Url</label>'+ 
				'											<input id="var05" name="var05" value="'+formularioUrl+'" class="form-control" placeholder="Url" type="text" style="text-transform:uppercase; height:40px;" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var06">Observación</label>'+
				'               					        <textarea id="var06" name="var06" value="" class="form-control" rows="5" style="" '+ bodyOnl +'>'+formularioObservacion+'</textarea>'+
				'               					    </div>'+
				'               					</div>'+
				'           				</div>'+
				''+
				'           				<div class="form-group">'+
				'           				    <input class="form-control" type="hidden" id="workCodigo"	name="workCodigo"	value="'+ codElem +'"				required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workModo"		name="workModo"		value="'+ bodyMod +'"				required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPage"		name="workPage"		value="public/formulario.php?"		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPrograma"	name="workPrograma"	value="formulario"		 			required readonly>'+
				'           				</div>'+
				'						</div>'+
				''+
				'						<div class="col-12 text-end">'+
				'	    					<div class="modal-footer" style="text-align: right;">'+ bodyBot +
				'		    					<button type="button" class="btn btn-dark" data-dismiss="modal">Cerrar</button>'+
				'	    					</div>'+
				'						</div>'+
				'					</div>'+
				'				</form>'+
				'			</div>';
				}
		});	
	}

	$("#modal-content").empty();
	$("#modal-content").append(html);
		
}