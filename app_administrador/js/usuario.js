$(document).ready(function() {
    var dataJSON	= getUsuarioList(_parm06BASE, 0);

	$('#tableLoads').DataTable({
		processing	: true,
		destroy		: true,
		searching	: true,
		paging		: true,
		lengthChange: true,
		info		: true,
		order: [[13, "desc"]],
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
			{ targets			: [3],	visible : true,	searchable : true,	orderData : [3, 0] },
			{ targets			: [4],	visible : true,	searchable : true,	orderData : [4, 0] },
			{ targets			: [5],	visible : true, searchable : true,	orderData : [5, 0] },
			{ targets			: [6],	visible : true,	searchable : true,	orderData : [6, 0] },
			{ targets			: [7],	visible : true, searchable : true,	orderData : [7, 0] },
			{ targets			: [8],	visible : true,	searchable : true,	orderData : [8, 0] },
			{ targets			: [9],	visible : false,searchable : true,	orderData : [9, 0] },
			{ targets			: [10],	visible : false,searchable : true,	orderData : [10, 0] },
			{ targets			: [11],	visible : false,searchable : true,	orderData : [11, 0] },
			{ targets			: [12],	visible : true, searchable : true,	orderData : [12, 0] },
			{ targets			: [13],	visible : true, searchable : true,	orderData : [13, 0] },
			{ targets			: [14],	visible : true, searchable : true,	orderData : [14, 0] },
			{ targets			: [15],	visible : true,	searchable : true,	orderData : [15, 0] }
		],
		
		columns		: [
			{ data				: 'usuarioCodigo', name : 'usuarioCodigo'},
			{ data				: 'usuarioOrden', name : 'usuarioOrden'},
			{ render			:
				function (data, type, full, meta) {
					var rowEST = '<span class="label label-rounded" style="background-color:'+ full.tipoEstadoCss +'">'+ full.tipoEstadoNombre +'</span>';
					
					return rowEST;
				}
			},
			{ data				: 'empresaNombre', name : 'empresaNombre'},
			{ data				: 'sucursalNombre', name : 'sucursalNombre'},
			{ data				: 'usuarioDocumento', name : 'usuarioDocumento'},
			{ data				: 'usuarioNombre', name : 'usuarioNombre'},
			{ data				: 'usuarioApellido', name : 'usuarioApellido'},
			{ data				: 'usuarioUsuario', name : 'usuarioUsuario'},
			{ data				: 'usuarioEmail', name : 'usuarioEmail'},
			{ data				: 'usuarioCelular', name : 'usuarioCelular'},
			{ data				: 'usuarioObservacion', name : 'usuarioObservacion'},
			{ data				: 'auditoriaUsuario', name : 'auditoriaUsuario'},
			{ data				: 'auditoriaFechaHora', name : 'auditoriaFechaHora'},
			{ data				: 'auditoriaIp', name : 'auditoriaIp'},
            { render			: 
				function (data, type, full, meta) {
					var btnDSP	= '<button onclick="setUsuario('+ full.usuarioCodigo +', 2);" title="Ver" type="button" class="btn btn-primary btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eye"></i></button>';
					var btnUPD	= '<button onclick="setUsuario('+ full.usuarioCodigo +', 3);" title="Editar" type="button" class="btn btn-success btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-edit"></i></button>';
					var btnDLT	= '<button onclick="setUsuario('+ full.usuarioCodigo +', 4);" title="Anular" type="button" class="btn btn-danger btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eraser"></i></button>';
					var btnAUD	= '<button onclick="setUsuario('+ full.usuarioCodigo +', 5);" title="Auditoria" type="button" class="btn btn-warning btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-user-secret"></i></button>';
					var btnPAS	= '<button onclick="setUsuario('+ full.usuarioCodigo +', 6);" title="Cambio de Contraseña" type="button" class="btn btn-info btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-user-secret"></i></button>';

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

					if (full.tipoEstadoParametro != 1 && full.tipoEstadoParametro != 4) {
						btnPAS	= '';
					}

					if (full.empresaCodigo == 1) {
						btnPAS	= '';
					}

					return (btnDSP + '&nbsp;' + btnUPD + '&nbsp;' + btnDLT + '&nbsp;' + btnPAS + '&nbsp;');
				}
			},
        ],
    });
});


