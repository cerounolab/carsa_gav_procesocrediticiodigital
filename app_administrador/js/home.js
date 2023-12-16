$(document).ready(function() {
    var dataJSON01      = getRolDashboard(_parm06BASE);
    var dataJSON02      = getUsuarioDashboard(_parm06BASE);
    var dataJSON03      = getUsuLogDashboard(_parm06BASE, _parm07BASE, 100);

    $('#tableLoad01').DataTable({
        processing	: true,
        destroy		: true,
        searching	: true,
        paging		: false,
        lengthChange: false,
        info		: false,
        order: [[ 0, "asc" ]],
        orderCellsTop: true,
        fixedHeader	:  true,
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
        
        data		: dataJSON01,
        columnDefs	: [
            { targets			: [0],	visible : true, searchable : true,	orderData : [0, 0] },
            { targets			: [1],	visible : true,	searchable : true,	orderData : [1, 0] },
            { targets			: [2],	visible : true,	searchable : true,	orderData : [2, 0] }
            
        ],
        columns		: [
            { render			:
                function (data, type, full, meta) {
                    var rowNom = '';
                    rowNom =  full.empresaNombre ;

                    return rowNom;
                }
            },
            { render			:
                function (data, type, full, meta) {
                    var rowNom = '';
                    rowNom =  full.rolNombre ;

                    return rowNom;
                }
            },
            { render			:
                function (data, type, full, meta) {
                    var rowTot = '';
                    var rowTot = full.rolCantidad; 

                    return rowTot;
                }
            }               
        ]
    });

    $('#tableLoad02').DataTable({
        processing	: true,
        destroy		: true,
        searching	: true,
        paging		: false,
        lengthChange: false,
        info		: false,
        order: [[ 0, "asc" ]],
        orderCellsTop: true,
        fixedHeader	:  true,
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
        
        data		: dataJSON02,
        columnDefs	: [
            { targets			: [0],	visible : true, searchable : true,	orderData : [0, 0] },
            { targets			: [1],	visible : true,	searchable : true,	orderData : [1, 0] },
            { targets			: [2],	visible : true,	searchable : true,	orderData : [2, 0] }
        ],
        columns		: [
            { render			:
                function (data, type, full, meta) {
                    var rowNom = '';
                    rowNom =  full.empresaNombre ;

                    return rowNom;
                }
            },
            { render			:
                function (data, type, full, meta) {
                    var rowTot = '';
                    var rowTot = full.tipoEstadoNombre; 

                    return rowTot;
                }
            },
            { render			:
                function (data, type, full, meta) {
                    var rowTot = '';
                    var rowTot = full.cantidadUsuario; 

                    return rowTot;
                }
            }           
        ]
    });

    $('#tableLoad03').DataTable({
        processing	: true,
        destroy		: true,
        searching	: true,
        paging		: false,
        lengthChange: false,
        info		: false,
        order: [[ 7, "desc" ]],
        orderCellsTop: true,
        fixedHeader	:  true,
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
        data		: dataJSON03,
        columnDefs	: [
            { targets			: [0],	visible : true, searchable : true,	orderData : [0, 0] },
            { targets			: [1],	visible : true,	searchable : true,	orderData : [1, 0] },
            { targets			: [2],	visible : true,	searchable : true,	orderData : [2, 0] },
            { targets			: [3],	visible : true,	searchable : true,	orderData : [3, 0] },
            { targets			: [4],	visible : true,	searchable : true,	orderData : [4, 0] },
            { targets			: [5],	visible : true,	searchable : true,	orderData : [5, 0] },
            { targets			: [6],	visible : true,	searchable : true,	orderData : [6, 0] },
            { targets			: [7],	visible : true,	searchable : true,	orderData : [7, 0] },
            { targets			: [8],	visible : true,	searchable : true,	orderData : [8, 0] }
        ],
        columns		: [
            { render			:
                function (data, type, full, meta) {
                    var rowTot = '';
                    var rowTot = full.usuarioLogEstado; 

                    return rowTot;
                }
            },
            { render			:
                function (data, type, full, meta) {
                    var rowNom = '';
                    rowNom =  full.empresaNombre ;

                    return rowNom;
                }
            },
            { render			:
                function (data, type, full, meta) {
                    var rowTot = '';
                    var rowTot = full.usuarioLogUsuario; 

                    return rowTot;
                }
            },
            { render			:
                function (data, type, full, meta) {
                    var rowTot = '';
                    var rowTot = full.usuarioLogFecha2;

                    return rowTot;
                }
            },
            { render			:
                function (data, type, full, meta) {
                    var rowTot = '';
                    var rowTot = full.usuarioLogHost;

                    return rowTot;
                }
            },
            { render			:
                function (data, type, full, meta) {
                    var rowTot = '';
                    var rowTot = full.usuarioLogAge;

                    return rowTot;
                }
            },
            { render			:
                function (data, type, full, meta) {
                    var rowTot = '';
                    var rowTot = full.usuarioLogReferencia;

                    return rowTot;
                }
            },
            { render			:
                function (data, type, full, meta) {
                    var rowTot = '';
                    var rowTot = full.auditoriaFechaHora;

                    return rowTot;
                }
            },
            { render			:
                function (data, type, full, meta) {
                    var rowTot = '';
                    var rowTot = full.usuarioLogIp;

                    return rowTot;
                }
            }
        ]
    });
});
