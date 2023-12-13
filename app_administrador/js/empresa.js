$(document).ready(function() {
    var dataJSON	= getEmpresaList();

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
			{ targets			: [0],	visible : false, searchable : true,	orderData : [0, 0] },
			{ targets			: [1],	visible : false,searchable : true,	orderData : [1, 0] },
			{ targets			: [2],	visible : true,	searchable : true,	orderData : [2, 0] },
			{ targets			: [3],	visible : true,searchable : false,	orderData : [3, 0] },
			{ targets			: [4],	visible : true,	searchable : true,	orderData : [4, 0] },
			{ targets			: [5],	visible : true,searchable : false,	orderData : [5, 0] },
			{ targets			: [6],	visible : true,	searchable : true,	orderData : [6, 0] },
			{ targets			: [7],	visible : false,searchable : false,	orderData : [7, 0] },
			{ targets			: [8],	visible : true,searchable : false,	orderData : [8, 0] },
			{ targets			: [9],	visible : false,searchable : true,	orderData : [9, 0] },
			{ targets			: [10],	visible : true,searchable : false,	orderData : [10, 0] },
			{ targets			: [11],	visible : false,searchable : false,	orderData : [11, 0] },
			{ targets			: [12],	visible : false,searchable : false,	orderData : [12, 0] },
			{ targets			: [13],	visible : false,searchable : true,	orderData : [13, 0] },
			{ targets			: [14],	visible : false,searchable : false,	orderData : [14, 0] },
			{ targets			: [15],	visible : false,searchable : true,	orderData : [15, 0] },
			{ targets			: [16],	visible : false,searchable : false,	orderData : [16, 0] },
			{ targets			: [17],	visible : false,searchable : false,	orderData : [17, 0] },
			{ targets			: [18],	visible : false,searchable : false,	orderData : [18, 0] },
			{ targets			: [19],	visible : true,searchable : false,	orderData : [19, 0] }
		],
		
		columns		: [
			{ data				: 'empresaCodigo', name : 'empresaCodigo'},
			{ data				: 'empresaOrden', name : 'empresaOrden'},
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
			{ data				: 'tipoRubroNombre', name : 'tipoRubroNombre'},
			{ data				: 'tipoAccesoNombre', name : 'tipoAccesoNombre'},
			{ data				: 'empresaNombre', name : 'empresaNombre'},
			{ data				: 'empresaRuc', name : 'empresaRuc'},
			{ data				: 'empresaTelefono', name : 'empresaTelefono'},
			{ data				: 'empresaCelular', name : 'empresaCelular'},
			{ data				: 'empresaSitoWeb', name : 'empresaSitoWeb'},

			{ data				: 'empresaCorreo', name : 'empresaCorreo'},
			{ data				: 'empresaUbicacion', name : 'empresaUbicacion'},
			{ data				: 'empresaDireccion', name : 'empresaDireccion'},

			{ data				: 'empresaEquivalencia', name : 'empresaEquivalencia'},
			{ data				: 'empresaObservacion', name : 'empresaObservacion'},

			{ data				: 'auditoriaPrograma', name : 'auditoriaPrograma'},
			{ data				: 'auditoriaUsuario', name : 'auditoriaUsuario'},
			{ data				: 'auditoriaFechaHora', name : 'auditoriaFechaHora'},
			{ data				: 'auditoriaIp', name : 'auditoriaIp'},

            { render			: 
				function (data, type, full, meta) {
					var btnDSP	= '<button onclick="setEmpresa('+ full.empresaCodigo +', 2);" title="Ver" type="button" class="btn btn-primary btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eye"></i></button>';
					var btnUPD	= '<button onclick="setEmpresa('+ full.empresaCodigo +', 3);" title="Editar" type="button" class="btn btn-success btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-edit"></i></button>';
					var btnDLT	= '<button onclick="setEmpresa('+ full.empresaCodigo +', 4);" title="Anular" type="button" class="btn btn-danger btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eraser"></i></button>';
					var btnAUD	= '<button onclick="setEmpresa('+ full.empresaCodigo +', 5);" title="Auditoria" type="button" class="btn btn-warning btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-user-secret"></i></button>';
					var btnADJ = '';

					if (full.empresaLogo) {
						btnADJ = '<a href="../uploads/empresa/'+full.empresaLogo+'" target="_blank" role="button" title="Ver Adjunto" class="btn btn-indigo" style="color:#ffffff; background:#6929d5;"><i class="ti-import"></i></a>';
					}
					
					if (_parm00DSP == 'N') {
						btnDSP = '';
					}

					if (_parm00UPD == 'N') {
						btnUPD = '';
					}
					
					if (_parm00DLT == 'N') {
						btnDLT = '';
					}

					if (_parm00EXPDF == 'N') {
						btnADJ = '';
					}

					if (full.tipoEstadoParametro != 1) {
						btnUPD	= '';
						btnDLT	= '';
					}

					

					return (btnDSP + '&nbsp;' + btnUPD + '&nbsp;' + btnDLT + '&nbsp;' + btnADJ+ '&nbsp;');
				}
			},
        ],
    });
});