function setUsuario(codElem, codAcc) {
	var xJSON       	= [];
	var xJSON1     		= getDominioValor('ADMUSUARIOESTADO');
	var xJSON3     		= getEmpresaList(_parm06BASE, 1);
	var xJSON4     		= getSucursalList(_parm06BASE, 1);

	var html			= '';
	var bodyCol     	= '';
	var bodyTit     	= '';
	var bodyMod     	= '';
	var bodyOnl     	= '';
	var bodyBot     	= '';
	var selEstado   	= '';
	var selEmpresa  	= '';
	var selTipSuc		= '';
	var codEmpr			= '';
	var codSuc			= 0;
	var bodAcc			= 0;
	var selNuevo		= '';
	var selRecurrente	= '';

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
			bodyTit = 'ANULAR';
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

		case 6:
			bodyTit = 'CAMBIO DE CONTRASEÑA';
			bodyCol = '#be9027;';
			bodyMod = 'U';
			bodyOnl = 'readonly';
			bodyBot = '           <button type="submit" id="submit" name="submit" value="submit" class="btn btn-primary">Actualizar</button>';
			bodAcc	= 3;
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
		
		xJSON3.forEach(element1 => {
			if (element1.tipoEstadoParametro == 1) {
				selEmpresa = selEmpresa + '            								<option value="'+ element1.empresaCodigo +'">'+ element1.empresaNombre +'</option>';
			}
		});

		xJSON4.forEach(element1 => {
			if (element1.tipoEstadoParametro == 1) {
				selTipSuc = selTipSuc + '            								<option value="'+ element1.sucursalCodigo +'">'+ element1.sucursalNombre +'</option>';
			}
		});

		html = 
			'				<div class="modal-content">'+
			'					<form class="needs-validation" onsubmit="return validarForm();" method="post" action="../class/crud/usuario.php">'+
			'	    				<div class="modal-header" style="color:#ffffff; background:'+ bodyCol +'">'+
			'							<h5 class="modal-title" id="modal-title">'+ bodyTit +' </h5>'+
			'							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
			'						</div>'+
			''+
			'	    					<div class="modal-body" >'+
			'       					    <div class="row">'+
			'       					        <div class="col-sm-12 col-md-6">'+
			'       					            <div class="form-group">'+
			'       					                <label for="var01">Estado<span style="color:red;"> * </span></label>'+
			'       					                <select id="var01" name="var01" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
			'       					                    <optgroup label="Estado">'+
			'													<option value="0" disabled selected> SELECCIONAR </option>' + selEstado+
			'       					                    </optgroup>'+
			'       					                </select>'+
			'       					            </div>'+
			'       					        </div>'+
			''+
			'               					<div class="col-sm-12 col-md-6">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var02">Orden</label>'+
			'               					        <input id="var02" name="var02" value="" class="form-control" type="number" min="0" max="999" style="text-transform:uppercase; height:40px;" placeholder="Orden" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'									<div class="col-sm-12 col-md-6">'+
			'       					            <div class="form-group">'+
			'       					                <label for="var03">Empresa<span style="color:red;"> * </span></label>'+
			`       					                <select id="var03" name="var03" class="select2 form-control custom-select" onchange="selectEmpresaSuc('var04','var03', 1, 0); setUsu('var03', 'var08_1'); setRecuperoEV('var03', 'var013', 'var014', 'var015'); setRecuperoDatos('var05', 'var03', 'var06', 'var07', 'var08', 'var09', 'var010', 'var011'); "  style="width:100%; height:40px;" required="true" ${bodyOnl}>`+
			'       					                    <optgroup label="Seleccionar">'+ 
			'													<option value="0" disabled selected> SELECCIONAR </option>' + selEmpresa +
			'       					                    </optgroup>'+
			'       					                </select>'+
			'       					            </div>'+
			'       					        </div>'+
			''+
			'									<div class="col-sm-12 col-md-6">'+
			'       					            <div class="form-group">'+
			'       					                <label for="var04">Sucursal<span style="color:red;"> * </span></label>'+
			`       					                <select id="var04" name="var04" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" ${bodyOnl}>`+
			'       					                    <optgroup label="Seleccionar">'+
			'													<option value="0" disabled selected> SELECCIONAR </option>' + 
			'       					                    </optgroup>'+
			'       					                </select>'+
			'       					            </div>'+
			'       					        </div>'+
			''+
			'               					<div class="col-sm-12 col-md-4">'+
			'               				    	<div class="form-group">'+
			'               				        	<label for="var013">Código EV<span style="color:red;"> * </span></label>'+
			`               				        	<input id="var013" name="var013" value="" class="form-control" onchange="setValidarEV('var013');" type="number" min="0" style="text-transform:uppercase; height:40px;" placeholder="Código EV" required="true" ${bodyOnl}>`+
			'               				    	</div>'+
			'               					</div>'+
			''+
			'									<div class="col-sm-12 col-md-4">'+
			'       					            <div class="form-group">'+
			'       					                <label for="var014"> Carga Nuevo <span style="color:red;"> * </span></label>'+
			'       					                <select id="var014" name="var014" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
			'       					                    <optgroup label="Seleccionar">'+
			'							   						<option value="N">NO</option>'+
			'													<option value="S">SI</option>'+
			'       					                    </optgroup>'+
			'       					                </select>'+
			'       					            </div>'+
			'       					        </div>'+
			''+
			'									<div class="col-sm-12 col-md-4">'+
			'       					            <div class="form-group">'+
			'       					                <label for="var015"> Carga Recurrente <span style="color:red;"> * </span></label>'+
			'       					                <select id="var015" name="var015" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
			'       					                    <optgroup label="Seleccionar">'+
			'							   						<option value="N">NO</option>'+
			'													<option value="S">SI</option>'+
			'       					                    </optgroup>'+
			'       					                </select>'+
			'       					            </div>'+
			'       					        </div>'+
			''+
			'               					<div class="col-sm-12 col-md-4">'+
			'               				    	<div class="form-group">'+
			'               				        	<label for="var05">Documento<span style="color:red;"> * </span></label>'+
			`              				        		<input id="var05" name="var05" value="" onblur="setRecuperoDatos('var05', 'var03', 'var06', 'var07', 'var08', 'var09', 'var010', 'var011');"  class="form-control" type="text" style="height:40px;" placeholder="Documento" required="true" ${bodyOnl}>`+
			'               				    	</div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4" id="row_var06">'+
			'               				    	<div class="form-group">'+
			'               				        	<label for="var06">Nombre<span style="color:red;"> * </span></label>'+
			'               				        	<input id="var06" name="var06" value="" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="Nombre" required="true" '+ bodyOnl +'>'+
			'               				    	</div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4" id="row_var07">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var07">Apellido<span style="color:red;"> * </span></label>'+
			'               					        <input id="var07" name="var07" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="Apellido" required="true" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var08_1">Cod</label>'+
			'               					        <input id="var08_1" name="var08_1" value="" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" readonly>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4" id="row_var08">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var08">Usuario<span style="color:red;"> * </span></label>'+ 
			'											<input id="var08" name="var08" value="" class="form-control" placeholder="Usuario" type="text" style="text-transform:uppercase; height:40px;" required="true" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4" id="row_var09">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var09">Password<span style="color:red;"> * </span></label>'+
			'               					        <input id="var09" name="var09" value=""  class="form-control" type="password" style=" height:40px;" placeholder="Password" required="true" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-6" id="row_var011">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var011">Celular<span style="color:red;"> * </span></label>'+
			'               					        <input id="var011" name="var011" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Celular" required="true" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-6" id="row_var012">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var010">Email<span style="color:red;"> * </span></label>'+
			'               					        <input id="var010" name="var010" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Email" required="true" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var012">Comentario</label>'+
			'               					        <textarea id="var012" name="var012" value="" class="form-control" rows="5" style="" '+ bodyOnl +'></textarea>'+
			'               					    </div>'+
			'               					</div>'+
			'           				</div>'+
			''+
			'           				<div class="form-group">'+
			'           				    <input class="form-control" type="hidden" id="workCodigo"	name="workCodigo"	value="'+ codElem +'"		required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workModo"		name="workModo"		value="'+ bodyMod +'"		required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workPage"		name="workPage"		value="'+_parm04BASE+'"		required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workPrograma"	name="workPrograma"	value="usuario"		 		required readonly>'+
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

	} else if (codAcc > 1 && codAcc < 5) {
		xJSON       = getUsuarioId(codElem);

		xJSON.forEach(element => {
			if (element.usuarioCodigo == codElem) {

				xJSON1.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.tipoParametro == element.tipoEstadoParametro) {
							selEstado = selEstado + '            			<option value="'+ element1.tipoParametro +'" selected>'+ element1.tipoNombre +'</option>';
						} else {
							selEstado = selEstado + '            			<option value="'+ element1.tipoParametro +'">'+ element1.tipoNombre +'</option>';
						}
					}
				});
					
				xJSON3.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.empresaCodigo == element.empresaCodigo) {
							selEmpresa = selEmpresa + '            			<option value="'+ element1.empresaCodigo +'" selected>'+ element1.empresaNombre +'</option>';
						}
					}
				});

				xJSON4.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.sucursalCodigo == element.sucursalCodigo) {
							selTipSuc = selTipSuc + '            			<option value="'+ element1.sucursalCodigo +'" selected>'+ element1.sucursalNombre +'</option>';
						}
					}
				});


				var usuarioOrden				= (element.usuarioOrden == null) ? '' : element.usuarioOrden;
				var usuarioDocumento			= (element.usuarioDocumento == null) ? '' : element.usuarioDocumento;
				var usuarioNombre				= (element.usuarioNombre == null) ? '' : element.usuarioNombre;
				var usuarioApellido				= (element.usuarioApellido == null) ? '' : element.usuarioApellido;
				var usuarioUsuario				= (element.usuarioUsuario == null) ? '' : element.usuarioUsuario;
				var usuarioPassword				= (element.usuarioPassword == null) ? '' : element.usuarioPassword;
				var usuarioCelular				= (element.usuarioCelular == null) ? '' : element.usuarioCelular;
				var usuarioEmail				= (element.usuarioEmail == null) ? '' : element.usuarioEmail;
				var usuarioObservacion			= (element.usuarioObservacion == null) ? '' : element.usuarioObservacion;
				codSuc							= (element.sucursalCodigo == null) ? 0 : element.sucursalCodigo;

				var usuarioEjecutivoVentaCodigo	= (element.usuarioEjecutivoVentaCodigo == null) ? '' : element.usuarioEjecutivoVentaCodigo;
				var usuarioClienteNuevo			= (element.usuarioClienteNuevo == null) ? '' : element.usuarioClienteNuevo;
				var usuarioClienteRecurrente	= (element.usuarioClienteRecurrente == null) ? '' : element.usuarioClienteRecurrente;

				usuarioUsuario					= usuarioUsuario.substr(4);

				codEmpr							= element.empresaCodigo;

				if (usuarioClienteNuevo == 'S') {
					selNuevo  =                     
					'                               <option value="S" selected>SI</option>'+
					'                               <option value="N">NO</option>';
				} else { 
					selNuevo  =                     
					'                               <option value="S">SI</option>'+
					'                               <option value="N" selected>NO</option>';
				}

				if (usuarioClienteRecurrente == 'S') {
					selRecurrente  =                     
					'                               <option value="S" selected>SI</option>'+
					'                               <option value="N">NO</option>';
				} else { 
					selRecurrente  =                     
					'                               <option value="S">SI</option>'+
					'                               <option value="N" selected>NO</option>';
				}

				html = 
				'				<div class="modal-content">'+
				'					<form class="needs-validation" method="post" action="../class/crud/usuario.php">'+
				'	    				<div class="modal-header" style="color:#ffffff; background:'+ bodyCol +'">'+
				'							<h5 class="modal-title" id="modal-title">'+ bodyTit +' </h5>'+
				'							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
				'						</div>'+
				''+
				'	    					<div class="modal-body" >'+
				'       					    <div class="row">'+
				'       					        <div class="col-sm-12 col-md-6">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var01">Estado<span style="color:red;"> * </span></label>'+
				'       					                <select id="var01" name="var01" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Estado">'+ selEstado +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'               					<div class="col-sm-12 col-md-6">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var02">Orden</label>'+
				'               					        <input id="var02" name="var02" value="'+ usuarioOrden +'" class="form-control" type="number" min="0" max="999" style="text-transform:uppercase; height:40px;" placeholder="NRO ORDEN" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'									<div class="col-sm-12 col-md-6">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var03">Empresa<span style="color:red;"> * </span></label>'+
				`       					                <select id="var03" name="var03" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" ${bodyOnl}>`+
				'       					                    <optgroup label="Seleccionar">'+selEmpresa +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-6">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var04">Sucursal<span style="color:red;"> * </span></label>'+
				'       					                <select id="var04" name="var04" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+ selTipSuc +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var013">Código EV<span style="color:red;"> * </span></label>'+
				'               				        	<input id="var013" name="var013" value="'+ usuarioEjecutivoVentaCodigo +'" class="form-control" type="number" min="0" style="text-transform:uppercase; height:40px;" placeholder="Código EV" required="true" readonly>'+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'									<div class="col-sm-12 col-md-4">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var014"> Carga Nuevo <span style="color:red;"> * </span></label>'+
				'       					                <select id="var014" name="var014" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+ selNuevo +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-4">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var015"> Carga Recurrente <span style="color:red;"> * </span></label>'+
				'       					                <select id="var015" name="var015" class="select2 form-control custom-select" style="width:100%; height:40px;" required="true" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+ selRecurrente +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var05">Documento<span style="color:red;"> * </span></label>'+
				`               				        	<input id="var05" name="var05" value="${usuarioDocumento}" onblur="setRecuperoDatos('var05', 'var03', 'var06', 'var07', 'var08', 'var09', 'var010', 'var011');" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" required="true"  ${bodyOnl}>`+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var06">Nombre<span style="color:red;"> * </span></label>'+
				'               				        	<input id="var06" name="var06" value="'+ usuarioNombre +'" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" required="true" '+ bodyOnl +'>'+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var07">Apellido<span style="color:red;"> * </span></label>'+
				'               				        	<input id="var07" name="var07" value="'+ usuarioApellido +'" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" required="true" '+ bodyOnl +'>'+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var08_1">Cod</label>'+
				'               					        <input id="var08_1" name="var08_1" value="" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" readonly>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var08">Usuario<span style="color:red;"> * </span></label>'+
				'               					        <input id="var08" name="var08" value="'+ usuarioUsuario +'" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" required="true" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var09">Password<span style="color:red;"> * </span></label>'+
				'											<input id="var09" name="var09" value="'+ usuarioPassword +'" class="form-control" type="password" style="height:40px;" required="true" readonly>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-6">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var011">Celular<span style="color:red;"> * </span></label>'+
				'               					        <input id="var011" name="var011" value="'+ usuarioCelular +'" class="form-control" type="text" style="height:40px;" placeholder="" required="true" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-6">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var010">Email<span style="color:red;"> * </span></label>'+
				'               					        <input id="var010" name="var010" value="'+ usuarioEmail +'" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="" required="true" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var012">Comentario</label>'+
				'               					        <textarea id="var012" name="var012" value="" class="form-control" rows="5" style="text-transform:uppercase;" '+ bodyOnl +'>'+ usuarioObservacion +'</textarea>'+
				'               					    </div>'+
				'               					</div>'+
				'           				</div>'+
				''+
				'           				<div class="form-group">'+
				'           				    <input class="form-control" type="hidden" id="workCodigo"	name="workCodigo"	value="'+ codElem +'"		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workModo"		name="workModo"		value="'+ bodyMod +'"		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPage"		name="workPage"		value="'+_parm04BASE+'"		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPrograma"	name="workPrograma"	value="usuario"		 		required readonly>'+
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
	} else if (codAcc == 6) {
		xJSON       = getUsuarioId(codElem);

		xJSON.forEach(element => {
			if (element.usuarioCodigo == codElem) {

				xJSON1.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.tipoParametro == element.tipoEstadoParametro) {
							selEstado = selEstado + '            			<option value="'+ element1.tipoParametro +'" selected>'+ element1.tipoNombre +'</option>';
						}
					}
				});
					
				xJSON3.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.empresaCodigo == element.empresaCodigo) {
							selEmpresa = selEmpresa + '            			<option value="'+ element1.empresaCodigo +'" selected>'+ element1.empresaNombre +'</option>';
						}
					}
				});

				xJSON4.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.sucursalCodigo == element.sucursalCodigo) {
							selTipSuc = selTipSuc + '            			<option value="'+ element1.sucursalCodigo +'" selected>'+ element1.sucursalNombre +'</option>';
						}
					}
				});

				var usuarioOrden		= (element.usuarioOrden == null) ? '' : element.usuarioOrden;
				var usuarioDocumento	= (element.usuarioDocumento == null) ? '' : element.usuarioDocumento;
				var usuarioNombre		= (element.usuarioNombre == null) ? '' : element.usuarioNombre;
				var usuarioApellido		= (element.usuarioApellido == null) ? '' : element.usuarioApellido;
				var usuarioUsuario		= (element.usuarioUsuario == null) ? '' : element.usuarioUsuario;
				var usuarioPassword		= (element.usuarioPassword == null) ? '' : element.usuarioPassword;
				var usuarioCelular		= (element.usuarioCelular == null) ? '' : element.usuarioCelular;
				var usuarioEmail		= (element.usuarioEmail == null) ? '' : element.usuarioEmail;
				var usuarioObservacion	= (element.usuarioObservacion == null) ? '' : element.usuarioObservacion;
				codSuc					= (element.sucursalCodigo == null) ? 0 : element.sucursalCodigo;

				usuarioUsuario			= usuarioUsuario.substr(4);

				codEmpr	= element.empresaCodigo;

				html = 
				'				<div class="modal-content">'+
				'					<form class="needs-validation" method="post" action="../class/crud/usuario.php">'+
				'	    				<div class="modal-header" style="color:#ffffff; background:'+ bodyCol +'">'+
				'							<h5 class="modal-title" id="modal-title">'+ bodyTit +' </h5>'+
				'							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
				'						</div>'+
				''+
				'	    					<div class="modal-body" >'+
				'       					    <div class="row">'+
				'               					<div class="col-sm-12 col-md-4">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var05">Documento<span style="color:red;"> * </span></label>'+
				`               				        	<input id="var05" name="var05" value="${usuarioDocumento}" onblur="setRecuperoDatos('var05', 'var03', 'var06', 'var07', 'var08', 'var09', 'var010', 'var011');" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" required="true"  ${bodyOnl}>`+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var06">Nombre<span style="color:red;"> * </span></label>'+
				'               				        	<input id="var06" name="var06" value="'+ usuarioNombre +'" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" required="true" '+ bodyOnl +'>'+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var07">Apellido<span style="color:red;"> * </span></label>'+
				'               				        	<input id="var07" name="var07" value="'+ usuarioApellido +'" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" required="true" '+ bodyOnl +'>'+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var08_1">Cod</label>'+
				'               					        <input id="var08_1" name="var08_1" value="" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" readonly>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var08">Usuario<span style="color:red;"> * </span></label>'+
				'               					        <input id="var08" name="var08" value="'+ usuarioUsuario +'" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" required="true" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var09">Password<span style="color:red;"> * </span></label>'+
				'											<input id="var09" name="var09" value="" class="form-control" type="password" required="true" style="height:40px;">'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var012">Comentario</label>'+
				'               					        <textarea id="var012" name="var012" value="" class="form-control" rows="5" style="text-transform:uppercase;" '+ bodyOnl +'>'+ usuarioObservacion +'</textarea>'+
				'               					    </div>'+
				'               					</div>'+
				'           				</div>'+
				''+
				'           				<div class="form-group">'+
				'           				    <input class="form-control" type="hidden" id="workCodigo"	name="workCodigo"	value="'+ codElem +'"		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workModo"		name="workModo"		value="'+ bodyMod +'"		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPage"		name="workPage"		value="'+_parm04BASE+'"		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPrograma"	name="workPrograma"	value="usuario"		 		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workAccion"	name="workAccion"	value="'+ bodAcc+'"			required readonly>'+
				'           				    <input class="form-control" type="hidden" id="var01"		name="var01"		value="1"					required readonly>'+
				'           				    <input class="form-control" type="hidden" id="var02"		name="var02"		value="'+ usuarioOrden+'"	required readonly>'+
				'           				    <input class="form-control" type="hidden" id="var03"		name="var03"		value="'+ codEmpr+'"		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="var04"		name="var04"		value="'+ codSuc+'"			required readonly>'+
				'           				    <input class="form-control" type="hidden" id="var010"		name="var010"		value="'+ usuarioEmail+'"	required readonly>'+
				'           				    <input class="form-control" type="hidden" id="var011"		name="var011"		value="'+ usuarioCelular+'"	required readonly>'+
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

	if (codAcc > 1 && codAcc < 6) {
		setUsu('var03', 'var08_1');
	} else if (codAcc == 6) {
		setUsu('var03', 'var08_1');
	}
}

