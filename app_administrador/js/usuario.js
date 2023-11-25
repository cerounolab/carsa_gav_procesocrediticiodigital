$(document).ready(function() {
    var dataJSON	= getUsuarioList();

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
			{ targets			: [1],	visible : true,	searchable : true,	orderData : [1, 0] },
			{ targets			: [2],	visible : true,	searchable : true,	orderData : [2, 0] },
			{ targets			: [3],	visible : true,searchable : false,	orderData : [3, 0] },
			{ targets			: [4],	visible : true,	searchable : true,	orderData : [4, 0] },
			{ targets			: [5],	visible : false,searchable : false,	orderData : [5, 0] },
			{ targets			: [6],	visible : true,	searchable : true,	orderData : [6, 0] },
			{ targets			: [7],	visible : false,searchable : false,	orderData : [7, 0] },
			{ targets			: [8],	visible : true,searchable : false,	orderData : [8, 0] },
			{ targets			: [9],	visible : true,	searchable : true,	orderData : [9, 0] },
			{ targets			: [10],	visible : false,searchable : false,	orderData : [10, 0] },
			{ targets			: [11],	visible : false,searchable : false,	orderData : [11, 0] },
			{ targets			: [12],	visible : false,searchable : false,	orderData : [12, 0] },
			{ targets			: [13],	visible : false,searchable : true,	orderData : [13, 0] },
			{ targets			: [14],	visible : false,searchable : true,	orderData : [14, 0] },
			{ targets			: [15],	visible : true,	searchable : true,	orderData : [15, 0] }
		],
		
		columns		: [
			{ data				: 'usuarioCodigo', name : 'usuarioCodigo'},
			{ data				: 'usuarioOrden', name : 'usuarioOrden'},
			{ data				: 'tipoEstadoNombre', name : 'tipoEstadoNombre'},
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
					var btnDLT	= '<button onclick="setUsuario('+ full.usuarioCodigo +', 4);" title="Eliminar" type="button" class="btn btn-danger btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-eraser"></i></button>';
					var btnAUD	= '<button onclick="setUsuario('+ full.usuarioCodigo +', 5);" title="Auditoria" type="button" class="btn btn-warning btn-icon" data-bs-toggle="modal" data-bs-target="#modal-dialog"><i class="fa fa-user-secret"></i></button>';

					return (btnDSP + '&nbsp;' + btnUPD + '&nbsp;' + btnDLT + '&nbsp;');
				}
			},
        ],
    });
});


