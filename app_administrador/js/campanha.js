$(document).ready(function() {
    var dataJSON	= getcampanhaList();

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
			{ targets			: [1],	visible : false,searchable : false,	orderData : [1, 0] },
			{ targets			: [2],	visible : true,	searchable : true,	orderData : [2, 0] },
			{ targets			: [3],	visible : true, searchable : false,	orderData : [3, 0] },
			{ targets			: [4],	visible : true,	searchable : true,	orderData : [4, 0] },
			{ targets			: [5],	visible : true, searchable : true,	orderData : [5, 0] },
			{ targets			: [6],	visible : true,	searchable : true,	orderData : [6, 0] },
			{ targets			: [7],	visible : true, searchable : true,	orderData : [7, 0] },
			{ targets			: [8],	visible : false,searchable : false,	orderData : [8, 0] },
			{ targets			: [9],	visible : false,searchable : false,	orderData : [9, 0] },
			{ targets			: [10],	visible : false,searchable : false,	orderData : [10, 0] },
			{ targets			: [11],	visible : true, searchable : false,	orderData : [11, 0] }

		],
		
		columns		: [
			{ data				: 'campanhaCodigo', name : 'campanhaCodigo'},
			{ data				: 'campanhaOrden', name : 'campanhaOrden'},
			{ data				: 'tipoEstadoNombre', name : 'tipoEstadoNombre'},
			{ data				: 'tipoCampanhaNombre', name : 'tipoCampanhaNombre'},
			{ data				: 'empresaNombre', name : 'empresaNombre'},
			{ data				: 'campanhaNombre', name : 'campanhaNombre'},
			{ data				: 'campanhaFechaDesde2', name : 'campanhaFechaDesde2'},
			{ data				: 'campanhaFechaHasta2', name : 'campanhaFechaHasta2'},
			{ data				: 'campanhaObservacion', name : 'campanhaObservacion'},
			{ data				: 'auditoriaUsuario', name : 'auditoriaUsuario'},
			{ data				: 'auditoriaIp', name : 'auditoriaIp'},
            { render			: 
				function (data, type, full, meta) {
					var btnDSP	= '<button onclick="setcampanha('+ full.campanhaCodigo +', 2);" title="Ver" type="button" class="btn btn-primary btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eye"></i></button>';
					var btnUPD	= '<button onclick="setcampanha('+ full.campanhaCodigo +', 3);" title="Editar" type="button" class="btn btn-success btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-edit"></i></button>';
					var btnDLT	= '<button onclick="setcampanha('+ full.campanhaCodigo +', 4);" title="Eliminar" type="button" class="btn btn-danger btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eraser"></i></button>';
					var btnAUD	= '<button onclick="setcampanha('+ full.campanhaCodigo +', 5);" title="Auditoria" type="button" class="btn btn-warning btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-user-secret"></i></button>';

					return (btnDSP + '&nbsp;' + btnUPD + '&nbsp;' + btnDLT + '&nbsp;');
				}
			},
        ],
    });
});