function setRecuperoDatos(parm01, parm02, parm03, parm04, parm05, parm06,  parm07, parm08) {
	var codDoc		= document.getElementById(parm01);//doc
	var codEmp		= document.getElementById(parm02);//emp
	var usuNom		= document.getElementById(parm03);//nomb
	var usuApe		= document.getElementById(parm04);//ape
	var usuUSu		= document.getElementById(parm05);//usu
	var usuPass		= document.getElementById(parm06); //pass
	var usuEmail	= document.getElementById(parm07); //email
	var usuCel		= document.getElementById(parm08);//cel

	usuNom.value	= '';
	usuApe.value	= '';
	usuUSu.value	= '';
	usuPass.value	= '';
	usuCel.value	= '';
	usuEmail.value	= '';

	var xJSON       	= [];
	var codDocumento	= 0;
	codDocumento		= (codDoc.value == '' || codDoc.value == null) ? 0 : codDoc.value;

	xJSON       	= (codDocumento > 0) ? getUsuDocumento(codDoc.value, codEmp.value) : [];

	if ((xJSON != []) || (xJSON != null) || xJSON != '') {
		xJSON.forEach(element => {
			usuNom.value		= element.usuario_nombre;
			usuApe.value		= element.usuario_apellido;
			usuUSu.value		= element.usuario_usuario;
			usuPass.value		= element.usuario_password;
			usuCel.value		= element.usuario_celular;
			usuEmail.value		= element.usuario_mail;
        });
	} else {
		usuNom.value		= '';
		usuApe.value		= '';
		usuUSu.value		= '';
		usuPass.value		= '';
		usuCel.value		= '';
		usuEmail.value		= '';	
	}
}

