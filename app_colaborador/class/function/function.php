<?php
    function getKey() {
        global $api01;
        global $aut01;

        global $api02;
        global $aut02;

        global $api03;
        global $aut03;
        
        $result = "
            xxxBASE01= '$aut01';
            xxxURL01 = '$api01';

            localStorage.removeItem('urlBASE01');
            localStorage.removeItem('autBASE01');
            
            localStorage.setItem('urlBASE01', xxxURL01);
            localStorage.setItem('autBASE01', xxxBASE01);
            
            xxxBASE02= '$aut02';
            xxxURL02 = '$api02';

            localStorage.removeItem('urlBASE02');
            localStorage.removeItem('autBASE02');
            
            localStorage.setItem('urlBASE02', xxxURL02);
            localStorage.setItem('autBASE02', xxxBASE02);
            
            xxxBASE03= '$aut03';
            xxxURL03 = '$api03';

            localStorage.removeItem('urlBASE03');
            localStorage.removeItem('autBASE03');
            
            localStorage.setItem('urlBASE03', xxxURL03);
            localStorage.setItem('autBASE03', xxxBASE03);";
        return $result;
    }

    function getUUID(){
        $data    = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40); 
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80); 
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    function validarContrasenha(String $user, String $pass){
        $usuLen     = strlen($user);
        $pasLen     = strlen($pass);
        $result     = '';
        
        $usuArray   = array(
            "A" => 92, "B" => 66, "C" => 51, "D" => 70, "E" => 45, "F" => 76, "G" => 37, "H" => 64, "I" => 83, "J" => 33, "K" => 86, "L" => 97, "M" => 67, "N" => 71, "O" => 89, "P" => 61, "Q" => 57, "R" => 25, "S" => 94, "T" => 62, "U" => 99, "V" => 35, "W" => 87, "X" => 53, "Y" => 74, "Z" => 88, 
            "0" => 41, "1" => 38, "2" => 90, "3" => 93, "4" => 95, "5" => 98, "6" => 81, "7" => 84, "8" => 85, "9" => 72, " " => 75
        );

        $pasArray   = array(
            "A" => 54, "B" => 85, "C" => 92, "D" => 78, "E" => 97, "F" => 47, "G" => 91, "H" => 68, "I" => 44, "J" => 82, "K" => 58, "L" => 99, "M" => 83, "N" => 74, "O" => 73, "P" => 79, "Q" => 65, "R" => 95, "S" => 12, "T" => 51, "U" => 42, "V" => 77, "W" => 39, "X" => 86, "Y" => 75, "Z" => 59,
            "0" => 93, "1" => 98, "2" => 80, "3" =>  8, "4" =>  7, "5" =>  5, "6" => 23, "7" => 21, "8" => 31, "9" => 45, " " => 43,
            "a" => 11, "b" => 13, "c" => 28, "d" => 34, "e" =>  3, "f" => 17, "g" => 63, "h" => 10, "i" => 27, "j" => 24, "k" => 32, "l" => 18, "m" => 53, "n" => 26, "o" => 66, "p" => 15, "q" => 37, "r" => 22, "s" => 49, "t" => 36, "u" => 20, "v" => 52, "w" => 25, "x" => 14, "y" => 50, "z" => 33,
            "*" => 19, "-" =>  1, "+" => 16, "/" => 56, "." => 29, "_" => 40, "#" => 48, "&" =>  2, "@" => 30, ";" => 51, "," => 90, "$" =>  4, "!" =>  6
        );

        for ($i = 0; $i < 10; $i++) { 
            $usuIndex   = 0;
            $pasIndex   = 0;

            if ($i < $usuLen){
                $usuIndex   = substr($user, $i, 1);
                $usuData    = $usuArray[$usuIndex];
            } else {
                $usuIndex   = '';
                $usuData    = 75;
            }

            if ($i < $pasLen){
                $pasIndex   = substr($pass, $i, 1);
                $pasData    = $pasArray[$pasIndex];
            } else {
                $pasIndex   = '';
                $pasData    = 43;
            }

            $resSuma = $usuData + $pasData;

            if($resSuma < 10){
                $resData = '  '.(string)$resSuma;
            }elseif ($resSuma > 9 && $resSuma < 100){
                $resData = ' '.(string)$resSuma;
            }elseif ($resSuma > 99){
                $resData = ''.(string)$resSuma;
            }

            $result = $result.''.$resData;
        }

        return $result;
    }

    function getFechaHora(int $type){
        $result = '';

        switch ($type) {
            case 1:
                $result = date("YmdHis");
                break;

            case 2:
                $result = date("Ymd");
                break;
            
            default:
                $result = date("YmdHis");
                break;
        }
        
        return $result;
    }

    function uploadAttached(int $code, string $target, array $file, bool $submit, int $size) {
        $target_ban     = false;
        $target_msn     = '';
        $target_nam     = $code.'_'.getFechaHora(2).'_'.rand(100, 999);
        $target_for     = '';
        
        if (!empty($file['tmp_name'])) {
            $target_file    = $target.basename($file['name']);
            $imageFileType  = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
            $target_file	= $target_nam.'.'.$imageFileType;
            $target_for     = $imageFileType;

            if($submit) {
                if ($file['type'] == 'application/msword' ||
                    $file['type'] == 'application/vnd.ms-excel' ||
                    $file['type'] == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                    $file['type'] == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                    $file['type'] == 'application/pdf'
                ) {
                    $check = $file['size'];
                } else {
                    $check = getimagesize($file['tmp_name']);
                }
    
                if($check !== false) {
                    $target_ban = true;
                } else {
                    $target_ban = false;
                    $target_msn = 'ERROR: El archivo no es correcto. Verifique!';
                }
            }
            
            if (file_exists($target_file) && $target_ban == true) {
                $target_msn = 'ERROR: Ya existe una archivo con el mismo nombre. Verifique!';
                $target_ban = false;
            }
            
            if ($file['size'] > $size && $target_ban == true) {
                $target_msn = 'ERROR: El archivo es muy pesado, sobrepasa lo permitido de 20MB. Verifique!';
                $target_ban = false;
            }
            
            if($imageFileType != 'doc' && $imageFileType != 'docx' && $imageFileType != 'xls' && $imageFileType != 'xlsx' && $imageFileType != 'jpg' && $imageFileType != 'png' && $imageFileType != 'jpeg' && $imageFileType != 'pdf' && $target_ban == true) {
                $target_msn = 'ERROR: El formato del archivo no corresponde, solo permitido .xls, .xlsx, .jpg, .png, .jpeg, .pdf. Verifique!';
                $target_ban = false;
            }
    
            if ($target_ban == true) {
                if (move_uploaded_file($file['tmp_name'], $target.''.$target_file)) {
                    $target_nam = $target_file;
                    $target_msn	= 'SUCCESS: Se adjunto con éxito el documento.';
                    $target_ban = true;
                } else {
                    $target_msn = 'ERROR: El archivo tuvo inconveniente en subir, favor intente devuelta. Verifique!';
                    $target_ban = false;
                }
            }
        }

        return array($target_ban, $target_msn, $target_nam, $target_for);
    }

    function viewSlider(string $path){
        $result = '';

        if (is_dir($path)){
            $gestor = opendir($path);

            while (($file = readdir($gestor)) !== false)  {
                if (is_file($path."/".$file)) {
                    $result = $result.'<li style="height:inherit;"><img src="'.$path.'/'.$file.'" style="height:inherit;" alt="'.$file.'" /></li>';
                }            
            }

            closedir($gestor);
        }

        return $result;
    }

    function validarTelefono(String $telefono) {
        $telefono   = str_replace('(', '', $telefono);
        $telefono   = str_replace(')', '', $telefono);
        $telefono   = str_replace(' ', '', $telefono);
        $telefono   = str_replace('-', '', $telefono);
        $prefijo    = substr($telefono, 0, 3);
        $numero     = substr($telefono, 3, 6);

        return array($prefijo, $numero, $telefono);
    }

    function validarCelular(String $telefono) {
        $telefono   = str_replace('(', '', $telefono);
        $telefono   = str_replace(')', '', $telefono);
        $telefono   = str_replace(' ', '', $telefono);
        $telefono   = str_replace('-', '', $telefono);
        $prefijo    = substr($telefono, 0, 4);
        $numero     = substr($telefono, 4, 6);

        return array($prefijo, $numero, $telefono);
    }

    function validarImporte(String $importe) {
        $importe   = intval(str_replace('.', '', $importe));

        return $importe;
    }

    function setPersonaCuenta(String $modAction, int $codAction, int $codCuenta, String $docNumero, String $docFechaEmision, int $codTipoPersona, String $nomPrimero, String $nomSegundo, String $apePaterno, String $apeMaterno, String $apeCasada, int $codLocalidadPais, int $codTipoSexo, int $codTipoEstadoCivil, String $fecNacimiento, String $audUser, String $audIP) {
        $dataJSON = json_encode(
            array(
                'tipo_accion_codigo'                    => $codAction,
                'persona_cuenta'                        => $codCuenta,
                'persona_documento_numero'              => $docNumero,
                'tipo_persona_parametro'                => $codTipoPersona,
                'persona_apellido_paterno'              => $apePaterno,
                'persona_apellido_materno'              => $apeMaterno,
                'persona_apellido_casada'               => $apeCasada,
                'persona_apellido'                      => $apePaterno.' '.$apeMaterno,
                'persona_nombre_primer'                 => $nomPrimero,
                'persona_nombre_segundo'                => $nomSegundo,
                'persona_nombre'                        => $nomPrimero.' '.$nomSegundo,
                'localidad_pais_codigo'                 => $codLocalidadPais,
                'tipo_sexo_parametro'                   => $codTipoSexo,
                'persona_fecha_nacimiento'              => $fecNacimiento,
                'tipo_estadocivil_parametro'            => $codTipoEstadoCivil,
                'persona_documento_fechaemision'        => $docFechaEmision,
                'solicitud_cliente_cuenta'              => $codCuenta,              
                'auditoria_usuario'                     => $audUser,
                'auditoria_fecha_hora'                  => date('Y-m-d H:i:s'),
                'auditoria_ip'                          => $audIP
            )
        );
        
        switch ($modAction) {
            case 'C':
                $xJSON  = post_curl('persona/cuenta', $dataJSON);
                break;

            case 'U':
                $xJSON  = put_curl('persona/cuenta/'.$codCuenta, $dataJSON);
                break;

            case 'D':
                $xJSON  = delete_curl('persona/cuenta/'.$codCuenta, $dataJSON);
                break;

            default:
                break;
        }

        $xJSON = json_decode($xJSON, true);

        return array($xJSON, $dataJSON);
    }

    function setPersonaDatoParticular(String $modAction, int $codAction, int $codCuenta, int $codItem, int $codLocalidadDepto, int $codLocalidadCiudad, int $codLocalidadBarrio, String $barrioNombre, String $callePrincipal, String $callEsquina, int $nroCasa, String $telefonoNro1, String $telefonoNro2, String $telefonoNro3, String $celularNro1, String $celularNro2, String $celularNro3, String $email, int $codTipoVivienda, String $audUser, String $audIP) {
        $telefonoNro1= validarTelefono($telefonoNro1);
        $telefonoNro2= validarTelefono($telefonoNro2);
        $telefonoNro3= validarTelefono($telefonoNro3);

        $celularNro1 = validarCelular($celularNro1);
        $celularNro2 = validarCelular($celularNro2);
        $celularNro3 = validarCelular($celularNro3);

        $dataJSON = json_encode(
            array(
            'tipo_accion_codigo'                                        => $codAction,
            'persona_cuenta'                                            => $codCuenta,
            'persona_datoparticular_codigo'                             => $codItem,
            'localidad_departamento_codigo'                             => $codLocalidadDepto,
            'localidad_ciudad_codigo'                                   => $codLocalidadCiudad,
            'localidad_barrio_codigo'                                   => $codLocalidadBarrio,
            'localidad_barrio_nombre'                                   => $barrioNombre,
            'persona_datoparticular_principal'                          => $callePrincipal,
            'persona_datoparticular_casanumero'                         => $nroCasa,
            'persona_datoparticular_esquina'                            => $callEsquina,
            'persona_datoparticular_telefono1_prefijo'                  => $telefonoNro1[0],
            'persona_datoparticular_telefono1_numero'                   => $telefonoNro1[1],
            'persona_datoparticular_telefono'                           => $telefonoNro1[2],
            'persona_datoparticular_telefono2_prefijo'                  => $telefonoNro2[0],
            'persona_datoparticular_telefono2_numero'                   => $telefonoNro2[1],
            'persona_datoparticular_telefonofamiliar_prefijo'           => $telefonoNro3[0],
            'persona_datoparticular_telefonofamiliar_numero'            => $telefonoNro3[1],
            'persona_datoparticular_celular1_prefijo'                   => $celularNro1[0],
            'persona_datoparticular_celular1_numero'                    => $celularNro1[1],
            'persona_datoparticular_celular'                            => $celularNro1[2],
            'persona_datoparticular_celular2_prefijo'                   => $celularNro2[0],
            'persona_datoparticular_celular2_numero'                    => $celularNro2[1],
            'persona_datoparticular_celular3_prefijo'                   => $celularNro3[0],
            'persona_datoparticular_celular3_numero'                    => $celularNro3[1],
            'persona_datoparticular_email'                              => $email,
            'tipo_vivienda_parametro'                                   => $codTipoVivienda,
            'persona_datoparticular_localidad_departamento_codigo'      => $codLocalidadDepto,
            'persona_datoparticular_localidad_ciudad_codigo'            => $codLocalidadCiudad,
            'persona_datoparticular_localidad_barrio_codigo'            => $codLocalidadBarrio,
            'persona_datoparticular_tipo_vivienda_parametro'            => $codTipoVivienda,
            'auditoria_usuario'                                         => $audUser,
            'auditoria_fecha_hora'                                      => date('Y-m-d H:i:s'),
            'auditoria_ip'                                              => $audIP
            )
        );
        
        switch ($modAction) {
            case 'C':
                $xJSON  = post_curl('persona/datoparticular', $dataJSON);
                break;

            case 'U':
                $xJSON  = put_curl('persona/datoparticular/cuenta/'.$codCuenta.'/codigo/'.$codItem, $dataJSON);
                break;

            case 'D':
                $xJSON  = delete_curl('persona/datoparticular/cuenta/'.$codCuenta.'/codigo/'.$codItem, $dataJSON);
                break;

            default:
                break;
        }

        $xJSON = json_decode($xJSON, true);

        return array($xJSON, $dataJSON);
    }

    function setPersonaDatoLaboral(String $modAction, int $codAction, int $codCuenta, int $codItem, int $codLocalidadDepto, int $codLocalidadCiudad, int $codLocalidadBarrio, String $barrioNombre, String $callePrincipal, String $callEsquina, int $nroCasa, String $empNombre, String $empFechaIngreso, int $empSalario, String $empEmail, String $telefonoNro1, String $telefonoNro2, String $telefonoNro3, int $telefonoInterno, String $horaDesde, String $horaHasta, int $codEmpresa, int $codCargo, int $diaCobro, String $diaLunes, String $diaMartes, String $diaMiercoles, String $diaJueves, String $diaViernes, String $diaSabado, String $diaDomingo, int $codActividad, int $codProfesion, int $codArea, int $codFormaPago, int $codBancoSalario, int $codAporteJubilatorio, String $audUser, String $audIP){
        $telefonoNro1= validarTelefono($telefonoNro1);
        $telefonoNro2= validarTelefono($telefonoNro2);
        $telefonoNro3= validarTelefono($telefonoNro3);

        $dataJSON = json_encode(
            array(
                'tipo_accion_codigo'                                    => $codAction,
                'persona_cuenta'                                        => $codCuenta,
                'persona_datolaboral_codigo'                            => $codItem,
                'persona_datolaboral_principal'                         => $callePrincipal,
                'persona_datolaboral_empresa'                           => $empNombre,
                'persona_datolaboral_fechaingreso'                      => $empFechaIngreso,
                'persona_datolaboral_salario'                           => $empSalario,
                'persona_datolaboral_email'                             => $empEmail,
                'persona_datolaboral_esquina'                           => $callEsquina,
                'persona_datolaboral_casanumero'                        => $nroCasa,
                'persona_datolaboral_telefono1_prefijo'                 => $telefonoNro1[0],
                'persona_datolaboral_telefono1_numero'                  => $telefonoNro1[1],
                'persona_datolaboral_telefono1'                         => $telefonoNro1[2],
                'persona_datolaboral_telefono2_prefijo'                 => $telefonoNro2[0],
                'persona_datolaboral_telefono2_numero'                  => $telefonoNro2[1],
                'persona_datolaboral_telefono2'                         => $telefonoNro2[2],
                'persona_datolaboral_telefono3_prefijo'                 => $telefonoNro3[0],
                'persona_datolaboral_telefono3_numero'                  => $telefonoNro3[1],
                'persona_datolaboral_telefono3'                         => $telefonoNro3[2],
                'persona_datolaboral_interno'                           => $telefonoInterno,
                'localidad_departamento_codigo'                         => $codLocalidadDepto,
                'localidad_ciudad_codigo'                               => $codLocalidadCiudad,
                'localidad_barrio_codigo'                               => $codLocalidadBarrio,
                'localidad_barrio_nombre'                               => $barrioNombre,
                'persona_datolaboral_hora_desde'                        => $horaDesde,
                'persona_datolaboral_hora_hasta'                        => $horaHasta,
                'empresa_codigo'                                        => $codEmpresa,
                'cargo_codigo'                                          => $codCargo,
                'persona_datolaboral_diacobro'                          => $diaCobro,
                'persona_datolaboral_dialunes'                          => $diaLunes,
                'persona_datolaboral_diamartes'                         => $diaMartes,
                'persona_datolaboral_diamiercoles'                      => $diaMiercoles,
                'persona_datolaboral_diajueves'                         => $diaJueves,
                'persona_datolaboral_diaviernes'                        => $diaViernes,
                'persona_datolaboral_diasabado'                         => $diaSabado,
                'persona_datolaboral_diadomingo'                        => $diaDomingo,
                'actividad_codigo'                                      => $codActividad,
                'profesion_codigo'                                      => $codProfesion,
                'area_codigo'                                           => $codArea,
                'forma_pago_codigo'                                     => $codFormaPago,
                'banco_codigo'                                          => $codBancoSalario,
                'persona_datolaboral_localidad_departamento_codigo'     => $codLocalidadDepto,
                'persona_datolaboral_localidad_ciudad_codigo'           => $codLocalidadCiudad,
                'persona_datolaboral_localidad_barrio_codigo'           => $codLocalidadBarrio,
                'persona_datolaboral_empresa_codigo'                    => $codEmpresa,
                'persona_datolaboral_cargo_codigo'                      => $codCargo,
                'persona_datolaboral_actividad_codigo'                  => $codActividad,
                'persona_datolaboral_profesion_codigo'                  => $codProfesion,
                'persona_datolaboral_area_codigo'                       => $codArea,
                'persona_datolaboral_aportejubilatorio_codigo'          => $codAporteJubilatorio,
                'auditoria_usuario'                                     => $audUser,
                'auditoria_fecha_hora'                                  => date('Y-m-d H:i:s'),
                'auditoria_ip'                                          => $audIP
            )
        );
        
        switch ($modAction) {
            case 'C':
                $xJSON  = post_curl('persona/datolaboral', $dataJSON);
                break;

            case 'U':
                $xJSON  = put_curl('persona/datolaboral/cuenta/'.$codCuenta.'/codigo/'.$codItem, $dataJSON);
                break;

            case 'D':
                $xJSON  = delete_curl('persona/datolaboral/cuenta/'.$codCuenta.'/codigo/'.$codItem, $dataJSON);
                break;

            default:
                break;
        }

        $xJSON = json_decode($xJSON, true);

        return array($xJSON, $dataJSON);
    }

    function setPersonaDatoRefencia (String $modAction, int $codAction, int $codCuenta, int $codItem, String $ref1Nombre, String $ref1Parentesco, String $ref1Telefono, String $ref2Nombre, String $ref2Parentesco, String $ref2Telefono, String $ref3Nombre, String $ref3Parentesco, String $ref3Telefono, String $audUser, String $audIP) {
        $ref1Telefono= validarCelular($ref1Telefono);
        $ref2Telefono= validarCelular($ref2Telefono);
        $ref3Telefono= validarCelular($ref3Telefono);

        $dataJSON = json_encode(
            array(
            'tipo_accion_codigo'                                        => $codAction,
            'persona_cuenta'                                            => $codCuenta,
            'persona_datoreferencia_contacto1_nombre'                   => $ref1Nombre,
            'persona_datoreferencia_contacto1_parentesco'               => $ref1Parentesco,
            'persona_datoreferencia_contacto1_prefijo'                  => $ref1Telefono[0],
            'persona_datoreferencia_contacto1_numero'                   => $ref1Telefono[1],
            'persona_datoreferencia_contacto2_nombre'                   => $ref2Nombre,
            'persona_datoreferencia_contacto2_parentesco'               => $ref2Parentesco,
            'persona_datoreferencia_contacto2_prefijo'                  => $ref2Telefono[0],
            'persona_datoreferencia_contacto2_numero'                   => $ref2Telefono[1],
            'persona_datoreferencia_contacto3_nombre'                   => $ref3Nombre,
            'persona_datoreferencia_contacto3_parentesco'               => $ref3Parentesco,
            'persona_datoreferencia_contacto3_prefijo'                  => $ref3Telefono[0],
            'persona_datoreferencia_contacto3_numero'                   => $ref3Telefono[1],
            'auditoria_usuario'                                         => $audUser,
            'auditoria_fecha_hora'                                      => date('Y-m-d H:i:s'),
            'auditoria_ip'                                              => $audIP
            )
        );

        return array([], $dataJSON);
    }

    function setOperacionSolicitud(String $modAction, int $codAction, int $codCuenta, int $codItem, String $codParentesco, int $codTipoOperacion, int $codMedio, int $codCampanha, int $codFormaPago, String $codTipoOperador, int $codBanca, int $codGarante, int $solicMonto, int $solicPlazo, String $solicPrimerVencimiento, String $solicEstado, String $solicAsignado, int $codEjecutivo, int $codBanco, String $bancoTipo, String $bancoCuenta, String $cuotaDinamica, String $documentoAdjunto, String $tipoSolicitud, $xDATA, String $altUser, String $audUser, String $audIP){
        $dataJSON =json_encode(
            array(
                'tipo_accion_codigo'                        => $codAction,
                'persona_cuenta'                            => $codCuenta,
                'solicitud_parentesco'                      => $codParentesco,
                'solicitud_monto'                           => $solicMonto,
                'solicitud_plazo'                           => $solicPlazo,
                'solicitud_primer_vencimiento'              => $solicPrimerVencimiento,
                'solicitud_ejecutivoventa_codigo'           => $codEjecutivo,
                'solicitud_tipooperacion_codigo'            => $codTipoOperacion,
                'solicitud_estadooperacion_codigo'          => $solicEstado,
                'solicitud_medio_codigo'                    => $codMedio,
                'solicitud_campanha_codigo'                 => $codCampanha,
                'solicitud_formapago_codigo'                => $codFormaPago,
                'solicitud_banco_codigo'                    => $codBanco,
                'solicitud_banco_cuenta'                    => $bancoCuenta,
                'solicitud_banco_tipo'                      => $bancoTipo,
                'solicitud_tipooperador_codigo'             => $codTipoOperador,
                'solicitud_banca_codigo'                    => $codBanca,
                'solicitud_garante_codigo'                  => $codGarante,
                'solicitud_documento_adjunto'               => $documentoAdjunto,
                'solicitud_cuota_dinamica'                  => $cuotaDinamica,
                'solicitud_tiposolicitud_codigo'            => $tipoSolicitud,
                'auditoria_plataforma'                      => $altUser,
                'auditoria_usuario'                         => $audUser,
                'auditoria_fecha_hora'                      => date('Y-m-d H:i:s'),
                'auditoria_ip'                              => $audIP
        ));

        $dataJSON01 = json_encode(array_merge(json_decode($dataJSON, true), $xDATA));
        $xJSON      = post_curl('operacionsolicitud/aliado', $dataJSON01);
        $xJSON      = json_decode($xJSON, true);

        return array($xJSON, $dataJSON01);
    }
?>