function setEmpresa(codElem, codAcc) {
	var xJSON       = [];
	var html		= '';
	var bodyCol     = '';
	var bodyTit     = '';
	var bodyMod     = '';
	var bodyOnl     = '';
	var bodyBot     = '';
	var selEstado   = '';

	var xJSON1     	= getDominioValorAll('ADMEMPRESAESTADO', 0); 
	var xJSON2     	= getDominioValorAll('ADMEMPRESARUBRO', 0);
	var xJSON3     	= getDominioValorAll('ADMEMPRESAACCESO', 0); 

	var selEstado	= '';
	var selRubro	= '';
	var selAcceso	= '';
	var bodAcc		= 0;


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

		xJSON2.forEach(element2 => {
			if (element2.tipoEstadoParametro == 1) {
				selRubro = selRubro + '                               			<option value="'+ element2.tipoParametro +'">'+ element2.tipoNombre +'</option>';
			}
		});

		xJSON3.forEach(element2 => {
			if (element2.tipoEstadoParametro == 1) {
				selAcceso = selAcceso + '                               			<option value="'+ element2.tipoParametro +'">'+ element2.tipoNombre +'</option>';
			}
		});
		html = 
			'				<div class="modal-content">'+
			'					<form class="needs-validation" novalidate method="post" action="../class/crud/empresa.php" enctype="multipart/form-data">'+
			'	    				<div class="modal-header" style="color:#ffffff; background:'+ bodyCol +'">'+
			'							<h5 class="modal-title" id="modal-title">'+ bodyTit +' </h5>'+
			'							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
			'						</div>'+
			''+
			'	    					<div class="modal-body" >'+
			'       					    <div class="row">'+
			'       					        <div class="col-sm-12 col-md-4">'+
			'       					            <div class="form-group">'+
			'       					                <label for="var01">ESTADO</label>'+
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
			'									<div class="col-sm-12 col-md-4">'+
			'       					            <div class="form-group">'+
			'       					                <label for="var03">Tipo Rubro</label>'+
			'       					                <select id="var03" name="var03" class="select2 form-control custom-select" style="width:100%; height:40px;" '+ bodyOnl +'>'+
			'       					                    <optgroup label="Seleccionar">'+selRubro+
			'       					                    </optgroup>'+
			'       					                </select>'+
			'       					            </div>'+
			'       					        </div>'+
			''+
			'									<div class="col-sm-12 col-md-4">'+
			'       					            <div class="form-group">'+
			'       					                <label for="var04">Tipo Acceso</label>'+
			'       					                <select id="var04" name="var04" class="select2 form-control custom-select" style="width:100%; height:40px;" '+ bodyOnl +'>'+
			'       					                    <optgroup label="Seleccionar">'+selAcceso+
			'       					                    </optgroup>'+
			'       					                </select>'+
			'       					            </div>'+
			'       					        </div>'+
			''+
			'               					<div class="col-sm-12 col-md-8">'+
			'               				    	<div class="form-group">'+
			'               				        	<label for="var05">Nombre</label>'+
			'               				        	<input id="var05" name="var05" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="Nombre" '+ bodyOnl +'>'+
			'               				    	</div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-12">'+
			'               				    	<div class="form-group">'+
			'               				        	<label for="var06">Ruc</label>'+
			'               				        	<input id="var06" name="var06" value="" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="Ruc" required '+ bodyOnl +'>'+
			'               				    	</div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var07">Teléfono</label>'+
			'               					        <input id="var07" name="var07" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Teléfono" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var08">Celular</label>'+
			'											<input id="var08" name="var08" class="form-control" placeholder="Celular" type="text" style="text-transform:lowercase; height:40px;" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var09">Web</label>'+
			'               					        <input id="var09" name="var09" value="" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Web" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var010">Correo</label>'+
			'               					        <input id="var010" name="var010" value="" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Correo" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var011">Ubicación</label>'+
			'               					        <input id="var011" name="var011" value="" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Ubicación" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var012">Dirección</label>'+
			'               					        <input id="var012" name="var012" value="" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Dirección" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var013">Logo</label>'+
			'               					        <input id="var013" name="var013" value="" class="form-control" type="file" style="text-transform:lowercase; height:40px;" placeholder="Logo" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			// ''+
			// '               					<div class="col-sm-12 col-md-4">'+
			// '               					    <div class="form-group">'+
			// '               					        <label for="var014">Equivalencia</label>'+
			// '               					        <input id="var014" name="var014" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Equivalencia" '+ bodyOnl +'>'+
			// '               					    </div>'+
			// '               					</div>'+
			''+
			'               					<div class="col-sm-12">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var015">OBSERVACIÓN</label>'+
			'               					        <textarea id="var015" name="var015" value="" class="form-control" rows="5" style="" '+ bodyOnl +'></textarea>'+
			'               					    </div>'+
			'               					</div>'+
			'           				</div>'+
			''+
			'           				<div class="form-group">'+
			'           				    <input class="form-control" type="hidden" id="workCodigo"		name="workCodigo"	value="'+ codElem +'"		required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workModo"			name="workModo"		value="'+ bodyMod +'"		required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workPage"			name="workPage"		value="'+ _parm04BASE +'"	required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workPrograma"		name="workPrograma"	value="empresa"		 		required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workAccion"		name="workAccion"	value="'+ bodAcc+'"			required readonly>'+
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
		var xJSON       = getEmpresaId(codElem);
		xJSON.forEach(element => {
			if (element.empresaCodigo == codElem) {
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
						if (element1.tipoParametro == element.tipoRubroParametro) {
							selRubro = selRubro + '            			<option value="'+ element1.tipoParametro +'" selected>'+ element1.tipoNombre +'</option>';
						} else {
							selRubro = selRubro + '            			<option value="'+ element1.tipoParametro +'">'+ element1.tipoNombre +'</option>';
						}
					}
				});

				xJSON3.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.tipoParametro == element.tipoAccesoParametro) {
							selAcceso = selAcceso + '            			<option value="'+ element1.tipoParametro +'" selected>'+ element1.tipoNombre +'</option>';
						} else {
							selAcceso = selAcceso + '            			<option value="'+ element1.tipoParametro +'">'+ element1.tipoNombre +'</option>';
						}
					}
				});

				var empresaOrden		= (element.empresaOrden == null) ? '' : element.empresaOrden;
				var empresaRuc			= (element.empresaRuc == null) ? '' : element.empresaRuc;
				var empresaNombre		= (element.empresaNombre == null) ? '' : element.empresaNombre;
				var empresaCelular		= (element.empresaCelular == null) ? '' : element.empresaCelular;
				var empresaTelefono		= (element.empresaTelefono == null) ? '' : element.empresaTelefono;
				var empresaSitoWeb		= (element.empresaSitoWeb == null) ? '' : element.empresaSitoWeb;
				var empresaCorreo		= (element.empresaCorreo == null) ? '' : element.empresaCorreo;
				var empresaUbicacion	= (element.empresaUbicacion == null) ? '' : element.empresaUbicacion;
				var empresaDireccion	= (element.empresaDireccion == null) ? '' : element.empresaDireccion;
				var empresaObservacion	= (element.empresaObservacion == null) ? '' : element.empresaObservacion;
				var empresaLogo			= (element.empresaLogo == null) ? '' : element.empresaLogo;
				var viewDisplay			= (empresaLogo == '') ? 'display:none' : '';



				html = 
				'				<div class="modal-content">'+
				'					<form class="needs-validation" novalidate method="post" action="../class/crud/empresa.php" enctype="multipart/form-data">'+
				'	    				<div class="modal-header" style="color:#ffffff; background:'+ bodyCol +'">'+
				'							<h5 class="modal-title" id="modal-title">'+ bodyTit +' </h5>'+
				'							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
				'						</div>'+
				''+
				'	    					<div class="modal-body" >'+
				'       					    <div class="row">'+
				'       					        <div class="col-sm-12 col-md-4">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var01">ESTADO</label>'+
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
				'               					        <input id="var02" name="var02" value="'+ empresaOrden +'" class="form-control" type="number" min="0" max="999" style="text-transform:uppercase; height:40px;" placeholder="Orden" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'									<div class="col-sm-12 col-md-4">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var03">Tipo Rubro</label>'+
				'       					                <select id="var03" name="var03" class="select2 form-control custom-select" style="width:100%; height:40px;" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+ selRubro +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-4">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var04">Tipo Acceso</label>'+
				'       					                <select id="var04" name="var04" class="select2 form-control custom-select" style="width:100%; height:40px;" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+selAcceso+
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'               					<div class="col-sm-12 col-md-8">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var05">Nombre</label>'+
				'               				        	<input id="var05" name="var05" value="'+ empresaNombre +'" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="Nombre" '+ bodyOnl +'>'+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-12">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var06">Ruc</label>'+
				'               				        	<input id="var06" name="var06" value="'+ empresaRuc +'" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="Ruc" required '+ bodyOnl +'>'+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var07">Teléfono</label>'+
				'               					        <input id="var07" name="var07" value="'+ empresaTelefono +'" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Teléfono" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var08">Celular</label>'+
				'											<input id="var08" name="var08" value="'+ empresaCelular +'" class="form-control" type="text" placeholder="Celular" style="text-transform:lowercase; height:40px;" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var09">Sitio Web</label>'+
				'               					        <input id="var09" name="var09" value="'+ empresaSitoWeb +'" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Web" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var010">Correo</label>'+
				'               					        <input id="var010" name="var010" value="'+ empresaCorreo +'" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Correo" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var011">Ubicación</label>'+
				'               					        <input id="var011" name="var011" value="'+ empresaUbicacion +'" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Ubicación" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var012">Dirección</label>'+
				'               					        <input id="var012" name="var012" value="'+ empresaDireccion +'" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Dirección" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var013">Logo</label>'+
				'               					        <input id="var013" name="var013" value="'+ empresaLogo +'" class="form-control" type="file" style="text-transform:lowercase; height:40px;" placeholder="Logo" '+ bodyOnl +'>'+
				'                       					<input id="var013_1" name="var013_1" value="'+ empresaLogo +'" class="form-control" type="hidden" style="height:40px;" readonly>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4" style="'+viewDisplay+'">'+
				'                   					<div class="form-group">'+
				'											<a href="../uploads/empresa/'+ empresaLogo +'" target="_blank" type="button" title="Ver Adjunto" class="btn btn-indigo btn-icon btn-circle btn-lg"  style="color:#ffffff; background:#6929d5;"  placeholder="Ver Adjunto"><i class="fa fa-file"></i></a>'+
				'										</div>'+
				'               					</div>'+
				// ''+
				// '               					<div class="col-sm-12 col-md-4">'+
				// '               					    <div class="form-group">'+
				// '               					        <label for="var014">Equivalencia</label>'+
				// '               					        <input id="var014" name="var014" value="'+ element.empresaEquivalencia +'" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Equivalencia" '+ bodyOnl +'>'+
				// '               					    </div>'+
				// '               					</div>'+
				''+
				'               					<div class="col-sm-12">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var015">OBSERVACIÓN</label>'+
				'               					        <textarea id="var015" name="var015" class="form-control" rows="5" style="" '+ bodyOnl +'>'+ empresaObservacion +'</textarea>'+
				'               					    </div>'+
				'               					</div>'+
				'           				</div>'+
				''+
				'           				<div class="form-group">'+
				'           				    <input class="form-control" type="hidden" id="workCodigo"	name="workCodigo"	value="'+ codElem +'"		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workModo"		name="workModo"		value="'+ bodyMod +'"		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPage"		name="workPage"		value="'+ _parm04BASE +'"	required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPrograma"	name="workPrograma"	value="empresa"		 		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workAccion"	name="workAccion"	value="'+ bodAcc+'"			required readonly>'+
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
			}
		});
	}
	
	$("#modal-content").empty();
	$("#modal-content").append(html);
		
}