function setUsu(parm01, parm02) {
	var codEmp   	= document.getElementById(parm01).value;
	var codUsuE  	= document.getElementById(parm02);

	var rowInp01	=	(codEmp.length > 0 && codEmp.length < 2) ? '00' : ((codEmp.length > 1 && codEmp.length < 3) ? '0' : '') ;

	codUsuE.value	= rowInp01 +''+ codEmp+'_';

}

function setRecuperoEV(parm01, parm02, parm03, parm04) {
	var codEmp   	= document.getElementById(parm01).value;
	var codEv		= document.getElementById(parm02);
	var codNue		= document.getElementById(parm03);
	var codRec		= document.getElementById(parm04);
	var codView		= document.getElementById(parm02);
	codView.readOnly= '';

	var xJSON		= getEmpresaList(codEmp, 0);
	if ((xJSON != []) || (xJSON != null) || xJSON != '') {
		xJSON.forEach(element => {
			if (codEmp != 1) {
				codEv.value		= element.empresaVentaCodigo;
				codNue.value	= (element.empresaClienteNuevo == null) ? 'N' : element.empresaClienteNuevo;
				codRec.value	= (element.empresaClienteRecurrente == null) ? 'N' : element.empresaClienteRecurrente;
		
				codView.readOnly	= 'true';
			} else {
				if (element.empresaCodigo == codEmp) {
					codEv.value		= 0;
					codNue.value	= (element.empresaClienteNuevo == null) ? 'N' : element.empresaClienteNuevo;
					codRec.value	= (element.empresaClienteRecurrente == null) ? 'N' : element.empresaClienteRecurrente;
				}
			}
		});
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
		swal('Sucursal debe ser distinto a SELECCIONAR');
	}else if(document.getElementById('var013').value == 0){
		todo_correcto = false;
		swal('Favor cargar el código ejecutivo de venta');
	}
	
	return todo_correcto;
}