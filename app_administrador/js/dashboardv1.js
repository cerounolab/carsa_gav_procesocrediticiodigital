$(document).ready(function() {
    var filter02    = document.getElementById('filter_02').value;
    var filter03    = document.getElementById('filter_03').value;
    _parm01BASE = 1;
    _parm05BASE = 'vcardozo';
    var dataJSON	= getOperacionSolicitudFiltro(_parm01BASE, _parm05BASE, filter02, filter03, 0, 0);


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
            { targets : [0], visible : true, searchable : true,	orderData : [0, 0] },
            { targets : [1], visible : true, searchable : true,	orderData : [1, 0] },
            { targets : [2], visible : true, searchable : true,	orderData : [2, 0] },
            { targets : [3], visible : true, searchable : true,	orderData : [3, 0] },
            { targets : [4], visible : true, searchable : true,	orderData : [4, 0] },
            { targets : [5], visible : true, searchable : true,	orderData : [5, 0] },
            { targets : [6], visible : true, searchable : true,	orderData : [6, 0] },
            { targets : [7], visible : true, searchable : true,	orderData : [7, 0] },
            { targets : [8], visible : true, searchable : true,	orderData : [8, 0] },
            { targets : [9], visible : true, searchable : true,	orderData : [9, 0] },
            { targets : [10],visible : true, searchable : true,	orderData : [10,0] },
        ],
		
		columns		: [
            { data : 'tipo_estado_nivel2_nombre', name : 'tipo_estado_nivel2_nombre'},
            { render			: 
				function (data, type, full, meta) {
                    var rowVIEW     = currencyFormat(full.solicitud_numero, '', 0);

					return rowVIEW;	
				}
			},
            { render			: 
				function (data, type, full, meta) {
                    var rowVIEW     = currencyFormat(full.solicitud_operacion, '', 0);

					return rowVIEW;	
				}
			},
            { data : 'persona_documento_numero', name : 'persona_documento_numero'},
            { render			: 
				function (data, type, full, meta) {
                    var rowVIEW     = currencyFormat(full.persona_cuenta, '', 0);

					return rowVIEW;	
				}
			},
            { data : 'persona_nombre_completo', name : 'persona_nombre_completo'},
            { render			: 
				function (data, type, full, meta) {
                    var rowVIEW     = currencyFormat(full.solicitud_monto, '', 0);

					return rowVIEW;	
				}
			},
            { data : 'tipo_formapago_nombre', name : 'tipo_formapago_nombre'},
            { data : 'solicitud_fecha_2', name : 'solicitud_fecha_2'},
            { data : 'solicitud_asignado', name : 'solicitud_asignado'},
            { data : 'solicitud_comentario', name : 'solicitud_comentario'},
        ],

		createdRow : function( row, data, dataIndex ) {
            if (data['tipo_estado_nivel1_parametro'] == 5) {      
				$(row).addClass('bg-success text-white');
			}

            if (data['tipo_estado_nivel1_parametro'] == 6) {      
				$(row).addClass('bg-danger text-white');
			}
		}
    });

	$('.form-control').blur(function(event) {
        var filter02 = document.getElementById('filter_02').value;
        var filter03 = document.getElementById('filter_03').value;
        var filter04 = 0;
        var filter05 = 0;

        if (event['target']['type'] == 'radio' && event['target']['name'] == 'filter_04') {
            filter04 = document.getElementById(event['target']['id']).value;
            filter05 = document.getElementById('filter_05').value;
        }

        if (event['target']['type'] == 'radio' && event['target']['name'] == 'filter_05') {
            filter04 = document.getElementById('filter_04').value;
            filter05 = document.getElementById(event['target']['id']).value;
        }

        if (event['target']['type'] != 'radio') {
            filter04 = document.getElementsByName('filter_04');
            filter05 = document.getElementsByName('filter_05');

            filter04.forEach(element => {
                if (element.checked) {
                    filter04 = parseInt(element.value);
                }
            });

            filter05.forEach(element => {
                if (element.checked) {
                    filter05 = parseInt(element.value);
                }
            });
        }

        var dataJSON	= getOperacionSolicitudFiltro(_parm01BASE, _parm05BASE, filter02, filter03, filter04, filter05);
        var tableData   = $('#tableLoads').DataTable();

        tableData.clear().rows.add(dataJSON).draw();
    });

	$('.form-group').change(function(event) {
        var filter02 = document.getElementById('filter_02').value;
        var filter03 = document.getElementById('filter_03').value;
        var filter04 = '';
        var filter05 = '';

        if (event['target']['type'] == 'radio' && event['target']['name'] == 'filter_04') {
            filter04 = document.getElementById(event['target']['id']).value;

            filter05 = document.getElementsByName('filter_05');
            filter05.forEach(element => {
                if (element.checked) {
                    filter05 = parseInt(element.value);
                }
            });
        }

        if (event['target']['type'] == 'radio' && event['target']['name'] == 'filter_05') {
            filter05 = document.getElementById(event['target']['id']).value;

            filter04 = document.getElementsByName('filter_04');
            filter04.forEach(element => {
                if (element.checked) {
                    filter04 = parseInt(element.value);
                }
            });
        }

        if (event['target']['type'] == 'radio') {
            var dataJSON	= getOperacionSolicitudFiltro(_parm01BASE, _parm05BASE, filter02, filter03, filter04, filter05);
            var tableData   = $('#tableLoads').DataTable();
    
            tableData.clear().rows.add(dataJSON).draw();
        }
    });
});