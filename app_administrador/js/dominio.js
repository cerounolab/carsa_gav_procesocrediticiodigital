$(document).ready(function() {
	var dataJSON	= [];
	var dataJSON	= getDominioValorAll(_parm07BASE, _parm09BASE);

	$('#tableLoads').DataTable({
		processing	: true,
		destroy		: true,
		searching	: true,
		paging		: true,
		lengthChange: true,
		info		: true,
		order: [[12, "desc"]],
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
			{ targets			: [2],	visible : false,searchable : true,	orderData : [2, 0] },
			{ targets			: [3],	visible : true, searchable : true,	orderData : [3, 0] },
			{ targets			: [4],	visible : true,	searchable : true,	orderData : [4, 0] },
			{ targets			: [5],	visible : false,searchable : true,	orderData : [5, 0] },
			{ targets			: [6],	visible : true,	searchable : true,	orderData : [6, 0] },
			{ targets			: [7],	visible : false,searchable : true,	orderData : [7, 0] },
			{ targets			: [8],	visible : true,	searchable : true,	orderData : [8, 0] },
			{ targets			: [9],	visible : false,searchable : true,	orderData : [9, 0] },
			{ targets			: [10],	visible : false,searchable : true,	orderData : [10, 0] },
			{ targets			: [11],	visible : true, searchable : true,	orderData : [11, 0] },
			{ targets			: [12],	visible : true, searchable : true,	orderData : [12, 0] },
			{ targets			: [13],	visible : true, searchable : true,	orderData : [13, 0] },
			{ targets			: [14],	visible : true,	searchable : true,	orderData : [14, 0] },

		],
		
		columns		: [
			{ data				: 'tipoCodigo', name : 'tipoCodigo'},
			{ data				: 'tipoOrden', name : 'tipoOrden'},
			{ data				: 'tipoParametro', name : 'tipoParametro'},
			{ data				: 'tipoEstadoNombre', name : 'tipoEstadoNombre'},
			{ data				: 'tipoNombre', name : 'tipoNombre'},
			{ data				: 'tipoIcono', name : 'tipoIcono'},
			{ data				: 'tipoCss', name : 'tipoCss'},
			{ data				: 'tipoPath', name : 'tipoPath'},
			{ data				: 'tipoEquivalencia', name : 'tipoEquivalencia'},
			{ data				: 'tipoValor', name : 'tipoValor'},
			{ data				: 'tipoObservacion', name : 'tipoObservacion'},
			{ data				: 'auditoriaUsuario', name : 'auditoriaUsuario'},
			{ data				: 'autitoriaFechaHora', name : 'autitoriaFechaHora'},
			{ data				: 'auditoriaIp', name : 'auditoriaIp'},
            { render			: 
				function (data, type, full, meta) {
					var btnDSP	= '<button onclick="setDominio('+ full.tipoCodigo +', 2);" title="Ver" type="button" class="btn btn-primary btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eye"></i></button>';
					var btnUPD	= '<button onclick="setDominio('+ full.tipoCodigo +', 3);" title="Editar" type="button" class="btn btn-success btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-edit"></i></button>';
					var btnDLT	= '<button onclick="setDominio('+ full.tipoCodigo +', 4);" title="Eliminar" type="button" class="btn btn-danger btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eraser"></i></button>';
					var btnAUD	= '<button onclick="setDominio('+ full.tipoCodigo +', 5);" title="Auditoria" type="button" class="btn btn-warning btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-user-secret"></i></button>';

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


function setDominio(codElem, codAcc) {
	var codDom		= document.getElementById('tableCodigo').className;
	var xJSON       = [];
	// var aJSON       = getADominio(codDom, codElem);
	var html        = '';
	var bodyCol     = '';
	var bodyTit     = '';
	var bodyMod     = '';
	var bodyOnl     = '';
	var bodyBot     = '';
	var selEstado   = '';
	var rowDominio	= '';

	var xJSON1     	= getDominioValor('ADMDOMINIOESTADO');

	switch (codAcc) {
		case 1:
			bodyTit = 'NUEVO';
			bodyCol = '#be9027;';
			bodyMod = 'C';
			bodyOnl = '';
			bodyBot = '           <button type="submit" class="btn btn-primary">Agregar</button>';
			break;

		case 2:
			bodyTit = 'VER';
			bodyCol = '#be9027;';
			bodyMod = 'R';
			bodyOnl = 'disabled';
			bodyBot = '';
			break;

		case 3:
			bodyTit = 'EDITAR';
			bodyCol = '#be9027;';
			bodyMod = 'U';
			bodyOnl = '';
			bodyBot = '           <button type="submit" class="btn btn-primary">Actualizar</button>';
			break;

		case 4:
			bodyTit = 'ELIMINAR';
			bodyCol = '#be9027;';
			bodyMod = 'D';
			bodyOnl = 'readonly';
			bodyBot = '           <button type="submit" class="btn btn-primary">Eliminar</button>';
			break;
	
		case 5:
			bodyTit = 'AUDITORIA';
			bodyCol = '#be9027;';
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

		html = 
			'				<div class="modal-content">'+
			'					<form class="needs-validation" method="post" action="../class/crud/dominio.php">'+
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
			'               					        <input id="var02" name="var02" value="" class="form-control" type="number" min="0" max="999" style="text-transform:uppercase; height:40px;" placeholder="NRO ORDEN" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               				<div class="col-sm-12 col-md-4" style="display:none">'+
			'               				    <div class="form-group">'+
			'               				        <label for="var03">Parámetro</label>'+
			'               				        <input id="var03" name="var03" class="form-control" type="number" min="0" max="999" style="height:40px;" placeholder="PARÁMETRO" '+ bodyOnl +'>'+
			'               				    </div>'+
			'               				</div>'+
			''+
			'               				<div class="col-sm-12 col-md-12">'+
			'               				    <div class="form-group">'+
			'               				        <label for="var04">Nombre</label>'+
			'               				        <input id="var04" name="var04" value="" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="TIPO" required="true" '+ bodyOnl +'>'+
			'               				    </div>'+
			'               				</div>'+
			''+
			'               				<div class="col-sm-12 col-md-4">'+
			'               				    <div class="form-group">'+
			'               				        <label for="var05">Icono</label>'+
			'               				        <input id="var05" name="var05" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="ICONO" '+ bodyOnl +'>'+
			'               				    </div>'+
			'               				</div>'+
			''+
			'               				<div class="col-sm-12 col-md-4">'+
			'               				    <div class="form-group">'+
			'               				        <label for="var06">Color</label>'+
			'										<input id="var06" name="var06" value="#ff6161" class="form-control" type="color" style="text-transform:lowercase; height:40px;" '+ bodyOnl +'>'+
			'               				    </div>'+
			'               				</div>'+
			''+
			'               				<div class="col-sm-12 col-md-4">'+
			'               				    <div class="form-group">'+
			'               				        <label for="var07">Path</label>'+
			'               				        <input id="var07" name="var07" value="" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="PATH" '+ bodyOnl +'>'+
			'               				    </div>'+
			'               				</div>'+
			''+
			'               				<div class="col-sm-12 col-md-4">'+
			'               				    <div class="form-group">'+
			'               				        <label for="var08">Equivalencia</label>'+
			'               				        <input id="var08" name="var08" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="EQUIVALENCIA" '+ bodyOnl +'>'+
			'               				    </div>'+
			'               				</div>'+
			''+
			'               				<div class="col-sm-12">'+
			'               				    <div class="form-group">'+
			'               				        <label for="var09">Comentario</label>'+
			'               				        <textarea id="var09" name="var09" value="" class="form-control" rows="5" '+ bodyOnl +'></textarea>'+
			'               				    </div>'+
			'               				</div>'+
			'           				</div>'+
			''+
			'           				<div class="form-group">'+
			'           				    <input class="form-control" type="hidden" id="workCodigo"	name="workCodigo"	value="'+ codElem +'"		required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workModo"		name="workModo"		value="'+ bodyMod +'"		required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workPage"		name="workPage"		value="'+ _parm04BASE +'"	required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workDominio"	name="workDominio"	value="' + codDom + '" 		required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workPrograma"	name="workPrograma"	value="dominio"		 		required readonly>'+
			'           				</div>'+
			'	    				</div>'+
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
			'				</form>'+
			'			</div>';

	} else if (codAcc > 1 && codAcc < 5) {
		xJSON       = getDominioId(codElem);

		xJSON.forEach(element => {
			if (element.tipoCodigo == codElem) {
				var tipoOrden			= (element.tipoOrden == null) ? '' : element.tipoOrden;
				var tipoParametro		= (element.tipoParametro == null) ? '' : element.tipoParametro;
				var tipoNombre			= (element.tipoNombre == null) ? '' : element.tipoNombre;
				var tipoIcono			= (element.tipoIcono == null) ? '' : element.tipoIcono;
				var tipoCss				= (element.tipoCss == null) ? '' : element.tipoCss;
				var tipoPath			= (element.tipoPath == null) ? '' : element.tipoPath;
				var tipoEquivalencia	= (element.tipoEquivalencia == null) ? '' : element.tipoEquivalencia;
				var tipoObservacion		= (element.tipoObservacion == null) ? '' : element.tipoObservacion;

				xJSON1.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.tipoParametro == element.tipoEstadoParametro) {
							selEstado = selEstado + '            			<option value="'+ element1.tipoParametro +'" selected>'+ element1.tipoNombre +'</option>';
						} else {
							selEstado = selEstado + '            			<option value="'+ element1.tipoParametro +'">'+ element1.tipoNombre +'</option>';
						}
					}
				});

				html = 
				'				<div class="modal-content">'+
				'					<form class="needs-validation" method="post" action="../class/crud/dominio.php">'+
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
				'       					                    <optgroup label="Estado">'+ selEstado +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var02">Orden</label>'+
				'               					        <input id="var02" name="var02" value="'+ tipoOrden +'" class="form-control" type="number" min="0" max="999" style="text-transform:uppercase; height:40px;" placeholder="NRO ORDEN" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var03">Parámetro</label>'+
				'               				        	<input id="var03" name="var03" value="'+ tipoParametro +'" class="form-control" type="number" min="0" max="999" style="height:40px;" placeholder="PARÁMETRO" readonly'+ bodyOnl +'>'+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-12">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var04">Nombre</label>'+
				'               				        	<input id="var04" name="var04" value="'+ tipoNombre +'" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="TIPO" required="true" '+ bodyOnl +'>'+
				'               				    	</div>'+
				'               					</div>'+
				// ''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var05">Icono</label>'+
				'               					        <input id="var05" name="var05" value="'+ tipoIcono +'" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="ICONO" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var06">Color</label>'+
				'                       						<input id="var06" name="var06" value="'+ tipoCss +'" class="form-control" type="color" style="text-transform:lowercase; height:40px;" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var07">Path</label>'+
				'               					        <input id="var07" name="var07" value="'+ tipoPath +'" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="PATH" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var08">Equilavencia</label>'+
				'               					        <input id="var08" name="var08" value="'+ tipoEquivalencia +'" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="EQUIVALENCIA" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var09">Comentario</label>'+
				'               					        <textarea id="var09" name="var09" value="" class="form-control" rows="5";" '+ bodyOnl +'>'+ tipoObservacion +'</textarea>'+
				'               					    </div>'+
				'               					</div>'+
				'           					</div>'+
				''+
				'           					<div class="form-group">'+
				'           					    <input class="form-control" type="hidden" id="workCodigo"	name="workCodigo"	value="'+ codElem +'"		required readonly>'+
				'           					    <input class="form-control" type="hidden" id="workModo"		name="workModo"		value="'+ bodyMod +'"		required readonly>'+
				'           					    <input class="form-control" type="hidden" id="workPage"		name="workPage"		value="'+ _parm04BASE +'"	required readonly>'+
				'           					    <input class="form-control" type="hidden" id="workDominio"	name="workDominio"	value="' + codDom + '" 		required readonly>'+
				'           					    <input class="form-control" type="hidden" id="workPrograma"	name="workPrograma"	value="dominio"		 		required readonly>'+
				'           					</div>'+
				'	    					</div>'+
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
				'				</form>'+
				'			</div>';
			}
		});
	}

	$("#modal-content").empty();
	$("#modal-content").append(html);	
}