function setUsuario(codElem, codAcc) {
	var xJSON       = [];
	var xJSON1     	= getDominioValor('ADMUSUARIOESTADO');
	var xJSON3     	= getEmpresaList();
	var xJSON4     	= getSucursalList();

	var html		= '';
	var bodyCol     = '';
	var bodyTit     = '';
	var bodyMod     = '';
	var bodyOnl     = '';
	var bodyBot     = '';
	var selEstado   = '';
	var selEmpresa  = '';
	var selTipSuc	= '';
	var codEmpr		= '';
	var codSuc		= 0;


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
				selEstado = selEstado + '                               			<option value="'+ element1.tipoParametro +'">'+ element1.tipoNombre +'</option>';
			}
		});

		selEmpresa = selEmpresa + '            										<option value="0" selected>SELECCIONAR</option>';
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
			'				<div class="modal-content" style="width:800px">'+
			'					<form class="needs-validation" novalidate method="post" action="../class/crud/usuario.php">'+
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
			'               					<div class="col-sm-12 col-md-4">'+
			'               					</div>'+
			''+
			'									<div class="col-sm-12 col-md-4">'+
			'       					            <div class="form-group">'+
			'       					                <label for="var03">Empresa</label>'+
			`       					                <select id="var03" name="var03" value="" class="select2 form-control custom-select" onchange="selectEmpresaSuc('var04','var03', 1, 0); setUsu('var03', 'var08_1'); setRecuperoDatos('var05', 'var03', 'var06', 'var07', 'var08', 'var09', 'var010', 'var011');" style="width:100%; height:40px;">`+
			'       					                    <optgroup label="Seleccionar">'+ selEmpresa +
			'       					                    </optgroup>'+
			'       					                </select>'+
			'       					            </div>'+
			'       					        </div>'+
			''+
			'									<div class="col-sm-12 col-md-4">'+
			'       					            <div class="form-group">'+
			'       					                <label for="var04">Sucursal</label>'+
			`       					                <select id="var04" name="var04" class="select2 form-control custom-select" style="width:100%; height:40px;" ${bodyOnl}>`+
			'       					                    <optgroup label="Seleccionar">'+
			'       					                    </optgroup>'+
			'       					                </select>'+
			'       					            </div>'+
			'       					        </div>'+
			''+
			'               					<div class="col-sm-12 col-md-4">'+
			'               				    	<div class="form-group">'+
			'               				        	<label for="var05">Documento</label>'+
			`              				        		<input id="var05" name="var05" value="" onblur="setRecuperoDatos('var05', 'var03', 'var06', 'var07', 'var08', 'var09', 'var010', 'var011');"  class="form-control" type="text" style="height:40px;" placeholder="Documento" ${bodyOnl}>`+
			'               				    	</div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-6" id="row_var06">'+
			'               				    	<div class="form-group">'+
			'               				        	<label for="var06">Nombre</label>'+
			'               				        	<input id="var06" name="var06" value="" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="Nombre" required '+ bodyOnl +'>'+
			'               				    	</div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-6" id="row_var07">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var07">Apellido</label>'+
			'               					        <input id="var07" name="var07" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="Apellido" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-2">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var08_1">Cod</label>'+
			'               					        <input id="var08_1" name="var08_1" value="" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" readonly>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-4" id="row_var08">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var08">Usuario</label>'+ 
			'											<input id="var08" name="var08" value="" class="form-control" placeholder="Usuario" type="text" style="text-transform:uppercase; height:40px;" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-6" id="row_var09">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var09">Password</label>'+
			'               					        <input id="var09" name="var09" value=""  class="form-control" type="password" style=" height:40px;" placeholder="Password" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-6" id="row_var011">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var011">Celular</label>'+
			'               					        <input id="var011" name="var011" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Celular" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12 col-md-6" id="row_var012">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var010">Email</label>'+
			'               					        <input id="var010" name="var010" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="Email" '+ bodyOnl +'>'+
			'               					    </div>'+
			'               					</div>'+
			''+
			'               					<div class="col-sm-12">'+
			'               					    <div class="form-group">'+
			'               					        <label for="var012">Observación</label>'+
			'               					        <textarea id="var012" name="var012" value="" class="form-control" rows="5" style="" '+ bodyOnl +'></textarea>'+
			'               					    </div>'+
			'               					</div>'+
			'           				</div>'+
			''+
			'           				<div class="form-group">'+
			'           				    <input class="form-control" type="hidden" id="workCodigo"	name="workCodigo"	value="'+ codElem +'"		required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workModo"		name="workModo"		value="'+ bodyMod +'"		required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workPage"		name="workPage"		value="public/usuario.php?"	required readonly>'+
			'           				    <input class="form-control" type="hidden" id="workPrograma"	name="workPrograma"	value="usuario"		 		required readonly>'+
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
						} else {
							selEmpresa = selEmpresa + '            			<option value="'+ element1.empresaCodigo +'">'+ element1.empresaNombre +'</option>';
						}
					}
				});

				xJSON4.forEach(element1 => {
					if (element1.tipoEstadoParametro == 1) {
						if (element1.sucursalCodigo == element.sucursalCodigo) {
							selTipSuc = selTipSuc + '            			<option value="'+ element1.sucursalCodigo +'" selected>'+ element1.sucursalNombre +'</option>';
						} else {
							selTipSuc = selTipSuc + '            			<option value="'+ element1.sucursalCodigo +'">'+ element1.sucursalNombre +'</option>';
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
				'				<div class="modal-content" style="width:800px">'+
				'					<form class="needs-validation" novalidate method="post" action="../class/crud/usuario.php">'+
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
				'               					        <input id="var02" name="var02" value="'+ usuarioOrden +'" class="form-control" type="number" min="0" max="999" style="text-transform:uppercase; height:40px;" placeholder="NRO ORDEN" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					</div>'+
				''+
				'									<div class="col-sm-12 col-md-4">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var03">Empresa</label>'+
				`       					                <select id="var03" name="var03" class="select2 form-control custom-select" onchange="selectEmpresaSuc('var04','var03', 1, 0); setUsu('var03', 'var08_1'); setRecuperoDatos('var05', 'var03', 'var06', 'var07', 'var08', 'var09', 'var010', 'var011');"  style="width:100%; height:40px;" ${bodyOnl}>`+
				'       					                    <optgroup label="Seleccionar">'+selEmpresa +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'									<div class="col-sm-12 col-md-4">'+
				'       					            <div class="form-group">'+
				'       					                <label for="var04">Sucursal</label>'+
				'       					                <select id="var04" name="var04" class="select2 form-control custom-select" style="width:100%; height:40px;" '+ bodyOnl +'>'+
				'       					                    <optgroup label="Seleccionar">'+ //selTipSuc +
				'       					                    </optgroup>'+
				'       					                </select>'+
				'       					            </div>'+
				'       					        </div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var05">Documento</label>'+
				`               				        	<input id="var05" name="var05" value="${usuarioDocumento}" onblur="setRecuperoDatos('var05', 'var03', 'var06', 'var07', 'var08', 'var09', 'var010', 'var011');" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" required  ${bodyOnl}>`+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-6">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var06">Nombre</label>'+
				'               				        	<input id="var06" name="var06" value="'+ usuarioNombre +'" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" '+ bodyOnl +'>'+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-6">'+
				'               				    	<div class="form-group">'+
				'               				        	<label for="var07">Apellido</label>'+
				'               				        	<input id="var07" name="var07" value="'+ usuarioApellido +'" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" '+ bodyOnl +'>'+
				'               				    	</div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-2">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var08_1">Cod</label>'+
				'               					        <input id="var08_1" name="var08_1" value="" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" readonly>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var08">Usuario</label>'+
				'               					        <input id="var08" name="var08" value="'+ usuarioUsuario +'" class="form-control" type="text" style="text-transform:uppercase; height:40px;" placeholder="" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-4">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var09">Password</label>'+
				'											<input id="var09" name="var09" value="'+ usuarioPassword +'" class="form-control" type="password" style="height:40px;" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-6">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var010">Celular</label>'+
				'               					        <input id="var010" name="var010" value="'+ usuarioCelular +'" class="form-control" type="text" style="height:40px;" placeholder="" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12 col-md-6">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var011">Email</label>'+
				'               					        <input id="var011" name="var011" value="'+ usuarioEmail +'" class="form-control" type="text" style="text-transform:lowercase; height:40px;" placeholder="" '+ bodyOnl +'>'+
				'               					    </div>'+
				'               					</div>'+
				''+
				'               					<div class="col-sm-12">'+
				'               					    <div class="form-group">'+
				'               					        <label for="var012">OBSERVACIÓN</label>'+
				'               					        <textarea id="var012" name="var012" value="" class="form-control" rows="5" style="text-transform:uppercase;" '+ bodyOnl +'>'+ usuarioObservacion +'</textarea>'+
				'               					    </div>'+
				'               					</div>'+
				'           				</div>'+
				''+
				'           				<div class="form-group">'+
				'           				    <input class="form-control" type="hidden" id="workCodigo"	name="workCodigo"	value="'+ codElem +'"		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workModo"		name="workModo"		value="'+ bodyMod +'"		required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPage"		name="workPage"		value="public/usuario.php?"	required readonly>'+
				'           				    <input class="form-control" type="hidden" id="workPrograma"	name="workPrograma"	value="usuario"		 		required readonly>'+
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

	selectEmpresaSuc('var04','var03', 1, codSuc);
	setUsu('var03', 'var08_1');
}

function setRecuperoDatos(parm01, parm02, parm03, parm04, parm05, parm06,  parm07, parm08) {
	var codDoc		= document.getElementById(parm01);
	var codEmp		= document.getElementById(parm02);
	var usuNom		= document.getElementById(parm03);
	var usuApe		= document.getElementById(parm04);
	var usuUSu		= document.getElementById(parm05);
	var usuPass		= document.getElementById(parm06);
	var usuCel		= document.getElementById(parm07);
	var usuEmail	= document.getElementById(parm08);

	usuNom.value	= '';
	usuApe.value	= '';
	usuUSu.value	= '';
	usuPass.value	= '';
	usuCel.value	= '';
	usuEmail.value	= '';

	// usuNom.disabled 	= false;			
	// usuApe.disabled		= false;		
	// usuUSu.disabled 	= false;			
	// usuPass.disabled	= false;			
	// usuCel.disabled		= false;		
	// usuEmail.disabled	= false;
	var xJSON       	= [];
    var xJSON       	= getUsuDocumento(codDoc.value, codEmp.value);

	if (xJSON != [] || xJSON != null || xJSON != '') {
		xJSON.forEach(element => {
			usuNom.value		= element.usuario_nombre;
			usuApe.value		= element.usuario_apellido;
			usuUSu.value		= element.usuario_usuario;
			usuPass.value		= element.usuario_password;
			usuCel.value		= element.usuario_celular;
			usuEmail.value		= element.usuario_mail;

			// usuNom.disabled 	= true;			
			// usuApe.disabled		= true;		
			// usuUSu.disabled 	= true;			
			// usuPass.disabled	= true;			
			// usuCel.disabled		= true;		
			// usuEmail.disabled	= true;	
        });
	} else {
		usuNom.value		= '';
		usuApe.value		= '';
		usuUSu.value		= '';
		usuPass.value		= '';
		usuCel.value		= '';
		usuEmail.value		= '';

		// usuNom.disabled 	= false;			
		// usuApe.disabled		= false;		
		// usuUSu.disabled 	= false;			
		// usuPass.disabled	= false;			
		// usuCel.disabled		= false;		
		// usuEmail.disabled	= false;	
	}
}

function setUsu(parm01, parm02) {
	var codEmp   	= document.getElementById(parm01).value;
	var codUsuE  	= document.getElementById(parm02);

	var rowInp01	=	(codEmp.length > 0 && codEmp.length < 2) ? '00' : ((codEmp.length > 1 && codEmp.length < 3) ? '0' : '') ;

	codUsuE.value	= rowInp01 +''+ codEmp+'_';

}