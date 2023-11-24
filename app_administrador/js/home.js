function charView01(fil01, fil02, fil03) {
    var xJSON       = getInversionEstado(fil01, fil02, fil03);
    var objData1    = [];
    var objData2    = [];
    var colores     =[];
    var indexrow    = 0;
    xJSON.forEach(element => {
        var dataAUX1 = { "value": element.inversion_total, "name": element.inversion_nombre + ' Gs. '};
        objData1.push(dataAUX1);
        var dataAUX2 = { "value": element.inversion_cantidad, "name": element.inversion_nombre};
        objData2.push(dataAUX2); 
       colores.push(getRandomColor1(indexrow)); 
       indexrow = indexrow + 1;
    });

    $(function() {
        "use strict";
        var cha01 = echarts.init(document.getElementById('chart01'));
        var opt01 = {
            tooltip: {
                trigger: 'item',
                enabled: true,
                formatter: function(d) { 
                    return d.data.name + ' ' + d.data.value.toLocaleString('es') 
                }
            },
            color: colores,
            calculable: false,
            series: [
                // Inner
                {
                    name: 'Cantidad',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '40%'],
                    // label : {
                    //     formatter: function(d) { return d.data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }
                    // },

                    // for funnel
                    x: '15%',
                    y: '7.5%',
                    width: '40%',
                    height: '85%',
                    funnelAlign: 'right',
                    max: 1548,

                    itemStyle: {
                        normal: {
                            label: {
                                position: 'inner',
                                    
                            },
                            labelLine: {
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    data: objData2
                },

                // Outer
                {
                    name: 'Monto',
                    type: 'pie',
                    radius: ['60%', '85%'],

                    // for funnel
                    x: '55%',
                    y: '7.5%',
                    width: '35%',
                    height: '85%',
                    funnelAlign: 'left',
                    max: 1048,
                    data: objData1

                }
        ]
    };    

        cha01.setOption(opt01);
    });
}