function setcampanha(codElem, codAcc) {
	var xJSON       = [];
	var xJSON1     	= getDominioValor('ADMCAMPANHAESTADO');
	var xJSON2     	= getEmpresaList();
	var xJSON3     	= getDominioValor('ADMCAMPANHATIPO');
	var html		= '';
	var bodyCol     = '';
	var bodyTit     = '';
	var bodyMod     = '';
	var bodyOnl     = '';
	var bodyBot     = '';
	var selEstado   = '';
	var selEmpresa  = '';
	var selTipCargo	= '';

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
			bodyOnl = 'readonly';
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
				if (element1.tipoOrden == 1) {
					selEstado = selEstado + '                               				<option value="'+ element1.tipoParametro +'"selected>'+ element1.tipoNombre +'</option>';
				} else{
					selEstado = selEstado + '                               				<option value="'+ element1.tipoParametro +'">'+ element1.tipoNombre +'</option>';
				}
			}
		});

		xJSON2.forEach(element1 => {
			if (element1.tipoEstadoParametro == 1) {
				selEmpresa = selEmpresa + '            									<option value="'+ element1.empresaCodigo +'">'+ element1.empresaNombre +'</option>';
			}
		});

		xJSON3.forEach(element1 => {
			if (element1.tipoEstadoParametro == 1) {
				selTipCargo = selTipCargo + '                               			<option value="'+ element1.tipoParametro +'">'+ element1.tipoNombre +'</option>';
			}
		});

		html = 
			'				<div class="modal-content" style="width:800px">'+
			'					<form class="needs-validation" novalidate method="post" action="../class/crud/campanha.php">'+
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
			'       					                <label for="var04">Tipo Campaña</label>'+
			'       					                <select id="var04" name="var04" class="select2 form-control custom-select" style="width:100%; height:40px;" '+ bodyOnl +'>'+
			'       					                    <optgroup label="Seleccionar">'+ selTipCargo +
			'       					                    </optgroup>'+
			'       					                </select>'+
			'       					            </div>'+
			'       					        </div>'+
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
			'               					<div class="col-sm-12 col-md-12">'+
			'               				    	<div class="form-group">'+
			'               				        	<label for="var05">Nombre</label>'+
			'               				        	<input id="var05" name="var05" value="" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="Nombre" required '+ bodyOnl +'>'+
			'               				    	</div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var06">Fecha Desde</label>'+
			'               					        <input id="var06" name="var06" class="form-control" type="date" style="text-transform:uppercase; height:40px;" placeholder="Fecha Desde" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var07">Fecha Hasta</label>'+ 
			'											<input id="var07" name="var07" value="" class="form-control" placeholder="Fecha Hasta" type="date" style="text-transform:uppercase; height:40px;" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var08">Observación</label>'+
			'               					        <textarea id="var08" name="var08" value="" class="form-control" rows="5" style="" '+ bodyOnl +'></textarea>'+
			'               					    </div>'+
			'               					</div>'+
			'           				</div>'+
			''+
			'           				<div class="form-group">'+
			'           				    <input class="form-control" type="hidden" id="workCodigo"	name="workCodigo"	value="'+ codElem +'"				required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workModo"		name="workModo"		value="'+ bodyMod +'"				required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workPage"		name="workPage"		value="public/campanha.php?"		required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workPrograma"	name="workPrograma"	value="campanha"		 			required readonly>'+
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
		xJSON       = getcampanhaId(codElem);

		xJSON.forEach(element => {
			if (element.campanhaCodigo == codElem) {
				xJSON1.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.tipoParametro == element.tipoEstadoParametro) {
							selEstado = selEstado + '            				<option value="'+ element1.tipoParametro +'" selected>'+ element1.tipoNombre +'</option>';
						} else {
							selEstado = selEstado + '            					<option value="'+ element1.tipoParametro +'">'+ element1.tipoNombre +'</option>';
						}
					}
				});
					
				xJSON2.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.empresaCodigo == element.empresaCodigo) {
							selEmpresa = selEmpresa + '            				<option value="'+ element1.empresaCodigo +'" selected>'+ element1.empresaNombre +'</option>';
						} else {
							selEmpresa = selEmpresa + '            				<option value="'+ element1.empresaCodigo +'">'+ element1.empresaNombre +'</option>';
						}
					}
				});

				xJSON3.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.tipoParametro == element.tipoEstadoParametro) {
							selTipCargo = selTipCargo + '            			<option value="'+ element1.tipoParametro +'" selected>'+ element1.tipoNombre +'</option>';
						} else {
							selTipCargo = selTipCargo + '            			<option value="'+ element1.tipoParametro +'">'+ element1.tipoNombre +'</option>';
						}
					}
				});

				var campanhaCodigo			= (element.campanhaCodigo == null) ? '' : element.campanhaCodigo;
				var campanhaOrden			= (element.campanhaOrden == null) ? '' : element.campanhaOrden;
				var campanhaNombre			= (element.campanhaNombre == null) ? '' : element.campanhaNombre;
				var campanhaFechaDesde1		= (element.campanhaFechaDesde1 == null) ? '' : element.campanhaFechaDesde1;
				var campanhaFechaHasta1		= (element.campanhaFechaHasta1 == null) ? '' : element.campanhaFechaHasta1;
				var campanhaObservacion		= (element.campanhaObservacion == null) ? '' : element.campanhaObservacion;

				html = 
				'				<div class="modal-content" style="width:800px">'+
				'					<form class="needs-validation" novalidate method="post" action="../class/crud/campanha.php">'+
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
				'               					        <input id="var02" name="var02" value="'+campanhaOrden+'" class="form-control" type="number" min="0" max="999" style="text-transform:uppercase; height:40px;" placeholder="Orden" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					</div>'+
				''+
				'									<div class="col-sm-12 col-md-4">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var04">Tipo Campaña</label>'+
				'       					                <select id="var04" name="var04" class="select2 form-control custom-select" style="width:100%; height:40px;" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+ selTipCargo +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
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
				'               					<div class="col-sm-12 col-md-12">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var05">Nombre</label>'+
				'               				        	<input id="var05" name="var05" value="'+campanhaNombre+'" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="Nombre" required '+ bodyOnl +'>'+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var06">Fecha Desde</label>'+
				'               					        <input id="var06" name="var06" value="'+campanhaFechaDesde1+'" class="form-control" type="date" style="text-transform:uppercase; height:40px;" placeholder="Fecha Desde" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var07">Fecha Hasta</label>'+ 
				'											<input id="var07" name="var07" value="'+campanhaFechaHasta1+'" class="form-control" placeholder="Fecha Hasta" type="date" style="text-transform:uppercase; height:40px;" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var08">Observación</label>'+
				'               					        <textarea id="var08" name="var08" value="" class="form-control" rows="5" style="" '+ bodyOnl +'>'+campanhaObservacion+'</textarea>'+
				'               					    </div>'+
				'               					</div>'+
				'           				</div>'+
				''+
				'           				<div class="form-group">'+
				'           				    <input class="form-control" type="hidden" id="workCodigo"	name="workCodigo"	value="'+ codElem +'"				required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workModo"		name="workModo"		value="'+ bodyMod +'"				required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPage"		name="workPage"		value="public/campanha.php?"		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPrograma"	name="workPrograma"	value="campanha"		 			required readonly>'+
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